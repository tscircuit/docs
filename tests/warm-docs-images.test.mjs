import assert from "node:assert/strict"
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { test } from "node:test"
import { setTimeout as delay } from "node:timers/promises"
import {
  collectImages,
  discoverImages,
  imageAccept,
  warmImages,
} from "../scripts/warm-docs-images.mjs"

test("discovers hidden previews, entities, relative images and picture variants", () => {
  const images = discoverImages(
    `<img src="https://svg.tscircuit.com/?svg_type=3d&amp;code=a%2Bb%3D&amp;realistic=true">
     <div hidden><img src='https://svg.tscircuit.com/?svg_type=pcb&#38;code=a%2Bb%3D'></div>
     <img src="../image.png#fragment" srcset="../image.png 1x, ../image@2x.png 2x">
     <picture><source srcset="/image.webp 640w, /large.webp 1280w"><img src="/image.png"></picture>
     <img src="data:image/png;base64,AAAA" srcset="data:image/png;base64,AAAA 1x, /fallback.png 2x">
     <img src="blob:local-image">
     <video><source srcset="/video.mp4"></video>`,
    "https://docs.tscircuit.com/guides/example/",
  )
  assert.deepEqual(images, [
    "https://svg.tscircuit.com/?svg_type=3d&code=a%2Bb%3D&realistic=true",
    "https://svg.tscircuit.com/?svg_type=pcb&code=a%2Bb%3D",
    "https://docs.tscircuit.com/guides/image.png",
    "https://docs.tscircuit.com/guides/image@2x.png",
    "https://docs.tscircuit.com/image.webp",
    "https://docs.tscircuit.com/large.webp",
    "https://docs.tscircuit.com/image.png",
    "https://docs.tscircuit.com/fallback.png",
  ])
  assert.deepEqual(
    discoverImages(
      '<base href="/assets/"><img src="example.png">',
      "https://docs.tscircuit.com/guides/",
    ),
    ["https://docs.tscircuit.com/assets/example.png"],
  )
})

test("collects every built page and deduplicates shared images with source routes", async () => {
  const directory = await mkdtemp(join(tmpdir(), "docs-images-"))
  try {
    await mkdir(join(directory, "guides/example"), { recursive: true })
    const shared =
      "https://svg.tscircuit.com/?code=unchanged%2B&amp;svg_type=3d"
    await writeFile(join(directory, "index.html"), `<img src="${shared}">`)
    await writeFile(
      join(directory, "guides/example/index.html"),
      `<img src="${shared}"><img src="./local.png">`,
    )
    const images = await collectImages(directory, "https://docs.tscircuit.com/")
    assert.equal(images.length, 2)
    assert.deepEqual(
      images.find((image) => image.url.includes("svg.tscircuit")),
      {
        url: "https://svg.tscircuit.com/?code=unchanged%2B&svg_type=3d",
        pages: [
          "https://docs.tscircuit.com/guides/example/",
          "https://docs.tscircuit.com/",
        ],
      },
    )
    assert.equal(
      images[0].url,
      "https://docs.tscircuit.com/guides/example/local.png",
    )
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})

test("uses exact GET URLs, consumes bodies and limits concurrency", async () => {
  const images = Array.from({ length: 9 }, (_, index) => ({
    url: `https://svg.tscircuit.com/?svg_type=3d&code=a%2Bb%3D&n=${index}`,
    pages: ["https://docs.tscircuit.com/"],
  }))
  let active = 0
  let peak = 0
  let consumed = 0
  const requests = []
  const results = await warmImages(images, {
    concurrency: 3,
    fetchImage: async (url, options) => {
      requests.push(url)
      assert.equal(options.headers.Accept, imageAccept)
      assert.equal(options.headers.Pragma, "no-cache")
      assert.equal(options.headers["Cache-Control"], "no-cache")
      active++
      peak = Math.max(peak, active)
      await delay(5)
      const response = new Response("image", {
        headers: {
          "Content-Type": "image/png",
          "CDN-Cache-Control": "public, stale-while-revalidate=604800",
          "x-vercel-cache": "REVALIDATED",
        },
      })
      const read = response.arrayBuffer.bind(response)
      response.arrayBuffer = async () => {
        consumed++
        active--
        return read()
      }
      return response
    },
  })
  assert.equal(peak, 3)
  assert.equal(consumed, images.length)
  assert.deepEqual(requests.sort(), images.map((image) => image.url).sort())
  assert(results.every((result) => result.ok && result.cache === "REVALIDATED"))
})

test("retries transient failures, rejects error images and continues after failures", async () => {
  const urls = [
    "retry",
    "missing",
    "html",
    "legacy-error",
    "stale",
    "legacy-success",
    "fresh",
  ]
  const calls = {}
  const results = await warmImages(
    urls.map((name) => ({
      url: `https://svg.tscircuit.com/?code=${name}`,
      pages: [],
    })),
    {
      attempts: 2,
      retryDelayMs: 0,
      fetchImage: async (url) => {
        const name = new URL(url).searchParams.get("code")
        calls[name] = (calls[name] ?? 0) + 1
        if (name === "retry" && calls[name] === 1) throw new Error("network")
        return new Response("body", {
          status: name === "missing" ? 404 : 200,
          headers: {
            "Content-Type": name === "html" ? "text/html" : "image/svg+xml",
            "Cache-Control":
              name === "legacy-success"
                ? "public, immutable"
                : "public, max-age=86400",
            ...(name === "legacy-error" || name === "legacy-success"
              ? {}
              : {
                  "CDN-Cache-Control": "public, stale-while-revalidate=604800",
                }),
            "x-vercel-cache": name === "stale" ? "STALE" : "HIT",
          },
        })
      },
    },
  )
  assert.deepEqual(
    results.map((result) => result.ok),
    [true, false, false, false, false, true, true],
  )
  assert.equal(calls.retry, 2)
  assert.equal(calls.missing, 1)
  assert.equal(calls.stale, 2)
  assert.match(results[3].error, /error image/)
  assert.match(results[4].error, /stale fallback/)
})

test("rejects uncached or empty image responses and invalid worker settings", async () => {
  for (const headers of [
    { "Cache-Control": "no-store" },
    { "Cache-Control": "public, immutable", "CDN-Cache-Control": "no-store" },
  ]) {
    const results = await warmImages(
      [{ url: "https://svg.tscircuit.com/?code=bad", pages: [] }],
      {
        attempts: 1,
        fetchImage: async () =>
          new Response("error", {
            headers: { "Content-Type": "image/png", ...headers },
          }),
      },
    )
    assert.equal(results[0].ok, false)
  }
  const empty = await warmImages(
    [{ url: "https://docs.tscircuit.com/empty.png", pages: [] }],
    {
      attempts: 1,
      fetchImage: async () =>
        new Response("", { headers: { "Content-Type": "image/png" } }),
    },
  )
  assert.match(empty[0].error, /Empty image/)
  await assert.rejects(warmImages([], { concurrency: 0 }), /positive integer/)
})
