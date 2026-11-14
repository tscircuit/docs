import supportFiles from "./files.json"

const netsSource = `import Cc2340R5Contents, { exportedNets } from "./cc2340r5"

export default () => (
  <subcircuit
    name="CC2340R5"
    exposedNets={exportedNets}
    schPinArrangement={{
      leftSide: { pins: exportedNets, direction: "top-to-bottom" },
    }}
    schMaxTraceDistance={20}
    schStyle={{ defaultPassiveSize: "md", defaultCapacitorOrientation: "vertical" }}
  >
    <Cc2340R5Contents />
  </subcircuit>
)
`

const portsSource = `import Cc2340R5Contents, { exportedNets } from "./cc2340r5"

export default () => (
  <subcircuit
    name="CC2340R5"
    schPinArrangement={{
      leftSide: { pins: exportedNets, direction: "top-to-bottom" },
    }}
    schMaxTraceDistance={20}
    schStyle={{ defaultPassiveSize: "md", defaultCapacitorOrientation: "vertical" }}
  >
    <port name="VDDS" connectsTo="U1.pin11" />
    <port name="DIO8" connectsTo="U1.pin3" />
    <port name="DIO11" connectsTo="U1.pin4" />
    <port name="DIO12" connectsTo="U1.pin5" />
    <port name="DIO13" connectsTo="U1.pin6" />
    <port name="DIO20_A11" connectsTo="U1.pin9" />
    <port name="DIO21_A10" connectsTo="U1.pin10" />
    <port name="DIO24_A7" connectsTo="U1.pin12" />
    <port name="DIO6_A1" connectsTo="U1.pin19" />
    <port name="SWDIO" connectsTo="U1.pin7" />
    <port name="SWCLK" connectsTo="U1.pin8" />
    <port name="RESET_N" connectsTo="U1.pin13" />
    <port name="GND" connectsTo="U1.pin23" />
    <Cc2340R5Contents />
  </subcircuit>
)
`

export const exposedNetFiles = {
  "index.tsx": netsSource,
  ...supportFiles,
}

export const directPortFiles = {
  "index.tsx": portsSource,
  ...supportFiles,
}

export const nestedFiles = {
  "index.tsx": `import RadioModule from "./radio-module"

export default () => (
  <board>
    <RadioModule />
  </board>
)
`,
  "radio-module.tsx": portsSource,
  ...supportFiles,
}
