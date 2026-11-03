/** Complete sources shared by the docs, editor links and preview generator. */
const modelsSource = `import { jscad } from "tscircuit"
import { renderToJscadPlan } from "jscad-fiber/headless"

export function BearingHousing() {
  return (
    <jscad.colorize color="#2879b7">
      <jscad.subtract>
        <jscad.cuboid size={[60, 40, 6]} center={[0, 0, 3]} />
        {/* 22.2 mm bearing pocket, with its floor at Z=4. */}
        <jscad.cylinder radius={11.1} height={4} center={[0, 0, 6]} />
        <jscad.cylinder radius={4.3} height={10} center={[0, 0, 3]} />
        {[-22, 22].flatMap((x) => [-12, 12].map((y) => (
          <jscad.cylinder key={[x, y].join(",")}
            radius={1.6} height={10} center={[x, y, 3]} />
        )))}
      </jscad.subtract>
    </jscad.colorize>
  )
}

// Nominal 608-style bearing: chamfered races, recessed metal shields and balls.
// Part-local +Z is above; its bottom seating plane is Z=0, top is Z=7 mm.
function BearingSolid() {
  return (
    <jscad.colorize color="#aeb8c2">
      <jscad.union>
        <jscad.subtract>
          <jscad.hull>
            <jscad.cylinder radius={10.5} height={7} center={[0, 0, 3.5]} />
            <jscad.cylinder radius={11} height={6} center={[0, 0, 3.5]} />
          </jscad.hull>
          <jscad.cylinder radius={9.2} height={9} center={[0, 0, 3.5]} />
        </jscad.subtract>
        <jscad.subtract>
          <jscad.hull>
            <jscad.cylinder radius={5.3} height={7} center={[0, 0, 3.5]} />
            <jscad.cylinder radius={5.6} height={6.4} center={[0, 0, 3.5]} />
          </jscad.hull>
          <jscad.cylinder radius={4} height={9} center={[0, 0, 3.5]} />
        </jscad.subtract>
        {[0.6, 6.4].map((z) => (
          <jscad.subtract key={z}>
            <jscad.cylinder radius={9.1} height={0.35} center={[0, 0, z]} />
            <jscad.cylinder radius={5.7} height={1} center={[0, 0, z]} />
          </jscad.subtract>
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <jscad.sphere key={i} radius={1.55}
            center={[7.35 * Math.cos(i * Math.PI / 4), 7.35 * Math.sin(i * Math.PI / 4), 3.5]} />
        ))}
      </jscad.union>
    </jscad.colorize>
  )
}

export const bearingModel = { jscad: renderToJscadPlan(<BearingSolid />) }

export function SlottedBase() {
  return (
    <jscad.colorize color="#a9b6c1">
      <jscad.subtract>
        <jscad.cuboid size={[80, 60, 6]} center={[0, 0, 3]} />
        <jscad.cylinder radius={15} height={10} center={[0, 0, 3]} />
        {[-30, 30].map((x) => (
          <jscad.hull key={x}>
            <jscad.cylinder radius={2.2} height={10} center={[x, -18, 3]} />
            <jscad.cylinder radius={2.2} height={10} center={[x, 18, 3]} />
          </jscad.hull>
        ))}
      </jscad.subtract>
    </jscad.colorize>
  )
}
`

const bearingParts = `    <assembly.printedpart name="HOUSING" jscad={<BearingHousing />}>
      <assembly.referencesurface name="bearingSeat" centerZOffset={4} />
      <assembly.referencesurface name="boltSeat"
        centerXOffset={22} centerYOffset={12} centerZOffset={6} />
    </assembly.printedpart>
    <assembly.part name="BEARING"
      cadModel={bearingModel}
      mountedTo=".HOUSING > .bearingSeat" mountFace="base">
      <assembly.referencesurface name="base" normalDirection="z-" />
    </assembly.part>`

export const bearingMountFiles = {
  "index.tsx": `import { assembly } from "tscircuit"
import { BearingHousing, bearingModel } from "./models"

export default () => (
  <assembly.device>
${bearingParts}
    <assembly.bolt name="BOLT" model="hexsocketbolt_m3_l10mm"
      fastenedTo=".HOUSING > .boltSeat" />
  </assembly.device>
)
`,
  "models.tsx": modelsSource,
}

export const relativeModuleFiles = {
  "index.tsx": `import { assembly } from "tscircuit"
import { BearingHousing, SlottedBase, bearingModel } from "./models"

export default () => (
  <assembly.device>
    <assembly.printedpart name="BASE" jscad={<SlottedBase />}>
      <assembly.referencesurface name="mount" centerZOffset={6} />
    </assembly.printedpart>
    <assembly.subassembly name="MODULE"
      mountedTo=".BASE > .mount" mountFace="base"
      mountOffset={{ x: "6mm", y: "-4mm" }} mountGap="2mm">
      <assembly.referencesurface name="base" normalDirection="z-" />
${bearingParts}
    </assembly.subassembly>
  </assembly.device>
)
`,
  "models.tsx": modelsSource,
}

export const pcbFasteningCode = `import { assembly } from "tscircuit"

export default () => (
  <assembly.device>
    <board name="CONTROL" width={50} height={40} thickness={1.6}
      pcbX={10} pcbY={5} pcbRotation={20} routingDisabled>
      <hole name="H1" diameter={3.2} pcbX={-16} pcbY={-12} />
      <platedhole name="H2" shape="circle"
        holeDiameter={3.2} outerDiameter={6} pcbX={16} pcbY={12} />
      <chip name="U_DRIVER" footprint="soic8" />
    </board>
    <assembly.bolt name="B1" model="hexsocketbolt_m3_l10mm"
      fastenedTo=".CONTROL > .H1" />
    <assembly.bolt name="B2" model="hexsocketbolt_m3_l10mm"
      fastenedTo=".CONTROL > .H2 > .bottom" />
  </assembly.device>
)
`
