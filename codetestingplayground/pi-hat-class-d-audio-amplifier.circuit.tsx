import { RaspberryPiHatBoard } from "@tscircuit/common"

export default () => (
  <RaspberryPiHatBoard name="HAT1">
    <chip
      name="U1"
      footprint="soic16"
      manufacturerPartNumber="PAM8403"
      pinLabels={{
        pin1: ["INL"],
        pin2: ["INR"],
        pin3: ["VREF"],
        pin4: ["GND"],
        pin5: ["OUTL_P"],
        pin6: ["PVDD_L"],
        pin7: ["OUTL_N"],
        pin8: ["GND_L"],
        pin9: ["OUTR_N"],
        pin10: ["PVDD_R"],
        pin11: ["OUTR_P"],
        pin12: ["SD"],
        pin13: ["MUTE"],
        pin14: ["VDD"],
        pin15: ["BYPASS"],
        pin16: ["GND_R"],
      }}
      schPortArrangement={{
        leftSide: {
          pins: ["INL", "INR", "SD", "MUTE"],
          direction: "top-to-bottom",
        },
        rightSide: {
          pins: ["OUTL_P", "OUTL_N", "OUTR_P", "OUTR_N"],
          direction: "top-to-bottom",
        },
        topSide: {
          pins: ["VDD", "PVDD_L", "PVDD_R"],
          direction: "left-to-right",
        },
        bottomSide: {
          pins: ["GND", "GND_L", "GND_R", "VREF", "BYPASS"],
          direction: "left-to-right",
        },
      }}
      pcbX={0}
      pcbY={0}
    />

    <resistor name="R1" resistance="270" footprint="0402" pcbX={-20} pcbY={8} />
    <resistor
      name="R2"
      resistance="270"
      footprint="0402"
      pcbX={-20}
      pcbY={-8}
    />
    <capacitor
      name="C1"
      capacitance="33nF"
      footprint="0402"
      pcbX={-14}
      pcbY={8}
    />
    <capacitor
      name="C2"
      capacitance="33nF"
      footprint="0402"
      pcbX={-14}
      pcbY={-8}
    />

    <potentiometer
      name="RVL"
      maxResistance="10k"
      footprint="pinrow3"
      pcbX={-8}
      pcbY={10}
    />
    <potentiometer
      name="RVR"
      maxResistance="10k"
      footprint="pinrow3"
      pcbX={-8}
      pcbY={-10}
    />

    <resistor name="R3" resistance="10k" footprint="0402" pcbX={8} pcbY={8} />
    <resistor name="R4" resistance="10k" footprint="0402" pcbX={8} pcbY={-8} />
    <capacitor
      name="C3"
      capacitance="100nF"
      footprint="0402"
      pcbX={12}
      pcbY={4}
    />
    <capacitor
      name="C4"
      capacitance="10uF"
      footprint="0603"
      pcbX={12}
      pcbY={-4}
    />
    <capacitor
      name="C5"
      capacitance="1uF"
      footprint="0402"
      pcbX={4}
      pcbY={10}
    />

    <pinheader
      name="J1"
      pinCount={3}
      gender="male"
      pitch="2.54mm"
      footprint="pinrow3"
      pinLabels={["PWM_L", "GND", "PWM_R"]}
      showSilkscreenPinLabels
      pcbX={-26}
      pcbY={0}
    />
    <pinheader
      name="J2"
      pinCount={2}
      gender="female"
      pitch="3.5mm"
      footprint="pinrow2"
      pinLabels={["L+", "L-"]}
      showSilkscreenPinLabels
      pcbX={22}
      pcbY={8}
    />
    <pinheader
      name="J3"
      pinCount={2}
      gender="female"
      pitch="3.5mm"
      footprint="pinrow2"
      pinLabels={["R+", "R-"]}
      showSilkscreenPinLabels
      pcbX={22}
      pcbY={-8}
    />

    <trace from=".HAT1_chip .V5_1" to="net.V5" />
    <trace from=".HAT1_chip .GND_1" to="net.GND" />
    <trace from=".HAT1_chip .GPIO_18" to=".R1 > .pin1" />
    <trace from=".HAT1_chip .GPIO_19" to=".R2 > .pin1" />
    <trace from=".J1 > .pin1" to=".R1 > .pin1" />
    <trace from=".J1 > .pin2" to="net.GND" />
    <trace from=".J1 > .pin3" to=".R2 > .pin1" />

    <trace from=".R1 > .pin2" to=".RVL > .pin1" />
    <trace from=".R2 > .pin2" to=".RVR > .pin1" />
    <trace from=".C1 > .pin1" to=".RVL > .pin1" />
    <trace from=".C1 > .pin2" to="net.GND" />
    <trace from=".C2 > .pin1" to=".RVR > .pin1" />
    <trace from=".C2 > .pin2" to="net.GND" />

    <trace from=".RVL > .pin2" to=".U1 .INL" />
    <trace from=".RVR > .pin2" to=".U1 .INR" />
    <trace from=".RVL > .pin3" to="net.GND" />
    <trace from=".RVR > .pin3" to="net.GND" />

    <trace from=".R3 > .pin1" to="net.V5" />
    <trace from=".R3 > .pin2" to=".U1 .SD" />
    <trace from=".R4 > .pin1" to="net.V5" />
    <trace from=".R4 > .pin2" to=".U1 .MUTE" />
    <trace from=".U1 .VDD" to="net.V5" />
    <trace from=".U1 .PVDD_L" to="net.V5" />
    <trace from=".U1 .PVDD_R" to="net.V5" />
    <trace from=".U1 .GND" to="net.GND" />
    <trace from=".U1 .GND_L" to="net.GND" />
    <trace from=".U1 .GND_R" to="net.GND" />
    <trace from=".C3 > .pin1" to="net.V5" />
    <trace from=".C3 > .pin2" to="net.GND" />
    <trace from=".C4 > .pin1" to="net.V5" />
    <trace from=".C4 > .pin2" to="net.GND" />
    <trace from=".C5 > .pin1" to=".U1 .BYPASS" />
    <trace from=".C5 > .pin2" to="net.GND" />

    <trace from=".U1 .OUTL_P" to=".J2 > .pin1" />
    <trace from=".U1 .OUTL_N" to=".J2 > .pin2" />
    <trace from=".U1 .OUTR_P" to=".J3 > .pin1" />
    <trace from=".U1 .OUTR_N" to=".J3 > .pin2" />
  </RaspberryPiHatBoard>
)
