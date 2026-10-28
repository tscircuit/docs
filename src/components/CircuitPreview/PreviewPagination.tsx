import styles from "./styles.module.css"

export default function PreviewPagination({
  kind,
  index,
  count,
  pageName,
  onChange,
}: {
  kind: string
  index: number
  count: number
  pageName?: string
  onChange: (index: number) => void
}) {
  return (
    <nav aria-label={`${kind} pages`} className={styles.previewPagination}>
      <button
        type="button"
        aria-label={`Previous ${kind.toLowerCase()} page`}
        disabled={index === 0}
        onClick={() => onChange(index - 1)}
      >
        {"<"}
      </button>
      {pageName && <span className={styles.previewPageName}>{pageName}</span>}
      <span aria-live="polite" aria-atomic="true">
        {index + 1}/{count}
      </span>
      <button
        type="button"
        aria-label={`Next ${kind.toLowerCase()} page`}
        disabled={index === count - 1}
        onClick={() => onChange(index + 1)}
      >
        {">"}
      </button>
    </nav>
  )
}
