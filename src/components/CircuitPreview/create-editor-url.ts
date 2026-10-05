import { createSnippetUrl } from "@tscircuit/create-snippet-url"

export const createCircuitPreviewEditorUrl = ({
  code,
  fsMap,
  entrypoint,
  mainComponentPath,
  currentFile,
}: {
  code: string
  fsMap?: Record<string, string>
  entrypoint?: string
  mainComponentPath?: string
  currentFile?: string
}): string | undefined => {
  const preferredFile =
    [entrypoint, mainComponentPath, currentFile].find(
      (filename) => filename && fsMap?.[filename],
    ) ?? Object.keys(fsMap ?? {})[0]
  const editorSource =
    (preferredFile ? fsMap?.[preferredFile] : undefined) ?? code

  if (!editorSource.trim()) return undefined
  if (!fsMap || Object.keys(fsMap).length < 2) {
    return createSnippetUrl(editorSource, "board")
  }

  // The editor decodes a gzipped JSON file map from the same hash as snippets.
  const url = new URL(createSnippetUrl(JSON.stringify(fsMap), "board"))
  url.searchParams.set("file_path", preferredFile)
  return url.toString()
}
