import { readFileSync, writeFileSync } from "node:fs"
import { parseArgs } from "node:util"

const { values } = parseArgs({
  options: {
    command: { type: "string" },
    input: { type: "string" },
    output: { type: "string" },
    title: { type: "string", default: "Terminal" },
  },
})
if (!values.command || !values.input || !values.output) {
  console.error(
    'Usage: bun run terminal:import --command "tsci build" --input build.ansi --output src/data/terminals/build.json [--title "Build"]',
  )
  process.exit(1)
}
// Import an existing log; never run the command or turn output into HTML.
const transcript = {
  title: values.title,
  sessions: [
    { command: values.command, output: readFileSync(values.input, "utf8") },
  ],
}
writeFileSync(values.output, `${JSON.stringify(transcript, null, 2)}\n`)
console.log(
  `Wrote ${values.output}. Review paths, credentials, and output before publishing.`,
)
