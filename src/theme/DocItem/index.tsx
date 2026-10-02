import React from "react"
import DocItem from "@theme-original/DocItem"
import type DocItemType from "@theme/DocItem"
import type { WrapperProps } from "@docusaurus/types"
import {
  useCurrentSidebarCategory,
  useDocsSidebar,
} from "@docusaurus/plugin-content-docs/client"
type Props = WrapperProps<typeof DocItemType>

function CategorySubtitle(): React.JSX.Element {
  const currentCategory = useCurrentSidebarCategory()
  return <div className="doc-section-subtitle">{currentCategory.label}</div>
}

export default function DocItemWrapper(props: Props): React.JSX.Element {
  const sidebar = useDocsSidebar()
  return (
    <>
      {sidebar && <CategorySubtitle />}
      <DocItem {...props} />
    </>
  )
}
