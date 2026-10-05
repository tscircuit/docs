export function create3dAssetUrls(
  renderUrl: string,
  cameraPreset?: string,
  imageOverride?: string,
) {
  const url = new URL(renderUrl)
  // svg3 owns the model cache populated by image rendering.
  url.host = "svg3.tscircuit.com"
  url.searchParams.set("svg_type", "3d")
  url.searchParams.set("format", "png")
  if (cameraPreset) url.searchParams.set("camera_preset", cameraPreset)
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
  return { imageUrl, glbUrl: url.toString() }
}
