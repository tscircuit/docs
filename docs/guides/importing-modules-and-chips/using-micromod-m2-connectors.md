---
title: Using MicroMod M.2 Connectors
sidebar_position: 5
description: Model SparkFun MicroMod M.2 connectors in tscircuit with an imported footprint and named ports.
---

SparkFun MicroMod processor boards plug into carrier boards through a keyed
M.2 edge connector. In tscircuit, model the connector as a reusable
`<connector />` wrapper: import or define the exact M.2 footprint, assign
selector-safe names to the official MicroMod pins, then connect your carrier
board circuits to those names.

Use the SparkFun references as the source of truth while checking your work:

- [MicroMod Interface pin descriptions](https://cdn.sparkfun.com/assets/learn_tutorials/1/2/0/6/SparkFun_MicroMod_Interface_v1.0_-_Pin_Descriptions.pdf)
- [MicroMod Interface pinout](https://cdn.sparkfun.com/assets/learn_tutorials/1/2/0/6/SparkFun_MicroMod_Interface_v1.0_-_Pinout.pdf)
- [MicroMod graphical datasheet](https://cdn.sparkfun.com/assets/learn_tutorials/1/1/8/9/MicroMod_General_Pinout_v10_Graphical_Datasheet.pdf)
- [MicroMod product family](https://www.sparkfun.com/micromod)
- [Getting started with MicroMod](https://learn.sparkfun.com/tutorials/getting-started-with-micromod)

## Workflow

1. Pick the MicroMod processor board first. Each board can map processor
   features differently onto the shared connector.
2. Import the connector footprint from KiCad or a supplier footprint. See
   [Importing from KiCad](./importing-from-kicad.md) and
   [Importing from JLCPCB](./importing-from-jlcpcb.mdx) for those flows.
3. Wrap the imported footprint with a `MicroModConnector` component so the rest
   of your board connects to names like `I2C_SDA`, `SPI_COPI`, `USB_D_P`, and
   `V3_3` instead of raw pad numbers.
4. Connect only the buses your carrier board needs. Leave processor-specific or
   unused pins unconnected unless the processor board documentation says a
   pull-up, pull-down, test point, or keepout is required.
5. Before ordering boards, compare the generated Gerbers against the SparkFun
   pinout PDF, the graphical datasheet, and the connector manufacturer's land
   pattern. The module key, insertion direction, and top-side pad numbering are
   easy to mirror by accident.

## Pin-label scaffold

The labels below are based on SparkFun's MicroMod Interface v1.0 pinout. They
use selector-safe names, so `USB_D+` becomes `USB_D_P`, active-low pins use
`_N`, and `3.3V` becomes `V3_3`.

```tsx
export const MicroModConnector = (props: {
  name: string
  footprint: any
}) => (
  <connector
    name={props.name}
    standard="m2"
    footprint={props.footprint}
    pinLabels={{
      pin1: "GND",
      pin2: "V3_3",
      pin3: "USB_D_P",
      pin4: "V3_3_EN",
      pin5: "USB_D_N",
      pin6: "RESET_N",
      pin7: "GND",
      pin8: "G11_SWD_SWO",
      pin9: "USB_VIN",
      pin10: "D0",
      pin11: "BOOT",
      pin12: "I2C_SDA",
      pin13: "UART_RTS1",
      pin14: "I2C_SCL",
      pin15: "UART_CTS1",
      pin16: "I2C_INT_N",
      pin17: "UART_TX1",
      pin18: "D1_CAM_TRIG",
      pin19: "UART_RX1",
      pin20: "UART_RX2",
      pin21: "SWDCK",
      pin22: "UART_TX2",
      pin23: "SWDIO",
      // Pins 24-31 are the keyed section of the MicroMod connector.
      pin32: "PWM0",
      pin33: "GND",
      pin34: "A0",
      pin35: "USBHOST_D_P",
      pin36: "GND",
      pin37: "USBHOST_D_N",
      pin38: "A1",
      pin39: "GND",
      pin40: "G0_BUS0",
      pin41: "CAN_RX",
      pin42: "G1_BUS1",
      pin43: "CAN_TX",
      pin44: "G2_BUS2",
      pin45: "GND",
      pin46: "G3_BUS3",
      pin47: "PWM1",
      pin48: "G4_BUS4",
      pin49: "BATT_VIN_DIV3",
      pin50: "AUD_BCLK_PCM_CLK_I2S_SCK_PDM_CLK",
      pin51: "I2C_SDA1",
      pin52: "AUD_LRCLK_PCM_SYNC_I2S_WS_PDM_DATA",
      pin53: "I2C_SCL1",
      pin54: "AUD_IN_PCM_IN_I2S_IN_CAM_PCLK",
      pin55: "SPI_CS_N",
      pin56: "AUD_OUT_PCM_OUT_I2S_OUT_CAM_MCLK",
      pin57: "SPI_SCK",
      pin58: "AUD_MCLK",
      pin59: "SPI_COPI",
      pin60: "SPI_SCK1_SDIO_CLK",
      pin61: "SPI_CIPO",
      pin62: "SPI_COPI1_SDIO_CMD",
      pin63: "G10_ADC_D_P_CAM_VSYNC",
      pin64: "SPI_CIPO1_SDIO_DATA0",
      pin65: "G9_ADC_D_N_CAM_HSYNC",
      pin66: "SDIO_DATA1",
      pin67: "G8",
      pin68: "SDIO_DATA2",
      pin69: "G7_BUS7",
      pin70: "SPI_CS1_N_SDIO_DATA3",
      pin71: "G6_BUS6",
      pin72: "RTC_3V_BATT",
      pin73: "G5_BUS5",
      pin74: "V3_3",
      pin75: "GND",
    }}
  />
)
```

Keep this wrapper next to the footprint import in your carrier-board project.
If your footprint uses different pad names, update the `pinLabels` keys to
match its pad hints before routing.

## Carrier-board example

This example connects a simple I2C expansion header to the primary MicroMod I2C
bus and adds the carrier-side pull-ups described in the SparkFun interface
documentation.

```tsx
import microModM2Footprint from "./SparkFun_MicroMod_M2.kicad_mod"

export default () => (
  <board width="60mm" height="45mm">
    <MicroModConnector name="J1" footprint={microModM2Footprint} />

    <pinheader
      name="J_I2C"
      pinCount={4}
      pinLabels={{ pin1: "GND", pin2: "V3_3", pin3: "SDA", pin4: "SCL" }}
    />
    <resistor name="R_SDA" resistance="4.7kohm" footprint="0603" />
    <resistor name="R_SCL" resistance="4.7kohm" footprint="0603" />
    <capacitor name="C_DEC" capacitance="10uF" footprint="0805" />

    <trace from=".J1 > .GND" to=".J_I2C > .GND" />
    <trace from=".J1 > .V3_3" to=".J_I2C > .V3_3" />
    <trace from=".J1 > .I2C_SDA" to=".J_I2C > .SDA" />
    <trace from=".J1 > .I2C_SCL" to=".J_I2C > .SCL" />

    <trace from=".J1 > .V3_3" to=".R_SDA > .pin1" />
    <trace from=".R_SDA > .pin2" to=".J1 > .I2C_SDA" />
    <trace from=".J1 > .V3_3" to=".R_SCL > .pin1" />
    <trace from=".R_SCL > .pin2" to=".J1 > .I2C_SCL" />

    <trace from=".J1 > .V3_3" to=".C_DEC > .pin1" />
    <trace from=".J1 > .GND" to=".C_DEC > .pin2" />
  </board>
)
```

## Signal groups to check

| Group | Pins | Notes |
| --- | --- | --- |
| Power | `V3_3`, `GND`, `USB_VIN`, `V3_3_EN`, `RTC_3V_BATT`, `BATT_VIN_DIV3` | MicroMod logic is 3.3 V. Do not expose 3.3 V pins to 5 V. |
| USB | `USB_D_P`, `USB_D_N`, `USBHOST_D_P`, `USBHOST_D_N` | Route USB pairs together, keep them short, and avoid stubs. |
| I2C | `I2C_SDA`, `I2C_SCL`, `I2C_INT_N`, `I2C_SDA1`, `I2C_SCL1` | I2C is open drain; place pull-ups on the carrier when the attached boards do not already provide them. |
| SPI and SDIO | `SPI_COPI`, `SPI_CIPO`, `SPI_SCK`, `SPI_CS_N`, secondary `SPI_*1` and `SDIO_*` pins | Check whether the processor board exposes these as SPI, SDIO, or GPIO. |
| UART | `UART_TX1`, `UART_RX1`, `UART_RTS1`, `UART_CTS1`, `UART_TX2`, `UART_RX2` | UART1 and UART2 are intended to be free of USB-to-serial circuitry. |
| CAN | `CAN_RX`, `CAN_TX` | Add the transceiver and termination required by your carrier-board design. |
| Audio and camera | `AUD_*`, `PCM_*`, `I2S_*`, `PDM_*`, `CAM_*` aliases | These pins are shared by function; pick names that match the processor board mode you are using. |
| Debug and control | `RESET_N`, `BOOT`, `SWDIO`, `SWDCK`, `G11_SWD_SWO` | Reset and boot are open-drain control pins in the SparkFun descriptions. |
| General purpose | `A0`, `A1`, `PWM0`, `PWM1`, `D0`, `D1_CAM_TRIG`, `G0_BUS0` through `G10_ADC_D_P_CAM_VSYNC` | Do not assume every processor board supports every alternate function. |

## Layout checklist

- Place and lock the M.2 connector before routing nearby circuits.
- Confirm the keyed section and insertion direction against the processor board.
- Keep connector keepouts, board-edge clearance, and mounting hardware clear.
- Route USB as a differential pair and keep it away from switching supplies.
- Put I2C pull-ups on one side of the bus only.
- Add test points for `V3_3`, `GND`, `RESET_N`, and the buses you expect to
  debug.
- Review processor-board current limits before powering displays, radios,
  motors, or sensor stacks from MicroMod power pins.
