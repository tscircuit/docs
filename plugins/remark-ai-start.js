// Insert the shared introduction in document order at build time, so readers
// and crawlers encounter the guide's opening prose before the AI callout.
function hasProse(node) {
  if (node.type === "text" || node.type === "inlineCode") {
    return Boolean(node.value?.trim())
  }
  return node.children?.some(hasProse) ?? false
}

module.exports = function remarkAiStart({ frontMatterKey = "ai_start" } = {}) {
  return (tree, file) => {
    // Only getting-started and intro guides should opt in with ai_start: true.
    if (file?.data?.frontMatter?.[frontMatterKey] !== true) return

    const opening = tree.children.findIndex(
      (node) => node.type === "paragraph" && hasProse(node),
    )
    // Don't put a callout ahead of the content on pages without opening prose.
    if (opening === -1) return
    tree.children.splice(opening + 1, 0, {
      type: "mdxJsxFlowElement",
      name: "AiStart",
      attributes: [],
      children: [],
    })
  }
}
