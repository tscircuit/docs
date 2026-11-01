import { useEffect, useState } from "react"

/** POST large compressed circuits and release blobs when their pose changes. */
export function useRenderedAsset(
  url: string,
  body: string | undefined,
  enabled = true,
  contentType = "image/png",
): { src?: string; error?: boolean } {
  const [result, setResult] = useState<{
    url: string
    body: string
    src?: string
    error?: boolean
  }>()
  useEffect(() => {
    setResult(undefined)
    if (!body || !enabled) return
    const controller = new AbortController()
    let objectUrl: string | undefined
    let disposed = false
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body,
      signal: controller.signal,
    })
      .then(async (response) => {
        if (
          !response.ok ||
          !response.headers.get("Content-Type")?.includes(contentType)
        )
          throw new Error("Render failed")
        const blob = await response.blob()
        if (disposed) return
        objectUrl = URL.createObjectURL(blob)
        setResult({ url, body, src: objectUrl })
      })
      .catch(() => {
        if (!disposed) setResult({ url, body, error: true })
      })
    return () => {
      disposed = true
      controller.abort()
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [url, body, enabled, contentType])
  if (!enabled) return {}
  if (!body) return { src: url }
  return result?.url === url && result.body === body ? result : {}
}
