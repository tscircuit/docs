import { systemblock } from "tscircuit"

export default () => (
  <systemblock.page
    name="overview"
    displayName="Wireless sensor node"
    direction="down"
  >
    <systemblock.component name="sensor" displayName="Environment sensor" />
    <systemblock.component name="mcu" displayName="Microcontroller" />
    <systemblock.connection
      from="sensor"
      to="mcu"
      label="I2C"
      direction="both"
    />
  </systemblock.page>
)
