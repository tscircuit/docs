// Directions used by svg3's image renderer, in the GLB's Y-up coordinates.
const cameraDirections: Record<string, [number, number, number]> = {
  "top-down": [1e-8, 1, -1e-3],
  "top-down-ortho": [1e-8, 1, -1e-3],
  "top-left-corner": [0.7, 1.2, -0.8],
  "top-left": [1, 1.2, 0],
  "top-right-corner": [-0.7, 1.2, -0.8],
  "top-right": [-1, 1.2, 0],
  "left-sideview": [1, 0.05, 0],
  "right-sideview": [-1, 0.05, 0],
  front: [0, 0.05, -1],
  "top-center-angled": [0, 1, -1],
  bottom: [1e-8, -1, -1e-3],
  "bottom-up": [1e-8, -1, -1e-3],
  "bottom-center-angled": [0, -1, -1],
}

export function getCameraOrbit(preset?: string): string {
  // getBestCameraPosition reflects the default camera's X coordinate.
  const [x, y, z] = cameraDirections[preset ?? ""] ?? [0.7, 1.2, -0.8]
  const theta = (Math.atan2(x, z) * 180) / Math.PI
  const phi = (Math.acos(y / Math.hypot(x, y, z)) * 180) / Math.PI
  return `${theta}deg ${phi}deg auto`
}
