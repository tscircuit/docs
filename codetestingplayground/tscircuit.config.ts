import { readFileSync } from "node:fs"
import { join } from "node:path"

const footprintData = JSON.parse(
  readFileSync(join(import.meta.dir, "deterministic-footprints.json"), "utf8"),
) as Record<string, any[]>

const resolveLocalFootprint = async (partNumber: string) => {
  const normalizedPartNumber = partNumber.replace(/^c/, "C")
  const footprintCircuitJson =
    footprintData[partNumber] ?? footprintData[normalizedPartNumber]
  if (!footprintCircuitJson) {
    throw new Error(`No local footprint data for ${partNumber}`)
  }
  return { footprintCircuitJson }
}

export default {
  platformConfig: {
    pcbDisabled: true,
    partsEngineDisabled: true,
    footprintLibraryMap: {
      jlcpcb: resolveLocalFootprint,
    },
  },
}
