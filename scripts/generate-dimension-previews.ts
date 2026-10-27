/**
 * Regenerate the dimension examples, Circuit JSON, and drawing SVGs.
 * Usage: bun scripts/generate-dimension-previews.ts /path/to/runtime-project
 * The runtime project needs @tscircuit/core >= 0.0.2209, @tscircuit/props >=
 * 0.0.712, @tscircuit/circuit-json-to-drawing >= 0.0.4, circuit-json-to-gltf,
 * poppygl, jscad-fiber, and react installed.
 * Afterwards: bunx biome format --write src/data/drawing-previews codetestingplayground/drawing-docs
 */
import { strict as assert } from "node:assert"
import { mkdtemp, rm, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import {
  pcbDimensionsCode,
  cadDimensionsCode,
} from "../src/data/drawing-previews/dimensions-code"

if (!process.argv[2]) throw new Error("Provide the runtime project directory")
const runtimeUrl = pathToFileURL(resolve(process.argv[2], "package.json")).href
const moduleUrl = (name: string) => import.meta.resolve(name, runtimeUrl)
const { RootCircuit } = await import(moduleUrl("@tscircuit/core"))
const { createElement } = await import(moduleUrl("react"))
const { convertCircuitJsonToGltf } = await import(
  moduleUrl("circuit-json-to-gltf")
)
const { convertCircuitJsonToDrawingSvg } = await import(
  moduleUrl("@tscircuit/circuit-json-to-drawing")
)
const { createSceneFromGLTF, loadGLTFWithResourcesFromURL } = await import(
  moduleUrl("poppygl")
)
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const playground = resolve(root, "codetestingplayground/drawing-docs")
const scratch = await mkdtemp(resolve(playground, "dimension-preview-"))
try {
  for (const [name, code, expected] of [
    ["pcb", pcbDimensionsCode, ["30 mm", "14 mm", "8 mm", "50 mm", "30 mm"]],
    ["cad", cadDimensionsCode, ["3 mm", "30 mm", "8 mm", "7 mm"]],
  ] as const) {
    await writeFile(
      resolve(playground, `dimensions-${name}.circuit.tsx`),
      `${code}\n`,
    )
    const source = code.replace(
      /"(@tscircuit\/core|jscad-fiber\/model)"/g,
      (_, name) => JSON.stringify(moduleUrl(name)),
    )
    const entry = resolve(scratch, `${name}.tsx`)
    await writeFile(entry, source)
    const { default: Example } = await import(pathToFileURL(entry).href)
    const circuit = new RootCircuit()
    circuit.add(createElement(Example))
    await circuit.renderUntilSettled()
    const json = circuit.getCircuitJson()
    assert.deepEqual(
      json
        .filter((e: any) => e.type === "drawing_dimension_line")
        .map((e: any) => e.text),
      expected,
    )
    // Each example selects its only board or CAD part, so the whole non-drawing
    // geometry is the scene for that example's single view.
    const glb = await convertCircuitJsonToGltf(
      json.filter((e: any) => !e.type.startsWith("drawing_")),
      { format: "glb", includeModels: true, showBoundingBoxes: false },
    )
    const { gltf, resources } = await loadGLTFWithResourcesFromURL(
      `data:model/gltf-binary;base64,${Buffer.from(glb).toString("base64")}`,
    )
    const scene = createSceneFromGLTF(gltf, resources)
    const svg = await convertCircuitJsonToDrawingSvg(json, {
      resolveScene: async () => scene,
    })
    await writeFile(
      resolve(root, `src/data/drawing-previews/dimensions-${name}.json`),
      `${JSON.stringify(json, null, 2)}\n`,
    )
    await writeFile(
      resolve(
        root,
        `static/img/elements/assembly-drawing-dimension-${name}.svg`,
      ),
      svg,
    )
    console.log(`${name}: ${expected.join(", ")}`)
  }
} finally {
  await rm(scratch, { recursive: true, force: true })
}
