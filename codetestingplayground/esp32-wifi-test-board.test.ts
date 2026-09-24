import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

const projectRoot = import.meta.dir
const source = readFileSync(
  join(projectRoot, "esp32-wifi-test-board.circuit.tsx"),
  "utf8",
)
const docsSource = readFileSync(
  join(
    projectRoot,
    "..",
    "docs",
    "tutorials",
    "esp32-wifi-test-board-schematic.mdx",
  ),
  "utf8",
)
const packageJson = JSON.parse(
  readFileSync(join(projectRoot, "package.json"), "utf8"),
) as {
  dependencies?: Record<string, string>
  scripts?: Record<string, string>
}
const configJson = JSON.parse(
  readFileSync(join(projectRoot, "tscircuit.config.json"), "utf8"),
) as { includeBoardFiles?: string[]; mainEntrypoint?: string }
const configSource = readFileSync(
  join(projectRoot, "tscircuit.config.ts"),
  "utf8",
)
const runTsciSource = readFileSync(join(projectRoot, "run-tsci.ts"), "utf8")
const footprintData = JSON.parse(
  readFileSync(join(projectRoot, "deterministic-footprints.json"), "utf8"),
) as Record<string, unknown[]>

const getComponentBlock = (name: string) =>
  source.match(
    new RegExp(`<resistor\\s+[\\s\\S]*?name="${name}"[\\s\\S]*?/>`),
  )?.[0] ?? ""

const getTransistorBlock = (name: string) =>
  source.match(
    new RegExp(`<transistor\\s+[\\s\\S]*?name="${name}"[\\s\\S]*?/>`),
  )?.[0] ?? ""

test("uses a real USB-C sink with independent CC pull-downs", () => {
  expect(source).toContain('from "@tsci/seveibar.smd-usb-c"')
  expect(source).toContain("CC1")
  expect(source).toContain("CC2")
  expect(source).toContain('pin11: "SUSPENDb"')
  expect(source).toContain('pin12: "SUSPEND"')
  expect((source.match(/resistance="5\.1k"/g) ?? []).length).toBe(2)
  expect(source).toContain("C165948")
  expect(source).toContain("C25905")
  expect(packageJson.dependencies?.["@tsci/seveibar.smd-usb-c"]).toBe("0.0.2")
})

test("keeps exact resistor supplier footprints and assembly data", () => {
  const expectedParts = {
    R1: ["C25905", "0402WGF5101TCE"],
    R2: ["C25905", "0402WGF5101TCE"],
    R7: ["C11702", "0402WGF1001TCE"],
    R8: ["C11702", "0402WGF1001TCE"],
  }

  for (const [name, [part, manufacturerPartNumber]] of Object.entries(
    expectedParts,
  )) {
    const block = getComponentBlock(name)
    expect(block).toContain(`footprint="jlcpcb:${part}"`)
    expect(block).toContain(`supplierPartNumbers={jlc("${part}")}`)
    expect(block).toContain(
      `manufacturerPartNumber="${manufacturerPartNumber}"`,
    )
  }
  expect(source).not.toContain('footprint="0402"')
})

test("keeps the exact C2150 transistor supplier MPNs", () => {
  const expectedPartNumber = "SS8050(RANGE:200-350)"
  for (const name of ["Q1", "Q2"]) {
    const block = getTransistorBlock(name)
    expect(block).toContain(`manufacturerPartNumber="${expectedPartNumber}"`)
  }
  expect(source).not.toContain('manufacturerPartNumber="SS8050"')
  expect(docsSource).not.toContain('manufacturerPartNumber="SS8050"')
  expect(docsSource).toContain(`manufacturerPartNumber="${expectedPartNumber}"`)
})

test("keeps the declared project schematic-only", () => {
  expect(
    existsSync(
      join(
        projectRoot,
        "__snapshots__",
        "esp32-wifi-test-board.circuit-pcb.snap.svg",
      ),
    ),
  ).toBe(false)
  expect(packageJson.scripts?.build).toContain("--disable-pcb")
  expect(packageJson.scripts?.build).toContain("--schematic-only")
  expect(packageJson.scripts?.snapshot).toContain("--schematic-only")
  expect(packageJson.scripts?.["snapshot:update"]).toContain("--schematic-only")
  expect(configJson.mainEntrypoint).toBe("esp32-wifi-test-board.circuit.tsx")
  expect(configJson.includeBoardFiles).toEqual([
    "esp32-wifi-test-board.circuit.tsx",
  ])
})

test("uses the Espressif cross-coupled DTR/RTS topology", () => {
  expect(source).toContain('from=".U2 > .DTR" to="net.DTR"')
  expect(source).toContain('from="net.DTR" to=".Q2 > .emitter"')
  expect(source).not.toContain('from="net.DTR" to=".Q2 > .collector"')
  expect(source).toContain('from=".U2 > .RTS" to="net.RTS"')
  expect(source).toContain('from="net.RTS" to=".Q1 > .emitter"')
  expect(source).toContain('from=".Q1 > .collector" to=".U3 > .EN"')
  expect(source).toContain('from=".Q2 > .collector" to=".U3 > .IO0"')
  expect(source).not.toContain('from=".Q2 > .emitter" to=".U3 > .IO0"')
  expect((source.match(/<transistor/g) ?? []).length).toBe(2)
  expect((source.match(/type="npn"/g) ?? []).length).toBe(2)
  expect((source.match(/footprint="jlcpcb:C381091"/g) ?? []).length).toBe(2)
})

test("keeps the generated netlist aligned with the source topology", () => {
  const circuitJsonPath = join(
    projectRoot,
    "dist",
    "esp32-wifi-test-board",
    "circuit.json",
  )
  if (!existsSync(circuitJsonPath)) return

  const circuitJson = JSON.parse(
    readFileSync(circuitJsonPath, "utf8"),
  ) as Array<{
    type: string
    display_name?: string
  }>
  const traceNames = new Set(
    circuitJson
      .filter((element) => element.type === "source_trace")
      .map((element) => element.display_name),
  )

  for (const expected of [
    ".J1 > .CC1 to .R1 > .pin1",
    ".J1 > .CC2 to .R2 > .pin1",
    ".U2 > .DTR to net.DTR",
    ".U2 > .RTS to net.RTS",
    ".Q1 > .collector to .U3 > .EN",
    ".Q2 > .collector to .U3 > .IO0",
  ]) {
    expect(traceNames.has(expected)).toBe(true)
  }
})

test("normalizes source IDs, logical pins, and supplier footprint inputs", () => {
  expect(source).toContain("DeterministicTrace")
  expect(source).toContain("pinLabels={ledPinLabels}")
  expect(source).not.toMatch(/Math\.random|Date\.now|performance\.now/)
  expect(configSource).toContain("deterministic-footprints.json")
  expect(configSource).toContain("footprintLibraryMap")
  expect(runTsciSource).toContain("localTsci")
  expect(packageJson.scripts?.postinstall).toContain("patch-circuit-to-svg")

  const supplierParts = [
    ...source.matchAll(/supplierPartNumbers=\{jlc\("([^"]+)"\)\}/g),
  ].map((match) => match[1])
  for (const part of supplierParts) {
    expect(Object.prototype.hasOwnProperty.call(footprintData, part)).toBe(true)
  }
})

test("keeps the declared SVG free of trailing whitespace", () => {
  const snapshot = readFileSync(
    join(
      projectRoot,
      "__snapshots__",
      "esp32-wifi-test-board.circuit-schematic.snap.svg",
    ),
    "utf8",
  )
  expect(/[ \t]+\r?$/m.test(snapshot)).toBe(false)
})
