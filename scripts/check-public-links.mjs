import { readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const origin = "https://docs.tscircuit.com"
const decode = (value) => decodeURIComponent(value)
const routeFor = (file) => {
  const route = `/${file}`.replace(/index\.html$/, "").replace(/\.html$/, "")
  return decode(route.replace(/\/$/, "") || "/")
}

async function filesIn(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const relative = path.posix.join(prefix, entry.name)
      return entry.isDirectory()
        ? filesIn(path.join(directory, entry.name), relative)
        : [relative]
    }),
  )
  return files.flat().sort()
}

export async function inspectBuild(directory) {
  const files = await filesIn(directory)
  const routes = {}
  const links = []
  for (const file of files.filter((name) => name.endsWith(".html"))) {
    const route = routeFor(file)
    const anchors = new Set()
    const ids = new Set()
    let redirect = null
    const html = await readFile(path.join(directory, file), "utf8")
    const rewriter = new HTMLRewriter()
      .on("[id], a[name]", {
        element(element) {
          const id = element.getAttribute("id") ?? element.getAttribute("name")
          if (id) ids.add(id)
        },
      })
      .on("article [id], main h1[id], main h2[id], main h3[id], main a[name]", {
        element(element) {
          const id = element.getAttribute("id") ?? element.getAttribute("name")
          // React-generated control IDs are not public deep-link contracts.
          if (id && !/^:[rR].*:$/.test(id)) anchors.add(id)
        },
      })
      .on("a[href]", {
        element(element) {
          links.push({ from: route, href: element.getAttribute("href") })
        },
      })
      .on('meta[http-equiv="refresh"]', {
        element(element) {
          redirect =
            element.getAttribute("content")?.match(/url=(.*)/i)?.[1] ?? null
        },
      })
    await rewriter.transform(new Response(html)).text()
    routes[route] = {
      anchors: [...anchors].sort(),
      ids: [...ids].sort(),
      redirect,
    }
  }
  const assets = new Set(files.map((file) => decode(`/${file}`)))
  const broken = []
  for (const { from, href } of links) {
    const url = new URL(href, `${origin}${from === "/" ? "/" : from}`)
    if (url.origin !== origin) continue
    const target = decode(url.pathname).replace(/\/$/, "") || "/"
    const page = routes[target] ?? routes[target.replace(/\.html$/, "")]
    if (!page && !assets.has(decode(url.pathname))) {
      broken.push(`${from} -> ${href}`)
    } else if (
      page &&
      url.hash &&
      !page.redirect &&
      !page.ids.includes(decode(url.hash.slice(1)))
    ) {
      broken.push(`${from} -> ${href}`)
    }
  }
  return {
    routes,
    markdown: files.filter((file) => file.endsWith(".md")),
    broken: [...new Set(broken)].sort(),
  }
}

export function regressions(before, after) {
  const failures = []
  for (const [route, previous] of Object.entries(before.routes)) {
    const current = after.routes[route]
    if (!current) {
      failures.push(`Removed route: ${route}`)
      continue
    }
    if (previous.redirect !== current.redirect)
      failures.push(`Changed redirect: ${route}`)
    for (const anchor of previous.anchors) {
      if (!current.ids.includes(anchor))
        failures.push(`Removed anchor: ${route}#${anchor}`)
    }
  }
  for (const file of before.markdown) {
    if (!after.markdown.includes(file))
      failures.push(`Removed Markdown endpoint: /${file}`)
  }
  for (const link of after.broken) {
    if (!before.broken.includes(link))
      failures.push(`New broken internal link: ${link}`)
  }
  return failures
}

if (import.meta.main) {
  const [command, directory, manifest] = process.argv.slice(2)
  if (!["snapshot", "check"].includes(command) || !directory || !manifest) {
    throw new Error(
      "Usage: bun scripts/check-public-links.mjs <snapshot|check> <build directory> <baseline.json>",
    )
  }
  const current = await inspectBuild(directory)
  if (command === "snapshot") {
    await writeFile(manifest, `${JSON.stringify(current, null, 2)}\n`)
    console.log(
      `Captured ${Object.keys(current.routes).length} routes, ${current.markdown.length} Markdown endpoints, ${current.broken.length} existing broken internal links.`,
    )
  } else {
    const baseline = JSON.parse(await readFile(manifest, "utf8"))
    const failures = regressions(baseline, current)
    if (failures.length) throw new Error(failures.join("\n"))
    console.log(
      `Preserved ${Object.keys(baseline.routes).length} routes, ${Object.values(baseline.routes).reduce((count, route) => count + route.anchors.length, 0)} anchors, ${baseline.markdown.length} Markdown endpoints and all redirects. No new broken internal links. ${current.broken.length} pre-existing broken links remain.`,
    )
  }
}
