import { writeFile } from "node:fs/promises"
import { assemblyDrawingCode } from "../src/data/drawing-previews/assembly-code"
import { fidgetFsMap } from "../src/data/drawing-previews/fidget-counter/example"
import { harnessExamples } from "../src/data/drawing-previews/harness-examples"

// Run after the matching SVG service release, or set SVG_BASE_URL to its PR preview.
// Pass page names to render only those, e.g. `motor-cable usb-cable`.
const baseUrl = process.env.SVG_BASE_URL ?? "https://svg.tscircuit.com/"
const only = process.argv.slice(2)
const drawings: [
  page: string,
  fileName: string,
  fsMap: Record<string, string>,
][] = [
  ["explosion", "explosion", { "index.circuit.tsx": assemblyDrawingCode }],
  [
    "assembled-pose",
    "assembled-pose",
    { "index.circuit.tsx": assemblyDrawingCode },
  ],
  ["fidget-explosion", "fidget-explosion", fidgetFsMap],
  ...Object.values(harnessExamples).flatMap(({ code, pages }) =>
    pages.map(
      ({ name }) =>
        [name, `harness-${name}`, { "index.circuit.tsx": code }] as [
          string,
          string,
          Record<string, string>,
        ],
    ),
  ),
]
for (const [name, fileName, fsMap] of drawings) {
  if (only.length && !only.includes(name)) continue
  const url = new URL(baseUrl)
  url.searchParams.set("svg_type", "drawing")
  url.searchParams.set("drawing", name)
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fs_map: fsMap,
      main_component_path: "index.circuit.tsx",
    }),
  })
  if (!response.ok)
    throw new Error(`${name}: ${response.status} ${await response.text()}`)
  if (!response.headers.get("Content-Type")?.includes("image/svg+xml"))
    throw new Error(`${name}: expected an SVG response`)
  const svg = await response.text()
  await writeFile(
    new URL(
      `../static/img/elements/assembly-drawing-${fileName}.svg`,
      import.meta.url,
    ),
    svg,
  )
  console.log(`${name}: ${svg.length} bytes`)
}
