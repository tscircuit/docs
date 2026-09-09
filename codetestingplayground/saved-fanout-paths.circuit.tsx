import type { FanoutTracePath } from "@tscircuit/props"

const savedPaths: FanoutTracePath[] = [
  {
    connection: "R1.1",
    route: [
      {
        route_type: "via",
        x: -0.51,
        y: 0,
        from_layer: "top",
        to_layer: "bottom",
        via_diameter: 0.3,
        via_hole_diameter: 0.15,
      },
      { route_type: "wire", x: 1, y: 1, width: 0.2, layer: "bottom" },
      {
        route_type: "via",
        x: 3,
        y: 1,
        from_layer: "bottom",
        to_layer: "top",
        via_diameter: 0.6,
        via_hole_diameter: 0.3,
      },
    ],
  },
]

export default () => (
  <board width="20mm" height="16mm" autorouter={{ allowViaInPad: true }}>
    <fanout name="SAVED_FANOUT" pcbTracePaths={savedPaths}>
      <resistor name="R1" resistance="1k" footprint="0402" pcbX={0} pcbY={0} />
    </fanout>
    <resistor name="R2" resistance="1k" footprint="0402" pcbX={7} pcbY={1} />
    <trace from="R1.1" to="R2.1" />
  </board>
)
