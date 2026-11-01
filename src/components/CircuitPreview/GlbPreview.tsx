import { createElement, useEffect, useRef, useState } from "react"
import { useRenderedAsset } from "./use-rendered-asset"
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
  requestBody,
  imageRequestBody,
  alt = "3D Circuit Preview",
}: {
  imageUrl: string
  glbUrl: string
  cameraPreset?: string
  requestBody?: string
  imageRequestBody?: string
  alt?: string
}) {
  const [interactive, setInteractive] = useState(false)
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const viewer = useRef<HTMLElement>(null)
  const image = useRenderedAsset(imageUrl, imageRequestBody)
  const model = useRenderedAsset(
    glbUrl,
    requestBody,
    interactive,
    "model/gltf-binary",
  )
  useEffect(() => {
    setInteractive(false)
    setReady(false)
    setLoaded(false)
    setError(false)
  }, [glbUrl, requestBody])
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
  }, [ready, interactive, model.src])

  return (
    <div className={styles.glbPreview}>
      {interactive && ready && model.src && !error && !model.error ? (
        createElement("model-viewer", {
          ref: viewer,
          src: model.src,
          alt: "Interactive 3D circuit model",
          "camera-controls": "",
          "camera-orbit": getCameraOrbit(cameraPreset),
          "min-camera-orbit": "auto 0deg auto",
          "max-camera-orbit": "auto 180deg auto",
          "interaction-prompt": "none",
          className: styles.modelViewer,
        })
      ) : interactive ? (
        <img src={image.src} alt={alt} className={styles.previewImage} />
      ) : (
        <button
          type="button"
          className={styles.previewImageButton}
          aria-label="Rotate the 3D circuit model"
          disabled={!image.src}
          onClick={() => setInteractive(true)}
        >
          <img src={image.src} alt={alt} className={styles.previewImage} />
        </button>
      )}
      {!image.src && !image.error && !interactive && (
        <output className={styles.modelStatus}>Rendering assembly…</output>
      )}
      {image.error && !interactive && (
        <span className={styles.modelStatus} role="alert">
          Could not render the assembly. Reload the page to try again.
        </span>
      )}
      {interactive && !loaded && !error && !model.error && (
        <output className={styles.modelStatus}>Loading 3D model…</output>
      )}
      {interactive && (error || model.error) && (
        <span className={styles.modelStatus} role="alert">
          Could not load the 3D model. Reload the page to try again.
        </span>
      )}
    </div>
  )
}
