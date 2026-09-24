import { spawnSync } from "node:child_process"
import { delimiter, dirname } from "node:path"

const [command, ...args] = process.argv.slice(2)
if (!command) throw new Error("A command is required")

const result = spawnSync("bunx", ["tsci", command, ...args], {
  env: {
    ...process.env,
    PATH: `${dirname(process.execPath)}${delimiter}${process.env.PATH ?? ""}`,
  },
  shell: true,
  stdio: "inherit",
})
if (result.error) throw result.error
process.exit(result.status ?? 1)
