import React, { type ReactNode } from "react"
import DocSidebarItem from "@theme-original/DocSidebarItem"
import type DocSidebarItemType from "@theme/DocSidebarItem"
import type { WrapperProps } from "@docusaurus/types"

type Props = WrapperProps<typeof DocSidebarItemType>

export default function DocSidebarItemWrapper(props: Props): ReactNode {
  const depth = props.level || 1

  return (
    <div className={`sidebar-item-level-${depth}`}>
      <DocSidebarItem {...props} />
    </div>
  )
}
