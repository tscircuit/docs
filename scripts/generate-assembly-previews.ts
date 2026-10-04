/**
 * Regenerate preview data from the CircuitPreview source in the assembly docs.
 * Usage: bun scripts/generate-assembly-previews.ts /path/to/tscircuit/core
 * The core checkout must have dependencies installed and support modelUrl on assembly elements.
 */
import {
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { createRequire } from "node:module"
import { fileURLToPath, pathToFileURL } from "node:url"

const coreDirectory = process.argv[2]
if (!coreDirectory)
  throw new Error("Provide the path to a tscircuit/core checkout")
const coreEntry = pathToFileURL(resolve(coreDirectory, "lib/index.ts")).href
const { RootCircuit } = await import(coreEntry)
await import(
  pathToFileURL(resolve(coreDirectory, "lib/register-catalogue.ts")).href
)
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const docsRoot = resolve(repoRoot, "docs")
const output = resolve(repoRoot, "src/data/assembly-previews")
const playground = resolve(repoRoot, "codetestingplayground")
await mkdir(playground, { recursive: true })
const scratch = await mkdtemp(resolve(playground, "assembly-preview-"))
await mkdir(output, { recursive: true })
try {
  const pages = [
    ...(await readdir(resolve(docsRoot, "elements")))
      .filter((name) => name.startsWith("assembly-") && name.endsWith(".mdx"))
      .map((name) => `elements/${name}`),
    "guides/tscircuit-essentials/mounting-3d-models.mdx",
  ]
  for (const page of pages) {
    const source = await readFile(resolve(docsRoot, page), "utf8")
    let index = 0
    for (const match of source.matchAll(/code=\{`([\s\S]*?)`\}/g)) {
      const name = `${page.split("/").pop()!.replace(".mdx", "")}-${++index}`
      const code = match[1]
        .replace(/\\`/g, "`")
        .replace(/\\\$\{/g, "${")
        .replace(/"(?:@tscircuit\/core|tscircuit)"/g, JSON.stringify(coreEntry))
      const temporarySource = resolve(scratch, `${name}.tsx`)
      await writeFile(temporarySource, code)
      const { default: Example } = await import(
        pathToFileURL(temporarySource).href
      )
      const circuit = new RootCircuit()
      circuit.add(Example())
      await circuit.renderUntilSettled()
      await writeFile(
        resolve(output, `${name}.json`),
        `${JSON.stringify(circuit.getCircuitJson(), null, 2)}\n`,
      )
      const imagePath = source.match(/threeDImageUrl="([^"]+)"/)?.[1]
      if (imagePath && index === 1) {
        const require = createRequire(resolve(coreDirectory, "package.json"))
        const { convertCircuitJsonToGltf } = await import(
          pathToFileURL(require.resolve("circuit-json-to-gltf")).href
        )
        const { renderGLTFToPNGFromGLB } = await import(
          pathToFileURL(require.resolve("poppygl")).href
        )
        const glb = await convertCircuitJsonToGltf(circuit.getCircuitJson(), {
          format: "glb",
          includeModels: true,
          showBoundingBoxes: false,
          boardTextureResolution: 512,
        })
        const png = await renderGLTFToPNGFromGLB(Buffer.from(glb), {
          width: 800,
          height: 800,
          camPos: [95, 35, 95],
          lookAt: [0, -25, 0],
          fov: 40,
          grid: false,
          backgroundColor: [1, 1, 1],
        })
        await writeFile(resolve(repoRoot, `static${imagePath}`), png)
      }
      console.log(`Generated ${name}.json`)
    }
    if (index === 0) throw new Error(`No CircuitPreview examples in ${page}`)
  }
} finally {
  await rm(scratch, { recursive: true, force: true })
}
