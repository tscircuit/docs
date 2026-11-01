import { strict as assert } from "node:assert"
import { test } from "node:test"
import { create3dAssetUrls } from "../src/components/CircuitPreview/create-3d-asset-urls"

test("3D images and models retain the same circuit input with separate presentation options", () => {
  for (const input of [
    "code=abc",
    "fs_map=files&main_component_path=main.tsx&project_base_url=https%3A%2F%2Fdocs.tscircuit.com%2F",
    "circuit_json=json",
  ]) {
    const { imageUrl, glbUrl } = create3dAssetUrls(
      `https://svg.tscircuit.com/?svg_type=3d&format=png&realistic=true&png_width=800&${input}`,
      "bottom-center-angled",
    )
    const image = new URL(imageUrl)
    const model = new URL(glbUrl)
    assert.equal(image.host, "svg3.tscircuit.com")
    assert.equal(model.host, image.host)
    assert.equal(
      image.searchParams.get("camera_preset"),
      "bottom-center-angled",
    )
    assert.equal(model.searchParams.get("format"), "glb")
    for (const option of [
      "svg_type",
      "view",
      "camera_preset",
      "png_width",
      "realistic",
    ])
      assert.equal(model.searchParams.has(option), false)
    for (const [key, value] of new URLSearchParams(input))
      assert.equal(model.searchParams.get(key), value)
  }
  const custom = create3dAssetUrls(
    "https://svg.tscircuit.com/?code=abc",
    "bottom",
    "/img/custom.png",
  )
  assert.equal(custom.imageUrl, "/img/custom.png")
  assert.equal(new URL(custom.glbUrl).searchParams.get("code"), "abc")
})

test("3D stage and partial progress match between images and models", () => {
  const { imageUrl, glbUrl } = create3dAssetUrls(
    "https://svg.tscircuit.com/?code=assembly",
    undefined,
    undefined,
    { throughStageRef: "case.remove-bolts", stageProgress: 0.5 },
  )
  for (const src of [imageUrl, glbUrl]) {
    const url = new URL(src)
    assert.equal(url.searchParams.get("explosion_stage"), "case.remove-bolts")
    assert.equal(url.searchParams.get("explosion_progress"), "0.5")
  }
})

test("large Circuit JSON uses a shared compressed POST body without losing the pose", () => {
  const circuit = "gzipped".repeat(2000)
  const assets = create3dAssetUrls(
    `https://svg.tscircuit.com/?circuit_json=${circuit}`,
    undefined,
    undefined,
    { throughStageRef: "case.lift-cover", stageProgress: 0 },
  )
  assert.deepEqual(JSON.parse(assets.requestBody!), { circuit_json: circuit })
  assert.equal(assets.imageRequestBody, assets.requestBody)
  for (const src of [assets.imageUrl, assets.glbUrl]) {
    assert.equal(new URL(src).searchParams.has("circuit_json"), false)
    assert.equal(new URL(src).searchParams.get("explosion_progress"), "0")
  }
  const override = create3dAssetUrls(
    `https://svg.tscircuit.com/?circuit_json=${circuit}`,
    undefined,
    "/custom.png",
  )
  assert.equal(override.imageRequestBody, undefined)
  assert.equal(override.requestBody, assets.requestBody)
})
