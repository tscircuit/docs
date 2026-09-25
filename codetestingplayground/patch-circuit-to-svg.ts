import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

export type GeneratorPatchTarget = {
  path: string
  unpatched: string
  patched: string
  expectedOccurrences: number
}

export const countOccurrences = (source: string, needle: string) => {
  if (needle.length === 0) return 0
  let count = 0
  let offset = 0
  while (true) {
    const nextOffset = source.indexOf(needle, offset)
    if (nextOffset === -1) break
    count += 1
    offset = nextOffset + needle.length
  }
  return count
}

export const patchGeneratorSource = (
  source: string,
  target: GeneratorPatchTarget,
) => {
  const unpatchedCount = countOccurrences(source, target.unpatched)
  const withoutUnpatched = source.split(target.unpatched).join("")
  const patchedCount = countOccurrences(withoutUnpatched, target.patched)
  if (unpatchedCount === target.expectedOccurrences && patchedCount === 0) {
    return source.split(target.unpatched).join(target.patched)
  }
  if (unpatchedCount === 0 && patchedCount === target.expectedOccurrences) {
    return source
  }
  throw new Error(
    `Generator template state is not exact at ${target.path}: unpatched=${unpatchedCount}, patched=${patchedCount}, expected=${target.expectedOccurrences}`,
  )
}

export const targets: GeneratorPatchTarget[] = [
  {
    path: join(
      import.meta.dir,
      "node_modules",
      "circuit-to-svg",
      "dist",
      "index.js",
    ),
    unpatched: `\n              \${options?.css ?? ""}\n`,
    patched: `\n\${options?.css ?? ""}\n`,
    expectedOccurrences: 1,
  },
  {
    path: join(
      import.meta.dir,
      "node_modules",
      "tscircuit",
      "dist",
      "webworker.min.js",
    ),
    unpatched: `\n              \${options?.css??""}\n`,
    patched: `\n\${options?.css??""}\n`,
    expectedOccurrences: 1,
  },
]

if (import.meta.main) {
  for (const target of targets) {
    if (!existsSync(target.path)) {
      throw new Error(`Missing generator at ${target.path}`)
    }
    const source = readFileSync(target.path, "utf8")
    const patchedSource = patchGeneratorSource(source, target)
    if (patchedSource !== source) {
      writeFileSync(target.path, patchedSource)
    }
  }
}
