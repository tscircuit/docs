import { parse } from "@babel/parser"
import babel from "prettier/plugins/babel"
import estree from "prettier/plugins/estree"
import typescript from "prettier/plugins/typescript"
import * as prettier from "prettier/standalone"

const unwrapJsxExample = (source: string) => {
  const ast = parse(source, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  })
  const exported = ast.program.body.find(
    (node) => node.type === "ExportDefaultDeclaration",
  )
  if (exported?.type !== "ExportDefaultDeclaration") return source

  const declaration = exported.declaration
  if (
    declaration.type !== "ArrowFunctionExpression" ||
    declaration.async ||
    declaration.params.length !== 0 ||
    declaration.typeParameters ||
    declaration.returnType ||
    !["JSXElement", "JSXFragment"].includes(declaration.body.type)
  ) {
    return source
  }

  const start = exported.start!
  const end = exported.end!
  const bodyStart = declaration.body.start!
  const bodyEnd = declaration.body.end!
  // Keep wrappers containing comments rather than silently deleting those comments.
  if (
    ast.comments?.some(
      (comment) =>
        (comment.start! >= start && comment.end! <= bodyStart) ||
        (comment.start! >= bodyEnd && comment.end! <= end),
    )
  ) {
    return source
  }

  return (
    source.slice(0, start) +
    source
      .slice(bodyStart, bodyEnd)
      .split("\n")
      .map((line, index) => (index === 0 ? line : line.replace(/^ {2}/, "")))
      .join("\n") +
    source.slice(end)
  )
}

/** Display-only formatting: never send the unwrapped code to the evaluator. */
export const formatPreviewCode = async (source: string, filename?: string) => {
  try {
    const isJson = filename?.endsWith(".json")
    const formatted = (
      await prettier.format(source, {
        parser: isJson ? "json" : "typescript",
        plugins: [estree, typescript, babel],
        printWidth: 60,
        tabWidth: 2,
        semi: false,
        trailingComma: "all",
      })
    ).trim()
    return isJson
      ? formatted
      : unwrapJsxExample(formatted).replace(/^;(?=<)/, "")
  } catch {
    // Partial snippets and non-code files should remain readable as authored.
    return source.trim()
  }
}
