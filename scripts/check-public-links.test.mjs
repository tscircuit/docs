import { afterEach, expect, test } from "bun:test"
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { inspectBuild, regressions } from "./check-public-links.mjs"

const directories = []
afterEach(async () => {
  await Promise.all(
    directories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  )
})

async function build(files) {
  const directory = await mkdtemp(path.join(tmpdir(), "docs-links-"))
  directories.push(directory)
  for (const [file, html] of Object.entries(files)) {
    await mkdir(path.dirname(path.join(directory, file)), { recursive: true })
    await writeFile(path.join(directory, file), html)
  }
  return inspectBuild(directory)
}

test("accepts existing routes, encoded heading links, downloads and external links", async () => {
  const result = await build({
    "index.html":
      '<a href="/guide#r%C3%A9sum%C3%A9">Guide</a><a href="/guide.md">Source</a><a href="https://example.com">External</a>',
    "guide/index.html": '<article><h2 id="résumé">Résumé</h2></article>',
    "guide.md": "# Guide",
  })
  expect(result.broken).toEqual([])
  expect(result.routes["/guide"].anchors).toEqual(["résumé"])
  expect(regressions(result, result)).toEqual([])
})

test("detects removed routes, deep links, Markdown endpoints and changed redirects", async () => {
  const before = await build({
    "index.html": '<article><h2 id="start">Start</h2></article>',
    "old/index.html": '<meta http-equiv="refresh" content="0;URL=/">',
    "guide/index.html": "<h1>Guide</h1>",
    "guide.md": "# Guide",
  })
  const after = await build({
    "index.html": '<article><h2 id="begin">Begin</h2></article>',
    "old/index.html": '<meta http-equiv="refresh" content="0;URL=/new">',
  })
  expect(regressions(before, after)).toEqual(
    expect.arrayContaining([
      "Removed route: /guide",
      "Removed anchor: /#start",
      "Removed Markdown endpoint: /guide.md",
      "Changed redirect: /old",
    ]),
  )
})

test("rejects new broken internal routes and fragment links without masking existing failures", async () => {
  const before = await build({
    "index.html": '<a href="/known-broken">Old</a>',
  })
  const after = await build({
    "index.html":
      '<a href="/known-broken">Old</a><a href="/missing">New</a><a href="#missing">Heading</a>',
  })
  expect(regressions(before, after)).toEqual([
    "New broken internal link: / -> #missing",
    "New broken internal link: / -> /missing",
  ])
})
