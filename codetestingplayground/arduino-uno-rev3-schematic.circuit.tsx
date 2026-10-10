// Arduino Uno Rev3 - schematic-only reference circuit (docs-old#42)
// Key paths follow the public Arduino UNO Rev3 schematic:
// ATmega328P + ATmega16U2, NCP1117 5V LDO, LP2985-33 LDO, USB VBUS fuse +
// P-FET power selection driven by one half of an LMV358, auto-reset cap,
// D13 LED buffered by the other half of the LMV358, expansion headers.

export const Atmega328P = (props: any) => (
  <chip
    {...props}
    manufacturerPartNumber="ATmega328P-PU"
    pinLabels={{
      pin1: ["RESET"],
      pin2: ["PD0", "D0"],
      pin3: ["PD1", "D1"],
      pin4: ["PD2", "D2"],
      pin5: ["PD3", "D3"],
      pin6: ["PD4", "D4"],
      pin7: ["VCC"],
      pin8: ["GND"],
      pin9: ["XTAL1", "PB6"],
      pin10: ["XTAL2", "PB7"],
      pin11: ["PD5", "D5"],
      pin12: ["PD6", "D6"],
      pin13: ["PD7", "D7"],
      pin14: ["PB0", "D8"],
      pin15: ["PB1", "D9"],
      pin16: ["PB2", "D10"],
      pin17: ["PB3", "D11"],
      pin18: ["PB4", "D12"],
      pin19: ["PB5", "D13"],
      pin20: ["AVCC"],
      pin21: ["AREF"],
      pin22: ["GND2"],
      pin23: ["PC0", "A0"],
      pin24: ["PC1", "A1"],
      pin25: ["PC2", "A2"],
      pin26: ["PC3", "A3"],
      pin27: ["PC4", "A4", "SDA"],
      pin28: ["PC5", "A5", "SCL"],
    }}
    schPortArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: ["VCC", "AVCC", "AREF", "GND", "GND2", "RESET"],
      },
      topSide: {
        direction: "left-to-right",
        pins: ["XTAL1", "XTAL2"],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [
          "PD0",
          "PD1",
          "PD2",
          "PD3",
          "PD4",
          "PD5",
          "PD6",
          "PD7",
          "PB0",
          "PB1",
          "PB2",
          "PB3",
          "PB4",
          "PB5",
        ],
      },
      bottomSide: {
        direction: "left-to-right",
        pins: ["PC0", "PC1", "PC2", "PC3", "PC4", "PC5"],
      },
    }}
  />
)

export const Atmega16U2 = (props: any) => (
  <chip
    {...props}
    manufacturerPartNumber="ATmega16U2-MU"
    pinLabels={{
      pin1: ["UVCC"],
      pin2: ["UCAP"],
      pin3: ["XTAL1"],
      pin4: ["XTAL2"],
      pin5: ["RESET"],
      pin6: ["HWB"],
      pin7: ["VCC"],
      pin8: ["GND"],
      pin9: ["UDM"],
      pin10: ["UDP"],
      pin11: ["TXD"],
      pin12: ["RXD"],
      pin13: ["DTR"],
    }}
    schPortArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: ["UVCC", "UCAP", "XTAL1", "XTAL2", "RESET", "HWB"],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: ["VCC", "GND", "UDM", "UDP", "TXD", "RXD", "DTR"],
      },
    }}
  />
)

export default () => {
  return (
    <board routingDisabled>
      {/* ------------------------- Power input ------------------------- */}
      {/* Barrel jack: 7-12 V DC input */}
      <chip
        name="J_PWR"
        pinLabels={{ pin1: ["TIP"], pin2: ["SLEEVE"] }}
        schPortArrangement={{
          leftSide: { direction: "top-to-bottom", pins: ["TIP", "SLEEVE"] },
        }}
        schX={-22}
        schY={4}
      />
      {/* NCP1117-5.0 5V LDO fed from the jack */}
      <chip
        name="U_REG"
        manufacturerPartNumber="NCP1117ST50T3G"
        pinLabels={{ pin1: ["IN"], pin2: ["OUT"], pin3: ["GND"] }}
        schPortArrangement={{
          leftSide: { direction: "top-to-bottom", pins: ["IN", "GND"] },
          rightSide: { direction: "top-to-bottom", pins: ["OUT"] },
        }}
        schX={-14}
        schY={4}
      />
      {/* Regulator input decoupling + 5V bulk cap */}
      <capacitor
        name="C_REG_IN"
        capacitance="4.7uF"
        footprint="0805"
        schX={-14}
        schY={8}
      />
      <capacitor
        name="C_REG_OUT"
        capacitance="47uF"
        footprint="SMC"
        schX={-10}
        schY={8}
      />
      {/* LP2985-33 3.3V LDO fed from the 5V rail */}
      <chip
        name="U_3V3"
        manufacturerPartNumber="LP2985-33DBVR"
        pinLabels={{ pin1: ["IN"], pin2: ["OUT"], pin3: ["GND"] }}
        schPortArrangement={{
          leftSide: { direction: "top-to-bottom", pins: ["IN", "GND"] },
          rightSide: { direction: "top-to-bottom", pins: ["OUT"] },
        }}
        schX={-14}
        schY={-1}
      />
      <capacitor
        name="C_3V3_IN"
        capacitance="1uF"
        footprint="0603"
        schX={-17}
        schY={-1}
      />
      <capacitor
        name="C_3V3_OUT"
        capacitance="10uF"
        footprint="0805"
        schX={-10}
        schY={-1}
      />

      {/* --------------------- USB power path --------------------- */}
      {/* USB-B connector */}
      <chip
        name="J_USB"
        pinLabels={{
          pin1: ["VBUS"],
          pin2: ["DMINUS"],
          pin3: ["DPLUS"],
          pin4: ["GND"],
          pin5: ["SHIELD"],
        }}
        schPortArrangement={{
          leftSide: {
            direction: "top-to-bottom",
            pins: ["VBUS", "DMINUS", "DPLUS"],
          },
          rightSide: { direction: "top-to-bottom", pins: ["GND", "SHIELD"] },
        }}
        schX={-22}
        schY={-6}
      />
      {/* 500 mA resettable fuse in series with USB VBUS */}
      <fuse
        name="F1"
        currentRating="0.5A"
        footprint="1206"
        schX={-16}
        schY={-6}
      />
      {/* FDN340P P-FET selects between USBVCC and the regulator output */}
      <mosfet
        name="T1"
        channelType="p"
        mosfetMode="enhancement"
        footprint="sot23"
        schX={-10}
        schY={-6}
      />
      {/* LMV358 (half B): comparator drives the P-FET gate */}
      <chip
        name="U2A"
        manufacturerPartNumber="LMV358"
        pinLabels={{
          pin1: ["IN2P"],
          pin2: ["IN2N"],
          pin3: ["GND"],
          pin4: ["OUT2"],
          pin5: ["VCC"],
        }}
        schPortArrangement={{
          leftSide: {
            direction: "top-to-bottom",
            pins: ["IN2P", "IN2N", "GND"],
          },
          rightSide: {
            direction: "top-to-bottom",
            pins: ["OUT2", "VCC"],
          },
        }}
        schX={-10}
        schY={-11}
      />

      {/* ------------------- USB-serial: ATmega16U2 ------------------- */}
      {/* 22 ohm series termination on the USB data lines */}
      <resistor
        name="R_USB_DP"
        resistance="22"
        footprint="0603"
        schX={-17}
        schY={-8}
      />
      <resistor
        name="R_USB_DM"
        resistance="22"
        footprint="0603"
        schX={-17}
        schY={-10}
      />
      <Atmega16U2 name="U3" schX={-10} schY={-18} />
      {/* 16 MHz crystal for the 16U2 */}
      <crystal
        name="Q2"
        frequency="16MHz"
        loadCapacitance="22pF"
        footprint="hc49"
        schX={-10}
        schY={-24}
      />
      <capacitor
        name="C_X2A"
        capacitance="22pF"
        footprint="0603"
        schX={-13}
        schY={-26}
      />
      <capacitor
        name="C_X2B"
        capacitance="22pF"
        footprint="0603"
        schX={-7}
        schY={-26}
      />
      {/* UCAP: 1uF on the internal 3.3V regulator output */}
      <capacitor
        name="C_UCAP"
        capacitance="1uF"
        footprint="0603"
        schX={-6}
        schY={-16}
      />
      {/* HWB held low so the 16U2 boots its USB firmware */}
      <resistor
        name="R_HWB"
        resistance="10k"
        footprint="0603"
        schX={-14}
        schY={-16}
      />
      {/* 16U2 reset pull-up to USBVCC */}
      <resistor
        name="R_U3RST"
        resistance="10k"
        footprint="0603"
        schX={-4}
        schY={-12}
      />
      {/* Auto-reset: 100 nF from the 16U2 DTR into the 328P RESET net */}
      <capacitor
        name="C_AUTO"
        capacitance="100nF"
        footprint="0603"
        schX={-4}
        schY={-14}
      />

      {/* --------------------- ATmega328P core --------------------- */}
      <Atmega328P name="U1" schX={8} schY={-6} />
      {/* 16 MHz crystal + load caps */}
      <crystal
        name="Q1"
        frequency="16MHz"
        loadCapacitance="22pF"
        footprint="hc49"
        schX={8}
        schY={2}
      />
      <capacitor
        name="C_X1A"
        capacitance="22pF"
        footprint="0603"
        schX={5}
        schY={4}
      />
      <capacitor
        name="C_X1B"
        capacitance="22pF"
        footprint="0603"
        schX={11}
        schY={4}
      />
      {/* Decoupling + AREF cap */}
      <capacitor
        name="C_VCC"
        capacitance="100nF"
        footprint="0603"
        schX={2}
        schY={-4}
      />
      <capacitor
        name="C_AVCC"
        capacitance="100nF"
        footprint="0603"
        schX={2}
        schY={-6}
      />
      <capacitor
        name="C_AREF"
        capacitance="100nF"
        footprint="0603"
        schX={2}
        schY={-8}
      />
      {/* Reset: 10k pull-up + pushbutton to GND */}
      <resistor
        name="R_RST"
        resistance="10k"
        footprint="0603"
        schX={2}
        schY={-10}
      />
      <pushbutton name="SW1" footprint="pushbutton" schX={2} schY={-13} />

      {/* ----------------- D13 "L" LED (LMV358 half A) ----------------- */}
      <chip
        name="U2B"
        manufacturerPartNumber="LMV358"
        pinLabels={{
          pin1: ["IN1P"],
          pin2: ["IN1N"],
          pin3: ["GND"],
          pin4: ["OUT1"],
          pin5: ["VCC"],
        }}
        schPortArrangement={{
          leftSide: {
            direction: "top-to-bottom",
            pins: ["IN1P", "IN1N", "GND"],
          },
          rightSide: {
            direction: "top-to-bottom",
            pins: ["OUT1", "VCC"],
          },
        }}
        schX={-16}
        schY={-18}
      />
      <resistor
        name="R_L"
        resistance="1k"
        footprint="0603"
        schX={-11}
        schY={-18}
      />
      <led name="LED_L" color="orange" footprint="0603" schX={-8} schY={-18} />

      {/* --------------------- Expansion headers --------------------- */}
      {/* Power header: NC, IOREF, RESET, 3V3, 5V, GND, GND, VIN */}
      <chip
        name="J_PWRHDR"
        pinLabels={{
          pin1: ["NC"],
          pin2: ["IOREF"],
          pin3: ["RESET"],
          pin4: ["V3_3", "3V3"],
          pin5: ["V5", "5V"],
          pin6: ["GND1", "GND"],
          pin7: ["GND2", "GND"],
          pin8: ["VIN"],
        }}
        schPortArrangement={{
          rightSide: {
            direction: "top-to-bottom",
            pins: ["NC", "IOREF", "RESET", "V3_3", "V5", "GND1", "GND2", "VIN"],
          },
        }}
        schX={-22}
        schY={12}
      />
      {/* Digital header, D0-D7 */}
      <chip
        name="J_DIG8"
        pinLabels={{
          pin1: ["D0"],
          pin2: ["D1"],
          pin3: ["D2"],
          pin4: ["D3"],
          pin5: ["D4"],
          pin6: ["D5"],
          pin7: ["D6"],
          pin8: ["D7"],
        }}
        schPortArrangement={{
          leftSide: {
            direction: "top-to-bottom",
            pins: ["D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7"],
          },
        }}
        schX={16}
        schY={2}
      />
      {/* Digital header, D8-D13 + GND + AREF + SDA + SCL */}
      <chip
        name="J_DIG10"
        pinLabels={{
          pin1: ["D8"],
          pin2: ["D9"],
          pin3: ["D10"],
          pin4: ["D11"],
          pin5: ["D12"],
          pin6: ["D13"],
          pin7: ["GND"],
          pin8: ["AREF"],
          pin9: ["SDA"],
          pin10: ["SCL"],
        }}
        schPortArrangement={{
          leftSide: {
            direction: "top-to-bottom",
            pins: [
              "D8",
              "D9",
              "D10",
              "D11",
              "D12",
              "D13",
              "GND",
              "AREF",
              "SDA",
              "SCL",
            ],
          },
        }}
        schX={16}
        schY={-6}
      />
      {/* Analog header: A0-A5 + GND + 5V */}
      <chip
        name="J_AN8"
        pinLabels={{
          pin1: ["A0"],
          pin2: ["A1"],
          pin3: ["A2"],
          pin4: ["A3"],
          pin5: ["A4"],
          pin6: ["A5"],
          pin7: ["GND"],
          pin8: ["V5", "VCC"],
        }}
        schPortArrangement={{
          leftSide: {
            direction: "top-to-bottom",
            pins: ["A0", "A1", "A2", "A3", "A4", "A5", "GND", "V5"],
          },
        }}
        schX={16}
        schY={-18}
      />
      {/* ICSP header for the ATmega328P */}
      <chip
        name="J_ICSP"
        pinLabels={{
          pin1: ["MISO"],
          pin2: ["V5", "5V"],
          pin3: ["SCK"],
          pin4: ["MOSI"],
          pin5: ["RESET"],
          pin6: ["GND"],
        }}
        schPortArrangement={{
          leftSide: {
            direction: "top-to-bottom",
            pins: ["MISO", "V5", "SCK"],
          },
          rightSide: {
            direction: "top-to-bottom",
            pins: ["MOSI", "RESET", "GND"],
          },
        }}
        schX={8}
        schY={-20}
      />

      {/* ------------------------- Power traces ------------------------- */}
      <trace from=".J_PWR .TIP" to="net.VIN" />
      <trace from=".J_PWR .SLEEVE" to="net.GND" />
      <trace from="net.VIN" to=".U_REG .IN" />
      <trace from="net.VIN" to=".C_REG_IN .pin1" />
      <trace from=".C_REG_IN .pin2" to="net.GND" />
      <trace from=".U_REG .OUT" to="net.V5" />
      <trace from=".U_REG .GND" to="net.GND" />
      <trace from=".C_REG_OUT .pin1" to="net.V5" />
      <trace from=".C_REG_OUT .pin2" to="net.GND" />
      <trace from="net.V5" to=".U_3V3 .IN" />
      <trace from=".U_3V3 .GND" to="net.GND" />
      <trace from=".U_3V3 .OUT" to="net.V3_3" />
      <trace from=".C_3V3_IN .pin1" to="net.V5" />
      <trace from=".C_3V3_IN .pin2" to="net.GND" />
      <trace from=".C_3V3_OUT .pin1" to="net.V3_3" />
      <trace from=".C_3V3_OUT .pin2" to="net.GND" />

      {/* USB power: VBUS -> fuse -> USBVCC -> P-FET -> 5V rail */}
      <trace from=".J_USB .VBUS" to="net.VBUS" />
      <trace from=".J_USB .GND" to="net.GND" />
      <trace from=".J_USB .SHIELD" to="net.GND" />
      <trace from=".J_USB .VBUS" to=".F1 .pin1" />
      <trace from=".F1 .pin2" to="net.USBVCC" />
      <trace from=".T1 .source" to="net.USBVCC" />
      <trace from=".T1 .drain" to="net.V5" />
      {/* Comparator: jack voltage vs 5V rail -> FET gate */}
      <trace from=".U2A .IN2P" to="net.VIN" />
      <trace from=".U2A .IN2N" to="net.V5" />
      <trace from=".U2A .OUT2" to="net.FET_GATE" />
      <trace from=".T1 .gate" to="net.FET_GATE" />
      <trace from=".U2A .VCC" to="net.V5" />
      <trace from=".U2A .GND" to="net.GND" />

      {/* ------------------------- USB data ------------------------- */}
      <trace from=".J_USB .DPLUS" to=".R_USB_DP .pin1" />
      <trace from=".J_USB .DMINUS" to=".R_USB_DM .pin1" />
      <trace from=".R_USB_DP .pin2" to=".U3 .UDP" />
      <trace from=".R_USB_DM .pin2" to=".U3 .UDM" />

      {/* ------------------------ 16U2 wiring ------------------------ */}
      <trace from=".U3 .VCC" to="net.V5" />
      <trace from=".U3 .GND" to="net.GND" />
      <trace from=".U3 .UVCC" to="net.USBVCC" />
      <trace from=".U3 .UCAP" to=".C_UCAP .pin1" />
      <trace from=".C_UCAP .pin2" to="net.GND" />
      <trace from=".U3 .XTAL1" to=".Q2 .pin1" />
      <trace from=".U3 .XTAL2" to=".Q2 .pin2" />
      <trace from=".Q2 .pin1" to=".C_X2A .pin1" />
      <trace from=".Q2 .pin2" to=".C_X2B .pin1" />
      <trace from=".C_X2A .pin2" to="net.GND" />
      <trace from=".C_X2B .pin2" to="net.GND" />
      <trace from=".U3 .HWB" to=".R_HWB .pin1" />
      <trace from=".R_HWB .pin2" to="net.GND" />
      {/* 16U2 reset pull-up, continues to the 16U2 ICSP header */}
      <trace from=".U3 .RESET" to="net.URESET" />
      <trace from="net.USBVCC" to=".R_U3RST .pin1" />
      <trace from=".R_U3RST .pin2" to="net.URESET" />
      {/* Crossed UART between the 16U2 and the 328P */}
      <trace from=".U3 .TXD" to="net.SER_RX" />
      <trace from=".U3 .RXD" to="net.SER_TX" />
      {/* Auto-reset cap from DTR into the shared RESET net */}
      <trace from=".U3 .DTR" to="net.DTR" />
      <trace from=".C_AUTO .pin1" to="net.DTR" />
      <trace from=".C_AUTO .pin2" to="net.RESET" />

      {/* ------------------------ 328P wiring ------------------------ */}
      <trace from=".U1 .VCC" to="net.V5" />
      <trace from=".U1 .AVCC" to="net.V5" />
      <trace from=".U1 .GND" to="net.GND" />
      <trace from=".U1 .GND2" to="net.GND" />
      <trace from=".C_VCC .pin1" to="net.V5" />
      <trace from=".C_VCC .pin2" to="net.GND" />
      <trace from=".C_AVCC .pin1" to="net.V5" />
      <trace from=".C_AVCC .pin2" to="net.GND" />
      <trace from=".U1 .AREF" to="net.AREF" />
      <trace from=".C_AREF .pin1" to="net.AREF" />
      <trace from=".C_AREF .pin2" to="net.GND" />
      <trace from=".U1 .XTAL1" to=".Q1 .pin1" />
      <trace from=".U1 .XTAL2" to=".Q1 .pin2" />
      <trace from=".Q1 .pin1" to=".C_X1A .pin1" />
      <trace from=".Q1 .pin2" to=".C_X1B .pin1" />
      <trace from=".C_X1A .pin2" to="net.GND" />
      <trace from=".C_X1B .pin2" to="net.GND" />
      <trace from=".U1 .RESET" to="net.RESET" />
      <trace from=".R_RST .pin1" to="net.V5" />
      <trace from=".R_RST .pin2" to="net.RESET" />
      <trace from=".SW1 .pin1" to="net.RESET" />
      <trace from=".SW1 .pin2" to="net.GND" />
      {/* UART crossing */}
      <trace from="net.SER_RX" to=".U1 .PD0" />
      <trace from="net.SER_TX" to=".U1 .PD1" />

      {/* D13 LED buffer: unity-gain buffer -> 1k -> LED -> GND */}
      <trace from=".U2B .IN1P" to="net.D13" />
      <trace from=".U2B .IN1N" to=".U2B .OUT1" />
      <trace from=".U2B .OUT1" to=".R_L .pin1" />
      <trace from=".R_L .pin2" to=".LED_L .pos" />
      <trace from=".LED_L .neg" to="net.GND" />
      <trace from=".U2B .VCC" to="net.V5" />
      <trace from=".U2B .GND" to="net.GND" />

      {/* --------------------- Digital port D0-D7 --------------------- */}
      <trace from=".U1 .PD2" to="net.D2" />
      <trace from=".U1 .PD3" to="net.D3" />
      <trace from=".U1 .PD4" to="net.D4" />
      <trace from=".U1 .PD5" to="net.D5" />
      <trace from=".U1 .PD6" to="net.D6" />
      <trace from=".U1 .PD7" to="net.D7" />
      <trace from="net.D0" to=".J_DIG8 .D0" />
      <trace from="net.D1" to=".J_DIG8 .D1" />
      <trace from="net.D2" to=".J_DIG8 .D2" />
      <trace from="net.D3" to=".J_DIG8 .D3" />
      <trace from="net.D4" to=".J_DIG8 .D4" />
      <trace from="net.D5" to=".J_DIG8 .D5" />
      <trace from="net.D6" to=".J_DIG8 .D6" />
      <trace from="net.D7" to=".J_DIG8 .D7" />
      {/* D0/D1 also land on the 16U2 UART through SER_RX/SER_TX */}
      <trace from=".U1 .PD0" to="net.D0" />
      <trace from=".U1 .PD1" to="net.D1" />

      {/* --------------------- Digital port D8-D13 --------------------- */}
      <trace from=".U1 .PB0" to="net.D8" />
      <trace from=".U1 .PB1" to="net.D9" />
      <trace from=".U1 .PB2" to="net.D10" />
      <trace from=".U1 .PB3" to="net.D11" />
      <trace from=".U1 .PB4" to="net.D12" />
      <trace from=".U1 .PB5" to="net.D13" />
      <trace from="net.D8" to=".J_DIG10 .D8" />
      <trace from="net.D9" to=".J_DIG10 .D9" />
      <trace from="net.D10" to=".J_DIG10 .D10" />
      <trace from="net.D11" to=".J_DIG10 .D11" />
      <trace from="net.D12" to=".J_DIG10 .D12" />
      <trace from="net.D13" to=".J_DIG10 .D13" />
      <trace from=".J_DIG10 .GND" to="net.GND" />
      <trace from=".J_DIG10 .AREF" to="net.AREF" />
      {/* SDA/SCL on A4/A5 */}
      <trace from="net.SDA" to=".J_DIG10 .SDA" />
      <trace from="net.SCL" to=".J_DIG10 .SCL" />

      {/* ------------------------- Analog header ------------------------- */}
      <trace from=".U1 .PC0" to="net.A0" />
      <trace from=".U1 .PC1" to="net.A1" />
      <trace from=".U1 .PC2" to="net.A2" />
      <trace from=".U1 .PC3" to="net.A3" />
      <trace from="net.A0" to=".J_AN8 .A0" />
      <trace from="net.A1" to=".J_AN8 .A1" />
      <trace from="net.A2" to=".J_AN8 .A2" />
      <trace from="net.A3" to=".J_AN8 .A3" />
      <trace from="net.SDA" to=".J_AN8 .A4" />
      <trace from="net.SCL" to=".J_AN8 .A5" />
      <trace from=".J_AN8 .GND" to="net.GND" />
      <trace from=".J_AN8 .V5" to="net.V5" />

      {/* ------------------------- Power header ------------------------- */}
      <trace from=".J_PWRHDR .IOREF" to="net.V5" />
      <trace from=".J_PWRHDR .RESET" to="net.RESET" />
      <trace from=".J_PWRHDR .V3_3" to="net.V3_3" />
      <trace from=".J_PWRHDR .V5" to="net.V5" />
      <trace from=".J_PWRHDR .GND1" to="net.GND" />
      <trace from=".J_PWRHDR .GND2" to="net.GND" />
      <trace from=".J_PWRHDR .VIN" to="net.VIN" />

      {/* -------------------------- ICSP header -------------------------- */}
      <trace from="net.MOSI" to=".U1 .PB3" />
      <trace from="net.MISO" to=".U1 .PB4" />
      <trace from="net.SCK" to=".U1 .PB5" />
      <trace from="net.MOSI" to=".J_ICSP .MOSI" />
      <trace from="net.MISO" to=".J_ICSP .MISO" />
      <trace from="net.SCK" to=".J_ICSP .SCK" />
      <trace from="net.RESET" to=".J_ICSP .RESET" />
      <trace from="net.V5" to=".J_ICSP .V5" />
      <trace from=".J_ICSP .GND" to="net.GND" />
    </board>
  )
}
