import React, { type ReactNode } from "react"
import DocSidebarItem from "@theme-original/DocSidebarItem"
import type DocSidebarItemType from "@theme/DocSidebarItem"
import type { WrapperProps } from "@docusaurus/types"

type Props = WrapperProps<typeof DocSidebarItemType>

export default function DocSidebarItemWrapper(props: Props): ReactNode {
  const item =
    props.item.type === "category"
      ? { ...props.item, collapsed: true }
      : props.item
  return <DocSidebarItem {...props} item={item} />
}
