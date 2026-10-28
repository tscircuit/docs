/**
 * Regenerate the test-point preview data used by the autoroutingphase docs.
 * Usage: bun scripts/generate-autoroutingphase-previews.ts /path/to/tscircuit/core
 * The core checkout must have dependencies installed and support addTestPoints
 * on <autoroutingphase /> (0.0.2221 or later).
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const coreDirectory = process.argv[2]
if (!coreDirectory)
  throw new Error("Provide the path to a tscircuit/core checkout")
const { RootCircuit } = await import(
  pathToFileURL(resolve(coreDirectory, "lib/index.ts")).href
)
await import(
  pathToFileURL(resolve(coreDirectory, "lib/register-catalogue.ts")).href
)

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const page = await readFile(
  resolve(repoRoot, "docs/elements/autoroutingphase.mdx"),
  "utf8",
)
const code = page.match(/export const generateTestPointsCode = `([\s\S]*?)`\n/)
if (!code) throw new Error("generateTestPointsCode not found")

const scratch = resolve(repoRoot, "codetestingplayground/autoroutingphase-tmp")
await mkdir(scratch, { recursive: true })
try {
  const file = resolve(scratch, "test-points.tsx")
  await writeFile(file, code[1])
  const { default: Example } = await import(pathToFileURL(file).href)
  const circuit = new RootCircuit()
  circuit.add(<Example />)
  await circuit.renderUntilSettled()
  const output = resolve(repoRoot, "src/data/autoroutingphase-previews")
  await mkdir(output, { recursive: true })
  await writeFile(
    resolve(output, "generate-test-points.json"),
    `${JSON.stringify(circuit.getCircuitJson())}\n`,
  )
} finally {
  await rm(scratch, { recursive: true, force: true })
}
