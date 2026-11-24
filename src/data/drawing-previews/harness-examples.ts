/** Wire harness drawing examples shared by the element references and the
 * harness guide. Each page name matches its committed SVG in
 * static/img/elements/assembly-drawing-harness-<page>.svg, rendered by
 * scripts/render-assembly-drawing-previews.ts.
 */
export interface HarnessDrawingExample {
  code: string
  pages: { name: string; url: string }[]
}

const example = (pageNames: string[], code: string): HarnessDrawingExample => ({
  code,
  pages: pageNames.map((name) => ({
    name,
    url: `/img/elements/assembly-drawing-harness-${name}.svg`,
  })),
})

/** Two JST PH headers of the same size on one small carrier board. */
const phBoard = (
  pinCount: number,
) => `<board width={40} height={20} routingDisabled>
      <connector name="J1" standard="jst_ph" pinCount={${pinCount}}
        footprint="jst${pinCount}_ph" pcbX={-12} />
      <connector name="J2" standard="jst_ph" pinCount={${pinCount}}
        footprint="jst${pinCount}_ph" pcbX={12} />
    </board>`

export const harnessBasic = example(
  ["i2c-cable"],
  `import { assembly } from "tscircuit"

export default () => (
  <assembly.device>
    ${phBoard(4)}
    <assembly.cable name="I2C" from=".J1" to=".J2"
      length="150mm" wireAwg={26}>
      <assembly.cablewire fromPin={1} toPin={1} color="red" />
      <assembly.cablewire fromPin={2} toPin={2} color="black" />
      <assembly.cablewire fromPin={3} toPin={3} color="blue" />
      <assembly.cablewire fromPin={4} toPin={4} color="yellow" />
    </assembly.cable>
    <assembly.drawing.page name="i2c-cable" width={180} height={70}>
      <assembly.drawing.harnessview cableRef="I2C"
        width={160} height={50} />
    </assembly.drawing.page>
  </assembly.device>
)`,
)

export const harnessFlat = example(
  ["flat-cable"],
  `import { assembly } from "tscircuit"

export default () => (
  <assembly.device>
    ${phBoard(6)}
    <assembly.cable name="FLAT" from=".J1" to=".J2"
      length="80mm" lengthTolerance="2mm" wireAwg={24}>
      <assembly.cablewire fromPin={1} toPin={6} />
      <assembly.cablewire fromPin={2} toPin={5} />
      <assembly.cablewire fromPin={3} toPin={4} />
      <assembly.cablewire fromPin={4} toPin={3} />
      <assembly.cablewire fromPin={5} toPin={2} />
      <assembly.cablewire fromPin={6} toPin={1} />
    </assembly.cable>
    <assembly.drawing.page name="flat-cable" width={180} height={75}>
      <assembly.drawing.harnessview cableRef="FLAT"
        displayName="FLAT CABLE, REVERSED PINOUT"
        width={160} height={55} />
    </assembly.drawing.page>
  </assembly.device>
)`,
)

export const harnessSignals = example(
  ["sensor-adapter"],
  `import { assembly } from "tscircuit"

export default () => (
  <assembly.device>
    <board width={40} height={20} routingDisabled>
      <connector name="J1" standard="jst_sh" pinCount={4}
        footprint="jst4_sh" pcbX={-12} />
      <connector name="J2" standard="jst_ph" pinCount={4}
        footprint="jst4_ph" pcbX={12} />
    </board>
    <assembly.cable name="SENSOR" from=".J1" to=".J2"
      model="adaptercable_a(jst_sh_pins4)_b(jst_ph_pins4)"
      length="100mm" lengthTolerance="5mm" wireAwg={28}
      fromConnectorName="SH" toConnectorName="PH">
      <assembly.cablewire name="GND" fromPin={1} toPin={2} color="black" />
      <assembly.cablewire name="3V3" fromPin={2} toPin={1} color="red" />
      <assembly.cablewire name="SDA" fromPin={3} toPin={3} color="blue" />
      <assembly.cablewire name="SCL" fromPin={4} toPin={4} color="yellow" />
    </assembly.cable>
    <assembly.drawing.page name="sensor-adapter" width={200} height={125}>
      <assembly.drawing.harnessview cableRef="SENSOR"
        width={180} height={60} centerY={28} />
      <assembly.drawing.wiringtable cableRef="SENSOR" title="WIRING"
        paperX={0} paperY={-12} anchorAlignment="top_center" />
    </assembly.drawing.page>
  </assembly.device>
)`,
)

export const harnessSheet = example(
  ["motor-cable"],
  `import { assembly } from "tscircuit"

export default () => (
  <assembly.device>
    ${phBoard(6)}
    <assembly.cable name="MOTOR_CABLE" from=".J1" to=".J2"
      length="50mm" lengthTolerance="3mm" wireAwg="22awg"
      fromConnectorName="H1" toConnectorName="H2">
      <assembly.cablewire name="A+" fromPin={1} toPin={1} color="black" />
      <assembly.cablewire name="A-" fromPin={3} toPin={4} color="green" />
      <assembly.cablewire name="B+" fromPin={4} toPin={3} color="red" />
      <assembly.cablewire name="B-" fromPin={6} toPin={6} color="blue" />
    </assembly.cable>
    <assembly.drawing.page name="motor-cable" size="iso_a4"
      anchorAlignment="bottom_left">
      <assembly.drawing.harnessview name="harness" cableRef="MOTOR_CABLE"
        displayName="MOTOR CABLE"
        centerX={148.5} centerY={150} width={230} height={76}
        showBalloons />
      <assembly.drawing.wiringtable cableRef="MOTOR_CABLE" title="WIRING"
        paperX={292} paperY={100} anchorAlignment="top_right" />
      <assembly.drawing.bomtable partRef="MOTOR_CABLE"
        paperX={5} paperY={5} anchorAlignment="bottom_left" />
      <assembly.drawing.note
        text="1. Crimp per the contact manufacturer's applicator specification."
        paperX={8} paperY={96} />
      <assembly.drawing.note
        text="2. Leave cavities 2 and 5 of both housings empty."
        paperX={8} paperY={90} />
      <assembly.drawing.note
        text="3. Test every cable for continuity, opens and shorts."
        paperX={8} paperY={84} />
      <assembly.drawing.titleblock
        title="MOTOR CABLE, PH-6P, 22AWG, L=50mm"
        identificationNumber="CBL-MOTOR-001" revisionIndex="A"
        legalOwner="tscircuit" creator="tscircuit"
        approvalPerson="PRELIMINARY" dateOfIssue="2026-11-23"
        sheetNumber={1} numberOfSheets={1} />
    </assembly.drawing.page>
  </assembly.device>
)`,
)

export const harnessMixedGauge = example(
  ["power-and-data"],
  `import { assembly } from "tscircuit"

export default () => (
  <assembly.device>
    ${phBoard(4)}
    <assembly.cable name="POWER_DATA" from=".J1" to=".J2"
      length="300mm" lengthTolerance="10mm" wireAwg={26}
      fromConnectorName="P1" toConnectorName="P2">
      <assembly.cablewire name="VIN" fromPin={1} toPin={4}
        color="red" awg={22} />
      <assembly.cablewire name="CAN_H" fromPin={2} toPin={3}
        color="yellow" />
      <assembly.cablewire name="CAN_L" fromPin={3} toPin={2}
        color="green" />
      <assembly.cablewire name="GND" fromPin={4} toPin={1}
        color="black" awg={22} />
    </assembly.cable>
    <assembly.drawing.page name="power-and-data" width={230} height={150}>
      <assembly.drawing.harnessview cableRef="POWER_DATA"
        width={200} height={70} centerY={35} showBalloons />
      <assembly.drawing.wiringtable cableRef="POWER_DATA"
        paperX={-108} paperY={-10} anchorAlignment="top_left" />
      <assembly.drawing.bomtable partRef="POWER_DATA"
        paperX={108} paperY={-10} anchorAlignment="top_right" />
    </assembly.drawing.page>
  </assembly.device>
)`,
)

export const harnessPartial = example(
  ["two-of-six"],
  `import { assembly } from "tscircuit"

export default () => (
  <assembly.device>
    ${phBoard(6)}
    <assembly.cable name="LIMIT_SWITCH" from=".J1" to=".J2"
      length="250mm" wireAwg={24}>
      <assembly.cablewire name="SIG" fromPin={2} toPin={5} color="white" />
      <assembly.cablewire name="GND" fromPin={5} toPin={2} color="black" />
    </assembly.cable>
    <assembly.drawing.page name="two-of-six" width={180} height={75}>
      <assembly.drawing.harnessview cableRef="LIMIT_SWITCH"
        width={160} height={55} />
    </assembly.drawing.page>
  </assembly.device>
)`,
)

export const harnessCrossings = example(
  ["shuffled-pinout"],
  `import { assembly } from "tscircuit"

const pinout = [3, 1, 5, 2, 8, 4, 6, 7]

export default () => (
  <assembly.device>
    ${phBoard(8)}
    <assembly.cable name="SHUFFLE" from=".J1" to=".J2"
      length="120mm" wireAwg={26}>
      {pinout.map((toPin, index) => (
        <assembly.cablewire key={toPin} fromPin={index + 1} toPin={toPin} />
      ))}
    </assembly.cable>
    <assembly.drawing.page name="shuffled-pinout" width={200} height={135}>
      <assembly.drawing.harnessview cableRef="SHUFFLE"
        width={180} height={62} centerY={32} />
      <assembly.drawing.wiringtable cableRef="SHUFFLE"
        paperX={0} paperY={-5} anchorAlignment="top_center" />
    </assembly.drawing.page>
  </assembly.device>
)`,
)

export const harnessTwoCables = example(
  ["cable-set"],
  `import { assembly } from "tscircuit"

export default () => (
  <assembly.device>
    <board width={60} height={30} routingDisabled>
      <connector name="J1" standard="jst_ph" pinCount={2}
        footprint="jst2_ph" pcbX={-20} pcbY={8} />
      <connector name="J2" standard="jst_ph" pinCount={2}
        footprint="jst2_ph" pcbX={20} pcbY={8} />
      <connector name="J3" standard="jst_sh" pinCount={4}
        footprint="jst4_sh" pcbX={-20} pcbY={-8} />
      <connector name="J4" standard="jst_sh" pinCount={4}
        footprint="jst4_sh" pcbX={20} pcbY={-8} />
    </board>
    <assembly.cable name="BATTERY" from=".J1" to=".J2"
      length="120mm" wireAwg={22}
      fromConnectorName="J1" toConnectorName="J2">
      <assembly.cablewire name="VBAT" fromPin={1} toPin={2} color="red" />
      <assembly.cablewire name="GND" fromPin={2} toPin={1} color="black" />
    </assembly.cable>
    <assembly.cable name="DISPLAY" from=".J3" to=".J4"
      length="60mm" wireAwg={28}
      fromConnectorName="J3" toConnectorName="J4">
      <assembly.cablewire name="3V3" fromPin={1} toPin={4} color="red" />
      <assembly.cablewire name="GND" fromPin={2} toPin={3} color="black" />
      <assembly.cablewire name="SDA" fromPin={3} toPin={2} color="blue" />
      <assembly.cablewire name="SCL" fromPin={4} toPin={1} color="yellow" />
    </assembly.cable>
    <assembly.drawing.page name="cable-set" width={280} height={150}>
      <assembly.drawing.harnessview name="battery" cableRef="BATTERY"
        displayName="BATTERY LEAD"
        width={160} height={55} centerX={-55} centerY={38} />
      <assembly.drawing.harnessview name="display" cableRef="DISPLAY"
        displayName="DISPLAY CABLE"
        width={160} height={55} centerX={-55} belowRef=".battery" />
      <assembly.drawing.wiringtable cableRef="BATTERY" title="BATTERY LEAD"
        paperX={135} paperY={62} anchorAlignment="top_right" />
      <assembly.drawing.wiringtable cableRef="DISPLAY" title="DISPLAY CABLE"
        paperX={135} paperY={2} anchorAlignment="top_right" />
      <assembly.drawing.bomtable
        paperX={135} paperY={-70} anchorAlignment="bottom_right" />
    </assembly.drawing.page>
  </assembly.device>
)`,
)

export const harnessUsb = example(
  ["usb-cable"],
  `import { assembly } from "tscircuit"

export default () => (
  <assembly.device>
    <board name="HOST" width={32} height={28} pcbX={-60} routingDisabled>
      <connector name="J_USB" standard="usb_c" footprint="usbcmidmount"
        pcbX={13} pcbRotation={90} />
    </board>
    <board name="DEVICE" width={32} height={28} pcbX={60} routingDisabled>
      <connector name="J_USB" standard="usb_c" footprint="usbcmidmount"
        pcbX={-13} pcbRotation={270} />
    </board>
    <assembly.cable name="USB" standard="usb_c"
      from=".HOST > .J_USB" to=".DEVICE > .J_USB"
      length="1m" lengthTolerance="20mm" />
    <assembly.drawing.page name="usb-cable" width={180} height={70}>
      <assembly.drawing.harnessview cableRef="USB"
        displayName="USB-C TO USB-C" width={160} height={50} />
    </assembly.drawing.page>
  </assembly.device>
)`,
)

export const harnessNotes = example(
  ["annotated-cable"],
  `import { assembly } from "tscircuit"

export default () => (
  <assembly.device>
    ${phBoard(3)}
    <assembly.cable name="FAN" from=".J1" to=".J2"
      length="200mm" lengthTolerance="5mm" wireAwg={26}
      fromConnectorName="FAN" toConnectorName="MB">
      <assembly.cablewire name="GND" fromPin={1} toPin={3} color="black" />
      <assembly.cablewire name="12V" fromPin={2} toPin={2} color="red" />
      <assembly.cablewire name="TACH" fromPin={3} toPin={1} color="yellow" />
    </assembly.cable>
    <assembly.drawing.page name="annotated-cable" width={200} height={95}>
      <assembly.drawing.harnessview cableRef="FAN"
        width={180} height={55} centerY={12}>
        <assembly.drawing.note text="Sleeve with 4 mm braid, 180 mm"
          xOffsetFromViewCenter={-28} yOffsetFromViewCenter={21} />
      </assembly.drawing.harnessview>
      <assembly.drawing.note text="Label each end with the cable name."
        paperX={-90} paperY={-38} />
    </assembly.drawing.page>
  </assembly.device>
)`,
)

export const harnessExamples = {
  harnessBasic,
  harnessFlat,
  harnessSignals,
  harnessSheet,
  harnessMixedGauge,
  harnessPartial,
  harnessCrossings,
  harnessTwoCables,
  harnessUsb,
  harnessNotes,
}
