/** Generate the shared mounting examples' JSON and PNGs from their editor sources.
 * Usage: bun scripts/generate-mounting-previews.ts /path/to/core
 * Requires core with CSS face mounts and assembly.bolt (0.0.2260 is validated).
 */
import { createRequire } from "node:module"
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import {
  bearingMountFiles,
  relativeModuleFiles,
  pcbFasteningCode,
} from "../src/data/assembly-mounting/examples"

const coreDirectory = process.argv[2]
if (!coreDirectory)
  throw new Error("Provide the path to a tscircuit/core checkout")
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const coreEntry = pathToFileURL(resolve(coreDirectory, "lib/index.ts")).href
const { RootCircuit } = await import(coreEntry)
await import(
  pathToFileURL(resolve(coreDirectory, "lib/register-catalogue.ts")).href
)
const require = createRequire(resolve(coreDirectory, "package.json"))
const { convertCircuitJsonToGltf } = await import(
  pathToFileURL(require.resolve("circuit-json-to-gltf")).href
)
const { renderGLTFToPNGFromGLB } = await import(
  pathToFileURL(require.resolve("poppygl")).href
)
const output = resolve(root, "src/data/assembly-previews")
const imageDirectory = resolve(root, "static/img/elements")
await mkdir(output, { recursive: true })
await mkdir(imageDirectory, { recursive: true })
const scratch = await mkdtemp(
  resolve(root, "codetestingplayground/mounting-preview-"),
)
const modelAssets = new Map<string, Uint8Array>()
const examples = [
  {
    name: "assembly-bearing-mount",
    files: bearingMountFiles,
    camera: [65, 50, 75],
    target: [0, 4, 0],
  },
  {
    name: "assembly-relative-module",
    files: relativeModuleFiles,
    camera: [100, 75, 100],
    target: [-4, 9, -2],
  },
  {
    name: "assembly-bolt-board",
    files: { "index.tsx": pcbFasteningCode },
    camera: [-80, 80, 105],
    target: [-10, 0, 5],
  },
] as const
try {
  for (const example of examples) {
    const directory = resolve(scratch, example.name)
    await mkdir(directory)
    for (const [filename, source] of Object.entries(example.files))
      await writeFile(
        resolve(directory, filename),
        source.replaceAll('"tscircuit"', JSON.stringify(coreEntry)),
      )
    const { default: Example } = await import(
      pathToFileURL(resolve(directory, "index.tsx")).href
    )
    const circuit = new RootCircuit()
    circuit.add(Example())
    await circuit.renderUntilSettled()
    const json = circuit.getCircuitJson()
    await writeFile(
      resolve(output, `${example.name}.json`),
      JSON.stringify(json, null, 2) + "\n",
    )
    // The exporter can fall back to a placeholder on asset failures. Fail here
    // so a broken model URL cannot silently produce a published docs image.
    for (const cad of json.filter(
      (record: any) => record.type === "cad_component",
    )) {
      const url = cad.model_glb_url
      if (!url || !/^https?:/.test(url) || modelAssets.has(url)) continue
      const response = await fetch(url)
      if (!response.ok)
        throw new Error(`Model asset ${url}: HTTP ${response.status}`)
      const bytes = new Uint8Array(await response.arrayBuffer())
      if (new TextDecoder().decode(bytes.slice(0, 4)) !== "glTF")
        throw new Error(`Model asset ${url} is not a GLB`)
      modelAssets.set(url, bytes)
    }
    const renderJson = json.map((record: any) => {
      const bytes =
        record.type === "cad_component" && modelAssets.get(record.model_glb_url)
      return bytes
        ? {
            ...record,
            model_glb_url: `data:model/gltf-binary;base64,${Buffer.from(bytes).toString("base64")}`,
          }
        : record
    })
    const glb = await convertCircuitJsonToGltf(renderJson, {
      format: "glb",
      includeModels: true,
      showBoundingBoxes: false,
      boardTextureResolution: 1024,
    })
    for (const [suffix, camera] of example.name === "assembly-bolt-board"
      ? ([
          ["", example.camera],
          ["-bottom", [-75, -70, 90]],
        ] as const)
      : ([["", example.camera]] as const)) {
      const png = await renderGLTFToPNGFromGLB(Buffer.from(glb), {
        width: 1000,
        height: 750,
        camPos: camera,
        lookAt: example.target,
        fov: 35,
        grid: false,
        realistic: true,
        backgroundColor: [1, 1, 1],
      })
      await writeFile(
        resolve(imageDirectory, `${example.name}${suffix}.png`),
        png,
      )
    }
    console.log(`Generated ${example.name} JSON and PNG`)
  }
} finally {
  await rm(scratch, { recursive: true, force: true })
}
