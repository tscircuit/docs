export default () => (
  <panel layoutMode="grid" col={2} boardGap="5mm" edgePadding="5mm">
    <subpanel
      width="48mm"
      height="21mm"
      layoutMode="grid"
      col={2}
      boardGap="2mm"
      edgePadding="3mm"
    >
      <board width="20mm" height="15mm">
        <resistor name="R1" resistance="1k" footprint="0402" />
      </board>
      <board width="20mm" height="15mm">
        <resistor name="R2" resistance="10k" footprint="0402" />
      </board>
    </subpanel>
    <board width="30mm" height="25mm">
      <capacitor name="C1" capacitance="100nF" footprint="0402" />
    </board>
  </panel>
)
