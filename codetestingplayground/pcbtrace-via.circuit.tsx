export default () => (
  <board width="20mm" height="10mm" routingDisabled>
    <pcbtrace
      route={[
        { route_type: "wire", x: -5, y: -1, width: 0.3, layer: "top" },
        { route_type: "wire", x: 0, y: -1, width: 0.3, layer: "top" },
        {
          route_type: "via",
          x: 0,
          y: -1,
          from_layer: "top",
          to_layer: "bottom",
          outer_diameter: 0.8,
          hole_diameter: 0.4,
        },
        { route_type: "wire", x: 0, y: -1, width: 0.3, layer: "bottom" },
        { route_type: "wire", x: 5, y: 1, width: 0.3, layer: "bottom" },
      ]}
    />
  </board>
)
