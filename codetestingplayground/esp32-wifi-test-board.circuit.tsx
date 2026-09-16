export default () => (
  <board width="40mm" height="30mm">
    {/* ---------- USB-C connector (power + USB data) ---------- */}
    {/* @tsci/seveibar.smd-usb-c */}
    <chip
      name="J1"
      footprint="0603"
      pinLabels={{
        pin1: "VBUS",
        pin2: "GND",
        pin3: "D+",
        pin4: "D-",
      }}
      schPortArrangement={{
        leftSide: { pins: ["pin1", "pin2"], direction: "top-to-bottom" },
        rightSide: { pins: ["pin3", "pin4"], direction: "top-to-bottom" },
      }}
      schX={-14}
      schY={0}
    />

    {/* ---------- 3.3V regulator: AMS1117-3.3 (JLCPCB basic part) ---------- */}
    <chip
      name="U1"
      footprint="sot223"
      manufacturerPartNumber="AMS1117-3.3"
      pinLabels={{
        pin1: "GND",
        pin2: "VOUT",
        pin3: "VIN",
      }}
      schPortArrangement={{
        leftSide: { pins: ["pin3"], direction: "top-to-bottom" },
        rightSide: { pins: ["pin2"], direction: "top-to-bottom" },
        bottomSide: { pins: ["pin1"], direction: "left-to-right" },
      }}
      schX={-9}
      schY={2}
    />

    {/* Regulator capacitors */}
    <capacitor
      name="C1"
      capacitance="10uF"
      footprint="0805"
      schX={-11}
      schY={4}
      schRotation="90deg"
    />
    <capacitor
      name="C2"
      capacitance="22uF"
      footprint="0805"
      schX={-7}
      schY={4}
      schRotation="90deg"
    />
    <capacitor
      name="C3"
      capacitance="100nF"
      footprint="0402"
      schX={-5.5}
      schY={4}
      schRotation="90deg"
    />

    {/* ---------- USB-UART bridge: CP2102N (JLCPCB part) ---------- */}
    <chip
      name="U2"
      footprint="qfn24"
      manufacturerPartNumber="CP2102N-A02-GQFN24R"
      pinLabels={{
        pin1: "VDD",
        pin2: "GND",
        pin3: "REGIN",
        pin4: "D+",
        pin5: "D-",
        pin6: "TXD",
        pin7: "RXD",
        pin8: "DTR",
        pin9: "RTS",
      }}
      schPortArrangement={{
        leftSide: {
          pins: ["pin1", "pin2", "pin3"],
          direction: "top-to-bottom",
        },
        rightSide: {
          pins: ["pin4", "pin5"],
          direction: "top-to-bottom",
        },
        topSide: { pins: ["pin8", "pin9"], direction: "left-to-right" },
        bottomSide: { pins: ["pin6", "pin7"], direction: "left-to-right" },
      }}
      schX={-4}
      schY={-2}
    />
    <capacitor
      name="C4"
      capacitance="100nF"
      footprint="0402"
      schX={-4}
      schY={2}
      schRotation="90deg"
    />

    {/* ---------- Auto-program circuit (cross-coupled NPN pair) ---------- */}
    <chip
      name="Q1"
      footprint="sot23"
      manufacturerPartNumber="SS8050-G"
      pinLabels={{
        pin1: "B",
        pin2: "E",
        pin3: "C",
      }}
      schPortArrangement={{
        leftSide: { pins: ["pin1"], direction: "top-to-bottom" },
        rightSide: { pins: ["pin3", "pin2"], direction: "top-to-bottom" },
      }}
      schX={1}
      schY={-4}
    />
    <chip
      name="Q2"
      footprint="sot23"
      manufacturerPartNumber="SS8050-G"
      pinLabels={{
        pin1: "B",
        pin2: "E",
        pin3: "C",
      }}
      schPortArrangement={{
        leftSide: { pins: ["pin1"], direction: "top-to-bottom" },
        rightSide: { pins: ["pin3", "pin2"], direction: "top-to-bottom" },
      }}
      schX={1}
      schY={-1}
    />
    <resistor
      name="R1"
      resistance="10k"
      footprint="0402"
      schX={-1.5}
      schY={-4.5}
    />
    <resistor
      name="R2"
      resistance="10k"
      footprint="0402"
      schX={-1.5}
      schY={-0.5}
    />

    {/* ---------- ESP32-WROOM-32E module (JLCPCB part) ---------- */}
    <chip
      name="U3"
      manufacturerPartNumber="ESP32-WROOM-32E"
      pinLabels={{
        pin1: "3V3",
        pin2: "GND",
        pin3: "EN",
        pin4: "IO0",
        pin5: "IO2",
        pin6: "TXD0",
        pin7: "RXD0",
      }}
      schPortArrangement={{
        leftSide: {
          pins: ["pin1", "pin2"],
          direction: "top-to-bottom",
        },
        rightSide: {
          pins: ["pin3", "pin4", "pin5"],
          direction: "top-to-bottom",
        },
        bottomSide: {
          pins: ["pin6", "pin7"],
          direction: "left-to-right",
        },
      }}
      schX={8}
      schY={0}
    />

    {/* EN reset circuit: pull-up + delay capacitor */}
    <resistor name="R3" resistance="10k" footprint="0402" schX={5} schY={-5} />
    <capacitor
      name="C5"
      capacitance="1uF"
      footprint="0402"
      schX={5}
      schY={3.5}
      schRotation="90deg"
    />

    {/* IO0 boot strap: pull-up + BOOT button */}
    <resistor name="R4" resistance="10k" footprint="0402" schX={5} schY={6} />
    <pushbutton name="SW1" footprint="smdpushbutton" schX={7.5} schY={7.5} />

    {/* ---------- Status LEDs ---------- */}
    {/* User LED on IO2 */}
    <resistor name="R5" resistance="1k" footprint="0402" schX={12} schY={-3} />
    <led
      name="LED1"
      color="green"
      footprint="0603"
      schX={14}
      schY={-3}
      schRotation="270deg"
    />

    {/* Power LED */}
    <resistor
      name="R6"
      resistance="1k"
      footprint="0402"
      schX={-11}
      schY={6.5}
    />
    <led
      name="LED2"
      color="red"
      footprint="0603"
      schX={-9}
      schY={6.5}
      schRotation="270deg"
    />

    {/* ESP32 decoupling */}
    <capacitor
      name="C6"
      capacitance="100nF"
      footprint="0402"
      schX={8}
      schY={-4.5}
      schRotation="90deg"
    />

    {/* ================= POWER TRACES ================= */}
    <trace from=".J1 > .pin1" to="net.VBUS" />
    <trace from=".J1 > .pin2" to="net.GND" />
    <trace from=".U1 > .pin3" to="net.VBUS" />
    <trace from=".U1 > .pin2" to="net.V3V3" />
    <trace from=".U1 > .pin1" to="net.GND" />
    <trace from=".C1 > .pos" to="net.VBUS" />
    <trace from=".C1 > .neg" to="net.GND" />
    <trace from=".C2 > .pos" to="net.V3V3" />
    <trace from=".C2 > .neg" to="net.GND" />
    <trace from=".C3 > .pos" to="net.V3V3" />
    <trace from=".C3 > .neg" to="net.GND" />
    <trace from=".R6 > .pin1" to="net.V3V3" />
    <trace from=".R6 > .pin2" to=".LED2 > .pos" />
    <trace from=".LED2 > .neg" to="net.GND" />

    {/* ================= USB DATA ================= */}
    <trace from=".J1 > .pin3" to=".U2 > .pin4" />
    <trace from=".J1 > .pin4" to=".U2 > .pin5" />
    <trace from=".U2 > .pin1" to="net.V3V3" />
    <trace from=".U2 > .pin2" to="net.GND" />
    <trace from=".U2 > .pin3" to="net.VBUS" />
    <trace from=".C4 > .pos" to="net.V3V3" />
    <trace from=".C4 > .neg" to="net.GND" />

    {/* ================= UART ================= */}
    {/* crossed: CP2102 TXD -> ESP32 RXD0, CP2102 RXD <- ESP32 TXD0 */}
    <trace from=".U2 > .pin6" to=".U3 > .pin7" />
    <trace from=".U2 > .pin7" to=".U3 > .pin6" />

    {/* ================= AUTO-PROGRAM ================= */}
    <trace from=".U2 > .pin9" to=".R1 > .pin1" />
    <trace from=".R1 > .pin2" to=".Q1 > .pin1" />
    <trace from=".U2 > .pin8" to=".R2 > .pin1" />
    <trace from=".R2 > .pin2" to=".Q2 > .pin1" />
    <trace from=".Q1 > .pin2" to="net.GND" />
    <trace from=".Q2 > .pin2" to="net.GND" />
    <trace from=".Q1 > .pin3" to=".U3 > .pin3" />
    <trace from=".Q2 > .pin3" to=".U3 > .pin4" />

    {/* ================= ESP32 SUPPORT ================= */}
    <trace from=".U3 > .pin1" to="net.V3V3" />
    <trace from=".U3 > .pin2" to="net.GND" />
    <trace from=".C6 > .pos" to="net.V3V3" />
    <trace from=".C6 > .neg" to="net.GND" />

    {/* EN: pull-up + power-on reset delay */}
    <trace from=".R3 > .pin1" to="net.V3V3" />
    <trace from=".R3 > .pin2" to=".U3 > .pin3" />
    <trace from=".C5 > .pos" to=".U3 > .pin3" />
    <trace from=".C5 > .neg" to="net.GND" />

    {/* IO0: pull-up + BOOT button to ground */}
    <trace from=".R4 > .pin1" to="net.V3V3" />
    <trace from=".R4 > .pin2" to=".U3 > .pin4" />
    <trace from=".SW1 > .pin1" to=".U3 > .pin4" />
    <trace from=".SW1 > .pin2" to="net.GND" />

    {/* User LED on IO2 */}
    <trace from=".U3 > .pin5" to=".R5 > .pin1" />
    <trace from=".R5 > .pin2" to=".LED1 > .pos" />
    <trace from=".LED1 > .neg" to="net.GND" />
  </board>
)
