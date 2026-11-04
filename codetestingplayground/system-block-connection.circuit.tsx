import { systemblock } from "tscircuit"

export default () => (
  <systemblock.page name="overview" direction="down">
    <systemblock.component name="supply" displayName="3.3 V supply" />
    <systemblock.component name="sensor" displayName="Sensor" />
    <systemblock.component name="controller" displayName="Controller" />
    <systemblock.connection
      from="supply"
      to="controller"
      kind="power"
      label="3.3 V"
    />
    <systemblock.connection
      from="sensor"
      to="controller"
      label="I2C"
      direction="both"
    />
  </systemblock.page>
)
