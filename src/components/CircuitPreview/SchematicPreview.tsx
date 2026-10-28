import { useEffect, useState } from "react"
import PreviewPagination from "./PreviewPagination"
import {
  createSchematicManifestUrl,
  createSchematicSheetUrl,
  type SchematicPreviewPage,
} from "./schematic-sheets"
import styles from "./styles.module.css"

export default function SchematicPreview({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  const [loaded, setLoaded] = useState<{
    source: string
    pages: SchematicPreviewPage[]
  }>()
  const [selected, setSelected] = useState({ source: src, index: 0 })
  const index = selected.source === src ? selected.index : 0
  const pages = loaded?.source === src ? loaded.pages : undefined

  useEffect(() => {
    setSelected({ source: src, index: 0 })
    const controller = new AbortController()
    fetch(createSchematicManifestUrl(src), { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load schematic sheets")
        const manifest = await response.json()
        if (!Array.isArray(manifest.pages))
          throw new Error("Invalid schematic sheet response")
        setLoaded({
          source: src,
          pages: manifest.pages.map((page: { name: string }, i: number) => ({
            name: page.name,
            url: createSchematicSheetUrl(src, i + 1),
          })),
        })
      })
      .catch(() => {
        // Without a manifest, show the stacked schematic as a single image.
        if (!controller.signal.aborted) setLoaded({ source: src, pages: [] })
      })
    return () => controller.abort()
  }, [src])

  const current = pages && pages.length > 1 ? pages[index] : undefined
  return (
    <div className={styles.schematicPreview}>
      {!pages ? (
        <div role="status">Loading schematic…</div>
      ) : !current ? (
        <img src={src} alt={alt} className={styles.drawingImage} />
      ) : (
        <>
          <img
            key={current.url}
            src={current.url}
            alt={`${alt}, sheet ${index + 1} of ${pages.length}: ${current.name}`}
            className={styles.drawingImage}
          />
          <PreviewPagination
            kind="Schematic"
            index={index}
            count={pages.length}
            pageName={current.name}
            onChange={(nextIndex) =>
              setSelected({ source: src, index: nextIndex })
            }
          />
        </>
      )}
    </div>
  )
}
