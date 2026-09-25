import { expect, test } from "bun:test"
import { patchGeneratorSource, targets } from "./patch-circuit-to-svg"

const target = targets[0]

test("replaces exactly one unpatched generator template", () => {
  const source = `before${target.unpatched}after`
  expect(patchGeneratorSource(source, target)).toBe(
    `before${target.patched}after`,
  )
})

test("accepts exactly one already-patched generator template", () => {
  const source = `before${target.patched}after`
  expect(patchGeneratorSource(source, target)).toBe(source)
})

test("rejects partial prefix or suffix overlap", () => {
  const partial = target.unpatched.replace("              ", "             ")
  expect(() => patchGeneratorSource(`before${partial}after`, target)).toThrow(
    "state is not exact",
  )
})

test("rejects mixed and duplicate generator states", () => {
  const mixed = `${target.patched}${target.unpatched}`
  expect(() => patchGeneratorSource(mixed, target)).toThrow(
    "state is not exact",
  )

  const duplicate = `${target.unpatched}${target.unpatched}`
  expect(() => patchGeneratorSource(duplicate, target)).toThrow(
    "state is not exact",
  )
})
