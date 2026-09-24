import { spawnSync } from "node:child_process"
import { existsSync } from "node:fs"
import { delimiter, dirname, join } from "node:path"

const [command, ...args] = process.argv.slice(2)
if (!command) throw new Error("A command is required")

const localTsci = join(
  import.meta.dir,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "tsci.exe" : "tsci",
)
const useLocalTsci = existsSync(localTsci)
const executable = useLocalTsci ? localTsci : "bunx"
const executableArgs = useLocalTsci
  ? [command, ...args]
  : ["tsci", command, ...args]

const result = spawnSync(executable, executableArgs, {
  env: {
    ...process.env,
    PATH: `${dirname(process.execPath)}${delimiter}${process.env.PATH ?? ""}`,
  },
  shell: false,
  stdio: "inherit",
})
if (result.error) throw result.error
process.exit(result.status ?? 1)
