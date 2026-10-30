import { useState } from "react"
import GlbPreview from "./GlbPreview"
import { create3dAssetUrls, type ExplosionPose } from "./create-3d-asset-urls"
import styles from "./styles.module.css"

export interface ExplosionStagePreview {
  name: string
  /** Omit to show the original assembled pose. */
  explosion?: ExplosionPose
}

export default function ThreeDPreview({
  sourceUrl,
  cameraPreset,
  imageOverride,
  explosion,
  stages = [],
}: {
  sourceUrl: string
  cameraPreset?: string
  imageOverride?: string
  explosion?: ExplosionPose
  stages?: ExplosionStagePreview[]
}) {
  const stagesKey = JSON.stringify(stages)
  const [selection, setSelection] = useState({ sourceUrl, stagesKey, index: 0 })
  const index =
    selection.sourceUrl === sourceUrl && selection.stagesKey === stagesKey
      ? selection.index
      : 0
  const select = (index: number) =>
    setSelection({ sourceUrl, stagesKey, index })
  const pose = stages.length ? stages[index]?.explosion : explosion
  const assets = create3dAssetUrls(
    sourceUrl,
    cameraPreset,
    pose ? undefined : imageOverride,
    pose,
  )
  return (
    <div className={styles.threeDStages}>
      {stages.length > 1 && (
        <nav
          className={styles.explosionControls}
          aria-label="Assembly explosion stages"
        >
          <button
            type="button"
            aria-label="Previous explosion stage"
            disabled={index === 0}
            onClick={() => select(index - 1)}
          >
            ←
          </button>
          <select
            aria-label="Explosion stage"
            value={index}
            onChange={(event) => select(Number(event.target.value))}
          >
            {stages.map((stage, i) => (
              <option key={i} value={i}>
                {stage.name}
              </option>
            ))}
          </select>
          <span aria-live="polite">
            {index + 1}/{stages.length}
          </span>
          <button
            type="button"
            aria-label="Next explosion stage"
            disabled={index === stages.length - 1}
            onClick={() => select(index + 1)}
          >
            →
          </button>
        </nav>
      )}
      <GlbPreview
        {...assets}
        cameraPreset={cameraPreset}
        alt={
          stages[index]?.name
            ? `Assembly: ${stages[index].name}`
            : "3D Circuit Preview"
        }
      />
    </div>
  )
}
