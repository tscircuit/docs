import { strict as assert } from "node:assert"
import { test } from "node:test"
import { getUncompressedSnippetString } from "@tscircuit/create-snippet-url"
import { createCircuitPreviewEditorUrl } from "../src/components/CircuitPreview/create-editor-url"
import { motorControllerFiles } from "../src/data/advanced-assembly/examples"

test("assembly editor link includes every imported file and opens its entrypoint", () => {
  const url = new URL(
    createCircuitPreviewEditorUrl({
      code: "",
      fsMap: motorControllerFiles,
      entrypoint: "index.tsx",
      currentFile: "motor-bracket.tsx",
    })!,
  )
  const files = JSON.parse(getUncompressedSnippetString(url.hash))

  assert.equal(url.origin, "https://tscircuit.com")
  assert.equal(url.pathname, "/editor")
  assert.equal(url.searchParams.get("snippet_type"), "board")
  assert.equal(url.searchParams.get("file_path"), "index.tsx")
  assert.deepEqual(files, motorControllerFiles)
  assert.ok(files["motor-bracket.tsx"].includes("export function MotorBracket"))
  assert.ok(
    files["motor-controller.tsx"].includes("export function MotorController"),
  )
})

test("multi-file links preserve Unicode and select a non-index main component", () => {
  const fsMap = {
    "parts.tsx": "export const label = 'µΩ'",
    "boards/demo board.circuit.tsx": "export default () => <board />",
  }
  const url = new URL(
    createCircuitPreviewEditorUrl({
      code: "",
      fsMap,
      mainComponentPath: "boards/demo board.circuit.tsx",
      currentFile: "parts.tsx",
    })!,
  )

  assert.equal(
    url.searchParams.get("file_path"),
    "boards/demo board.circuit.tsx",
  )
  assert.deepEqual(JSON.parse(getUncompressedSnippetString(url.hash)), fsMap)
})

test("single-file previews still open a code snippet", () => {
  const code = "export default () => <board />"
  for (const fsMap of [undefined, { "example.tsx": code }]) {
    const url = new URL(createCircuitPreviewEditorUrl({ code, fsMap })!)
    assert.equal(getUncompressedSnippetString(url.hash), code)
    assert.equal(url.searchParams.get("file_path"), null)
    assert.equal(url.searchParams.get("snippet_type"), "board")
  }
  assert.equal(createCircuitPreviewEditorUrl({ code: " \n" }), undefined)
})
