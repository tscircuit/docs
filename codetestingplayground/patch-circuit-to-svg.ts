import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const targets = [
  {
    path: join(
      import.meta.dir,
      "node_modules",
      "circuit-to-svg",
      "dist",
      "index.js",
    ),
    needle: '              ${options?.css ?? ""}',
    replacement: '${options?.css ?? ""}',
  },
  {
    path: join(
      import.meta.dir,
      "node_modules",
      "tscircuit",
      "dist",
      "webworker.min.js",
    ),
    needle: '              ${options?.css??""}',
    replacement: '${options?.css??""}',
  },
]

for (const target of targets) {
  if (!existsSync(target.path)) {
    throw new Error(`Missing generator at ${target.path}`)
  }
  const source = readFileSync(target.path, "utf8")
  if (source.includes(target.needle)) {
    writeFileSync(
      target.path,
      source.replace(target.needle, target.replacement),
    )
    continue
  }
  if (!source.includes(target.replacement)) {
    throw new Error(`Generator template did not match at ${target.path}`)
  }
}
