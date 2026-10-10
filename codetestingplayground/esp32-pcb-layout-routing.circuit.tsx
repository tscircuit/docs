// ESP32-WROOM-32E minimal system, focused on PCB layout and routing.
// Companion circuit for docs/tutorials/esp32-pcb-layout-and-routing.mdx
// Module pin numbering is simplified to the pins used by this design.

export default () => (
  <board width="45mm" height="60mm" autorouter="sequential">
    {/* ---------------------------------------------------------- */}
    {/* U1: ESP32-WROOM-32E module, antenna section facing the     */}
    {/* top board edge. Pads sit in the lower part of the module   */}
    {/* body; the top ~8 mm is the antenna keepout zone.           */}
    {/* ---------------------------------------------------------- */}
    <chip
      name="U1"
      pcbX={0}
      pcbY={16.5}
      manufacturerPartNumber="ESP32-WROOM-32E"
      pinLabels={{
        pin1: ["V3_3"], // 3.3 V rail
        pin2: ["EN"],
        pin3: ["IO12"],
        pin4: ["IO15"],
        pin5: ["GND1"],
        pin6: ["GND2"],
        pin7: ["GND3"],
        pin8: ["TXD0"],
        pin9: ["RXD0"],
        pin10: ["IO0"],
        pin11: ["IO2"],
      }}
      footprint={
        <footprint>
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="-7.5mm"
            pcbY="4mm"
            portHints={["pin1"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="-7.5mm"
            pcbY="1mm"
            portHints={["pin2"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="-7.5mm"
            pcbY="-2mm"
            portHints={["pin3"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="-7.5mm"
            pcbY="-5mm"
            portHints={["pin4"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="-7.5mm"
            pcbY="-8mm"
            portHints={["pin5"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="-7.5mm"
            pcbY="-11mm"
            portHints={["pin6"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="7.5mm"
            pcbY="4mm"
            portHints={["pin7"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="7.5mm"
            pcbY="1mm"
            portHints={["pin8"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="7.5mm"
            pcbY="-2mm"
            portHints={["pin9"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="7.5mm"
            pcbY="-5mm"
            portHints={["pin10"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.8mm"
            height="1.4mm"
            pcbX="7.5mm"
            pcbY="-8mm"
            portHints={["pin11"]}
          />
          <silkscreenrect pcbX={0} pcbY={0} width={18} height={25.5} />
          <courtyardrect pcbX={0} pcbY={0} width={19} height={26.5} />
        </footprint>
      }
    />

    {/* Antenna keepout: no traces, vias or copper inside this     */}
    {/* zone. warningOnly keeps the module's own antenna section   */}
    {/* from hard-failing DRC.                                     */}
    <keepout
      shape="rect"
      pcbX={0}
      pcbY={26.5}
      width="24mm"
      height="7mm"
      layers={["top", "bottom"]}
      warningOnly
    />

    {/* ---------------------------------------------------------- */}
    {/* Power: USB-C input, AMS1117-3.3 LDO, input/output caps     */}
    {/* ---------------------------------------------------------- */}
    <chip
      name="J1"
      pcbX={0}
      pcbY={-27}
      manufacturerPartNumber="USB-C-16P"
      pinLabels={{
        pin1: ["VBUS"],
        pin2: ["DP"],
        pin3: ["DM"],
        pin4: ["CC1"],
        pin5: ["CC2"],
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
            pcbX="-3.15mm"
            pcbY="1mm"
            portHints={["pin2"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.4mm"
            height="2.2mm"
            pcbX="-1.05mm"
            pcbY="1mm"
            portHints={["pin3"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.4mm"
            height="2.2mm"
            pcbX="1.05mm"
            pcbY="1mm"
            portHints={["pin4"]}
          />
          <smtpad
            shape="rect"
            layer="top"
            width="1.4mm"
            height="2.2mm"
            pcbX="3.15mm"
            pcbY="1mm"
            portHints={["pin5"]}
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

    <chip
      name="U3"
      footprint="sot223"
      manufacturerPartNumber="AMS1117-3.3"
      pcbX={-15.5}
      pcbY={-6}
      pinLabels={{
        pin1: ["GND"],
        pin2: ["VOUT"],
        pin3: ["VIN"],
        pin4: ["VOUT_TAB"],
      }}
    />

    {/* CP2102N USB-UART bridge. Pin numbering simplified for the  */}
    {/* tutorial: only the pins this design uses are labeled.      */}
    <chip
      name="U2"
      footprint="qfn28"
      manufacturerPartNumber="CP2102N-A02-GQFN28"
      pcbX={6.5}
      pcbY={-12}
      pinLabels={{
        pin1: ["DP"],
        pin2: ["DM"],
        pin3: ["TXD"],
        pin4: ["RXD"],
        pin5: ["DTR"],
        pin6: ["RTS"],
        pin7: ["VDD"],
        pin8: ["VBUS"],
        pin9: ["GND"],
      }}
    />

    {/* Auto-program circuit: DTR/RTS cross-coupled NPN pair       */}
    <chip
      name="Q1"
      footprint="sot23"
      pcbX={-4}
      pcbY={-16}
      pinLabels={{
        pin1: ["B"],
        pin2: ["E"],
        pin3: ["C"],
      }}
    />
    <chip
      name="Q2"
      footprint="sot23"
      pcbX={-4}
      pcbY={-21}
      pinLabels={{
        pin1: ["B"],
        pin2: ["E"],
        pin3: ["C"],
      }}
    />

    {/* Resistors */}
    <resistor
      name="R1"
      resistance="10k"
      footprint="0603"
      pcbX={0.5}
      pcbY={-14.5}
    />
    <resistor
      name="R3"
      resistance="10k"
      footprint="0603"
      pcbX={0.5}
      pcbY={-17.5}
    />
    <resistor
      name="R5"
      resistance="5.1k"
      footprint="0603"
      pcbX={0.5}
      pcbY={-19.8}
    />
    <resistor
      name="R6"
      resistance="5.1k"
      footprint="0603"
      pcbX={3.6}
      pcbY={-21.8}
    />
    <resistor name="R7" resistance="1k" footprint="0603" pcbX={11.5} pcbY={9} />
    <resistor
      name="R8"
      resistance="10k"
      footprint="0603"
      pcbX={-11.5}
      pcbY={15}
    />
    <resistor name="R9" resistance="10k" footprint="0603" pcbX={13} pcbY={12} />

    {/* Capacitors: bulk input/output, EN reset delay, decoupling */}
    <capacitor
      name="C1"
      capacitance="22uF"
      footprint="0805"
      maxDecouplingTraceLength="12mm"
      pcbX={-20.5}
      pcbY={-14}
    />
    <capacitor
      name="C2"
      capacitance="22uF"
      footprint="0805"
      maxDecouplingTraceLength="12mm"
      pcbX={-20.5}
      pcbY={1.5}
    />
    <capacitor
      name="C3"
      capacitance="100nF"
      footprint="0603"
      maxDecouplingTraceLength="8mm"
      pcbX={-11.5}
      pcbY={21}
    />
    <capacitor
      name="C4"
      capacitance="10uF"
      footprint="0805"
      maxDecouplingTraceLength="12mm"
      pcbX={-11.5}
      pcbY={18}
    />
    <capacitor
      name="C5"
      capacitance="100nF"
      footprint="0603"
      maxDecouplingTraceLength="8mm"
      pcbX={1.5}
      pcbY={-12}
    />

    {/* Buttons on the right board edge: BOOT (IO0) and RESET (EN) */}
    <pushbutton name="SW1" footprint="pushbutton" pcbX={17.5} pcbY={-15} />
    <pushbutton name="SW2" footprint="pushbutton" pcbX={13} pcbY={-25.5} />

    {/* User LED on IO2 */}
    <led name="LED1" color="red" footprint="0603" pcbX={11.5} pcbY={5} />

    {/* Prefabricated GND stitching vias near the module ground    */}
    {/* pads; the autorouter can claim them for the ground net.    */}
    <via
      fromLayer="top"
      toLayer="bottom"
      outerDiameter="0.7mm"
      holeDiameter="0.35mm"
      pcbX={-10.5}
      pcbY={9}
      netIsAssignable
    />
    <via
      fromLayer="top"
      toLayer="bottom"
      outerDiameter="0.7mm"
      holeDiameter="0.35mm"
      pcbX={10.5}
      pcbY={14}
      netIsAssignable
    />

    {/* Mounting holes, 2.2 mm for M2 screws */}
    <hole diameter="2.2mm" pcbX={-21} pcbY={27.5} />
    <hole diameter="2.2mm" pcbX={21} pcbY={27.5} />
    <hole diameter="2.2mm" pcbX={-21} pcbY={-27.5} />
    <hole diameter="2.2mm" pcbX={21} pcbY={-27.5} />

    {/* ---------------------------------------------------------- */}
    {/* Power routing: wide traces for VBUS and the 3.3 V rail     */}
    {/* ---------------------------------------------------------- */}
    <trace
      from=".J1 > .VBUS"
      to=".U3 > .VIN"
      thickness="0.5mm"
      maxLength="70mm"
    />
    <trace
      from=".J1 > .VBUS"
      to=".U2 > .VBUS"
      thickness="0.3mm"
      maxLength="70mm"
    />
    <trace
      from=".C1 > .pin1"
      to=".U3 > .VIN"
      thickness="0.5mm"
      maxLength="70mm"
    />
    <trace
      from=".U3 > .VOUT"
      to=".U1 > .V3_3"
      thickness="0.5mm"
      maxLength="70mm"
    />
    <trace
      from=".U3 > .VOUT"
      to=".C2 > .pin1"
      thickness="0.5mm"
      maxLength="70mm"
    />
    <trace
      from=".C3 > .pin1"
      to=".U1 > .V3_3"
      thickness="0.3mm"
      maxLength="70mm"
    />
    <trace
      from=".U3 > .VOUT"
      to=".U2 > .VDD"
      thickness="0.4mm"
      maxLength="70mm"
    />
    <trace from=".R8 > .pin1" to="net.V3_3" maxLength="70mm" />
    <trace from=".R9 > .pin1" to="net.V3_3" maxLength="70mm" />

    {/* USB data pair: short, direct, length-matched by placement  */}
    <trace from=".J1 > .DP" to=".U2 > .DP" thickness="0.3mm" maxLength="70mm" />
    <trace from=".J1 > .DM" to=".U2 > .DM" thickness="0.3mm" maxLength="70mm" />

    {/* CC pull-downs for USB-C sink detection, routed manually    */}
    <trace from=".J1 > .CC1" to=".R5 > .pin1" maxLength="70mm" />
    <trace from=".J1 > .CC2" to=".R6 > .pin1" maxLength="70mm" />

    {/* UART: crossed between CP2102N and the module */}
    <trace from=".U1 > .TXD0" to=".U2 > .RXD" maxLength="70mm" />
    <trace from=".U1 > .RXD0" to=".U2 > .TXD" maxLength="70mm" />

    {/* Auto-program network: DTR/RTS drive the transistor pair */}
    <trace from=".U2 > .DTR" to=".R1 > .pin1" maxLength="70mm" />
    <trace from=".R1 > .pin2" to=".Q1 > .B" maxLength="70mm" />
    <trace from=".U2 > .RTS" to=".R3 > .pin1" maxLength="70mm" />
    <trace from=".R3 > .pin2" to=".Q2 > .B" maxLength="70mm" />
    <trace from=".Q1 > .E" to=".Q2 > .E" maxLength="70mm" />
    <trace from=".Q1 > .C" to="net.EN" maxLength="70mm" />
    <trace from=".Q2 > .C" to="net.IO0" maxLength="70mm" />

    {/* EN reset chain: pull-up, power-on delay cap, RESET button  */}
    <trace from=".C4 > .pin1" to=".U1 > .EN" maxLength="70mm" />
    <trace from=".R8 > .pin2" to="net.EN" maxLength="70mm" />
    <trace from=".SW2 > .pin1" to="net.EN" maxLength="70mm" />

    {/* IO0 boot strap: pull-up, BOOT button                       */}
    <trace from=".U1 > .IO0" to="net.IO0" maxLength="70mm" />
    <trace from=".R9 > .pin2" to="net.IO0" maxLength="70mm" />
    <trace from=".SW1 > .pin1" to="net.IO0" maxLength="70mm" />

    {/* IO2 status LED */}
    <trace from=".U1 > .IO2" to=".R7 > .pin1" maxLength="70mm" />
    <trace from=".R7 > .pin2" to=".LED1 > .pos" maxLength="70mm" />
    <trace from=".LED1 > .neg" to="net.GND" maxLength="70mm" />

    {/* Ground stubs: the autorouter completes the ground net      */}
    <trace from=".U1 > .GND1" to="net.GND" maxLength="70mm" />
    <trace from=".U1 > .GND2" to="net.GND" maxLength="70mm" />
    <trace from=".U1 > .GND3" to="net.GND" maxLength="70mm" />
    <trace from=".U3 > .GND" to="net.GND" maxLength="70mm" />
    <trace from=".U2 > .GND" to="net.GND" maxLength="70mm" />
    <trace from=".J1 > .GND" to="net.GND" maxLength="70mm" />
    <trace from=".C1 > .pin2" to="net.GND" maxLength="70mm" />
    <trace from=".C2 > .pin2" to="net.GND" maxLength="70mm" />
    <trace from=".C3 > .pin2" to="net.GND" maxLength="70mm" />
    <trace from=".C4 > .pin2" to="net.GND" maxLength="70mm" />
    <trace from=".C5 > .pin2" to="net.GND" maxLength="70mm" />
    <trace from=".R5 > .pin2" to="net.GND" maxLength="70mm" />
    <trace from=".R6 > .pin2" to="net.GND" maxLength="70mm" />
    <trace from=".SW1 > .pin2" to="net.GND" maxLength="70mm" />
    <trace from=".SW2 > .pin2" to="net.GND" maxLength="70mm" />
  </board>
)
