import { useEffect, useState } from "react"

export const useLatestTscircuitCdnUrl = () => {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    // Set a timeout to provide a fallback URL if API call fails
    const timeoutId = setTimeout(() => {
      if (!url) {
        // Fallback to a known working version
        setUrl(
          "https://cdnjs.cloudflare.com/ajax/libs/tscircuit/1.0.0/browser.min.js",
        )
      }
    }, 5000)

    fetch("https://api.cdnjs.com/libraries/tscircuit?fields=version")
      .then((res) => res.json())
      .then((data) => {
        clearTimeout(timeoutId)
        setUrl(
          `https://cdnjs.cloudflare.com/ajax/libs/tscircuit/${data.version}/browser.min.js`,
        )
      })
      .catch(() => {
        clearTimeout(timeoutId)
        // Fallback to a known working version on error
        setUrl(
          "https://cdnjs.cloudflare.com/ajax/libs/tscircuit/1.0.0/browser.min.js",
        )
      })

    return () => clearTimeout(timeoutId)
  }, [url])

  return url
}
