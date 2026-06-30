const normalizeCommonJsxReturnIndentation = (source: string) => {
  const lines = source.trim().split("\n")

  for (let lineIndex = 0; lineIndex < lines.length - 1; lineIndex++) {
    const line = lines[lineIndex]
    const nextLine = lines[lineIndex + 1]

    if (!line.trimEnd().endsWith("(") || !nextLine.startsWith("<")) {
      continue
    }

    const closingLineIndex = lines.findIndex(
      (candidateLine, candidateIndex) =>
        candidateIndex > lineIndex && candidateLine.trim() === ")",
    )

    if (closingLineIndex === -1) {
      continue
    }

    return lines
      .map((candidateLine, candidateIndex) => {
        if (
          candidateIndex <= lineIndex ||
          candidateIndex >= closingLineIndex ||
          candidateLine.trim() === ""
        ) {
          return candidateLine
        }

        return `  ${candidateLine}`
      })
      .join("\n")
  }

  return source.trim()
}

export const normalizeCircuitPreviewCode = (
  source: string | undefined,
): string | undefined =>
  source === undefined ? undefined : normalizeCommonJsxReturnIndentation(source)

export const normalizeCircuitPreviewFsMap = (
  fsMap: Record<string, string> | undefined,
): Record<string, string> | undefined =>
  fsMap
    ? Object.fromEntries(
        Object.entries(fsMap).map(([filename, source]) => [
          filename,
          normalizeCommonJsxReturnIndentation(source),
        ]),
      )
    : undefined
