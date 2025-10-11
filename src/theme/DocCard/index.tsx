import React, { type ReactNode } from "react"
import clsx from "clsx"
import Link from "@docusaurus/Link"
import {
  useDocById,
  findFirstSidebarItemLink,
} from "@docusaurus/plugin-content-docs/client"
import { usePluralForm } from "@docusaurus/theme-common"
import isInternalUrl from "@docusaurus/isInternalUrl"
import { translate } from "@docusaurus/Translate"

import type { Props } from "@theme/DocCard"
import Heading from "@theme/Heading"
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from "@docusaurus/plugin-content-docs"

import styles from "./styles.module.css"

function useCategoryItemsPlural() {
  const { selectMessage } = usePluralForm()
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          message: "1 item|{count} items",
          id: "theme.docs.DocCard.categoryDescription.plurals",
          description:
            "The default description for a category card in the generated index about how many items this category includes",
        },
        { count },
      ),
    )
}

function CardContainer({
  className,
  href,
  children,
}: {
  className?: string
  href: string
  children: ReactNode
}): ReactNode {
  return (
    <Link
      href={href}
      className={clsx("card padding--lg", styles.cardContainer, className)}
    >
      {children}
    </Link>
  )
}

function CardLayout({
  className,
  href,
  title,
  description,
}: {
  className?: string
  href: string
  title: string
  description?: string
}): ReactNode {
  return (
    <CardContainer href={href} className={className}>
      <Heading
        as="h2"
        className={clsx("text--truncate", styles.cardTitle)}
        title={title}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={clsx("text--truncate", styles.cardDescription)}
          title={description}
        >
          {description}
        </p>
      )}
    </CardContainer>
  )
}

function NestedItem({
  item,
}: { item: PropSidebarItemLink | PropSidebarItemCategory }) {
  if (item.type === "link") {
    const doc = useDocById(item.docId ?? undefined)
    const description = item.description ?? doc?.description
    return (
      <li>
        <Link to={item.href} className={styles.nestedLink}>
          <span className={styles.nestedTitle}>{item.label}</span>
          {description && (
            <>
              <span className={styles.nestedColon}>: </span>
              <span className={styles.nestedDescription}>{description}</span>
            </>
          )}
        </Link>
      </li>
    )
  } else if (item.type === "category") {
    const subHref = findFirstSidebarItemLink(item)
    return subHref ? (
      <li>
        <Link to={subHref} className={styles.nestedLink}>
          <span className={styles.nestedTitle}>{item.label}</span>
          {item.description && (
            <>
              <span className={styles.nestedColon}>: </span>
              <span className={styles.nestedDescription}>
                {item.description}
              </span>
            </>
          )}
        </Link>
      </li>
    ) : null
  }
  return null
}

function CardCategory({ item }: { item: PropSidebarItemCategory }): ReactNode {
  const href = findFirstSidebarItemLink(item)

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null
  }

  return (
    <CardContainer href={href} className={item.className}>
      <Heading
        as="h2"
        className={clsx("text--truncate", styles.cardTitle)}
        title={item.label}
      >
        {item.label}
      </Heading>
      {item.description && (
        <p
          className={clsx("text--truncate", styles.cardDescription)}
          title={item.description}
        >
          {item.description}
        </p>
      )}
      {item.items.length > 0 && (
        <ul className={styles.nestedList}>
          {item.items.map((subItem, index) => (
            <NestedItem key={index} item={subItem as any} />
          ))}
        </ul>
      )}
    </CardContainer>
  )
}

function CardLink({ item }: { item: PropSidebarItemLink }): ReactNode {
  const doc = useDocById(item.docId ?? undefined)
  return (
    <CardLayout
      className={item.className}
      href={item.href}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  )
}

export default function DocCard({ item }: Props): ReactNode {
  switch (item.type) {
    case "link":
      return <CardLink item={item} />
    case "category":
      return <CardCategory item={item} />
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`)
  }
}
