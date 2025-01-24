import { useState, useEffect } from "react"
import { useColorMode as useColorModeOg } from "@docusaurus/theme-common"

globalThis.___USE_COLOR_MODE_HOOK_HAS_TRIGGERED_UPDATE = false

/**
 * This hook ensures that isDarkTheme has received a post-page-load update
 * value. Unfortunately there is a bug where isDarkTheme is not accurate
 * after a page reload
 */
export const useColorMode = () => {
  const { colorMode } = useColorModeOg()

  const [notMatchedAfterReload, setNotMatchedAfterReload] = useState(false)

  useEffect(() => {
    if (globalThis.___USE_COLOR_MODE_HOOK_HAS_TRIGGERED_UPDATE) {
      return
    }

    setTimeout(() => {
      setNotMatchedAfterReload(true)
      globalThis.___USE_COLOR_MODE_HOOK_HAS_TRIGGERED_UPDATE = true
    }, 100)
  }, [])

  return {
    isDarkTheme: colorMode === "dark",
    colorMode,
    notMatchedAfterReload,
  }
}
