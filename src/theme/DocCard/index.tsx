import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
  useDocById,
  findFirstSidebarItemLink,
} from "@docusaurus/plugin-content-docs/client";
import { usePluralForm } from "@docusaurus/theme-common";
import isInternalUrl from "@docusaurus/isInternalUrl";
import { translate } from "@docusaurus/Translate";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type CardProps = {
  readonly className?: string;
  readonly href: string;
  readonly icon: string;
  readonly title: string;
  readonly description?: string | null;
};

function useCategoryItemsPlural() {
  const { selectMessage } = usePluralForm();
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
        { count }
      )
    );
}

function CardContainer({
  className,
  href,
  children,
}: React.PropsWithChildren<CardProps>) {
  return (
    <Link href={href} className={clsx(styles.cardContainer, className)}>
      <span className={styles.cardAccent} aria-hidden="true" />
      <span className={styles.cardGlow} aria-hidden="true" />
      <div className={styles.cardContent}>{children}</div>
      <span className={styles.cardArrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}

function CardLayout({ className, href, icon, title, description }: CardProps) {
  return (
    <CardContainer
      className={className}
      href={href}
      icon={icon}
      title={title}
      description={description}
    >
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon} aria-hidden="true">
          {icon}
        </span>
        <Heading
          as="h2"
          className={styles.cardTitle}
          title={title}
        >
          {title}
        </Heading>
      </div>
      {description && (
        <p
          className={styles.cardDescription}
          title={description}
        >
          {description}
        </p>
      )}
    </CardContainer>
  );
}

function CardCategory({ item }: any) {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useCategoryItemsPlural();
  if (!href) {
    return null;
  }
  return (
    <CardLayout
      className={item.className}
      href={href}
      icon="🗂️"
      title={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
    />
  );
}

function CardLink({ item }: any) {
  const icon = isInternalUrl(item.href) ? "📘" : "↗️";
  const doc = useDocById(item.docId ?? undefined);
  return (
    <CardLayout
      className={item.className}
      href={item.href}
      icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export default function DocCard({ item }: any) {
  switch (item.type) {
    case "link":
      return <CardLink item={item} />;
    case "category":
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
