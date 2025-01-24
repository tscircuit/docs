import { useState, useEffect } from "react"
import { useColorMode as useColorModeOg } from "@docusaurus/theme-common"

/**
 * This hook ensures that isDarkTheme has received a post-page-load update
 * value. Unfortunately there is a bug where isDarkTheme is not accurate
 * after a page reload
 */
export const useColorMode = () => {
  const { colorMode } = useColorModeOg()

  const [notMatchedAfterReload, setNotMatchedAfterReload] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setNotMatchedAfterReload(true)
    }, 100)
  }, [])

  return {
    isDarkTheme: colorMode === "dark",
    colorMode,
    notMatchedAfterReload,
  }
}
