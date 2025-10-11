import React from "react";
import clsx from "clsx";
import { PageMetadata } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useCurrentSidebarCategory } from "@docusaurus/plugin-content-docs/client";
import DocBreadcrumbs from "@theme/DocBreadcrumbs";
import DocVersionBanner from "@theme/DocVersionBanner";
import DocVersionBadge from "@theme/DocVersionBadge";
import DocPaginator from "@theme/DocPaginator";
import Heading from "@theme/Heading";
import DocCardList from "@theme/DocCardList";
import styles from "./styles.module.css";

type NavigationLink = {
  title: string;
  permalink: string;
};

type CategoryGeneratedIndex = {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  navigation: {
    previous?: NavigationLink | null;
    next?: NavigationLink | null;
  };
};

type Props = {
  readonly categoryGeneratedIndex: CategoryGeneratedIndex;
};

function DocCategoryGeneratedIndexPageMetadata({
  categoryGeneratedIndex,
}: Props) {
  return (
    <PageMetadata
      title={categoryGeneratedIndex.title}
      description={categoryGeneratedIndex.description}
      keywords={categoryGeneratedIndex.keywords}
      image={useBaseUrl(categoryGeneratedIndex.image)}
    />
  );
}

function DocCategoryGeneratedIndexPageContent({
  categoryGeneratedIndex,
}: Props) {
  const category = useCurrentSidebarCategory();
  const previous = categoryGeneratedIndex.navigation.previous ?? undefined;
  const next = categoryGeneratedIndex.navigation.next ?? undefined;
  const hasNavigation = Boolean(previous || next);

  return (
    <div className={styles.page}>
      <DocVersionBanner />
      <div className={styles.breadcrumbs}>
        <DocBreadcrumbs />
      </div>
      <DocVersionBadge />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            {categoryGeneratedIndex.title}
          </Heading>
          {categoryGeneratedIndex.description && (
            <p className={styles.heroSubtitle}>
              {categoryGeneratedIndex.description}
            </p>
          )}
          <div className={styles.heroMeta}>
            <span className={styles.heroMetaHighlight}>
              {category.items.length}
            </span>
            <span className={styles.heroMetaLabel}>
              {category.items.length === 1 ? "Guide" : "Guides"} ready to
              explore
            </span>
          </div>
        </div>
        {hasNavigation && (
          <div className={styles.heroActions}>
            <DocPaginator previous={previous} next={next} />
          </div>
        )}
      </section>

      <section className={styles.body}>
        <div className={clsx(styles.cardListWrapper)}>
          <DocCardList items={category.items} className={styles.cardList} />
        </div>
      </section>
    </div>
  );
}

export default function DocCategoryGeneratedIndexPage(props: Props) {
  return (
    <>
      <DocCategoryGeneratedIndexPageMetadata {...props} />
      <DocCategoryGeneratedIndexPageContent {...props} />
    </>
  );
}
