export default () => (
  <board width="20mm" height="10mm" routingDisabled>
    <pcbtrace
      route={[
        { route_type: "wire", x: -5, y: 0, width: 0.3, layer: "top" },
        { route_type: "wire", x: 0, y: 2, width: 0.3, layer: "top" },
        { route_type: "wire", x: 5, y: 0, width: 0.3, layer: "top" },
      ]}
    />
  </board>
)
