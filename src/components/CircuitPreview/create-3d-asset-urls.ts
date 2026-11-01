export interface ExplosionPose {
  throughStageRef?: string
  stageProgress?: number
}

export function create3dAssetUrls(
  renderUrl: string,
  cameraPreset?: string,
  imageOverride?: string,
  explosion?: ExplosionPose,
) {
  const url = new URL(renderUrl)
  // svg3 owns the model cache populated by image rendering.
  url.host = "svg3.tscircuit.com"
  url.searchParams.set("svg_type", "3d")
  url.searchParams.set("format", "png")
  if (cameraPreset) url.searchParams.set("camera_preset", cameraPreset)
  if (explosion?.throughStageRef !== undefined)
    url.searchParams.set("explosion_stage", explosion.throughStageRef)
  if (explosion?.stageProgress !== undefined)
    url.searchParams.set("explosion_progress", String(explosion.stageProgress))
  // Real boards exceed URL limits. Keep their compressed input in a POST body
  // shared by the image and model requests, so the cache sees the same circuit.
  let requestBody: string | undefined
  if (url.toString().length > 8000 && url.searchParams.has("circuit_json")) {
    requestBody = JSON.stringify({
      circuit_json: url.searchParams.get("circuit_json"),
    })
    url.searchParams.delete("circuit_json")
  }
  const imageUrl = imageOverride ?? url.toString()
  for (const option of [
    "svg_type",
    "view",
    "camera_preset",
    "png_width",
    "png_height",
    "png_density",
    "background_color",
    "background_opacity",
    "zoom_multiplier",
    "show_infinite_grid",
    "realistic",
  ])
    url.searchParams.delete(option)
  url.searchParams.set("format", "glb")
  return {
    imageUrl,
    glbUrl: url.toString(),
    requestBody,
    imageRequestBody: imageOverride ? undefined : requestBody,
  }
}
