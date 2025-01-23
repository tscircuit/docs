---
title: What is tscircuit?
slug: /
sidebar_position: 1
---

tscircuit is an open-source React/Typescript electronics toolchain and ecosystem
for creating, previewing, simulating and manufacturing Printed Circuit Boards
(PCBs).

React and Typescript are standard tools that revolutionized the web development
ecosystem. tscircuit combines the powerful static analysis of Typescript with
the modular component system of React to make developing electronics faster,
easier and more automated.

Here's an example of a basic tscircuit electronic device, it's the USB
flashlight that we make in [this tutorial](../tutorials/building-a-simple-usb-flashlight.md).

```tsx
import { usePushButton } from "@tsci/seveibar.push-button"
import { useUsbC } from "@tsci/seveibar.smd-usb-c"

export default () => {
  const USBCPort = useUsbC("USBC")
  const Button = usePushButton("SW1")
  return (
    <board width="12mm" height="30mm">
      <USBCPort
        GND1="net.GND"
        GND2="net.GND"
        VBUS1="net.VBUS"
        VBUS2="net.VBUS"
        pcbY={-10}
        schX={-4}
      />
      <led name="LED" color="red" footprint="0603" pcbY={12} schY={2} />
      <Button pcbY={0} pin2=".R1 > .pos" pin3="net.VBUS" schY={-2} />
      <resistor name="R1" footprint="0603" resistance="1k" pcbY={7} />

      <trace from=".R1 .neg" to=".LED .pos" />
      <trace from=".LED .neg" to="net.GND" />
    </board>
  )
}
```

Which produces the following schematic, PCB and 3D views:

> Screenshot component in progress!

This small snippet of code helps demonstrate the power of tscircuit. From those
40 lines, we were able to create a full PCB, Schematic and 3D preview. Not only
that, but we can export this circuit to [Fabrication Files](../guides/understanding-fabrication-files)
and get it manufactured. In fact we did!

> Insert image of USB Flashlight
