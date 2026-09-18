# Terminal transcripts

Use real text for terminal examples instead of screenshots. The component renders
commands and output as server-rendered `<pre><code>` text, with ANSI colors,
bold, italic, underline, dim, and strikethrough styling. React escapes all content.
Commands and output remain selectable. Long lines scroll
inside the terminal, including on mobile. The terminal keeps a dark palette in both
site themes so captured colors stay consistent.

```mdx
import Terminal from "@site/src/components/terminal"
import transcript from "@site/src/data/terminals/dev.json"

<Terminal {...transcript} />
```

For short examples, author the data inline:

```mdx
<Terminal sessions={[{ command: "tsci dev", output: "Listening on http://localhost:3020" }]} />
```

A transcript has an optional `title` used as an accessible label, and `sessions` containing
`command` and optional `output` strings. Multiple sessions support sequential
commands. Keep representative output honest: the migrated screenshots retain
example versions and timings, with personal local paths normalized to `./`.

## Generate from a saved log

Capture output with ANSI colors enabled (when supported by the CLI), for example:

```sh
FORCE_COLOR=1 tsci build > build.ansi 2>&1
bun run terminal:import --command "tsci build" --input build.ansi --output src/data/terminals/build.json --title "Build a circuit"
```

Run the command in your circuit project and the importer in this docs repository,
using the appropriate path to the saved log. The importer reads a file; it does
not execute the displayed command. Review the log for credentials, private paths,
and correctness before committing. JSON preserves ANSI styling automatically.
For prompts, save a completed terminal transcript or author the selected answers.
Use final, line-oriented output: this is a static transcript viewer, not a terminal
emulator for cursor animations or full-screen programs. OSC metadata and cursor
control sequences are discarded. Avoid carriage-return progress animations in
saved logs; capture their final state instead.

The four migrated transcripts live in `src/data/terminals/` and are shared by the
quickstart, command references, and KiCad library guide. Ordinary application
screenshots remain images.
