import CircuitPreview from "./CircuitPreview"
import { grid } from "@tscircuit/math-utils"

const grids = {
  2: {
    grid: grid({
      rows: 1,
      cols: 2,
      xSpacing: 15,
      ySpacing: 15,
      centered: true,
    }),
  },
  3: {
    grid: grid({
      rows: 1,
      cols: 3,
      xSpacing: 15,
      ySpacing: 15,
      centered: true,
    }),
  },
  6: {
    grid: grid({
      rows: 2,
      cols: 3,
      xSpacing: 15,
      ySpacing: 15,
      centered: true,
    }),
  },
}

export const FootprintPreview = ({
  footprint,
  footprints,
}: { footprint?: string; footprints?: string[] }) => {
  if (footprints) {
    const grid = grids[footprints.length]
    return (
      <CircuitPreview
        hideSchematicTab
        defaultView="pcb"
        code={`
export default () => (
  <board>
${footprints
  .map((f, i) =>
    !f
      ? ""
      : `    <chip footprint="${f}" name="U${i + 1}" pcbX={${grid.grid[i].center.x}} pcbY={${grid.grid[i].center.y}} />`,
  )
  .filter((a) => Boolean(a))
  .join("  \n")}
  </board>
)
`}
      />
    )
  }

  return (
    <CircuitPreview
      defaultView="pcb"
      code={`
export default () => (
  <chip
    name="U1"
    footprint="${footprint}"
  />
)
`}
    />
  )
}

export default FootprintPreview
