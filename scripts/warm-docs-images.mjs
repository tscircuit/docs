import {
  appendFile,
  mkdir,
  readFile,
  readdir,
  writeFile,
} from "node:fs/promises"
import { dirname, relative, resolve } from "node:path"
import { setTimeout as delay } from "node:timers/promises"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"
import parseSrcset from "parse-srcset"
import { parse } from "parse5"

// Match ordinary browser image requests rather than warming fetch's */* variant.
export const imageAccept =
  "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
const renderHosts = new Set([
  "svg.tscircuit.com",
  "svg2.tscircuit.com",
  "svg3.tscircuit.com",
  "png.tscircuit.com",
])

export function discoverImages(html, pageUrl) {
  const document = parse(html)
  const elements = []
  function walk(node) {
    if (node.tagName) elements.push(node)
    for (const child of node.childNodes ?? []) walk(child)
  }
  walk(document)
  const attribute = (element, name) =>
    element.attrs.find((attr) => attr.name === name)?.value
  const base = elements.find((element) => element.tagName === "base")
  const baseUrl = new URL((base && attribute(base, "href")) || pageUrl, pageUrl)
  const images = new Set()
  function add(source) {
    if (!source?.trim()) return
    const url = new URL(source, baseUrl)
    if (!["http:", "https:"].includes(url.protocol)) return
    url.hash = ""
    images.add(url.href)
  }
  for (const element of elements) {
    if (element.tagName === "img") add(attribute(element, "src"))
    if (
      element.tagName === "img" ||
      (element.tagName === "source" &&
        element.parentNode?.tagName === "picture")
    ) {
      for (const candidate of parseSrcset(attribute(element, "srcset") ?? "")) {
        add(candidate.url)
      }
    }
  }
  return [...images]
}

export async function collectImages(buildDirectory, siteUrl) {
  const inventory = new Map()
  const files = await readdir(buildDirectory, { recursive: true })
  const pages = files.filter((file) => file.endsWith(".html")).sort()
  if (!pages.length)
    throw new Error("No built HTML found; run bun run build first")
  for (const file of pages) {
    const html = await readFile(resolve(buildDirectory, file), "utf8")
    const pagePath = file
      .replaceAll("\\", "/")
      .replace(/(^|\/)index\.html$/, "$1")
    const pageUrl = new URL(pagePath, siteUrl).href
    for (const url of discoverImages(html, pageUrl)) {
      if (!inventory.has(url)) inventory.set(url, { url, pages: [] })
      inventory.get(url).pages.push(pageUrl)
    }
  }
  if (!inventory.size) throw new Error("No image URLs found in the built docs")
  return [...inventory.values()].sort((a, b) => a.url.localeCompare(b.url))
}

export async function warmImages(
  images,
  {
    concurrency = 4,
    attempts = 2,
    timeoutMs = 120_000,
    retryDelayMs = 5_000,
    fetchImage = fetch,
    onResult = () => {},
  } = {},
) {
  for (const [name, value] of Object.entries({
    concurrency,
    attempts,
    timeoutMs,
  })) {
    if (!Number.isInteger(value) || value < 1) {
      throw new Error(`${name} must be a positive integer`)
    }
  }
  let nextIndex = 0
  const results = new Array(images.length)
  async function worker() {
    while (nextIndex < images.length) {
      const index = nextIndex++
      const image = images[index]
      const startedAt = Date.now()
      let result
      for (let attempt = 1; attempt <= attempts; attempt++) {
        let response
        try {
          response = await fetchImage(image.url, {
            headers: {
              Accept: imageAccept,
              "Cache-Control": "no-cache",
              // Vercel synchronously refreshes stale entries with this header.
              Pragma: "no-cache",
            },
            signal: AbortSignal.timeout(timeoutMs),
          })
          // Read the whole body: HEAD cannot ensure an image has been rendered.
          const body = await response.arrayBuffer()
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          if (!response.headers.get("content-type")?.startsWith("image/")) {
            throw new Error("Response is not an image")
          }
          if (!body.byteLength) throw new Error("Empty image response")
          if (renderHosts.has(new URL(image.url).hostname)) {
            const cache = response.headers.get("cache-control") ?? ""
            const cdn = response.headers.get("cdn-cache-control") ?? ""
            // Also recognize legacy successful images while the cache-policy
            // deployment rolls out. Legacy HTTP-200 error images lack immutable.
            if (
              /no-store/.test(cache + cdn) ||
              (!/immutable/.test(cache) && !/stale-while-revalidate/.test(cdn))
            ) {
              throw new Error("Renderer returned an error image")
            }
            if (response.headers.get("x-vercel-cache") === "STALE") {
              throw new Error("Refresh returned a stale fallback image")
            }
          }
          result = {
            ...image,
            ok: true,
            attempts: attempt,
            bytes: body.byteLength,
            cache: response.headers.get("x-vercel-cache"),
          }
          break
        } catch (error) {
          result = {
            ...image,
            ok: false,
            attempts: attempt,
            status: response?.status,
            error: error.message,
          }
          // Retry transient network/server failures, including cached error
          // images from the old renderer. Permanent 4xx errors need fixing.
          if (
            attempt === attempts ||
            (response?.status >= 400 &&
              response.status < 500 &&
              ![408, 429].includes(response.status))
          ) {
            break
          }
          await delay(retryDelayMs * attempt)
        }
      }
      result.elapsedMs = Date.now() - startedAt
      results[index] = result
      await onResult(result, index)
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, images.length) }, () =>
      worker(),
    ),
  )
  return results
}

async function main() {
  const { values } = parseArgs({
    options: {
      build: { type: "string", default: "build" },
      "site-url": { type: "string", default: "https://docs.tscircuit.com/" },
      concurrency: { type: "string", default: "4" },
      limit: { type: "string" },
      "dry-run": { type: "boolean", default: false },
      report: { type: "string", default: "build/image-cache-report.json" },
    },
  })
  const images = await collectImages(resolve(values.build), values["site-url"])
  const hosts = {}
  for (const image of images) {
    const host = new URL(image.url).hostname
    hosts[host] = (hosts[host] ?? 0) + 1
  }
  console.log(`Found ${images.length} unique image URLs`, hosts)
  const reportFile = resolve(values.report)
  await mkdir(dirname(reportFile), { recursive: true })
  if (values["dry-run"]) {
    await writeFile(reportFile, JSON.stringify({ images, hosts }, null, 2))
    console.log(`Inventory written to ${relative(process.cwd(), reportFile)}`)
    return
  }
  const limit =
    values.limit === undefined ? images.length : Number(values.limit)
  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error("limit must be a positive integer")
  }
  const selected = images.slice(0, limit)
  // Keep partial results if the runner is interrupted before the final report.
  await writeFile(
    reportFile,
    JSON.stringify({ hosts, images: selected }, null, 2),
  )
  const progressFile = `${reportFile}.ndjson`
  await writeFile(progressFile, "")
  let progressWrite = Promise.resolve()
  const results = await warmImages(selected, {
    concurrency: Number(values.concurrency),
    onResult: async (result) => {
      const url = new URL(result.url)
      const view = url.searchParams.get("svg_type")
      console.log(
        `${result.ok ? "OK" : "FAIL"} ${url.origin}${url.pathname}${view ? ` (${view})` : ""} ${result.elapsedMs}ms${result.ok ? "" : `: ${result.error}`} [${result.pages[0]}]`,
      )
      progressWrite = progressWrite.then(() =>
        appendFile(progressFile, `${JSON.stringify(result)}\n`),
      )
      await progressWrite
    },
  })
  const failures = results.filter((result) => !result.ok)
  await writeFile(
    reportFile,
    JSON.stringify(
      { generatedAt: new Date().toISOString(), hosts, results },
      null,
      2,
    ),
  )
  const summary = `Requested ${results.length} images: ${results.length - failures.length} succeeded, ${failures.length} failed.\n`
  console.log(summary)
  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY, summary)
  }
  if (failures.length) process.exitCode = 1
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
