import { createRequire } from "node:module"
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import {
  motorBracketFiles,
  motorControllerFiles,
} from "../src/data/advanced-assembly/examples"

// Usage: bun scripts/generate-advanced-assembly-previews.ts /path/to/core
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
await mkdir(resolve(root, "codetestingplayground"), { recursive: true })
const scratch = await mkdtemp(
  resolve(root, "codetestingplayground/advanced-assembly-"),
)
try {
  for (const [name, files, zOffset] of [
    ["bracket", motorBracketFiles, 0],
    ["controller", motorControllerFiles, -14.8],
  ] as const) {
    const directory = resolve(scratch, name)
    await mkdir(directory)
    for (const [filename, source] of Object.entries(files)) {
      await writeFile(
        resolve(directory, filename),
        source.replaceAll('"tscircuit"', JSON.stringify(coreEntry)),
      )
    }
    const { default: Example } = await import(
      pathToFileURL(resolve(directory, "index.tsx")).href
    )
    const circuit = new RootCircuit()
    circuit.add(Example())
    await circuit.renderUntilSettled()
    const json = circuit.getCircuitJson()
    await writeFile(
      resolve(
        root,
        `src/data/assembly-previews/advanced-assembly-${name}.json`,
      ),
      JSON.stringify(json, null, 2) + "\n",
    )
    const glb = await convertCircuitJsonToGltf(json, {
      format: "glb",
      includeModels: true,
      showBoundingBoxes: false,
      boardTextureResolution: 2048,
    })
    const png = await renderGLTFToPNGFromGLB(Buffer.from(glb), {
      width: 1000,
      height: 900,
      camPos: [-130, 115 + zOffset, 145],
      lookAt: [10, 24 + zOffset, 20],
      fov: 40,
      grid: false,
      backgroundColor: [1, 1, 1],
    })
    await mkdir(resolve(root, "static/img/guides"), { recursive: true })
    await writeFile(
      resolve(root, `static/img/guides/advanced-assembly-${name}.png`),
      png,
    )
    console.log(`Generated advanced-assembly-${name} JSON and PNG`)
  }
} finally {
  await rm(scratch, { recursive: true, force: true })
}
