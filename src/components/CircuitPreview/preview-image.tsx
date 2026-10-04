import { useEffect, useRef, useState } from "react"
import styles from "./preview-image.module.css"

export default function PreviewImage({
  src,
  alt,
  className,
  imageClassName,
  hidden = false,
}: {
  src: string
  alt: string
  className: string
  imageClassName: string
  hidden?: boolean
}) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading")
  const [attempt, setAttempt] = useState(0)
  const imageRef = useRef<HTMLImageElement>(null)
  const label = alt.replace(/ Circuit Preview$| simulation preview:.*$/, "")

  useEffect(() => {
    // Cached images may finish before React attaches the load handler.
    if (imageRef.current?.complete && imageRef.current.naturalWidth > 0) {
      setState("loaded")
    }
  }, [attempt])

  return (
    <div
      className={`${className} ${styles.preview}`}
      aria-busy={state === "loading"}
    >
      <img
        key={attempt}
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={() => setState("loaded")}
        onError={() => setState("error")}
        className={`${imageClassName} ${styles.image}`}
        style={{ opacity: state === "loaded" ? 1 : 0 }}
      />
      {state !== "loaded" && (
        <div className={styles.placeholder}>
          <div className={styles.message}>
            {state === "loading" && (
              <span className={styles.spinner} aria-hidden="true" />
            )}
            <div role={hidden ? undefined : "status"} aria-atomic="true">
              <div className={styles.title}>
                {state === "loading"
                  ? `Loading ${label} preview`
                  : `${label} preview unavailable`}
              </div>
              <div className={styles.description}>
                {state === "loading"
                  ? "Complex circuits may take a little longer."
                  : "The preview couldn’t be loaded. Please try again."}
              </div>
            </div>
            {state === "error" && (
              <button
                type="button"
                className={styles.retry}
                onClick={() => {
                  setState("loading")
                  setAttempt((previous) => previous + 1)
                }}
              >
                Retry preview
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
