import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { resolveLocalTsci } from "./run-tsci"

const source = readFileSync(join(import.meta.dir, "run-tsci.ts"), "utf8")

test("fails clearly when the pinned local tsci is unavailable", () => {
  const missingRoot = join(import.meta.dir, "missing-tsci-root")
  expect(() => resolveLocalTsci(missingRoot)).toThrow(
    "Pinned local tsci executable not found",
  )
})

test("uses the local pinned executable when installed", () => {
  expect(resolveLocalTsci()).toMatch(
    /node_modules[\\/]\.bin[\\/]tsci(?:\.exe)?$/,
  )
})

test("does not contain an unpinned tsci fallback", () => {
  expect(source).not.toContain("bunx")
})
