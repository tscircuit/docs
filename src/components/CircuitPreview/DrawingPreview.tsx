import { useEffect, useState } from "react"
import {
  createDrawingManifestUrl,
  createDrawingUrl,
  type DrawingPreviewPage,
} from "./drawing-urls"
import PreviewPagination from "./PreviewPagination"
import styles from "./styles.module.css"

export default function DrawingPreview({
  sourceUrl,
  pages,
}: {
  sourceUrl: string
  pages?: DrawingPreviewPage[]
}) {
  const [loaded, setLoaded] = useState<{
    source: string
    pages: DrawingPreviewPage[]
  }>()
  const [selected, setSelected] = useState({ source: sourceUrl, index: 0 })
  const [error, setError] = useState<string>()
  const index = selected.source === sourceUrl ? selected.index : 0
  const available =
    pages ?? (loaded?.source === sourceUrl ? loaded.pages : undefined)

  useEffect(() => {
    setError(undefined)
    setSelected({ source: sourceUrl, index: 0 })
    if (pages) return
    const controller = new AbortController()
    fetch(createDrawingManifestUrl(sourceUrl), { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load drawing pages")
        const manifest = await response.json()
        if (!Array.isArray(manifest.pages))
          throw new Error("Invalid drawing page response")
        setLoaded({
          source: sourceUrl,
          pages: manifest.pages.map((page: { name: string }, i: number) => ({
            name: page.name,
            url: createDrawingUrl(sourceUrl, i + 1),
          })),
        })
      })
      .catch((reason) => {
        if (!controller.signal.aborted) setError(reason.message)
      })
    return () => controller.abort()
  }, [sourceUrl, pages])

  const current = available?.[index]
  return (
    <div className={styles.drawingPreview}>
      {error && !available ? (
        <div role="alert">{error}</div>
      ) : !available ? (
        <div role="status">Loading drawings…</div>
      ) : !current ? (
        <div role="status">No drawing pages</div>
      ) : (
        <>
          {error ? (
            <div role="alert">{error}</div>
          ) : (
            <img
              key={current.url}
              src={current.url}
              alt={`Drawing ${index + 1} of ${available.length}: ${current.name}`}
              className={styles.drawingImage}
              onError={() => setError("Unable to load this drawing")}
            />
          )}
          {available.length > 1 && (
            <PreviewPagination
              kind="Drawing"
              index={index}
              count={available.length}
              onChange={(nextIndex) => {
                setError(undefined)
                setSelected({ source: sourceUrl, index: nextIndex })
              }}
            />
          )}
        </>
      )}
    </div>
  )
}
