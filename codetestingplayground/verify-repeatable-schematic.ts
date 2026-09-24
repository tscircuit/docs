import { spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import { existsSync, readFileSync, rmSync } from "node:fs"
import { delimiter, dirname, join } from "node:path"

const projectRoot = import.meta.dir
const distDirectory = join(projectRoot, "dist", "esp32-wifi-test-board")
const cacheDirectory = join(projectRoot, ".tscircuit")
const schematicPath = join(distDirectory, "schematic.svg")
const circuitPath = join(distDirectory, "circuit.json")
const snapshotPath = join(
  projectRoot,
  "__snapshots__",
  "esp32-wifi-test-board.circuit-schematic.snap.svg",
)
const pcbSnapshotPath = join(
  projectRoot,
  "__snapshots__",
  "esp32-wifi-test-board.circuit-pcb.snap.svg",
)

const run = (args: string[]) => {
  const result = spawnSync(process.execPath, args, {
    cwd: projectRoot,
    env: {
      ...process.env,
      PATH: `${dirname(process.execPath)}${delimiter}${process.env.PATH ?? ""}`,
    },
    shell: false,
    stdio: "inherit",
  })
  if (result.error) throw result.error
  if (result.status !== 0) {
    throw new Error(
      `Command failed with exit ${result.status}: ${args.join(" ")}`,
    )
  }
}

const hash = (path: string) =>
  createHash("sha256").update(readFileSync(path)).digest("hex")

const assertStable = (path: string, reference: { value: string }) => {
  const current = hash(path)
  if (reference.value === "") reference.value = current
  if (current !== reference.value) {
    throw new Error(
      `Nondeterministic output: ${path}\nexpected=${reference.value}\nactual=${current}`,
    )
  }
  return current
}

const cleanGeneratedFiles = () => {
  rmSync(join(projectRoot, "dist"), { recursive: true, force: true })
  rmSync(cacheDirectory, { recursive: true, force: true })
}

const assertNoTrailingWhitespace = (path: string) => {
  if (/[ \t]+\r?$/m.test(readFileSync(path, "utf8"))) {
    throw new Error(`Trailing whitespace: ${path}`)
  }
}

const optionValue = (name: string) => {
  const index = process.argv.indexOf(name)
  return index === -1 ? undefined : process.argv[index + 1]
}

const topologyOnly = process.argv.includes("--topology-only")
const runs = Number(optionValue("--runs") ?? 20)
if (!Number.isInteger(runs) || runs < 20) {
  throw new Error("--runs must be an integer of at least 20")
}

if (topologyOnly) {
  run(["run", "build"])
  run(["test", "./esp32-wifi-test-board.test.ts"])
  console.log("topology, footprint, MPN, and schematic-only checks passed")
  process.exit(0)
}

if (existsSync(pcbSnapshotPath)) {
  throw new Error("Schematic-only project contains a PCB snapshot")
}

const buildReference = { value: "" }
const snapshotReference = { value: "" }
for (let index = 0; index < runs; index += 1) {
  cleanGeneratedFiles()
  run([
    "run",
    "run-tsci.ts",
    "build",
    "--disable-pcb",
    "--schematic-only",
    "--disable-parts-engine",
  ])
  if (!existsSync(schematicPath) || !existsSync(circuitPath)) {
    throw new Error("Schematic-only build did not produce its declared outputs")
  }
  if (existsSync(join(distDirectory, "pcb.svg"))) {
    throw new Error("Schematic-only build produced a PCB artifact")
  }
  const buildHash = assertStable(schematicPath, buildReference)
  run([
    "run",
    "run-tsci.ts",
    "snapshot",
    "--ci",
    "--schematic-only",
    "--disable-parts-engine",
  ])
  assertNoTrailingWhitespace(snapshotPath)
  const snapshotHash = assertStable(snapshotPath, snapshotReference)
  console.log(
    `run=${String(index + 1).padStart(2, "0")} build=${buildHash} snapshot=${snapshotHash}`,
  )
}

console.log(`${runs} clean builds produced byte-identical declared SVG output`)
