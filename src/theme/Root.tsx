import React, { useEffect, type ReactElement } from "react"
import type { Props } from "@theme/Root"
import { useLocation } from "@docusaurus/router"

const LEVEL_3_LINK_SELECTOR =
  ".theme-doc-sidebar-item-link-level-3 > .menu__link"
const LEVEL_3_PADDING_CLASS = "menu__link--level-3"
const SIDEBAR_MENU_SELECTOR = ".theme-doc-sidebar-menu"
const CRISP_WEBSITE_ID = "24b58135-86c7-4e4b-bf6e-cca862bc4b26"
const CRISP_SCRIPT_SRC = "https://client.crisp.chat/l.js"

declare global {
  interface Window {
    $crisp?: unknown[]
    CRISP_WEBSITE_ID?: string
  }
}

function applyLevel3PaddingClass() {
  if (typeof document === "undefined") {
    return
  }

  const links = document.querySelectorAll<HTMLAnchorElement>(
    LEVEL_3_LINK_SELECTOR,
  )
  links.forEach((link) => {
    link.classList.add(LEVEL_3_PADDING_CLASS)
  })
}

export default function Root({ children }: Props): ReactElement {
  const location = useLocation()

  useEffect(() => {
    if (typeof document === "undefined") {
      return
    }

    window.$crisp = window.$crisp ?? []
    window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID

    if (document.querySelector(`script[src="${CRISP_SCRIPT_SRC}"]`)) {
      return
    }

    const script = document.createElement("script")
    script.src = CRISP_SCRIPT_SRC
    script.async = true
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined
    }

    applyLevel3PaddingClass()

    const sidebarMenu = document.querySelector(SIDEBAR_MENU_SELECTOR)
    if (!sidebarMenu) {
      return undefined
    }

    const observer = new MutationObserver(() => {
      applyLevel3PaddingClass()
    })

    observer.observe(sidebarMenu, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [location])

  return <>{children}</>
}
