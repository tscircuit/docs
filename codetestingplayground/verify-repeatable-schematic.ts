import { spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import { existsSync, readFileSync, rmSync } from "node:fs"
import { delimiter, dirname, join } from "node:path"

const projectRoot = import.meta.dir
const distDirectory = join(projectRoot, "dist", "esp32-wifi-test-board")
const cacheDirectory = join(projectRoot, ".tscircuit", "cache")
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
  const result = spawnSync("bun", args, {
    cwd: projectRoot,
    env: {
      ...process.env,
      PATH: `${dirname(process.execPath)}${delimiter}${process.env.PATH ?? ""}`,
    },
    stdio: "inherit",
    shell: true,
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
    throw new Error(`Nondeterministic output: ${path}`)
  }
}

const cleanGeneratedFiles = () => {
  rmSync(join(projectRoot, "dist"), { recursive: true, force: true })
  rmSync(cacheDirectory, { recursive: true, force: true })
}

const schematicBuildReference = { value: "" }
for (let index = 0; index < 10; index += 1) {
  cleanGeneratedFiles()
  run(["run", "build"])
  if (!existsSync(schematicPath) || !existsSync(circuitPath)) {
    throw new Error("Schematic-only build did not produce its declared outputs")
  }
  if (existsSync(join(distDirectory, "pcb.svg"))) {
    throw new Error("Schematic-only build produced a PCB artifact")
  }
  assertStable(schematicPath, schematicBuildReference)
}

if (existsSync(pcbSnapshotPath)) {
  throw new Error("Schematic-only project contains a PCB snapshot")
}

const snapshotReference = { value: "" }
for (let index = 0; index < 10; index += 1) {
  cleanGeneratedFiles()
  run(["run", "snapshot"])
  const snapshot = readFileSync(snapshotPath, "utf8")
  if (/[ \t]+\r?$/m.test(snapshot)) {
    throw new Error("Schematic snapshot contains trailing whitespace")
  }
  assertStable(snapshotPath, snapshotReference)
}

console.log("10 schematic builds and 10 schematic snapshots were deterministic")
