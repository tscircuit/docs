import { systemblock } from "tscircuit"

export default () => (
  <systemblock.page name="overview" displayName="Wireless sensor node">
    <systemblock.group name="processing" displayName="Sensing and processing">
      <systemblock.component
        name="sensor"
        displayName="Environment sensor"
        description="Measures temperature and humidity"
      />
      <systemblock.component
        name="mcu"
        displayName="Microcontroller"
        description="Processes readings"
      />
    </systemblock.group>
    <systemblock.component
      name="radio"
      displayName="Radio module"
      description="Transmits measurements"
    />
    <systemblock.connection
      from="sensor"
      to="mcu"
      label="I2C"
      direction="both"
    />
    <systemblock.connection
      from="mcu"
      to="radio"
      label="SPI"
      direction="both"
    />
  </systemblock.page>
)
