---
title: Using MicroMod M.2 Connectors
sidebar_position: 5
description: Document SparkFun MicroMod M.2 connector workflows for tscircuit boards.
---

## Overview

[SparkFun MicroMod](https://www.sparkfun.com/micromod) is a modular board
standard that uses a keyed M.2 edge connector to plug processor boards into
carrier boards. In tscircuit, the most reliable way to design with MicroMod is
to treat the connector as a reusable component with a carefully named pin map,
then route your carrier board to the buses and power rails that your processor
board exposes.

Use the official SparkFun references while assigning pin names:

- [MicroMod Interface pin descriptions](https://cdn.sparkfun.com/assets/learn_tutorials/1/2/0/6/SparkFun_MicroMod_Interface_v1.0_-_Pin_Descriptions.pdf)
- [MicroMod Interface pinout](https://cdn.sparkfun.com/assets/learn_tutorials/1/2/0/6/SparkFun_MicroMod_Interface_v1.0_-_Pinout.pdf)
- [MicroMod graphical datasheet](https://cdn.sparkfun.com/assets/learn_tutorials/1/1/8/9/MicroMod_General_Pinout_v10_Graphical_Datasheet.pdf)
- [Getting started with MicroMod](https://learn.sparkfun.com/tutorials/getting-started-with-micromod)

## Recommended workflow

1. Pick the MicroMod processor board first. Different processors expose
   different peripherals on the same connector pins.
2. Import or model the M.2 connector footprint before placing surrounding
   circuits. If you already have a KiCad footprint, see
   [Importing from KiCad](./importing-from-kicad.md). If the connector is in a
   supplier catalog, see [Importing from JLCPCB](./importing-from-jlcpcb.mdx).
3. Name the connector pins by function, not only by number. For example, expose
   pins such as `I2C_SDA`, `I2C_SCL`, `SPI_CIPO`, `SPI_COPI`, `SPI_SCK`,
   `UART_TX`, `UART_RX`, `USB_D_P`, `USB_D_N`, `VIN`, `VCC_3V3`, and `GND`.
4. Route only the interfaces your carrier board needs. Leave unused pins
   unconnected unless the processor board documentation requires pull-ups,
   pull-downs, or test pads.
5. Keep the M.2 connector orientation, key, keepout, mounting holes, and board
   edge clearance aligned with the SparkFun mechanical drawings.

## Component pattern

Create a local wrapper for the MicroMod connector so the rest of your circuit
can connect to named ports instead of raw pad numbers.

```tsx
export const MicroModConnector = (props: {
  name: string
  footprint: string
}) => (
  <chip
    name={props.name}
    footprint={props.footprint}
    pinLabels={{
      pin1: "GND",
      pin2: "USB_D_P",
      pin3: "USB_D_N",
      pin4: "VCC_3V3",
      pin5: "I2C_SDA",
      pin6: "I2C_SCL",
      pin7: "SPI_CIPO",
      pin8: "SPI_COPI",
      pin9: "SPI_SCK",
      pin10: "UART_TX",
      pin11: "UART_RX",
      pin12: "VIN",
    }}
  />
)
```

:::note
The snippet above shows the naming pattern, not a complete SparkFun pinout or a
built-in footprint name. Before manufacturing, pass the exact connector
footprint you imported or modeled, then replace the sample labels with the exact
pad numbers from the SparkFun MicroMod pinout PDF and your connector footprint.
:::

## Example carrier board connections

This example shows how a carrier board can connect common peripherals to a
MicroMod processor board once the connector wrapper has named ports.

```tsx
export default () => (
  <board width="60mm" height="45mm">
    <MicroModConnector name="J1" footprint="your-micromod-m2-footprint" />

    <resistor name="R1" resistance="4.7kohm" footprint="0603" />
    <resistor name="R2" resistance="4.7kohm" footprint="0603" />
    <capacitor name="C1" capacitance="10uF" footprint="0805" />
    <pinheader
      name="I2C1"
      pinCount={4}
      pinLabels={["GND", "VCC_3V3", "SDA", "SCL"]}
    />

    <trace from=".J1 > .I2C_SDA" to=".I2C1 > .SDA" />
    <trace from=".J1 > .I2C_SCL" to=".I2C1 > .SCL" />
    <trace from=".J1 > .VCC_3V3" to=".I2C1 > .VCC_3V3" />
    <trace from=".J1 > .GND" to=".I2C1 > .GND" />
    <trace from=".J1 > .VCC_3V3" to=".R1 > .pin1" />
    <trace from=".R1 > .pin2" to=".I2C1 > .SDA" />
    <trace from=".J1 > .VCC_3V3" to=".R2 > .pin1" />
    <trace from=".R2 > .pin2" to=".I2C1 > .SCL" />
    <trace from=".J1 > .VCC_3V3" to=".C1 > .pin1" />
    <trace from=".J1 > .GND" to=".C1 > .pin2" />
  </board>
)
```

## Layout checklist

- Place the M.2 connector first and lock its orientation before routing.
- Confirm the keying and insertion direction against the processor board.
- Add keepouts around the connector, the board edge, and any required mounting
  hardware.
- Keep high-speed USB differential traces short, length matched, and away from
  noisy switching nodes.
- Put I2C pull-ups on the carrier only when the processor board or attached
  module does not already provide them.
- Add test points for power rails and shared buses when the board has enough
  space.
- Review current limits for `VIN`, `VCC_3V3`, and any switched power rails before
  powering sensors, radios, displays, or motors from the connector.

## Common mistakes

- Reusing a processor-board pinout without checking the exact MicroMod board
  revision.
- Mirroring the connector footprint by accident. Verify top-side and bottom-side
  pad numbering before ordering.
- Assuming every MicroMod processor exposes every bus. Treat each bus as
  processor-specific unless the SparkFun documentation says it is always present.
- Forgetting that some pins can be shared between SPI, UART, PWM, ADC, or GPIO
  functions depending on the processor board.
- Routing USB, analog, and power pins with the same spacing and trace rules as
  low-speed GPIO.
