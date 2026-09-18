export default () => (
  <board width="80mm" height="60mm">
    {/* ── USB-C Connector ─────────────────────────────── */}
    <chip
      name="J1"
      manufacturerPartNumber="USB4125-GF-A-0190"
      pinLabels={{
        pin1: ["VBUS"],
        pin2: ["D_N"],
        pin3: ["D_P"],
        pin4: ["CC1"],
        pin5: ["CC2"],
        pin6: ["GND"],
      }}
      schPortArrangement={{
        leftSide: {
          pins: ["VBUS", "D_P", "D_N"],
          direction: "top-to-bottom",
        },
        rightSide: {
          pins: ["CC1", "CC2", "GND"],
          direction: "top-to-bottom",
        },
      }}
      footprint="soic8"
      schX={-15}
      schY={0}
      pcbX={-30}
      pcbY={-20}
    />

    {/* CC pull-down resistors for USB-C host detection */}
    <resistor
      name="R1"
      resistance="5.1k"
      footprint="0402"
      pcbX={-20}
      pcbY={-25}
    />
    <resistor
      name="R2"
      resistance="5.1k"
      footprint="0402"
      pcbX={-20}
      pcbY={-15}
    />
    <trace from=".J1 .CC1" to=".R1 > .pin1" />
    <trace from=".R1 > .pin2" to="net.GND" />
    <trace from=".J1 .CC2" to=".R2 > .pin1" />
    <trace from=".R2 > .pin2" to="net.GND" />
    <trace from=".J1 .GND" to="net.GND" />
    <trace from=".J1 .VBUS" to="net.VBUS" />

    {/* ── Power: AMS1117-3.3 LDO ──────────────────────── */}
    <chip
      name="U1"
      manufacturerPartNumber="AMS1117-3.3"
      pinLabels={{
        pin1: ["GND_TAB"],
        pin2: ["VOUT"],
        pin3: ["VIN"],
      }}
      schPortArrangement={{
        leftSide: { pins: ["VIN"], direction: "top-to-bottom" },
        bottomSide: { pins: ["GND_TAB"], direction: "left-to-right" },
        rightSide: { pins: ["VOUT"], direction: "top-to-bottom" },
      }}
      footprint="sot223"
      schX={-5}
      schY={-8}
      pcbX={-10}
      pcbY={-20}
    />

    {/* Input decoupling capacitor */}
    <capacitor
      name="C1"
      capacitance="10uF"
      footprint="0805"
      pcbX={-15}
      pcbY={-20}
    />
    {/* Output decoupling capacitor */}
    <capacitor
      name="C2"
      capacitance="22uF"
      footprint="0805"
      pcbX={-5}
      pcbY={-20}
    />
    {/* Additional 100nF bypass on 3V3 rail */}
    <capacitor
      name="C3"
      capacitance="100nF"
      footprint="0402"
      pcbX={0}
      pcbY={-20}
    />

    <trace from="net.VBUS" to=".C1 > .pin1" />
    <trace from=".C1 > .pin1" to=".U1 .VIN" />
    <trace from=".C1 > .pin2" to="net.GND" />
    <trace from=".U1 .GND_TAB" to="net.GND" />
    <trace from=".U1 .VOUT" to="net.V3_3" />
    <trace from=".U1 .VOUT" to=".C2 > .pin1" />
    <trace from=".C2 > .pin2" to="net.GND" />
    <trace from="net.V3_3" to=".C3 > .pin1" />
    <trace from=".C3 > .pin2" to="net.GND" />

    {/* Power LED on 3V3 rail */}
    <led name="LED1" color="green" footprint="0603" pcbX={5} pcbY={-20} />
    <resistor name="R3" resistance="1k" footprint="0402" pcbX={5} pcbY={-25} />
    <trace from="net.V3_3" to=".R3 > .pin1" />
    <trace from=".R3 > .pin2" to=".LED1 .pos" />
    <trace from=".LED1 .neg" to="net.GND" />

    {/* ── USB-UART Bridge: CP2102N ────────────────────── */}
    <chip
      name="U2"
      manufacturerPartNumber="CP2102N-A02-GQFN24"
      pinLabels={{
        pin1: ["VDD"],
        pin2: ["RXD"],
        pin3: ["TXD"],
        pin4: ["DSR"],
        pin5: ["DTR"],
        pin6: ["RTS"],
        pin7: ["CTS"],
        pin8: ["D_P"],
        pin9: ["D_N"],
        pin10: ["GND"],
      }}
      schPortArrangement={{
        leftSide: {
          pins: ["VDD", "D_P", "D_N", "GND"],
          direction: "top-to-bottom",
        },
        rightSide: {
          pins: ["TXD", "RXD", "DTR", "RTS", "DSR", "CTS"],
          direction: "top-to-bottom",
        },
      }}
      footprint="qfn24"
      schX={-5}
      schY={5}
      pcbX={-10}
      pcbY={0}
    />

    {/* CP2102N bypass cap */}
    <capacitor
      name="C4"
      capacitance="100nF"
      footprint="0402"
      pcbX={-15}
      pcbY={0}
    />

    <trace from=".J1 .D_P" to=".U2 .D_P" />
    <trace from=".J1 .D_N" to=".U2 .D_N" />
    <trace from="net.VBUS" to=".U2 .VDD" />
    <trace from=".U2 .VDD" to=".C4 > .pin1" />
    <trace from=".C4 > .pin2" to="net.GND" />
    <trace from=".U2 .GND" to="net.GND" />

    {/* ── Auto-Program Circuit (DTR/RTS → EN/IO0) ──────── */}
    {/* Q1: NPN - RTS drives EN through collector */}
    <chip
      name="Q1"
      manufacturerPartNumber="SS8050-G"
      footprint="sot23"
      pinLabels={{
        pin1: ["B"],
        pin2: ["E"],
        pin3: ["C"],
      }}
      schPortArrangement={{
        leftSide: { pins: ["B"], direction: "top-to-bottom" },
        rightSide: { pins: ["C", "E"], direction: "top-to-bottom" },
      }}
      schX={8}
      schY={2}
      pcbX={0}
      pcbY={5}
    />
    {/* Q2: NPN - DTR drives IO0 through collector */}
    <chip
      name="Q2"
      manufacturerPartNumber="SS8050-G"
      footprint="sot23"
      pinLabels={{
        pin1: ["B"],
        pin2: ["E"],
        pin3: ["C"],
      }}
      schPortArrangement={{
        leftSide: { pins: ["B"], direction: "top-to-bottom" },
        rightSide: { pins: ["C", "E"], direction: "top-to-bottom" },
      }}
      schX={8}
      schY={10}
      pcbX={0}
      pcbY={15}
    />

    {/* Cross-coupled DTR/RTS auto-program:
        DTR → Q1 base, Q1 collector → EN (reset)
        RTS → Q2 base, Q2 collector → IO0 (boot mode)
        DTR → Q2 emitter, RTS → Q1 emitter (cross-coupling) */}
    <trace from=".U2 .DTR" to=".Q1 .B" />
    <trace from=".Q1 .C" to="net.EN" />
    <trace from=".Q1 .E" to="net.RTS_CROSS" />
    <trace from=".U2 .RTS" to="net.RTS_CROSS" />

    <trace from=".U2 .RTS" to=".Q2 .B" />
    <trace from=".Q2 .C" to="net.IO0" />
    <trace from=".Q2 .E" to="net.DTR_CROSS" />
    <trace from=".U2 .DTR" to="net.DTR_CROSS" />

    {/* ── ESP32-WROOM-32E Module ──────────────────────── */}
    <chip
      name="U3"
      manufacturerPartNumber="ESP32-WROOM-32E"
      pinLabels={{
        pin1: ["GND1"],
        pin2: ["V3_3"],
        pin3: ["EN"],
        pin4: ["IO36"],
        pin5: ["IO39"],
        pin6: ["IO34"],
        pin7: ["IO35"],
        pin8: ["IO32"],
        pin9: ["IO33"],
        pin10: ["IO25"],
        pin11: ["IO26"],
        pin12: ["IO27"],
        pin13: ["IO14"],
        pin14: ["IO12"],
        pin15: ["IO13"],
        pin16: ["GND2"],
        pin17: ["IO15"],
        pin18: ["IO2"],
        pin19: ["IO0"],
        pin20: ["IO4"],
        pin21: ["IO16"],
        pin22: ["IO17"],
        pin23: ["IO5"],
        pin24: ["IO18"],
        pin25: ["IO19"],
        pin26: ["IO21"],
        pin27: ["RXD0"],
        pin28: ["TXD0"],
        pin29: ["IO22"],
        pin30: ["IO23"],
        pin31: ["GND3"],
      }}
      schPortArrangement={{
        leftSide: {
          pins: [
            "V3_3",
            "EN",
            "IO36",
            "IO39",
            "IO34",
            "IO35",
            "IO32",
            "IO33",
            "IO25",
            "IO26",
            "IO27",
            "IO14",
            "IO12",
            "IO13",
          ],
          direction: "top-to-bottom",
        },
        rightSide: {
          pins: [
            "GND1",
            "IO15",
            "IO2",
            "IO0",
            "IO4",
            "IO16",
            "IO17",
            "IO5",
            "IO18",
            "IO19",
            "IO21",
            "RXD0",
            "TXD0",
            "IO22",
            "IO23",
          ],
          direction: "top-to-bottom",
        },
        bottomSide: {
          pins: ["GND2", "GND3"],
          direction: "left-to-right",
        },
      }}
      footprint="bga39"
      schX={22}
      schY={5}
      pcbX={15}
      pcbY={0}
    />

    {/* ESP32 power & ground */}
    <trace from="net.V3_3" to=".U3 .V3_3" />
    <trace from=".U3 .GND1" to="net.GND" />
    <trace from=".U3 .GND2" to="net.GND" />
    <trace from=".U3 .GND3" to="net.GND" />

    {/* ESP32 bulk decoupling */}
    <capacitor
      name="C5"
      capacitance="10uF"
      footprint="0805"
      pcbX={25}
      pcbY={-10}
    />
    <capacitor
      name="C6"
      capacitance="100nF"
      footprint="0402"
      pcbX={25}
      pcbY={-5}
    />
    <trace from="net.V3_3" to=".C5 > .pin1" />
    <trace from=".C5 > .pin2" to="net.GND" />
    <trace from="net.V3_3" to=".C6 > .pin1" />
    <trace from=".C6 > .pin2" to="net.GND" />

    {/* ── EN (Reset) Strapping ────────────────────────── */}
    {/* 10k pull-up + 1uF POR delay cap */}
    <resistor
      name="R4"
      resistance="10k"
      footprint="0402"
      pcbX={10}
      pcbY={-15}
    />
    <capacitor
      name="C7"
      capacitance="1uF"
      footprint="0402"
      pcbX={15}
      pcbY={-15}
    />
    <trace from="net.V3_3" to=".R4 > .pin1" />
    <trace from=".R4 > .pin2" to="net.EN" />
    <trace from="net.EN" to=".U3 .EN" />
    <trace from="net.EN" to=".C7 > .pin1" />
    <trace from=".C7 > .pin2" to="net.GND" />

    {/* RESET button - pulls EN low */}
    <pushbutton
      name="SW1"
      footprint="pushbutton"
      layer="top"
      connections={{ pin1: "net.EN", pin2: "net.GND" }}
      pcbX={20}
      pcbY={-15}
    />

    {/* ── IO0 (Boot) Strapping ────────────────────────── */}
    {/* 10k pull-up (IO0 must be high for normal boot) */}
    <resistor name="R5" resistance="10k" footprint="0402" pcbX={25} pcbY={10} />
    <trace from="net.V3_3" to=".R5 > .pin1" />
    <trace from=".R5 > .pin2" to="net.IO0" />
    <trace from="net.IO0" to=".U3 .IO0" />

    {/* BOOT button - pulls IO0 low for download mode */}
    <pushbutton
      name="SW2"
      footprint="pushbutton"
      layer="top"
      connections={{ pin1: "net.IO0", pin2: "net.GND" }}
      pcbX={30}
      pcbY={10}
    />

    {/* ── UART Connections (crossed TXD/RXD) ──────────── */}
    <trace from=".U2 .TXD" to=".U3 .RXD0" />
    <trace from=".U2 .RXD" to=".U3 .TXD0" />

    {/* ── User LED on IO2 ─────────────────────────────── */}
    <led name="LED2" color="blue" footprint="0603" pcbX={30} pcbY={0} />
    <resistor name="R6" resistance="1k" footprint="0402" pcbX={30} pcbY={5} />
    <trace from=".U3 .IO2" to=".R6 > .pin1" />
    <trace from=".R6 > .pin2" to=".LED2 .pos" />
    <trace from=".LED2 .neg" to="net.GND" />

    {/* ── IO15 / IO5 Strapping Pull-ups ───────────────── */}
    <resistor name="R7" resistance="10k" footprint="0402" pcbX={30} pcbY={15} />
    <trace from="net.V3_3" to=".R7 > .pin1" />
    <trace from=".R7 > .pin2" to=".U3 .IO15" />
    <resistor name="R8" resistance="10k" footprint="0402" pcbX={30} pcbY={20} />
    <trace from="net.V3_3" to=".R8 > .pin1" />
    <trace from=".R8 > .pin2" to=".U3 .IO5" />
  </board>
)
