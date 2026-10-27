import { assembly } from "@tscircuit/core"

export default () => (
  <assembly.device>
    <board name="carrier" width={50} height={30} routingDisabled>
      <hole name="H1" diameter={3} pcbX={17} pcbY={8} />
      <platedhole
        name="H2"
        shape="circle"
        holeDiameter={3}
        outerDiameter={5}
        pcbX={-13}
        pcbY={-6}
      />
    </board>
    <assembly.drawing.page name="pcb-dimensions" width={210} height={160}>
      <assembly.drawing.partview
        name="plan"
        partRef=".carrier"
        direction="z+"
        width={100}
        height={65}
        centerX={-10}
        centerY={15}
      >
        <assembly.drawing.dimension
          name="hole-spacing-x"
          fromRef=".H1"
          toRef=".H2"
          axis="x"
        />
        <assembly.drawing.dimension
          name="hole-spacing-y"
          fromRef=".H1"
          toRef=".H2"
          axis="y"
        />
        <assembly.drawing.dimension
          name="left-edge-to-hole"
          fromRef=".carrier"
          fromAnchor="left"
          toRef=".H1"
          axis="x"
        />
        <assembly.drawing.dimension name="board-width" widthOfView />
        <assembly.drawing.dimension name="board-height" heightOfView />
      </assembly.drawing.partview>
      <assembly.drawing.titleblock title="PCB HOLE SPACING AND EDGE OFFSET" />
    </assembly.drawing.page>
  </assembly.device>
)
