import { spawnSync } from "node:child_process"
import { createRequire } from "node:module"
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import {
  drcFiles,
  pourFiles,
  powerWidthFiles,
  testPointsFiles,
} from "../src/data/post-routing-hook/examples"

// Usage: bun scripts/generate-post-routing-hook-previews.ts /path/to/core
// Needs a core checkout with pcbPostRoutingHook (tscircuit/core#4657).
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
  resolve(root, "codetestingplayground/post-routing-hook-"),
)
try {
  for (const [name, files] of [
    ["test-points", testPointsFiles],
    ["power-width", powerWidthFiles],
    ["pour", pourFiles],
    ["drc", drcFiles],
  ] as const) {
    const directory = resolve(scratch, name)
    await mkdir(directory)
    for (const [filename, source] of Object.entries(files)) {
      await writeFile(
        resolve(directory, filename.replace(".circuit.tsx", ".tsx")),
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
      resolve(root, `src/data/post-routing-hook/${name}.json`),
      JSON.stringify(json, null, 2) + "\n",
    )
    const glb = await convertCircuitJsonToGltf(json, {
      format: "glb",
      includeModels: true,
      showBoundingBoxes: false,
      boardTextureResolution: 2048,
    })
    // From above and in front, so silkscreen reads the right way round
    const png = await renderGLTFToPNGFromGLB(Buffer.from(glb), {
      width: 1000,
      height: 700,
      camPos: [0, 30, -10],
      lookAt: [0, 0, 0],
      grid: false,
      backgroundColor: [1, 1, 1],
    })
    await mkdir(resolve(root, "static/img/post-routing-hook"), {
      recursive: true,
    })
    await writeFile(
      resolve(root, `static/img/post-routing-hook/${name}-3d.png`),
      png,
    )
    const errors = json
      .filter((e: { type: string }) => e.type.endsWith("_error"))
      .map((e: { message?: string }) => e.message)
    console.log(`Generated ${name}: ${errors.length} error(s)`, errors)
  }
} finally {
  await rm(scratch, { recursive: true, force: true })
}

// The repo's format check covers the generated JSON too
spawnSync(
  "bunx",
  ["biome", "format", "--write", "src/data/post-routing-hook"],
  {
    cwd: root,
    stdio: "inherit",
  },
)
