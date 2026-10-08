import { createElement, useEffect, useRef, useState } from "react"
import { getCameraOrbit } from "./camera-orbit"
import styles from "./styles.module.css"

let viewerModule: Promise<void> | undefined
function loadViewer() {
  if (customElements.get("model-viewer")) return Promise.resolve()
  if (!viewerModule) {
    viewerModule = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script")
      script.type = "module"
      script.src =
        "https://cdn.jsdelivr.net/npm/@google/model-viewer@4.1.0/dist/model-viewer.min.js"
      script.onload = () => {
        void customElements.whenDefined("model-viewer").then(() => resolve())
      }
      script.onerror = () => {
        script.remove()
        viewerModule = undefined
        reject(new Error("Viewer could not load"))
      }
      document.head.appendChild(script)
    })
  }
  return viewerModule
}

export default function GlbPreview({
  imageUrl,
  glbUrl,
  cameraPreset,
}: {
  imageUrl: string
  glbUrl: string
  cameraPreset?: string
}) {
  const [interactive, setInteractive] = useState(false)
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const viewer = useRef<HTMLElement>(null)
  useEffect(() => {
    setInteractive(false)
    setReady(false)
    setLoaded(false)
    setError(false)
  }, [glbUrl])
  useEffect(() => {
    if (!interactive) return
    let cancelled = false
    loadViewer().then(
      () => {
        if (!cancelled) setReady(true)
      },
      () => {
        if (!cancelled) setError(true)
      },
    )
    return () => {
      cancelled = true
    }
  }, [interactive])
  useEffect(() => {
    const element = viewer.current
    if (!element) return
    const onLoad = () => setLoaded(true)
    const onError = () => setError(true)
    element.addEventListener("load", onLoad)
    element.addEventListener("error", onError)
    return () => {
      element.removeEventListener("load", onLoad)
      element.removeEventListener("error", onError)
    }
  }, [ready, interactive])

  return (
    <div className={styles.glbPreview}>
      {interactive && ready && !error ? (
        createElement("model-viewer", {
          ref: viewer,
          src: glbUrl,
          alt: "Interactive 3D circuit model",
          "camera-controls": "",
          "camera-orbit": getCameraOrbit(cameraPreset),
          "min-camera-orbit": "auto 0deg auto",
          "max-camera-orbit": "auto 180deg auto",
          "interaction-prompt": "none",
          className: styles.modelViewer,
        })
      ) : interactive ? (
        <img
          src={imageUrl}
          alt="3D Circuit Preview"
          className={styles.previewImage}
        />
      ) : (
        <button
          type="button"
          className={styles.previewImageButton}
          aria-label="Rotate the 3D circuit model"
          onClick={() => setInteractive(true)}
        >
          <img
            src={imageUrl}
            alt="3D Circuit Preview"
            className={styles.previewImage}
          />
        </button>
      )}
      {interactive && !loaded && !error && (
        <output className={styles.modelStatus}>Loading 3D model…</output>
      )}
      {interactive && error && (
        <span className={styles.modelStatus} role="alert">
          Could not load the 3D model. Reload the page to try again.
        </span>
      )}
    </div>
  )
}
