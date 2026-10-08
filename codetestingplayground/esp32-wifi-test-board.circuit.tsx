export default () => (
  <board width="70mm" height="50mm">
    {/* USB-C Power Subsystem */}
    <chip
      name="J1"
      footprint="qfn16"
      manufacturerPartNumber="USB-C-16P"
      schX={-18}
      schY={4}
      schPortArrangement={{
        leftSide: { pins: ["CC1", "CC2"], direction: "top-to-bottom" },
        rightSide: {
          pins: ["VBUS", "GND", "DP", "DM"],
          direction: "top-to-bottom",
        },
      }}
      pinLabels={{
        pin1: ["GND"],
        pin2: ["VBUS"],
        pin3: ["CC1"],
        pin4: ["CC2"],
        pin5: ["DP"],
        pin6: ["DM"],
      }}
      connections={{
        VBUS: "net.VBUS",
        GND: "net.GND",
        DP: "net.USB_DP",
        DM: "net.USB_DM",
      }}
    />

    <resistor
      name="R_CC1"
      resistance="5.1k"
      footprint="0603"
      schX={-24}
      schY={6}
      connections={{ pin1: ".J1 > .CC1", pin2: "net.GND" }}
    />
    <resistor
      name="R_CC2"
      resistance="5.1k"
      footprint="0603"
      schX={-24}
      schY={2}
      connections={{ pin1: ".J1 > .CC2", pin2: "net.GND" }}
    />

    {/* AMS1117-3.3 Regulator */}
    <chip
      name="U1"
      footprint="sot223"
      manufacturerPartNumber="AMS1117-3.3"
      schX={-10}
      schY={4}
      schPortArrangement={{
        leftSide: { pins: ["VIN"], direction: "top-to-bottom" },
        rightSide: { pins: ["VOUT", "GND"], direction: "top-to-bottom" },
      }}
      pinLabels={{
        pin1: ["GND"],
        pin2: ["VOUT"],
        pin3: ["VIN"],
      }}
      connections={{
        VIN: "net.VBUS",
        VOUT: "net.V3_3",
        GND: "net.GND",
      }}
    />

    <capacitor
      name="C1"
      capacitance="10uF"
      footprint="0805"
      schX={-14}
      schY={-2}
      connections={{ pin1: "net.VBUS", pin2: "net.GND" }}
    />
    <capacitor
      name="C2"
      capacitance="10uF"
      footprint="0805"
      schX={-6}
      schY={-2}
      connections={{ pin1: "net.V3_3", pin2: "net.GND" }}
    />
    <capacitor
      name="C3"
      capacitance="0.1uF"
      footprint="0603"
      schX={-2}
      schY={-2}
      connections={{ pin1: "net.V3_3", pin2: "net.GND" }}
    />

    {/* CP2102N USB-to-UART Bridge */}
    <chip
      name="U2"
      footprint="qfn28"
      manufacturerPartNumber="CP2102N-A02-GQFN28"
      schX={-2}
      schY={10}
      schPortArrangement={{
        leftSide: {
          pins: ["VDD", "REGIN", "VBUS", "D_PLUS", "D_MINUS"],
          direction: "top-to-bottom",
        },
        rightSide: {
          pins: ["TXD", "RXD", "RTS", "DTR", "GND"],
          direction: "top-to-bottom",
        },
      }}
      pinLabels={{
        pin1: ["D_PLUS"],
        pin2: ["D_MINUS"],
        pin3: ["GND"],
        pin4: ["VDD"],
        pin5: ["REGIN"],
        pin6: ["VBUS"],
        pin7: ["RTS"],
        pin8: ["RXD"],
        pin9: ["TXD"],
        pin10: ["DTR"],
      }}
      connections={{
        VDD: "net.V3_3",
        REGIN: "net.V3_3",
        VBUS: "net.VBUS",
        D_PLUS: "net.USB_DP",
        D_MINUS: "net.USB_DM",
        TXD: "net.U0RXD",
        RXD: "net.U0TXD",
        RTS: "net.RTS",
        DTR: "net.DTR",
        GND: "net.GND",
      }}
    />

    <capacitor
      name="C4"
      capacitance="4.7uF"
      footprint="0805"
      schX={-6}
      schY={14}
      connections={{ pin1: "net.V3_3", pin2: "net.GND" }}
    />

    {/* Auto-Program Transistors */}
    <chip
      name="Q1"
      footprint="sot23"
      manufacturerPartNumber="S8050"
      schX={6}
      schY={8}
      schPortArrangement={{
        leftSide: { pins: ["B"], direction: "top-to-bottom" },
        rightSide: { pins: ["C", "E"], direction: "top-to-bottom" },
      }}
      pinLabels={{ pin1: ["B"], pin2: ["E"], pin3: ["C"] }}
      connections={{
        C: "net.EN",
        E: "net.Q2_BASE",
      }}
    />
    <resistor
      name="R_RTS"
      resistance="10k"
      footprint="0603"
      schX={2}
      schY={8}
      connections={{ pin1: "net.RTS", pin2: ".Q1 > .B" }}
    />

    <chip
      name="Q2"
      footprint="sot23"
      manufacturerPartNumber="S8050"
      schX={6}
      schY={2}
      schPortArrangement={{
        leftSide: { pins: ["B"], direction: "top-to-bottom" },
        rightSide: { pins: ["C", "E"], direction: "top-to-bottom" },
      }}
      pinLabels={{ pin1: ["B"], pin2: ["E"], pin3: ["C"] }}
      connections={{
        B: "net.Q2_BASE",
        C: "net.IO0",
        E: "net.Q1_BASE",
      }}
    />
    <resistor
      name="R_DTR"
      resistance="10k"
      footprint="0603"
      schX={2}
      schY={2}
      connections={{ pin1: "net.DTR", pin2: ".Q1 > .E" }}
    />

    {/* ESP32-WROOM-32E */}
    <chip
      name="U3"
      footprint="qfn38"
      manufacturerPartNumber="ESP32-WROOM-32E-N4"
      schX={16}
      schY={4}
      schPortArrangement={{
        leftSide: {
          pins: ["3V3", "EN", "IO0", "IO2", "RXD0", "TXD0"],
          direction: "top-to-bottom",
        },
        rightSide: { pins: ["GND"], direction: "top-to-bottom" },
      }}
      pinLabels={{
        pin1: ["GND"],
        pin2: ["3V3"],
        pin3: ["EN"],
        pin4: ["IO0"],
        pin5: ["IO2"],
        pin6: ["RXD0"],
        pin7: ["TXD0"],
      }}
      connections={{
        "3V3": "net.V3_3",
        EN: "net.EN",
        IO0: "net.IO0",
        IO2: "net.IO2",
        RXD0: "net.U0RXD",
        TXD0: "net.U0TXD",
        GND: "net.GND",
      }}
    />

    {/* EN Circuit */}
    <resistor
      name="R_EN"
      resistance="10k"
      footprint="0603"
      schX={12}
      schY={10}
      connections={{ pin1: "net.V3_3", pin2: "net.EN" }}
    />
    <capacitor
      name="C_EN"
      capacitance="1uF"
      footprint="0603"
      schX={12}
      schY={6}
      connections={{ pin1: "net.EN", pin2: "net.GND" }}
    />

    {/* IO0 Circuit */}
    <resistor
      name="R_IO0"
      resistance="10k"
      footprint="0603"
      schX={12}
      schY={0}
      connections={{ pin1: "net.V3_3", pin2: "net.IO0" }}
    />
    <pushbutton
      name="SW_BOOT"
      footprint="pushbutton"
      schX={22}
      schY={0}
      connections={{ pin1: "net.IO0", pin2: "net.GND" }}
    />

    {/* Status LED */}
    <led
      name="LED1"
      color="blue"
      footprint="0603"
      schX={22}
      schY={-6}
      connections={{ pin1: "net.IO2", pin2: ".R_LED > .pin1" }}
    />
    <resistor
      name="R_LED"
      resistance="1k"
      footprint="0603"
      schX={22}
      schY={-10}
      connections={{ pin1: ".LED1 > .pin2", pin2: "net.GND" }}
    />
  </board>
)
