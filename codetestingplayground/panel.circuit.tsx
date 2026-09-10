const SmallBoard = () => (
  <board width="20mm" height="15mm">
    <resistor name="R1" resistance="1k" footprint="0402" />
  </board>
)

export default () => (
  <panel layoutMode="grid" col={2} boardGap="3mm" edgePadding="5mm">
    <SmallBoard />
    <SmallBoard />
    <SmallBoard />
    <SmallBoard />
  </panel>
)
