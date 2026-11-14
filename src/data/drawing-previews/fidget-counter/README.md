# Fidget-counter drawing example

Models and board geometry come from [rushabhcodes/fidget-counter](https://tscircuit.com/rushabhcodes/fidget-counter#3d), published version **1.0.31**, release `897e68ca-ae6e-40bb-9c18-0a1cb543a604`. Model downloads are pinned to that release or its immutable file IDs.

`pcba.json` copies the board outline, thickness, four mounting holes, and the 27 fitted CAD components' original positions, rotations, model origins, and URLs from the published Circuit JSON. It is drawing geometry only: electrical connectivity, copper, and routing are not re-authored here. Mechanical models preserve the source enclosure's -11.1 mm Z offset. The seven original mechanical identities include the two PCB screws in one model.

The authored explosion stages are documentation display poses: lift the rotor 22 mm, then move the cap another 20 mm and the encoder magnet sideways 32 mm. The PCB, cell, base, attachment ring, and screws remain assembled. The drawing-stage selection contains the cap, bearing, and magnet without motion.

`example.ts` supplies the same source as `codetestingplayground/drawing-docs/fidget-counter.circuit.tsx`, with the JSON import made local for CircuitPreview's filesystem map. Build the playground file with `tsci build`; use the SVG service drawing endpoint to render the exported Circuit JSON. Keep the code string and playground source synchronized when updating the example.

Regenerate the committed SVG previews with `bun scripts/render-assembly-drawing-previews.ts`; set `SVG_BASE_URL` to a service PR preview when validating an unreleased renderer. The script submits the displayed TSX filesystem maps to the drawing API and rejects non-SVG/error responses.
