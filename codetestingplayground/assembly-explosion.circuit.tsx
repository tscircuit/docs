import { assembly } from "@tscircuit/core"
import { Cuboid } from "jscad-fiber"

export default () => (
  <assembly.device name="case">
    <board width="30mm" height="24mm" />
    <assembly.printedpart
      name="cover"
      color="#3283b5"
      jscad={<Cuboid size={[28, 22, 2]} center={[0, 0, 6]} />}
    />
    {[-10, 10].map((x, i) => (
      <assembly.part
        key={i}
        name={`bolt${i + 1}`}
        cadModel={{
          jscad: { type: "cylinder", radius: 1.5, height: 8 },
          positionOffset: { x, y: 0, z: 4 },
        }}
      />
    ))}
    <assembly.explosion.stage name="lift-cover">
      <assembly.explosion.move
        targetRefs={["cover", "remove-bolts"]}
        offZ="12mm"
      />
    </assembly.explosion.stage>
    <assembly.explosion.stage name="remove-bolts" prevStageRef="lift-cover">
      <assembly.explosion.move targetRefs="bolt1, bolt2" offZ="10mm" />
    </assembly.explosion.stage>
  </assembly.device>
)
