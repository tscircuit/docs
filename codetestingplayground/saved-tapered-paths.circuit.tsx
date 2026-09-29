import type { FanoutTracePath } from "@tscircuit/props"

const savedPaths: FanoutTracePath[] = [
  {
    connection: "R1.1",
    route: [
      {
        route_type: "wire",
        x: -0.51,
        y: 0,
        width: 0.5,
        layer: "top",
        width_interpolation_mode: "quadratic",
      },
      { route_type: "wire", x: -1.5, y: 0, width: 0.15, layer: "top" },
      { route_type: "wire", x: -2.5, y: 1, width: 0.15, layer: "top" },
      { route_type: "wire", x: -3.5, y: 1, width: 0.15, layer: "top" },
    ],
  },
]

export default () => (
  <board width="20mm" height="12mm">
    <fanout pcbTracePaths={savedPaths}>
      <resistor name="R1" resistance="1k" footprint="0402" />
    </fanout>
    <resistor name="R2" resistance="1k" footprint="0402" pcbX={-6} pcbY={1} />
    <trace from="R1.1" to="R2.2" thickness="0.15mm" />
  </board>
)
