# Capacitive Touch Slider Tutorial

This tutorial demonstrates how to create a capacitive touch slider using tscircuit with polygon smtpads and soldermask.

## Overview

A capacitive touch slider is a user input device that detects touch position along a linear track. In this tutorial, we'll create a 5-segment capacitive touch slider using tscircuit's PCB design capabilities.

## Prerequisites

- Basic understanding of tscircuit
- Familiarity with React/TSX syntax

## Step 1: Create the Basic Slider Component

`	sx
import { createUseComponent } from "@tscircuit/core"

export const CapacitiveTouchSlider = () => {
  return (
    <board width="30mm" height="10mm">
      <group>
        {/* Segment 1 */}
        <smtpad
          name="slider_1"
          shape="polygon"
          points={[
            { x: 0, y: 0 },
            { x: 5, y: 0 },
            { x: 5, y: 8 },
            { x: 0, y: 8 },
          ]}
          layer="top"
          coveredWithSolderMask={true}
          solderMaskMargin={0.1}
        />
        
        {/* Segment 2 */}
        <smtpad
          name="slider_2"
          shape="polygon"
          points={[
            { x: 5.5, y: 0 },
            { x: 10.5, y: 0 },
            { x: 10.5, y: 8 },
            { x: 5.5, y: 8 },
          ]}
          layer="top"
          coveredWithSolderMask={true}
          solderMaskMargin={0.1}
        />
        
        {/* Segment 3 */}
        <smtpad
          name="slider_3"
          shape="polygon"
          points={[
            { x: 11, y: 0 },
            { x: 16, y: 0 },
            { x: 16, y: 8 },
            { x: 11, y: 8 },
          ]}
          layer="top"
          coveredWithSolderMask={true}
          solderMaskMargin={0.1}
        />
        
        {/* Segment 4 */}
        <smtpad
          name="slider_4"
          shape="polygon"
          points={[
            { x: 16.5, y: 0 },
            { x: 21.5, y: 0 },
            { x: 21.5, y: 8 },
            { x: 16.5, y: 8 },
          ]}
          layer="top"
          coveredWithSolderMask={true}
          solderMaskMargin={0.1}
        />
        
        {/* Segment 5 */}
        <smtpad
          name="slider_5"
          shape="polygon"
          points={[
            { x: 22, y: 0 },
            { x: 27, y: 0 },
            { x: 27, y: 8 },
            { x: 22, y: 8 },
          ]}
          layer="top"
          coveredWithSolderMask={true}
          solderMaskMargin={0.1}
        />
      </group>
    </board>
  )
}
`

## Step 2: Understanding the Key Properties

### Polygon Points
Each slider segment is defined by 4 points forming a rectangle:
- Bottom-left: { x: 0, y: 0 }
- Bottom-right: { x: 5, y: 0 }
- Top-right: { x: 5, y: 8 }
- Top-left: { x: 0, y: 8 }

### Soldermask Properties

- **coveredWithSolderMask**: When 	rue, the pad is covered with soldermask
- **solderMaskMargin**: Defines how much the soldermask extends beyond the pad (in mm)
  - Positive value: mask extends beyond pad
  - Negative value: mask is smaller than pad (exposes copper)

## Step 3: Visualizing the Design

Use tscircuit's PCB viewer to visualize your design:

`	sx
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

const circuitJson = createUseComponent(CapacitiveTouchSlider)
const pcbSvg = convertCircuitJsonToPcbSvg(circuitJson, {
  showSolderMask: true
})
`

## Step 4: Testing Touch Detection

Connect each slider segment to your microcontroller's touch sensing pins:

`	sx
import { createUseComponent } from "@tscircuit/core"

export const CapacitiveTouchSliderWithConnections = () => {
  return (
    <board width="30mm" height="10mm">
      <CapacitiveTouchSlider />
      
      {/* Connect to microcontroller */}
      <trace from=".slider_1" to=".mcu.TOUCH0" />
      <trace from=".slider_2" to=".mcu.TOUCH1" />
      <trace from=".slider_3" to=".mcu.TOUCH2" />
      <trace from=".slider_4" to=".mcu.TOUCH3" />
      <trace from=".slider_5" to=".mcu.TOUCH4" />
    </board>
  )
}
`

## Advanced: Customizing the Slider

### Different Shapes
You can create curved or tapered slider segments:

`	sx
<smtpad
  name="slider_curved"
  shape="polygon"
  points={[
    { x: 0, y: 0 },
    { x: 5, y: 1 },
    { x: 5, y: 7 },
    { x: 0, y: 8 },
  ]}
  layer="top"
  coveredWithSolderMask={true}
/>
`

### Per-Side Soldermask Margins
For precise control over soldermask exposure:

`	sx
<smtpad
  name="slider_precise"
  shape="polygon"
  points={[...]}
  layer="top"
  coveredWithSolderMask={true}
  solderMaskMarginLeft={0.2}
  solderMaskMarginRight={0.1}
  solderMaskMarginTop={0.15}
  solderMaskMarginBottom={0.15}
/>
`

## Complete Example

See the full working example in our [examples repository](https://github.com/tscircuit/examples).

## Related Documentation

- [SMT Pad Component](/components/smtpad)
- [Polygon Pads](/guides/polygon-pads)
- [Soldermask Configuration](/guides/soldermask)

## Contributing

If you find issues with this tutorial or have suggestions for improvement, please open an issue or PR on the [tscircuit/docs](https://github.com/tscircuit/docs) repository.
