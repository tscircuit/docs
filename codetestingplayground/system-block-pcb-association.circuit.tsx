import { systemblock } from "tscircuit"

export default () => (
  <board width="30mm" height="20mm" routingDisabled>
    <group name="power" subcircuit>
      <chip name="U1" footprint="soic8" pcbX={-5} />
      <inductor name="L1" inductance="10uH" footprint="0805" pcbX={2} />
      <capacitor name="C1" capacitance="10uF" footprint="0805" pcbX={6} />
      <capacitor name="C2" capacitance="10uF" footprint="0805" pcbX={10} />
    </group>
    <systemblock.page name="power-overview">
      <systemblock.component
        name="regulator"
        displayName="3.3 V regulator"
        pcbComponentNames={["U1", "L1", "C1", "C2"]}
        pcbSubcircuitName="power"
      />
    </systemblock.page>
  </board>
)
