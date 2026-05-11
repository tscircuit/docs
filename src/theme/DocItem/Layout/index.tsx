import React, { type ReactNode } from "react"
import clsx from "clsx"
import { useDoc } from "@docusaurus/plugin-content-docs/client"
import DocItemPaginator from "@theme/DocItem/Paginator"
import DocVersionBanner from "@theme/DocVersionBanner"
import DocVersionBadge from "@theme/DocVersionBadge"
import DocItemFooter from "@theme/DocItem/Footer"
import DocItemTOCMobile from "@theme/DocItem/TOC/Mobile"
import DocItemContent from "@theme/DocItem/Content"
import DocBreadcrumbs from "@theme/DocBreadcrumbs"
import ContentVisibility from "@theme/ContentVisibility"
import type { Props } from "@theme/DocItem/Layout"
import CopyPageButton from "@site/src/components/CopyPageButton"

import styles from "./styles.module.css"

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc()

  const hidden = frontMatter.hide_table_of_contents
  const canRender = !hidden && toc.length > 0

  const mobile = canRender ? <DocItemTOCMobile /> : undefined

  return {
    hidden,
    mobile,
  }
}

export default function DocItemLayout({ children }: Props): ReactNode {
  const docTOC = useDocTOC()
  const { metadata } = useDoc()
  return (
    <div className={clsx("row", styles.docItemRow)}>
      <div className={clsx("col", styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <div className={styles.docItemWithButton}>
              <DocItemContent>
                <div className={styles.contentHeader}>
                  <CopyPageButton />
                </div>
                {children}
              </DocItemContent>
            </div>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
    </div>
  )
}
