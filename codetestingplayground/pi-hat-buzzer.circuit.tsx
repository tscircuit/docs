import { RaspberryPiHatBoard } from "@tscircuit/common"

export default () => (
  <RaspberryPiHatBoard name="HAT1">
    {/* Passive Buzzer - driven by GPIO18 (PWM capable) */}
    <chip
      name="BZ1"
      footprint="0603"
      manufacturerPartNumber="Passive Buzzer"
      pcbX={10}
      pcbY={-10}
    />

    {/* NPN Transistor to drive buzzer (2N2222 or similar) */}
    <chip
      name="Q1"
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
      pcbX={0}
      pcbY={-10}
    />

    {/* Base resistor for transistor (1k) */}
    <resistor name="R1" resistance="1k" footprint="0402" pcbX={-10} pcbY={-10} />

    {/* Connect GPIO18 (PWM) to base resistor */}
    <trace from=".HAT1_chip .GPIO_18" to=".R1 > .pin1" />

    {/* Connect resistor to transistor base */}
    <trace from=".R1 > .pin2" to=".Q1 .B" />

    {/* Connect transistor emitter to ground */}
    <trace from=".Q1 .E" to=".HAT1_chip .GND_1" />

    {/* Connect buzzer positive to 5V */}
    <trace from=".BZ1 > .pin1" to=".HAT1_chip .V5_1" />

    {/* Connect buzzer negative to transistor collector */}
    <trace from=".BZ1 > .pin2" to=".Q1 .C" />
  </RaspberryPiHatBoard>
)
