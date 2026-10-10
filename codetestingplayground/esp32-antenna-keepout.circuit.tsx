// Antenna keepout mini example: simplified ESP32 module at the board
// edge with a keepout zone covering the antenna section, plus one
// manually routed (pcbPath) decoupling trace.
// Companion circuit for docs/tutorials/esp32-pcb-layout-and-routing.mdx

export default () => (
  <board width="30mm" height="30mm" autorouter="auto-local">
    {/* Simplified module: pads in the lower body, antenna on top */}
    <chip
      name="U1"
      pcbX={0}
      pcbY={5}
      manufacturerPartNumber="ESP32-WROOM-32E"
      pinLabels={{
        pin1: ["V3_3"],
        pin2: ["EN"],
        pin3: ["TXD0"],
        pin4: ["RXD0"],
        pin5: ["GND1"],
      }}
      footprint={
        <footprint>
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="-7.5mm"
            pcbY="-1mm"
            portHints={["pin1"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="-7.5mm"
            pcbY="-4mm"
            portHints={["pin2"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="-7.5mm"
            pcbY="-7mm"
            portHints={["pin5"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="7.5mm"
            pcbY="-1mm"
            portHints={["pin3"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="7.5mm"
            pcbY="-4mm"
            portHints={["pin4"]}
          />
          <silkscreenrect pcbX={0} pcbY={0} width={18} height={25.5} />
          <courtyardrect pcbX={0} pcbY={0} width={19} height={26.5} />
        </footprint>
      }
    />

    {/* Antenna keepout: covers the module antenna section plus a  */}
    {/* 3 mm margin. warningOnly avoids hard-failing DRC on the    */}
    {/* module's own antenna section.                              */}
    <keepout
      shape="rect"
      pcbX={0}
      pcbY={14}
      width="24mm"
      height="7mm"
      layers={["top", "bottom"]}
      warningOnly
    />

    {/* Decoupling cap placed safely below the keepout zone, with  */}
    {/* a manual L-shaped route around the keepout x-range.        */}
    {/* maxDecouplingTraceLength relaxes the automatic 1 mm rule   */}
    {/* tscircuit applies between a decoupling cap and its rail.   */}
    <capacitor
      name="C1"
      capacitance="100nF"
      footprint="0603"
      pcbX={-13}
      pcbY={-8}
      maxDecouplingTraceLength="20mm"
    />
    <trace
      from=".C1 > .pin1"
      to=".U1 > .V3_3"
      thickness="0.3mm"
      pcbPathRelativeTo=".C1 > .pin1"
      pcbPath={[
        ".C1 > .pin1",
        { x: 0, y: 12 },
        { x: 5.95, y: 12 },
        ".U1 > .V3_3",
      ]}
    />
    <trace from=".C1 > .pin2" to=".U1 > .GND1" maxLength="30mm" />
  </board>
)
