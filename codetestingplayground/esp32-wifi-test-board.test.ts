import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

const projectRoot = import.meta.dir
const source = readFileSync(
  join(projectRoot, "esp32-wifi-test-board.circuit.tsx"),
  "utf8",
)
const packageJson = JSON.parse(
  readFileSync(join(projectRoot, "package.json"), "utf8"),
) as { dependencies?: Record<string, string> }

test("uses a real USB-C sink with independent CC pull-downs", () => {
  expect(source).toContain('from "@tsci/seveibar.smd-usb-c"')
  expect(source).toContain("CC1")
  expect(source).toContain("CC2")
  expect((source.match(/resistance="5\.1k"/g) ?? []).length).toBe(2)
  expect(source).toContain("C165948")
  expect(source).toContain("C25905")
  expect(packageJson.dependencies?.["@tsci/seveibar.smd-usb-c"]).toBe("0.0.2")
})

test("uses the Espressif cross-coupled DTR/RTS topology", () => {
  expect(source).toContain('from=".U2 > .DTR" to="net.DTR"')
  expect(source).toContain('from="net.DTR" to=".Q2 > .collector"')
  expect(source).toContain('from=".U2 > .RTS" to="net.RTS"')
  expect(source).toContain('from="net.RTS" to=".Q1 > .emitter"')
  expect(source).toContain('from=".Q1 > .collector" to=".U3 > .EN"')
  expect(source).toContain('from=".Q2 > .emitter" to=".U3 > .IO0"')
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
    ".Q2 > .emitter to .U3 > .IO0",
  ]) {
    expect(traceNames.has(expected)).toBe(true)
  }
})
