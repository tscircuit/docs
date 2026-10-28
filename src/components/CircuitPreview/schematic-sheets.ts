export interface SchematicPreviewPage {
  name: string
  url: string
}

export const hasSchematicSheets = ({
  circuitJson,
  code,
  fsMap,
}: {
  circuitJson?: Record<string, unknown>[]
  code?: string
  fsMap?: Record<string, string>
}) =>
  circuitJson
    ? circuitJson.filter((element) => element.type === "schematic_sheet")
        .length > 1
    : [code ?? "", ...Object.values(fsMap ?? {})].some((source) =>
        /<schematicsheet\b/.test(source),
      )

export const createSchematicSheetUrl = (
  schematicUrl: string,
  pageNumber: number,
) => {
  const url = new URL(schematicUrl)
  url.searchParams.set("schematic_sheet", String(pageNumber))
  return url.toString()
}

export const createSchematicManifestUrl = (schematicUrl: string) => {
  const url = new URL(schematicUrl)
  url.searchParams.delete("schematic_sheet")
  url.searchParams.set("schematic_manifest", "true")
  return url.toString()
}
