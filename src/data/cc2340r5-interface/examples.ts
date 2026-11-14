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

export const exposedNetFiles = {
  "index.tsx": netsSource,
  ...supportFiles,
}
