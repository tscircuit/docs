import React, { type ReactNode, useEffect, useState } from "react"
import Link from "@docusaurus/Link"
import { useLocation } from "@docusaurus/router"
import NavbarContent from "@theme-original/Navbar/Content"
import styles from "./styles.module.css"

const sections = [
  { label: "Intro", directory: "intro", category: "intro" },
  { label: "Guides", directory: "guides", category: "guides" },
  { label: "Elements", directory: "elements", category: "built-in-elements" },
  {
    label: "CLI",
    directory: "command-line",
    category: "command-line-interface",
  },
  { label: "Footprints", directory: "footprints", category: "footprints" },
  {
    label: "Contributing",
    directory: "contributing",
    category: "contributing",
  },
  { label: "Web APIs", directory: "web-apis", category: "web-apis" },
  { label: "Advanced", directory: "advanced", category: "advanced" },
]

export default function NavbarContentWrapper(): ReactNode {
  const { pathname } = useLocation()
  const path = pathname.replace(/\/$/, "")
  const [sidebarScrollRequest, setSidebarScrollRequest] = useState(0)

  useEffect(() => {
    const section = sections.find(
      ({ category }) => path === `/category/${category}`,
    )
    if (!section) return
    const controller = new AbortController()
    let observer: ResizeObserver | undefined

    // Wait for the destination sidebar to render, then scroll only its panel.
    const frame = requestAnimationFrame(() => {
      const menu = document.querySelector(
        ".theme-doc-sidebar-container .theme-doc-sidebar-menu",
      )
      const sidebar = menu?.closest("nav")
      const link = menu?.querySelector<HTMLAnchorElement>(
        `a[href="/category/${section.category}"]`,
      )
      if (!sidebar || !link || sidebar.clientHeight === 0) return

      const scrollToSection = () =>
        sidebar.scrollTo({
          top:
            sidebar.scrollTop +
            link.getBoundingClientRect().top -
            sidebar.getBoundingClientRect().top -
            8,
          behavior: "instant",
        })
      scrollToSection()

      // A collapsed section may still be expanding and adding scroll space.
      const content = link
        .closest("li")
        ?.querySelector<HTMLElement>(":scope > ul")
      if (content?.style.overflow !== "visible") {
        observer = new ResizeObserver(() => {
          scrollToSection()
          const expandedContent = link
            .closest("li")
            ?.querySelector<HTMLElement>(":scope > ul")
          if (expandedContent?.style.overflow === "visible") {
            observer?.disconnect()
          }
        })
        observer.observe(menu!)
        sidebar.addEventListener(
          "transitionend",
          (event) => {
            const expandedContent = link
              .closest("li")
              ?.querySelector<HTMLElement>(":scope > ul")
            if (
              event.target === expandedContent &&
              event.propertyName === "height"
            ) {
              scrollToSection()
              observer?.disconnect()
              controller.abort()
            }
          },
          { signal: controller.signal },
        )
      }
    })
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      controller.abort()
    }
  }, [path, sidebarScrollRequest])

  return (
    <>
      <NavbarContent />
      <nav className={styles.sections} aria-label="Documentation sections">
        {sections.map(({ label, directory, category }) => {
          const to = `/category/${category}`
          const active =
            path === to ||
            path === `/${directory}` ||
            path.startsWith(`/${directory}/`) ||
            (directory === "intro" && path === "")

          return (
            <Link
              key={directory}
              to={to}
              className={styles.section}
              aria-current={active ? "location" : undefined}
              onClick={(event) => {
                if (
                  path === to &&
                  event.button === 0 &&
                  !event.metaKey &&
                  !event.ctrlKey &&
                  !event.shiftKey &&
                  !event.altKey
                ) {
                  setSidebarScrollRequest((request) => request + 1)
                }
              }}
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
