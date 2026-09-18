import { strict as assert } from "node:assert"
import { test } from "node:test"
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { execFileSync } from "node:child_process"
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import Terminal, { AnsiText, terminalText } from "../src/components/terminal"

test("terminal commands and ANSI output are escaped, server-rendered text", () => {
  const html = renderToStaticMarkup(
    <Terminal
      sessions={[
        {
          command: "tsci build",
          output: "\u001b[32mReady\u001b[0m\n<script>alert(1)</script>",
        },
        { command: "tsci dev", output: "Listening" },
      ]}
    />,
  )
  assert.ok(html.includes("tsci build"))
  assert.ok(html.includes("tsci dev"))
  assert.ok(html.includes("Ready"))
  assert.ok(html.includes("color:rgb("))
  assert.ok(html.includes("&lt;script&gt;"))
  assert.ok(!html.includes("<script>"))
  assert.ok(!html.includes("\u001b"))
})

test("ANSI state persists across lines and resets; OSC links stay text", () => {
  const html = renderToStaticMarkup(
    <AnsiText>
      {"\u001b[1;38;2;10;20;30mfirst\nsecond\u001b[0m plain"}
    </AnsiText>,
  )
  assert.ok(html.includes("rgb(10,20,30)") || html.includes("rgb(10, 20, 30)"))
  assert.ok(html.includes("font-weight:700"))
  assert.ok(html.includes("first\nsecond"))
  assert.ok(html.includes("<span> plain</span>"))
  assert.equal(
    terminalText(
      "\u001b]8;;https://example.com\u0007label\u001b]8;;\u0007\r\n\u001b[2Kdone",
    ),
    "label\ndone",
  )
})

test("log importer preserves ANSI and special text as JSON without executing commands", () => {
  const dir = mkdtempSync(join(tmpdir(), "terminal-import-"))
  const input = join(dir, "capture.ansi")
  const output = join(dir, "capture.json")
  const log = "\u001b[32mOK\u001b[0m\n${literal} <tag> `text`"
  writeFileSync(input, log)
  execFileSync(process.execPath, [
    "scripts/import-terminal.ts",
    "--command",
    "not-a-real-command",
    "--input",
    input,
    "--output",
    output,
  ])
  const data = JSON.parse(readFileSync(output, "utf8"))
  assert.equal(data.sessions[0].command, "not-a-real-command")
  assert.equal(data.sessions[0].output, log)
})
