import { spawnSync } from "node:child_process"
import { existsSync } from "node:fs"
import { delimiter, dirname, join } from "node:path"

export const resolveLocalTsci = (root = import.meta.dir) => {
  const localTsci = join(
    root,
    "node_modules",
    ".bin",
    process.platform === "win32" ? "tsci.exe" : "tsci",
  )
  if (!existsSync(localTsci)) {
    throw new Error(
      `Pinned local tsci executable not found at ${localTsci}; run bun install in ${root}`,
    )
  }
  return localTsci
}

if (import.meta.main) {
  const [command, ...args] = process.argv.slice(2)
  if (!command) throw new Error("A command is required")

  const localTsci = resolveLocalTsci()
  const result = spawnSync(localTsci, [command, ...args], {
    env: {
      ...process.env,
      PATH: `${dirname(process.execPath)}${delimiter}${process.env.PATH ?? ""}`,
    },
    shell: false,
    stdio: "inherit",
  })
  if (result.error) throw result.error
  process.exit(result.status ?? 1)
}
