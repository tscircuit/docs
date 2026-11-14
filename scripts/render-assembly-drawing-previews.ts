import { writeFile } from "node:fs/promises"
import { assemblyDrawingCode } from "../src/data/drawing-previews/assembly-code"
import { fidgetFsMap } from "../src/data/drawing-previews/fidget-counter/example"

// Run after the matching SVG service release, or set SVG_BASE_URL to its PR preview.
const baseUrl = process.env.SVG_BASE_URL ?? "https://svg.tscircuit.com/"
for (const [name, fsMap] of [
  ["explosion", { "index.circuit.tsx": assemblyDrawingCode }],
  ["assembled-pose", { "index.circuit.tsx": assemblyDrawingCode }],
  ["fidget-explosion", fidgetFsMap],
] as const) {
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
      `../static/img/elements/assembly-drawing-${name}.svg`,
      import.meta.url,
    ),
    svg,
  )
  console.log(`${name}: ${svg.length} bytes`)
}
