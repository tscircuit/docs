import React from "react"
import Link from "@docusaurus/Link"
import { useLocation } from "@docusaurus/router"
import Navbar from "@theme-original/Navbar"

const sections = [
  { label: "Get started", to: "/", paths: ["/intro/", "/category/intro"] },
  {
    label: "Guides",
    to: "/category/guides",
    paths: [
      "/guides/",
      "/building-electronics/",
      "/category/guides",
      "/category/building-electronics",
    ],
  },
  {
    label: "Reference",
    to: "/category/built-in-elements",
    paths: [
      "/elements/",
      "/footprints/",
      "/command-line/",
      "/web-apis/",
      "/category/built-in-elements",
      "/category/footprints",
      "/category/command-line",
      "/category/web-apis",
    ],
  },
  {
    label: "Examples",
    to: "/category/tutorials",
    paths: [
      "/tutorials/",
      "/category/tutorials",
      "/category/raspberry-pi-hats",
    ],
  },
]

export default function WorkspaceNavbar() {
  const { pathname } = useLocation()
  return (
    <header className="workspace-header">
      <Navbar />
      <nav className="workspace-sections" aria-label="Documentation sections">
        {sections.map((section) => {
          const active =
            pathname === section.to ||
            section.paths.some((prefix) => pathname.startsWith(prefix))
          return (
            <Link
              key={section.label}
              to={section.to}
              className="workspace-section"
              aria-current={active ? "true" : undefined}
            >
              {section.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
