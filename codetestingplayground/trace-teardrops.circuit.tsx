export default () => (
  <board width="16mm" height="10mm">
    <resistor name="R1" resistance="100" footprint="0603" pcbX={-3} />
    <capacitor name="C1" capacitance="10nF" footprint="0603" pcbX={3} />
    <trace
      from="R1.2"
      to="C1.1"
      thickness="0.2mm"
      pcbPath={[]}
      pcbTeardrops
      pcbTeardropEnd={false}
    />
  </board>
)
