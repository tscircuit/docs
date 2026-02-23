---
title: Capacitive Touch Slider
sidebar_position: 100
description: How to create a capacitive touch slider using tscircuit smtpad elements with solver mask.
---

## Introduction

Capacitive touch sliders are user interface elements that detect finger position along a linear set of electrodes. They are commonly used in consumer electronics for volume control, brightness adjustment, and other continuous input.

In tscircuit, you can create a capacitive touch slider using a series of `smtpad` elements with the `solverMask` property. The `solverMask` property allows you to mark pads that should be considered as part of the slider for routing and solver purposes.

## Prerequisites

- Basic understanding of tscircuit components and PCB layout.
- Familiarity with `smtpad` element and its properties.

## Creating a Simple Capacitive Touch Slider

A capacitive touch slider consists of multiple adjacent pads arranged in a line. Each pad is an `smtpad` with a `solverMask` set to `true` (or a specific mask value). The pads can be any shape (rectangular, circular, etc.) and should be placed close together to form a continuous sensing area.

### Example: Linear Slider with Rectangular Pads

The following example creates a slider with five rectangular pads:

```tsx
import { Board, smtpad } from "tscircuit"

const CapacitiveTouchSlider = () => (
  <board width="50mm" height="20mm">
    {/* Pad 1 */}
    <smtpad
      shape="rect"
      width="2mm"
      height="5mm"
      x="-8mm"
      y="0mm"
      layer="top"
      solverMask={true}
    />
    {/* Pad 2 */}
    <smtpad
      shape="rect"
      width="2mm"
      height="5mm"
      x="-4mm"
      y="0mm"
      layer="top"
      solverMask={true}
    />
    {/* Pad 3 */}
    <smtpad
      shape="rect"
      width="2mm"
      height="5mm"
      x="0mm"
      y="0mm"
      layer="top"
      solverMask={true}
    />
    {/* Pad 4 */}
    <smtpad
      shape="rect"
      width="2mm"
      height="5mm"
      x="4mm"
      y="0mm"
      layer="top"
      solverMask={true}
    />
    {/* Pad 5 */}
    <smtpad
      shape="rect"
      width="2mm"
      height="5mm"
      x="8mm"
      y="0mm"
      layer="top"
      solverMask={true}
    />
  </board>
)
```

### Using Different Shapes

You can also use circular pads for a different look and feel:

```tsx
<smtpad
  shape="circle"
  radius="1.5mm"
  x="-8mm"
  y="0mm"
  layer="top"
  solverMask={true}
/>
```

### Connecting to a Microcontroller

Each pad should be connected to a GPIO pin configured as a capacitive touch input. You can route traces from each pad to a microcontroller footprint. Use the `portHints` property to assign a net name for each pad, then connect them with `trace` elements.

```tsx
<smtpad
  shape="rect"
  width="2mm"
  height="5mm"
  x="-8mm"
  y="0mm"
  layer="top"
  solverMask={true}
  portHints="TOUCH1"
/>
<trace path={[".TOUCH1", ".MCU > .GPIO1"]} />
```

## Advanced Usage

### Solver Mask Values

The `solverMask` property can be a boolean (`true`/`false`) or potentially a numeric mask value for more complex slider configurations (e.g., interleaved electrodes). When set to `true`, the pad is included in the solver's consideration for routing and connectivity.

### Covering with Solder Mask

If you want the pads to be covered with solder mask (i.e., not exposed), set `coveredWithSolderMask={true}`. This is useful for sliders that are placed under a protective overlay.

```tsx
<smtpad
  shape="rect"
  width="2mm"
  height="5mm"
  x="0mm"
  y="0mm"
  layer="top"
  solverMask={true}
  coveredWithSolderMask={true}
/>
```

### Polygon Pads for Custom Shapes

For sliders with complex electrode shapes, use the `polygon` shape:

```tsx
<smtpad
  shape="polygon"
  points={[
    { x: "-1mm", y: "-2.5mm" },
    { x: "1mm", y: "-2.5mm" },
    { x: "1mm", y: "2.5mm" },
    { x: "-1mm", y: "2.5mm" },
  ]}
  x="0mm"
  y="0mm"
  layer="top"
  solverMask={true}
/>
```

## Design Considerations

- **Pad spacing**: Keep gaps between pads small (e.g., 0.2mm) to ensure continuous sensing.
- **Pad size**: Larger pads increase sensitivity but reduce spatial resolution.
- **Layer**: Typically placed on the top layer, but can be on bottom if needed.
- **Ground guard**: Surround the slider with a ground guard ring to reduce noise.

## Conclusion

Capacitive touch sliders are easy to implement in tscircuit using the `smtpad` element with the `solverMask` property. By arranging multiple pads in a line and connecting them to a microcontroller, you can create a robust slider interface for your PCB.

## Further Reading

- [SmtPad Component Reference](/footprints/smtpad)
- [Automatic PCB Layout](/guides/tscircuit-essentials/automatic-pcb-layout)
- [Autorouting API](/web-apis/autorouting-api)
