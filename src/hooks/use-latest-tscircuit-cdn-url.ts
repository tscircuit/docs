import { useEffect, useState } from "react"

export const useLatestTscircuitCdnUrl = () => {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    fetch("https://registry.npmjs.org/tscircuit/latest")
      .then((res) => res.json())
      .then((data: { version: string }) => {
        setUrl(
          `https://cdn.jsdelivr.net/npm/tscircuit@${data.version}/dist/browser.min.js`,
        )
      })
      .catch(() => {})
  }, [])

  return url
}
