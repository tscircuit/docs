import { strict as assert } from "node:assert"
import { test } from "node:test"
import remarkAiStart from "../plugins/remark-ai-start"

const paragraph = (value: string) => ({
  type: "paragraph",
  children: [{ type: "text", value }],
})

test("AI callout follows opening prose, skipping imports, headings and images", () => {
  const opening = paragraph(
    "tscircuit is an open-source electronics toolchain.",
  )
  const tree = {
    children: [
      { type: "mdxjsEsm", value: 'import Preview from "./preview"' },
      {
        type: "heading",
        depth: 1,
        children: [{ type: "text", value: "Intro" }],
      },
      { type: "paragraph", children: [{ type: "image", alt: "Preview" }] },
      opening,
      paragraph("More details."),
    ],
  }
  remarkAiStart()(tree)
  assert.equal(tree.children[3], opening)
  assert.equal(tree.children[4].type, "mdxJsxFlowElement")
  assert.equal(
    tree.children.filter((node) => node.type === "mdxJsxFlowElement").length,
    1,
  )
  assert.equal(tree.children[5].type, "paragraph")
})

test("nested paragraphs and pages without opening prose do not get a leading callout", () => {
  const tree = {
    children: [{ type: "blockquote", children: [paragraph("Quote")] }],
  }
  remarkAiStart()(tree)
  assert.equal(tree.children.length, 1)
})
