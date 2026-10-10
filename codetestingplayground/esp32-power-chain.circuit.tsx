export default () => (
  <board width="30mm" height="20mm" autorouter="sequential">
    {/* USB-C receptacle, simplified to the pins this design uses */}
    <chip
      name="J1"
      pcbX={0}
      pcbY={-7}
      manufacturerPartNumber="USB-C-16P"
      pinLabels={{
        pin1: ["VBUS"],
        pin6: ["GND"],
      }}
      footprint={
        <footprint>
          <smtpad
            shape="rect"
            layer="top"
            width="1.4mm"
            height="2.2mm"
            pcbX="-5.25mm"
            pcbY="1mm"
            portHints={["pin1"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.4mm"
            height="2.2mm"
            pcbX="5.25mm"
            pcbY="1mm"
            portHints={["pin6"]}
          />
          <silkscreenrect pcbX={0} pcbY={0.5} width={13} height={5} />
          <courtyardrect pcbX={0} pcbY={0.5} width={14} height={6} />
        </footprint>
      }
    />
    {/* AMS1117-3.3 LDO: VIN from VBUS, VOUT to the 3.3 V rail */}
    <chip
      name="U3"
      footprint="sot223"
      manufacturerPartNumber="AMS1117-3.3"
      pcbX={-8}
      pcbY={3}
      pinLabels={{
        pin1: ["GND"],
        pin2: ["VOUT"],
        pin3: ["VIN"],
        pin4: ["VOUT_TAB"],
      }}
    />
    {/* Bulk caps: one on VIN, one on VOUT, close to the LDO */}
    <capacitor
      name="C1"
      capacitance="22uF"
      footprint="0805"
      maxDecouplingTraceLength="20mm"
      pcbX={-13}
      pcbY={-2}
    />
    <capacitor
      name="C2"
      capacitance="22uF"
      footprint="0805"
      maxDecouplingTraceLength="20mm"
      pcbX={-13}
      pcbY={9}
    />
    {/* Power traces: thicker copper for the supply rails */}
    <trace from=".J1 > .VBUS" to=".U3 > .VIN" thickness="0.5mm" />
    <trace from=".C1 > .pin1" to=".U3 > .VIN" thickness="0.5mm" />
    <trace from=".U3 > .VOUT" to=".C2 > .pin1" thickness="0.5mm" />
    {/* Ground return stubs */}
    <trace from=".J1 > .GND" to="net.GND" />
    <trace from=".C1 > .pin2" to="net.GND" />
    <trace from=".C2 > .pin2" to="net.GND" />
    <trace from=".U3 > .GND" to="net.GND" />
  </board>
)
