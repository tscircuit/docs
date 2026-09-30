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
  remarkAiStart()(tree, { data: { frontMatter: { ai_start: true } } })
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
  remarkAiStart()(tree, { data: { frontMatter: { ai_start: true } } })
  assert.equal(tree.children.length, 1)
})

test("regular docs do not get an AI callout unless they explicitly opt in", () => {
  for (const file of [
    undefined,
    {},
    { data: {} },
    { data: { frontMatter: {} } },
    { data: { frontMatter: { ai_start: false } } },
    { data: { frontMatter: { ai_start: "true" } } },
  ]) {
    const opening = paragraph(
      "After you've designed your device, order prototypes.",
    )
    const tree = { children: [opening] }
    remarkAiStart()(tree, file)
    assert.deepEqual(tree.children, [opening])
  }
})
