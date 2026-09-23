import { SmdUsbC } from "@tsci/seveibar.smd-usb-c"

const cp2102PinLabels = {
  pin1: "DCD",
  pin2: "RI",
  pin3: "GND",
  pin4: "D_PLUS",
  pin5: "D_MINUS",
  pin6: "VDD",
  pin7: "REGIN",
  pin8: "VBUS",
  pin9: "RST",
  pin10: "NC1",
  pin11: "SUSPEND",
  pin12: "SUSPEND",
  pin13: "NC2",
  pin14: "NC3",
  pin15: "NC4",
  pin16: "NC5",
  pin17: "NC6",
  pin18: "NC7",
  pin19: "NC8",
  pin20: "NC9",
  pin21: "NC10",
  pin22: "NC11",
  pin23: "CTS",
  pin24: "RTS",
  pin25: "RXD",
  pin26: "TXD",
  pin27: "DSR",
  pin28: "DTR",
  pin29: "PGND",
}

const esp32PinLabels = {
  pin1: "GND",
  pin2: "3V3",
  pin3: "EN",
  pin4: "SENSOR_VP",
  pin5: "SENSOR_VN",
  pin6: "IO34",
  pin7: "IO35",
  pin8: "IO32",
  pin9: "IO33",
  pin10: "IO25",
  pin11: "IO26",
  pin12: "IO27",
  pin13: "IO14",
  pin14: "IO12",
  pin15: "GND",
  pin16: "IO13",
  pin17: "SD2",
  pin18: "SD3",
  pin19: "CMD",
  pin20: "CLK",
  pin21: "SD0",
  pin22: "SD1",
  pin23: "IO15",
  pin24: "IO2",
  pin25: "IO0",
  pin26: "IO4",
  pin27: "IO16",
  pin28: "IO17",
  pin29: "IO5",
  pin30: "IO18",
  pin31: "IO19",
  pin32: "NC",
  pin33: "IO21",
  pin34: "RXD0",
  pin35: "TXD0",
  pin36: "IO22",
  pin37: "IO23",
  pin38: "GND",
}

const jlc = (part: string) => ({ jlcpcb: [part] })

export default () => (
  <board width="60mm" height="40mm">
    <schematicsheet name="Main" displayName="Main" sheetIndex={0} />
    <SmdUsbC
      name="J1"
      supplierPartNumbers={jlc("C165948")}
      pcbX={-24}
      pcbY={13}
      pcbRotation={180}
      schX={-25}
      schY={8}
      noConnect={["SBU1", "SBU2"]}
    />

    <resistor
      name="R1"
      resistance="5.1k"
      footprint="jlcpcb:C25905"
      supplierPartNumbers={jlc("C25905")}
      manufacturerPartNumber="0402WGF5101TCE"
      pcbX={-20}
      pcbY={7}
      schX={-20}
      schY={4}
    />
    <resistor
      name="R2"
      resistance="5.1k"
      footprint="jlcpcb:C25905"
      supplierPartNumbers={jlc("C25905")}
      manufacturerPartNumber="0402WGF5101TCE"
      pcbX={-14}
      pcbY={7}
      schX={-14}
      schY={4}
    />

    <chip
      name="U1"
      footprint="jlcpcb:C6186"
      supplierPartNumbers={jlc("C6186")}
      manufacturerPartNumber="AMS1117-3.3"
      pinLabels={{
        pin1: "GND",
        pin2: "VOUT",
        pin3: "VIN",
        pin4: "VOUT",
      }}
      schPinArrangement={{
        leftSide: { pins: ["VIN"], direction: "top-to-bottom" },
        rightSide: { pins: ["VOUT"], direction: "top-to-bottom" },
        bottomSide: { pins: ["GND"], direction: "left-to-right" },
      }}
      pcbX={-13}
      pcbY={14}
      schX={-13}
      schY={8}
    />

    <capacitor
      name="C1"
      capacitance="10uF"
      footprint="jlcpcb:C15850"
      supplierPartNumbers={jlc("C15850")}
      manufacturerPartNumber="CL21A106KAYNNNE"
      pcbX={-18}
      pcbY={17}
      schX={-19}
      schY={12}
    />
    <capacitor
      name="C2"
      capacitance="22uF"
      footprint="jlcpcb:C45783"
      supplierPartNumbers={jlc("C45783")}
      manufacturerPartNumber="CL21A226MAQNNNE"
      pcbX={-9}
      pcbY={17}
      schX={-10}
      schY={12}
    />
    <capacitor
      name="C3"
      capacitance="100nF"
      footprint="jlcpcb:C1525"
      supplierPartNumbers={jlc("C1525")}
      manufacturerPartNumber="CL05B104KO5NNNC"
      pcbX={-6}
      pcbY={14}
      schX={-6}
      schY={12}
    />

    <chip
      name="U2"
      footprint="jlcpcb:C964632"
      supplierPartNumbers={jlc("C964632")}
      manufacturerPartNumber="CP2102N-A02-GQFN28R"
      pinLabels={cp2102PinLabels}
      noConnect={[
        "DCD",
        "RI",
        "RST",
        "NC1",
        "SUSPEND",
        "NC2",
        "NC3",
        "NC4",
        "NC5",
        "NC6",
        "NC7",
        "NC8",
        "NC9",
        "NC10",
        "NC11",
        "CTS",
        "DSR",
      ]}
      schPinArrangement={{
        leftSide: {
          pins: ["GND", "VDD", "REGIN", "VBUS", "PGND"],
          direction: "top-to-bottom",
        },
        rightSide: {
          pins: ["D_PLUS", "D_MINUS"],
          direction: "top-to-bottom",
        },
        topSide: { pins: ["RTS", "DTR"], direction: "left-to-right" },
        bottomSide: { pins: ["RXD", "TXD"], direction: "left-to-right" },
      }}
      pcbX={-2}
      pcbY={5}
      schX={-4}
      schY={3}
    />
    <capacitor
      name="C4"
      capacitance="100nF"
      footprint="jlcpcb:C1525"
      supplierPartNumbers={jlc("C1525")}
      manufacturerPartNumber="CL05B104KO5NNNC"
      pcbX={2}
      pcbY={5}
      schX={-1}
      schY={9}
    />

    <transistor
      name="Q1"
      type="npn"
      footprint="jlcpcb:C2150"
      supplierPartNumbers={jlc("C2150")}
      manufacturerPartNumber="SS8050"
      pcbX={7}
      pcbY={1}
      schX={6}
      schY={1}
    />
    <transistor
      name="Q2"
      type="npn"
      footprint="jlcpcb:C2150"
      supplierPartNumbers={jlc("C2150")}
      manufacturerPartNumber="SS8050"
      pcbX={7}
      pcbY={-3}
      schX={6}
      schY={-2}
    />
    <resistor
      name="R3"
      resistance="10k"
      footprint="jlcpcb:C25744"
      supplierPartNumbers={jlc("C25744")}
      manufacturerPartNumber="0402WGF1002TCE"
      pcbX={2}
      pcbY={1}
      schX={1}
      schY={1}
    />
    <resistor
      name="R4"
      resistance="10k"
      footprint="jlcpcb:C25744"
      supplierPartNumbers={jlc("C25744")}
      manufacturerPartNumber="0402WGF1002TCE"
      pcbX={2}
      pcbY={-3}
      schX={1}
      schY={-2}
    />

    <chip
      name="U3"
      footprint="jlcpcb:C701341"
      supplierPartNumbers={jlc("C701341")}
      manufacturerPartNumber="ESP32-WROOM-32E-N4"
      pinLabels={esp32PinLabels}
      noConnect={[
        "SENSOR_VP",
        "SENSOR_VN",
        "IO34",
        "IO35",
        "IO32",
        "IO33",
        "IO25",
        "IO26",
        "IO27",
        "IO14",
        "IO12",
        "IO13",
        "SD2",
        "SD3",
        "CMD",
        "CLK",
        "SD0",
        "SD1",
        "IO15",
        "IO2",
        "IO16",
        "IO17",
        "IO5",
        "IO18",
        "IO19",
        "NC",
        "IO21",
        "IO22",
        "IO23",
      ]}
      schPinArrangement={{
        leftSide: {
          pins: ["3V3", "GND", "EN", "IO0", "IO4"],
          direction: "top-to-bottom",
        },
        rightSide: { pins: ["TXD0", "RXD0"], direction: "top-to-bottom" },
        bottomSide: { pins: ["GND"], direction: "left-to-right" },
      }}
      pcbX={17}
      pcbY={-1}
      pcbRotation={90}
      schX={15}
      schY={0}
    />

    <resistor
      name="R5"
      resistance="10k"
      footprint="jlcpcb:C25744"
      supplierPartNumbers={jlc("C25744")}
      manufacturerPartNumber="0402WGF1002TCE"
      pcbX={12}
      pcbY={-7}
      schX={10}
      schY={-6}
    />
    <capacitor
      name="C5"
      capacitance="1uF"
      footprint="jlcpcb:C52923"
      supplierPartNumbers={jlc("C52923")}
      manufacturerPartNumber="CL05A105KA5NQNC"
      pcbX={15}
      pcbY={-7}
      schX={14}
      schY={-6}
    />
    <resistor
      name="R6"
      resistance="10k"
      footprint="jlcpcb:C25744"
      supplierPartNumbers={jlc("C25744")}
      manufacturerPartNumber="0402WGF1002TCE"
      pcbX={18}
      pcbY={-7}
      schX={17}
      schY={-6}
    />
    <pushbutton
      name="SW1"
      footprint="jlcpcb:C381091"
      supplierPartNumbers={jlc("C381091")}
      manufacturerPartNumber="XKB5858-W-TP"
      noConnect={["pin3", "pin4"]}
      pcbX={21}
      pcbY={-7}
      schX={20}
      schY={-6}
    />
    <pushbutton
      name="SW2"
      footprint="jlcpcb:C381091"
      supplierPartNumbers={jlc("C381091")}
      manufacturerPartNumber="XKB5858-W-TP"
      noConnect={["pin3", "pin4"]}
      pcbX={24}
      pcbY={-7}
      schX={23}
      schY={-6}
    />

    <resistor
      name="R7"
      resistance="1k"
      footprint="jlcpcb:C11702"
      supplierPartNumbers={jlc("C11702")}
      manufacturerPartNumber="0402WGF1001TCE"
      pcbX={24}
      pcbY={4}
      schX={22}
      schY={4}
    />
    <led
      name="LED1"
      color="green"
      footprint="jlcpcb:C965804"
      supplierPartNumbers={jlc("C965804")}
      manufacturerPartNumber="XL-1608UGC-04"
      pcbX={27}
      pcbY={4}
      schX={25}
      schY={4}
    />
    <resistor
      name="R8"
      resistance="1k"
      footprint="jlcpcb:C11702"
      supplierPartNumbers={jlc("C11702")}
      manufacturerPartNumber="0402WGF1001TCE"
      pcbX={-18}
      pcbY={-7}
      schX={-20}
      schY={-6}
    />
    <led
      name="LED2"
      color="red"
      footprint="jlcpcb:C2286"
      supplierPartNumbers={jlc("C2286")}
      manufacturerPartNumber="KT-0603R"
      pcbX={-15}
      pcbY={-7}
      schX={-17}
      schY={-6}
    />
    <capacitor
      name="C6"
      capacitance="100nF"
      footprint="jlcpcb:C1525"
      supplierPartNumbers={jlc("C1525")}
      manufacturerPartNumber="CL05B104KO5NNNC"
      pcbX={10}
      pcbY={-7}
      schX={7}
      schY={-10}
    />
    <capacitor
      name="C7"
      capacitance="10uF"
      footprint="jlcpcb:C15850"
      supplierPartNumbers={jlc("C15850")}
      manufacturerPartNumber="CL21A106KAYNNNE"
      pcbX={13}
      pcbY={-10}
      schX={11}
      schY={-10}
    />

    <trace from=".J1 > .VBUS1" to="net.VBUS" />
    <trace from=".J1 > .VBUS2" to="net.VBUS" />
    <trace from=".J1 > .GND1" to="net.GND" />
    <trace from=".J1 > .GND2" to="net.GND" />
    <trace from=".J1 > .CC1" to=".R1 > .pin1" />
    <trace from=".J1 > .CC2" to=".R2 > .pin1" />
    <trace from=".R1 > .pin2" to="net.GND" />
    <trace from=".R2 > .pin2" to="net.GND" />
    <trace from=".J1 > .DP1" to="net.USB_DP" />
    <trace from=".J1 > .DP2" to="net.USB_DP" />
    <trace from=".J1 > .DM1" to="net.USB_DM" />
    <trace from=".J1 > .DM2" to="net.USB_DM" />

    <trace from=".J1 > .VBUS1" to=".U1 > .VIN" />
    <trace from=".J1 > .VBUS2" to=".U1 > .VIN" />
    <trace from=".U1 > .VIN" to="net.VBUS" />
    <trace from=".U1 > .VOUT" to="net.V3V3" />
    <trace from=".U1 > .pin4" to="net.V3V3" />
    <trace from=".U1 > .GND" to="net.GND" />
    <trace from=".C1 > .pin1" to="net.VBUS" />
    <trace from=".C1 > .pin2" to="net.GND" />
    <trace from=".C2 > .pin1" to="net.V3V3" />
    <trace from=".C2 > .pin2" to="net.GND" />
    <trace from=".C3 > .pin1" to="net.V3V3" />
    <trace from=".C3 > .pin2" to="net.GND" />

    <trace from=".J1 > .DP1" to=".U2 > .D_PLUS" />
    <trace from=".J1 > .DP2" to=".U2 > .D_PLUS" />
    <trace from=".J1 > .DM1" to=".U2 > .D_MINUS" />
    <trace from=".J1 > .DM2" to=".U2 > .D_MINUS" />
    <trace from=".U2 > .VDD" to="net.V3V3" />
    <trace from=".U2 > .GND" to="net.GND" />
    <trace from=".U2 > .PGND" to="net.GND" />
    <trace from=".U2 > .REGIN" to="net.VBUS" />
    <trace from=".U2 > .VBUS" to="net.VBUS" />
    <trace from=".C4 > .pin1" to="net.V3V3" />
    <trace from=".C4 > .pin2" to="net.GND" />

    <trace from=".U2 > .TXD" to=".U3 > .RXD0" />
    <trace from=".U2 > .RXD" to=".U3 > .TXD0" />
    <trace from=".U2 > .DTR" to="net.DTR" />
    <trace from=".U2 > .RTS" to="net.RTS" />
    <trace from="net.DTR" to=".R3 > .pin1" />
    <trace from=".R3 > .pin2" to=".Q1 > .base" />
    <trace from="net.DTR" to=".Q2 > .collector" />
    <trace from="net.RTS" to=".R4 > .pin1" />
    <trace from=".R4 > .pin2" to=".Q2 > .base" />
    <trace from="net.RTS" to=".Q1 > .emitter" />
    <trace from=".Q1 > .collector" to=".U3 > .EN" />
    <trace from=".Q2 > .emitter" to=".U3 > .IO0" />

    <trace from=".U3 > .pin1" to="net.GND" />
    <trace from=".U3 > .pin15" to="net.GND" />
    <trace from=".U3 > .pin38" to="net.GND" />
    <trace from=".U3 > .3V3" to="net.V3V3" />
    <trace from=".C6 > .pin1" to="net.V3V3" />
    <trace from=".C6 > .pin2" to="net.GND" />
    <trace from=".C7 > .pin1" to="net.V3V3" />
    <trace from=".C7 > .pin2" to="net.GND" />

    <trace from=".R5 > .pin1" to="net.V3V3" />
    <trace from=".R5 > .pin2" to=".U3 > .EN" />
    <trace from=".C5 > .pin1" to=".U3 > .EN" />
    <trace from=".C5 > .pin2" to="net.GND" />
    <trace from=".R6 > .pin1" to="net.V3V3" />
    <trace from=".R6 > .pin2" to=".U3 > .IO0" />
    <trace from=".SW1 > .pin1" to=".U3 > .IO0" />
    <trace from=".SW1 > .pin2" to="net.GND" />
    <trace from=".SW2 > .pin1" to=".U3 > .EN" />
    <trace from=".SW2 > .pin2" to="net.GND" />

    <trace from=".U3 > .IO4" to=".R7 > .pin1" />
    <trace from=".R7 > .pin2" to=".LED1 > .pos" />
    <trace from=".LED1 > .neg" to="net.GND" />
    <trace from=".R8 > .pin1" to="net.V3V3" />
    <trace from=".R8 > .pin2" to=".LED2 > .pos" />
    <trace from=".LED2 > .neg" to="net.GND" />
  </board>
)
