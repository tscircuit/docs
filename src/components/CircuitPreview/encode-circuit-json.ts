import { gzipSync, strToU8 } from "fflate"

/** Chunk base64 encoding so real boards do not exceed the JS argument limit. */
export function encodeCircuitJson(circuitJson: Record<string, unknown>[]) {
  const bytes = gzipSync(strToU8(JSON.stringify(circuitJson)), { mtime: 0 })
  const chunks: string[] = []
  for (let i = 0; i < bytes.length; i += 8192)
    chunks.push(String.fromCharCode(...bytes.subarray(i, i + 8192)))
  return btoa(chunks.join(""))
}
