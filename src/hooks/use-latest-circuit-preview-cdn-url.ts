import { useEffect, useState } from "react"

export const useLatestCircuitPreviewCdnUrl = () => {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    fetch("https://registry.npmjs.org/@tscircuit/circuit-preview/latest")
      .then((res) => res.json())
      .then((data: { version: string }) => {
        setUrl(
          `https://cdn.jsdelivr.net/npm/@tscircuit/circuit-preview@${data.version}/dist/index.global.js`,
        )
      })
      .catch(() => {})
  }, [])

  return url
}
