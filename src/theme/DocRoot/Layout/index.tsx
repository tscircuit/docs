import React from "react"
import { useLocation } from "@docusaurus/router"
import DocRootLayout from "@theme-original/DocRoot/Layout"
import type { Props } from "@theme/DocRoot/Layout"

export default function WorkspaceDocLayout(props: Props) {
  const { pathname } = useLocation()
  return (
    <div
      className={
        pathname === "/" ? "workspace-docs workspace-home" : "workspace-docs"
      }
    >
      <DocRootLayout {...props} />
    </div>
  )
}
