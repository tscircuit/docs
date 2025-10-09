import React from "react"
import DocItem from "@theme-original/DocItem"
import type DocItemType from "@theme/DocItem"
import type { WrapperProps } from "@docusaurus/types"
import { useCurrentSidebarCategory } from "@docusaurus/theme-common/internal"
type Props = WrapperProps<typeof DocItemType>

export default function DocItemWrapper(props: Props): React.JSX.Element {
  const currentCategory = useCurrentSidebarCategory() as
    | { label: string }
    | undefined
  return (
    <>
      {currentCategory && (
        <div className="doc-section-subtitle">{currentCategory.label}</div>
      )}
      <DocItem {...props} />
    </>
  )
}
