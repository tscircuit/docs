import { useEffect, useState } from "react"

export const useLatestCircuitPreviewCdnUrl = () => {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    // Set a timeout to provide a fallback URL if API call fails
    const timeoutId = setTimeout(() => {
      if (!url) {
        // Fallback to a known working version
        setUrl(
          "https://unpkg.com/@tscircuit/circuit-preview@latest/dist/index.global.js",
        )
      }
    }, 5000)

    fetch("https://registry.npmjs.org/@tscircuit/circuit-preview/latest")
      .then((res) => res.json())
      .then((data: { version: string }) => {
        clearTimeout(timeoutId)
        setUrl(
          `https://unpkg.com/@tscircuit/circuit-preview@${data.version}/dist/index.global.js`,
        )
      })
      .catch(() => {
        clearTimeout(timeoutId)
        // Fallback to latest version on error
        setUrl(
          "https://unpkg.com/@tscircuit/circuit-preview@latest/dist/index.global.js",
        )
      })

    return () => clearTimeout(timeoutId)
  }, [url])

  return url
}
