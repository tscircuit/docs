import { useEffect, useState } from "react"

export const useLatestTscircuitCdnUrl = () => {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    fetch("https://api.cdnjs.com/libraries/tscircuit?fields=version")
      .then((res) => res.json())
      .then((data) => {
        setUrl(
          `https://cdnjs.cloudflare.com/ajax/libs/tscircuit/${data.version}/browser.min.js`,
        )
      })
      .catch(() => {})
  }, [])

  return url
}
