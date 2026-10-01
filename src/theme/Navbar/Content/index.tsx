import React, { type ReactNode } from "react"
import Link from "@docusaurus/Link"
import { useLocation } from "@docusaurus/router"
import NavbarContent from "@theme-original/Navbar/Content"
import styles from "./styles.module.css"

const sections = [
  { label: "Intro", directory: "intro", category: "intro" },
  { label: "Tutorials", directory: "tutorials", category: "tutorials" },
  {
    label: "Electronics",
    directory: "building-electronics",
    category: "building-electronics",
  },
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
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
