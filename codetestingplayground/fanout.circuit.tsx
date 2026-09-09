export default () => (
  <board width="20mm" height="16mm">
    <fanout name="R1_FANOUT" padding="2mm">
      <resistor name="R1" resistance="1k" footprint="0402" pcbX={0} pcbY={0} />
    </fanout>
    <resistor name="R2" resistance="1k" footprint="0402" pcbX={7} pcbY={0} />
    <trace name="SIGNAL" from="R1.1" to="R2.1" />
  </board>
)
