import { createRequire } from "node:module"
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

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
const page = await readFile(
  resolve(root, "docs/guides/tscircuit-essentials/3d-printer-assembly.mdx"),
  "utf8",
)
const code = page.match(/code=\{`([\s\S]*?)`\}/)?.[1]
if (!code)
  throw new Error("Printer guide has no complete CircuitPreview example")
const scratch = await mkdtemp(
  resolve(root, "codetestingplayground/printer-preview-"),
)
try {
  const entry = resolve(scratch, "printer.tsx")
  await writeFile(entry, code.replace('"tscircuit"', JSON.stringify(coreEntry)))
  const { default: Printer } = await import(pathToFileURL(entry).href)
  const circuit = new RootCircuit()
  circuit.add(Printer())
  await circuit.renderUntilSettled()
  const json = circuit.getCircuitJson()
  await writeFile(
    resolve(root, "src/data/assembly-previews/3d-printer-assembly.json"),
    `${JSON.stringify(json, null, 2)}\n`,
  )
  const imageDirectory = resolve(root, "static/img/guides")
  await mkdir(imageDirectory, { recursive: true })
  const boardCadIds = new Set(
    json
      .filter((e: any) => e.type === "pcb_component")
      .map((e: any) => e.source_component_id),
  )
  const trayId = json.find(
    (e: any) => e.type === "source_component" && e.name === "TRAY",
  )?.source_component_id
  const boardJson = json.filter(
    (e: any) =>
      e.type !== "cad_component" ||
      boardCadIds.has(e.source_component_id) ||
      e.source_component_id === trayId,
  )
  for (const [name, elements, camPos, lookAt] of [
    ["3d-printer-assembly", json, [440, 350, -590], [0, 95, 0]],
    ["3d-printer-controller", boardJson, [90, 115, -270], [0, 0, -145]],
  ] as const) {
    const glb = await convertCircuitJsonToGltf(elements, {
      format: "glb",
      includeModels: true,
      showBoundingBoxes: false,
      boardTextureResolution: 2048,
    })
    const png = await renderGLTFToPNGFromGLB(Buffer.from(glb), {
      width: 1200,
      height: 1000,
      camPos,
      lookAt,
      fov: 40,
      grid: false,
      backgroundColor: [1, 1, 1],
    })
    await writeFile(resolve(imageDirectory, `${name}.png`), png)
    console.log(`Generated ${name}.png`)
  }
} finally {
  await rm(scratch, { recursive: true, force: true })
}
