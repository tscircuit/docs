import { assembly } from "@tscircuit/core"
import {
  ExtrudeLinear,
  Polygon,
  Rectangle,
  Subtract,
  Translate,
} from "jscad-fiber/model"

const circlePoints = (radius: number): [number, number][] =>
  Array.from({ length: 32 }, (_, i) => [
    radius * Math.cos((i * Math.PI) / 16),
    radius * Math.sin((i * Math.PI) / 16),
  ])

function Plate() {
  return (
    <Subtract>
      <ExtrudeLinear height={4} topOutlineName="rim">
        <Rectangle size={[50, 30]} />
      </ExtrudeLinear>
      <Translate offset={[17, 8, 0]}>
        <ExtrudeLinear height={4} topOutlineName="H1">
          <Polygon points={circlePoints(1.5)} />
        </ExtrudeLinear>
      </Translate>
      <Translate offset={[-13, -6, 0]}>
        <ExtrudeLinear height={4} topOutlineName="H2">
          <Polygon points={circlePoints(2.5)} />
        </ExtrudeLinear>
      </Translate>
    </Subtract>
  )
}

export default () => (
  <assembly.device>
    <assembly.printedpart name="plate" jscad={<Plate />} />
    <assembly.drawing.page name="cad-dimensions" width={210} height={160}>
      <assembly.drawing.partview
        name="plan"
        partRef=".plate"
        direction="z+"
        width={100}
        height={65}
        centerX={-10}
        centerY={15}
      >
        <assembly.drawing.dimension name="bore-span" edgeRef=".plate > .H1" />
        <assembly.drawing.dimension
          name="hole-spacing"
          fromRef=".plate > .H1"
          toRef=".plate > .H2"
          axis="x"
        />
        <assembly.drawing.dimension
          name="edge-to-hole"
          fromRef=".plate > .rim"
          toRef=".plate > .H1"
          axis="x"
        />
        <assembly.drawing.dimension
          name="nearest-edge"
          fromRef=".plate > .rim"
          toRef=".plate > .H1"
        />
      </assembly.drawing.partview>
      <assembly.drawing.titleblock title="NAMED CAD HOLES AND OUTLINE" />
    </assembly.drawing.page>
  </assembly.device>
)
