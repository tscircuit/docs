/**
 * Regenerate the crosshatch preview from its documented source until the hosted
 * evaluator supports crosshatch. Requires core with copper-pour-solver >=0.0.66.
 * Usage: bun scripts/generate-crosshatch-preview.ts /path/to/tscircuit/core
 */
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const coreDirectory = process.argv[2]
if (!coreDirectory) throw new Error("Provide a tscircuit/core checkout path")
const { RootCircuit } = await import(
  pathToFileURL(resolve(coreDirectory, "lib/index.ts")).href
)
await import(
  pathToFileURL(resolve(coreDirectory, "lib/register-catalogue.ts")).href
)
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const source = await readFile(
  resolve(repoRoot, "docs/elements/copperpour.mdx"),
  "utf8",
)
const code = source.match(
  /circuitJson=\{crosshatchPreview\} code=\{`([\s\S]*?)`\}/,
)?.[1]
if (!code) throw new Error("Crosshatch CircuitPreview source not found")
const scratch = await mkdtemp(
  resolve(repoRoot, "codetestingplayground/crosshatch-preview-"),
)
try {
  const entry = resolve(scratch, "index.tsx")
  await writeFile(entry, code)
  const { default: Example } = await import(pathToFileURL(entry).href)
  const circuit = new RootCircuit()
  circuit.add(Example())
  await circuit.renderUntilSettled()
  const pours = circuit.db.pcb_copper_pour.list()
  if (!pours.some((pour) => pour.brep_shape?.inner_rings.length > 10))
    throw new Error("Expected crosshatch openings; update the core checkout")
  await writeFile(
    resolve(repoRoot, "src/data/crosshatch-preview.json"),
    `${JSON.stringify(circuit.getCircuitJson(), null, 2)}\n`,
  )
} finally {
  await rm(scratch, { recursive: true, force: true })
}
