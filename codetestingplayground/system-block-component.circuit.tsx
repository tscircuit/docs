import { systemblock } from "tscircuit"

export default () => (
  <systemblock.page name="overview">
    <systemblock.component
      name="sensor"
      displayName="Environment sensor"
      description="Measures temperature and humidity"
    />
  </systemblock.page>
)
