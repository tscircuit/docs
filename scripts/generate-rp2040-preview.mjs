/**
 * Usage: bun scripts/generate-rp2040-preview.mjs /path/to/render-runtime
 * In that runtime, install with:
 * bun add circuit-json-to-3d-png@0.0.12 circuit-json-to-gltf@0.0.152 poppygl@0.0.37
 * Matches svg.tscircuit.com's lib/render3dPng.ts at a44009a2567ff906444015d8a0b88e035903e5c3.
 * Render locally because the full Circuit JSON exceeds the service's 1 MB limit.
 */
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"

if (!process.argv[2]) throw new Error("Provide the render runtime directory")
const runtimeUrl = pathToFileURL(resolve(process.argv[2], "package.json")).href
const { convertCircuitJsonTo3dGlb, getDefaultCameraForCircuitJson } =
  await import(import.meta.resolve("circuit-json-to-3d-png", runtimeUrl))
const { renderGLTFToPNGFromGLB } = await import(
  import.meta.resolve("poppygl", runtimeUrl)
)
const url = new URL("https://api.tscircuit.com/package_files/get")
url.searchParams.set(
  "package_release_id",
  "e8d285f7-c3d8-46f5-9a54-344fdde0124e",
)
url.searchParams.set("file_path", "dist/index/circuit.json")
const response = await fetch(url)
if (!response.ok)
  throw new Error(`Circuit JSON fetch failed: ${response.status}`)
const { package_file } = await response.json()
const circuitJson = JSON.parse(package_file.content_text)
const [glb, camera] = await Promise.all([
  convertCircuitJsonTo3dGlb(circuitJson),
  getDefaultCameraForCircuitJson(circuitJson),
])
const png = await renderGLTFToPNGFromGLB(glb, {
  ...camera,
  width: 1600,
  height: 1200,
  backgroundColor: "#ffffff",
  supersampling: 2,
  realistic: true,
})
await Bun.write(
  new URL(
    "../static/img/examples/rp2040-motor-controller-3d.png",
    import.meta.url,
  ),
  png,
)
