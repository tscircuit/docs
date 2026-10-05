import { strict as assert } from "node:assert"
import { test } from "node:test"
import { create3dAssetUrls } from "../src/components/CircuitPreview/create-3d-asset-urls"

test("3D images and models retain the same circuit input with separate presentation options", () => {
  for (const input of ["code=abc", "fs_map=files&main_component_path=main.tsx&project_base_url=https%3A%2F%2Fdocs.tscircuit.com%2F", "circuit_json=json"]) {
    const { imageUrl, glbUrl } = create3dAssetUrls(`https://svg.tscircuit.com/?svg_type=3d&format=png&realistic=true&png_width=800&${input}`, "bottom-center-angled")
    const image = new URL(imageUrl)
    const model = new URL(glbUrl)
    assert.equal(image.host, "svg3.tscircuit.com")
    assert.equal(model.host, image.host)
    assert.equal(image.searchParams.get("camera_preset"), "bottom-center-angled")
    assert.equal(model.searchParams.get("format"), "glb")
    for (const option of ["camera_preset", "png_width", "realistic"]) assert.equal(model.searchParams.has(option), false)
    for (const [key, value] of new URLSearchParams(input)) assert.equal(model.searchParams.get(key), value)
  }
  const custom = create3dAssetUrls("https://svg.tscircuit.com/?code=abc", "bottom", "/img/custom.png")
  assert.equal(custom.imageUrl, "/img/custom.png")
  assert.equal(new URL(custom.glbUrl).searchParams.get("code"), "abc")
})
