import { systemblock } from "tscircuit"

export default () => (
  <systemblock.page name="overview" direction="down">
    <systemblock.group name="processing" displayName="Sensing and processing">
      <systemblock.component name="sensor" displayName="Environment sensor" />
      <systemblock.component name="mcu" displayName="Microcontroller" />
      <systemblock.connection from="sensor" to="mcu" label="I2C" />
    </systemblock.group>
  </systemblock.page>
)
