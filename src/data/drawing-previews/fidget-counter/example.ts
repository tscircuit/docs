import pcba from "./pcba.json"

export const fidgetCode = `import { assembly } from "@tscircuit/core"
import pcba from "./pcba.json"

// Pinned mechanical models from rushabhcodes/fidget-counter@1.0.31.
const modelUrl = (file: string) =>
  \`https://api.tscircuit.com/package_files/download?package_release_id=897e68ca-ae6e-40bb-9c18-0a1cb543a604&file_path=mechanical/Circuit_Models/\${file}.glb\`

export default () => (
  <assembly.device name="FIDGET">
    <board
      name="PCBA"
      width={pcba.board.width}
      height={pcba.board.height}
      thickness={pcba.board.thickness}
      outline={pcba.board.outline}
    >
      {pcba.holes.map((hole, i) => (
        <hole key={i} diameter={hole.diameter} pcbX={hole.x} pcbY={hole.y} />
      ))}
    </board>
    {pcba.components.map((part) => (
      <assembly.cadassembly
        key={part.name}
        name={part.name}
        cadModel={part.cadModel}
      />
    ))}
    {[
      "Stationary_Base",
      "Cell",
      "MagSafe_Ring",
      "PCB_Fasteners",
      "Bearing_6808",
      "Magnet",
      "Cap_circular",
    ].map((name) => (
      <assembly.cadassembly
        key={name}
        name={name}
        cadModel={{
          glbUrl: modelUrl(name),
          modelUnitToMmScale: 1,
          modelOriginPosition: { x: 0, y: 0, z: 0 },
          positionOffset: { x: 0, y: 0, z: -11.1 },
        }}
      />
    ))}
    <assembly.explosion.stage name="lift-rotor">
      <assembly.explosion.move
        targetRefs="Cap_circular, Bearing_6808, Magnet"
        offZ="22mm"
      />
    </assembly.explosion.stage>
    <assembly.explosion.stage name="separate-rotor" prevStageRef="lift-rotor">
      <assembly.explosion.move targetRefs="Cap_circular" offZ="20mm" />
      <assembly.explosion.move targetRefs="Magnet" offX="32mm" />
    </assembly.explosion.stage>
    <assembly.drawing.stage
      name="rotor"
      partRefs={[".Cap_circular", ".Bearing_6808", ".Magnet"]}
    />
    <assembly.drawing.page
      name="fidget-explosion"
      size="iso_a4"
      anchorAlignment="bottom_left"
    >
      <assembly.drawing.note
        text="FIDGET COUNTER / ROTOR ASSEMBLY"
        paperX={15}
        paperY={195}
        fontSize={4}
      />
      <assembly.drawing.explosionview
        name="exploded"
        stageRef="FIDGET.separate-rotor"
        direction="isometric"
        centerX={195}
        centerY={110}
        width={130}
        height={140}
        showTrails
      >
        <assembly.drawing.partlabel
          text="Circular cap"
          partRefs={[".Cap_circular"]}
          anchor={{ x: 0, y: 0, z: 4.5 }}
          xOffsetFromViewCenter={-65}
          yOffsetFromViewCenter={60}
        />
        <assembly.drawing.partlabel
          text="6808 bearing"
          partRefs={[".Bearing_6808"]}
          anchor={{ x: 24, y: 0, z: -2 }}
          xOffsetFromViewCenter={-65}
          yOffsetFromViewCenter={20}
        />
        <assembly.drawing.partlabel
          text="Encoder magnet"
          partRefs={[".Magnet"]}
          anchor={{ x: 0, y: 0, z: 1.5 }}
          xOffsetFromViewCenter={-65}
          yOffsetFromViewCenter={-5}
        />
      </assembly.drawing.explosionview>
      <assembly.drawing.partview
        name="rotor-detail"
        displayName="ROTOR SUBASSEMBLY"
        stageRef=".rotor"
        direction="isometric"
        centerX={65}
        centerY={135}
        width={80}
        height={75}
      />
      <assembly.drawing.explosionview
        name="assembled"
        displayName="ASSEMBLED / FACTOR 0"
        stageRef="separate-rotor"
        factor={0}
        direction="isometric"
        centerX={65}
        centerY={65}
        width={80}
        height={55}
      />
      <assembly.drawing.note
        text="Lift rotor 22 mm; separate cap another 20 mm."
        viewRef=".exploded"
        xOffsetFromViewCenter={-65}
        paperY={28}
      />
      <assembly.drawing.note
        text="Display offsets illustrate separation; PCB stays assembled."
        paperX={15}
        paperY={16}
      />
    </assembly.drawing.page>
  </assembly.device>
)`

export const fidgetFsMap = {
  "index.circuit.tsx": fidgetCode,
  "pcba.json": JSON.stringify(pcba),
}
