const bracketSource = `import { jscad } from "tscircuit"

export const controllerHoles = [-32, 32].flatMap((x) => [-12, 12].map((y) => [x, y] as const))

export function MotorBracket() {
  return (
    <>
      <jscad.subtract>
        <jscad.union>
          <jscad.cuboid size={[100, 105, 5]} center={[-10, 20, 2.5]} />
          <jscad.cuboid size={[4, 50, 54]} center={[2, 0, 32]} />
          {[-24, 24].map((y) => (
            <jscad.cuboid key={y} size={[28, 5, 20]} center={[-10, y, 15]} />
          ))}
          {controllerHoles.map(([x, y]) => (
            <jscad.cylinder
              key={\`\${x},\${y}\`}
              radius={4}
              height={14}
              center={[x - 10, y + 50, 7]}
            />
          ))}
        </jscad.union>
        {/* NEMA17: 22 mm pilot and 31 mm screw-hole spacing. */}
        <jscad.translate offset={[2, 0, 32]}>
          <jscad.rotate angles={[0, Math.PI / 2, 0]}>
            <jscad.cylinder radius={11.5} height={6} />
            {[-15.5, 15.5].flatMap((x) =>
              [-15.5, 15.5].map((y) => (
                <jscad.cylinder
                  key={\`\${x},\${y}\`}
                  radius={1.6}
                  height={6}
                  center={[x, y, 0]}
                />
              )),
            )}
          </jscad.rotate>
        </jscad.translate>
        {controllerHoles.map(([x, y]) => (
          <jscad.cylinder
            key={\`\${x},\${y}\`}
            radius={1.6}
            height={16}
            center={[x - 10, y + 50, 7]}
          />
        ))}
        {[-50, 30].flatMap((x) =>
          [-24, 66].map((y) => (
            <jscad.cylinder
              key={\`\${x},\${y}\`}
              radius={2.2}
              height={7}
              center={[x, y, 2.5]}
            />
          )),
        )}
      </jscad.subtract>
      <jscad.translate offset={[0, 0, 32]}>
        <jscad.rotate angles={[0, -Math.PI / 2, 0]}>
          <jscad.rectangle name="motor" size={[42, 42]} reference />
        </jscad.rotate>
      </jscad.translate>
      <jscad.translate offset={[-10, 50, 14]}>
        <jscad.rectangle name="controller" size={[76, 34]} reference />
      </jscad.translate>
    </>
  )
}
`

const controllerSource = `import { Fragment } from "react"
import type { BoardProps } from "@tscircuit/props"
import { controllerHoles } from "./motor-bracket"

export function MotorController(props: BoardProps) {
  return (
    <board
      name="CONTROL"
      width={76}
      height={34}
      thickness={1.6}
      routingDisabled
      {...props}
    >
      {controllerHoles.map(([x, y]) => (
        <Fragment key={[x, y].join(",")}>
          <hole diameter={3.2} pcbX={x} pcbY={y} />
        </Fragment>
      ))}
      <connector
        name="J_MOTOR"
        standard="jst_ph"
        pinCount={6}
        footprint="jst6_ph"
        pcbX={-23}
        pcbY={0}
      />
      <pinheader name="J_POWER" pinCount={2} pitch={2.54} pcbX={24} pcbY={0} />
      <chip name="U_DRIVER" footprint="soic16" pcbX={0} pcbY={0} />
      <silkscreentext text="MOTOR CONTROL" fontSize={1.8} pcbX={0} pcbY={-11} />
      <silkscreentext text="MOTOR" fontSize={1.5} pcbX={-23} pcbY={6} />
      <silkscreentext text="POWER" fontSize={1.5} pcbX={24} pcbY={6} />
    </board>
  )
}
`

export const motorBracketFiles = {
  "index.tsx": `import { assembly } from "tscircuit"
import { MotorBracket } from "./motor-bracket"

export default () => (
  <assembly.device>
    <assembly.printedpart name="BRACKET" jscad={<MotorBracket />} />
    <assembly.motor
      name="MOTOR"
      standard="nema17"
      mountedTo="BRACKET.motor"
      mountFace="frontface"
    />
  </assembly.device>
)
`,
  "motor-bracket.tsx": bracketSource,
}

export const motorControllerFiles = {
  "index.tsx": `import { assembly } from "tscircuit"
import { MotorBracket } from "./motor-bracket"
import { MotorController } from "./motor-controller"

export default () => (
  <assembly.device>
    <assembly.printedpart name="BRACKET" jscad={<MotorBracket />} />
    <assembly.motor
      name="MOTOR"
      standard="nema17"
      wireConnection="jst-ph-6"
      mountedTo="BRACKET.motor"
      mountFace="frontface"
    />
    <MotorController
      mountedTo="BRACKET.controller"
      pcbX={-10}
      pcbY={50}
    />
    <assembly.cable
      name="MOTOR_CABLE"
      from="MOTOR.wireside"
      to=".CONTROL > .J_MOTOR"
    />
  </assembly.device>
)
`,
  "motor-bracket.tsx": bracketSource,
  "motor-controller.tsx": controllerSource,
}
