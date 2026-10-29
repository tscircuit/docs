import { Circuit, getCircuitJsonAssemblyExplosion } from "@tscircuit/core"
import Assembly from "./assembly-explosion.circuit"

// Requires @tscircuit/core >= 0.0.2234. Use the same Core for the TSX and renderer.
const circuit = new Circuit()
circuit.add(<Assembly />)
await circuit.renderUntilSettled()
const json = circuit.getCircuitJson()
const stages = json.filter((record) => record.type === "cad_explosion_stage")
const moves = json.filter((record) => record.type === "cad_explosion_move")
if (stages.length !== 2 || moves.length !== 2)
  throw new Error("Expected two serialized explosion stages and moves")

const halfway = getCircuitJsonAssemblyExplosion(json, {
  throughStageRef: "case.remove-bolts",
  stageProgress: 0.5,
})
if (halfway.circuitJson.some((record) => record.type === "cad_explosion_move"))
  throw new Error("A sampled pose must omit the original explosion program")

await Bun.write(
  new URL(
    "../src/data/assembly-previews/assembly-explosion.json",
    import.meta.url,
  ),
  `${JSON.stringify(json, null, 2)}\n`,
)
console.log(`Exported ${stages.length} stages and ${moves.length} moves`)
