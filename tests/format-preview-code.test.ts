import { strict as assert } from "node:assert"
import { test } from "node:test"
import { formatPreviewCode } from "../src/components/CircuitPreview/format-preview-code"

test("formats JSX props and removes a simple default export wrapper", async () => {
  const source = `import { assembly } from "tscircuit";
export default () => (
<assembly.device><board name="CONTROLLER" width={32} height={28} pcbX={60} routingDisabled><connector name="J_USB" standard="usb_c" footprint="usbcmidmount" /></board></assembly.device>
);`
  const formatted = await formatPreviewCode(source)
  assert.ok(formatted.startsWith('import { assembly } from "tscircuit"'))
  assert.ok(!formatted.includes("export default"))
  assert.ok(formatted.includes('\n  <board\n    name="CONTROLLER"'))
  assert.ok(formatted.includes("\n    <connector\n"))
  assert.ok(formatted.endsWith("</assembly.device>"))
  assert.ok(source.includes("export default () => ("))
})

test("unwraps fragments and retains setup declarations and surrounding comments", async () => {
  const formatted = await formatPreviewCode(`const width = 10
// Example
export default () => (<><board width={width} /></>)
// End`)
  assert.ok(formatted.includes("const width = 10"))
  assert.ok(formatted.includes("// Example"))
  assert.ok(formatted.includes("// End"))
  assert.ok(!formatted.includes("export default"))
})

test("retains wrappers required by props, logic, types or comments", async () => {
  for (const source of [
    "export default (props) => (<board width={props.width} />)",
    "export default () => { const width = 10; return <board width={width} /> }",
    "export default async () => (<board />)",
    "export default (): JSX.Element => (<board />)",
    "export default () => (/* Explanation */ <board />)",
    "export default () => (<board /> /* Explanation */)",
    "export default function Example() { return <board /> }",
  ]) {
    assert.ok(
      (await formatPreviewCode(source)).includes("export default"),
      source,
    )
  }
})

test("handles nested JSX expressions without losing their parentheses", async () => {
  const formatted = await formatPreviewCode(`export default () => (
    <board>{[1, 2].map((n) => (<resistor name={String(n)} />))}</board>
  )`)
  assert.ok(!formatted.includes("export default"))
  assert.ok(formatted.includes(".map((n) => ("))
  assert.ok(formatted.includes("<resistor"))
})

test("formats plain snippets and JSON files, and falls back for invalid code", async () => {
  assert.equal(
    await formatPreviewCode("<board width={ 10 }/>"),
    "<board width={10} />",
  )
  assert.equal(
    await formatPreviewCode('{"width":10}', "board.json"),
    '{ "width": 10 }',
  )
  assert.equal(await formatPreviewCode("  <board width={  "), "<board width={")
})
