import { RaspberryPiHatBoard } from "@tscircuit/common"

export default () => (
  <RaspberryPiHatBoard name="HAT1">
    {/* USB-C receptacle for the PD-capable charger input */}
    <chip
      name="J1"
      footprint="pinrow4"
      manufacturerPartNumber="USB-C receptacle"
      pinLabels={{
        pin1: ["VBUS"],
        pin2: ["CC1"],
        pin3: ["CC2"],
        pin4: ["GND"],
      }}
      schPortArrangement={{
        leftSide: {
          pins: ["VBUS", "CC1", "CC2", "GND"],
          direction: "top-to-bottom",
        },
      }}
      pcbX={-18}
      pcbY={8}
    />

    {/* CH224K USB-PD sink controller selects a fixed PDO from the charger */}
    <chip
      name="U1"
      footprint="sop10"
      manufacturerPartNumber="CH224K"
      pinLabels={{
        pin1: ["VBUS"],
        pin2: ["GND"],
        pin3: ["CC1"],
        pin4: ["CC2"],
        pin5: ["CFG1"],
        pin6: ["CFG2"],
        pin7: ["CFG3"],
        pin8: ["PGOOD"],
        pin9: ["EN"],
        pin10: ["VDD"],
      }}
      schPortArrangement={{
        leftSide: {
          pins: ["VBUS", "CC1", "CC2", "EN"],
          direction: "top-to-bottom",
        },
        rightSide: {
          pins: ["VDD", "PGOOD", "CFG1", "CFG2", "CFG3", "GND"],
          direction: "top-to-bottom",
        },
      }}
      pcbX={-3}
      pcbY={8}
    />

    {/* Three-position configuration header for 5V, 9V, 12V, 15V, or 20V PDO selection */}
    <chip
      name="JP1"
      footprint="pinrow6"
      manufacturerPartNumber="3-bit voltage select header"
      pinLabels={{
        pin1: ["CFG1"],
        pin2: ["CFG2"],
        pin3: ["CFG3"],
        pin4: ["GND"],
        pin5: ["VDD"],
        pin6: ["VOUT"],
      }}
      schPortArrangement={{
        leftSide: {
          pins: ["CFG1", "CFG2", "CFG3"],
          direction: "top-to-bottom",
        },
        rightSide: { pins: ["GND", "VDD", "VOUT"], direction: "top-to-bottom" },
      }}
      pcbX={13}
      pcbY={14}
    />

    {/* Protected output terminals for the negotiated rail */}
    <chip
      name="J2"
      footprint="pinrow2"
      manufacturerPartNumber="2-pin 5.08mm terminal block"
      pinLabels={{
        pin1: ["VOUT"],
        pin2: ["GND"],
      }}
      schPortArrangement={{
        rightSide: { pins: ["VOUT", "GND"], direction: "top-to-bottom" },
      }}
      pcbX={18}
      pcbY={-7}
    />

    {/* Optional Pi-side logic header: enable input, power-good output, and ground */}
    <chip
      name="J3"
      footprint="pinrow3"
      manufacturerPartNumber="GPIO status header"
      pinLabels={{
        pin1: ["EN"],
        pin2: ["PGOOD"],
        pin3: ["GND"],
      }}
      schPortArrangement={{
        rightSide: { pins: ["EN", "PGOOD", "GND"], direction: "top-to-bottom" },
      }}
      pcbX={13}
      pcbY={-18}
    />

    <resistor name="R1" resistance="100k" footprint="0402" pcbX={6} pcbY={18} />
    <resistor name="R2" resistance="100k" footprint="0402" pcbX={6} pcbY={14} />
    <resistor name="R3" resistance="100k" footprint="0402" pcbX={6} pcbY={10} />
    <resistor name="R4" resistance="10k" footprint="0402" pcbX={5} pcbY={-15} />
    <resistor name="R5" resistance="2.2k" footprint="0402" pcbX={6} pcbY={-6} />

    <capacitor
      name="C1"
      capacitance="10uF"
      footprint="0805"
      pcbX={-12}
      pcbY={-1}
    />
    <capacitor
      name="C2"
      capacitance="100nF"
      footprint="0402"
      pcbX={-6}
      pcbY={0}
    />
    <capacitor
      name="C3"
      capacitance="47uF"
      footprint="1210"
      pcbX={8}
      pcbY={-2}
    />
    <capacitor
      name="C4"
      capacitance="100nF"
      footprint="0402"
      pcbX={12}
      pcbY={-2}
    />
    <led name="D1" color="green" footprint="0603" pcbX={12} pcbY={-10} />

    <trace from=".J1 .VBUS" to="net.VBUS" />
    <trace from=".J1 .GND" to="net.GND" />
    <trace from=".J1 .CC1" to=".U1 .CC1" />
    <trace from=".J1 .CC2" to=".U1 .CC2" />

    <trace from=".U1 .VBUS" to="net.VBUS" />
    <trace from=".U1 .VDD" to="net.VDD" />
    <trace from=".U1 .GND" to="net.GND" />
    <trace from=".U1 .CFG1" to=".JP1 .CFG1" />
    <trace from=".U1 .CFG2" to=".JP1 .CFG2" />
    <trace from=".U1 .CFG3" to=".JP1 .CFG3" />
    <trace from=".U1 .EN" to=".J3 .EN" />
    <trace from=".U1 .PGOOD" to=".J3 .PGOOD" />

    <trace from=".JP1 .GND" to="net.GND" />
    <trace from=".JP1 .VDD" to="net.VDD" />
    <trace from=".JP1 .VOUT" to="net.VOUT" />
    <trace from=".R1 > .pin1" to=".U1 .CFG1" />
    <trace from=".R2 > .pin1" to=".U1 .CFG2" />
    <trace from=".R3 > .pin1" to=".U1 .CFG3" />
    <trace from=".R1 > .pin2" to="net.GND" />
    <trace from=".R2 > .pin2" to="net.GND" />
    <trace from=".R3 > .pin2" to="net.GND" />

    <trace from=".C1 > .pin1" to="net.VBUS" />
    <trace from=".C2 > .pin1" to="net.VDD" />
    <trace from=".C3 > .pin1" to="net.VOUT" />
    <trace from=".C4 > .pin1" to="net.VOUT" />
    <trace from=".C1 > .pin2" to="net.GND" />
    <trace from=".C2 > .pin2" to="net.GND" />
    <trace from=".C3 > .pin2" to="net.GND" />
    <trace from=".C4 > .pin2" to="net.GND" />

    <trace from=".R4 > .pin1" to=".U1 .EN" />
    <trace from=".R4 > .pin2" to="net.VDD" />
    <trace from=".R5 > .pin1" to=".U1 .PGOOD" />
    <trace from=".R5 > .pin2" to=".D1 .pos" />
    <trace from=".D1 .neg" to="net.GND" />

    <trace from=".J2 .VOUT" to="net.VOUT" />
    <trace from=".J2 .GND" to="net.GND" />
    <trace from=".J3 .GND" to="net.GND" />
    <trace from=".HAT1_chip .GND_1" to="net.GND" />
  </RaspberryPiHatBoard>
)
