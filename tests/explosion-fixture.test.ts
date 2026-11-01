import { test } from "node:test"
import { strict as assert } from "node:assert"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { gunzipSync } from "fflate"
import fixture from "../src/data/assembly-explosion/rp2040/assembled.circuit.json"
import provenance from "../src/data/assembly-explosion/rp2040/generation.json"
import { encodeCircuitJson } from "../src/components/CircuitPreview/encode-circuit-json"
import { create3dAssetUrls } from "../src/components/CircuitPreview/create-3d-asset-urls"

test("real TSX export retains its provenance and fits a compressed POST without stack overflow", () => {
  const original = readFileSync(
    new URL(
      "../src/data/assembly-explosion/rp2040/assembled.circuit.json",
      import.meta.url,
    ),
  )
  assert.equal(
    createHash("sha256").update(original).digest("hex"),
    provenance.circuitJsonSha256,
  )
  assert.equal(
    fixture.filter((r) => r.type === "cad_explosion_stage").length,
    4,
  )
  const encoded = encodeCircuitJson(fixture)
  const decoded = JSON.parse(
    new TextDecoder().decode(
      gunzipSync(Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0))),
    ),
  )
  assert.deepEqual(decoded, fixture)
  const assets = create3dAssetUrls(
    `https://svg.tscircuit.com/?circuit_json=${encodeURIComponent(encoded)}`,
  )
  assert.ok(assets.requestBody!.length < 1024 * 1024)
  assert.ok(assets.imageUrl.length < 8000)
})
