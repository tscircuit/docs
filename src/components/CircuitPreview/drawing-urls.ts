export interface DrawingPreviewPage {
  name: string
  url: string
}

export const hasDrawingPages = ({
  circuitJson,
  code,
  fsMap,
}: {
  circuitJson?: Record<string, unknown>[]
  code?: string
  fsMap?: Record<string, string>
}) =>
  circuitJson
    ? circuitJson.some((element) => element.type === "drawing_page")
    : [code ?? "", ...Object.values(fsMap ?? {})].some((source) =>
        /assembly\.drawing\b/.test(source),
      )

export const createDrawingUrl = (sourceUrl: string, pageNumber = 1) => {
  const url = new URL(sourceUrl)
  url.searchParams.set("svg_type", "drawing")
  url.searchParams.set("format", "svg")
  url.searchParams.set("drawing_page", String(pageNumber))
  return url.toString()
}

export const createDrawingManifestUrl = (sourceUrl: string) => {
  const url = new URL(createDrawingUrl(sourceUrl))
  url.searchParams.delete("drawing_page")
  url.searchParams.set("drawing_manifest", "true")
  return url.toString()
}
