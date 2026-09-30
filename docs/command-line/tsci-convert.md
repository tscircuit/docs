---
title: tsci convert
description: Convert KiCad footprints to TSX or discover compact footprinter strings
---

`tsci convert` converts a `.kicad_mod` footprint into a tscircuit TSX component.
With `--footprinter`, it instead discovers a compact [footprinter string](../footprints/footprinter-strings.mdx)
from an existing footprint, including a TSX component with explicit pads.

## Usage

```bash
tsci convert <file> [options]
```

### Arguments

- `file` *(required)* – path to a `.kicad_mod` file. With `--footprinter`, also accepts `.tsx`, `.ts`, `.jsx`, `.js`, or `.circuit.json`.
- TSX/component input must render one component or footprint, not an entire board. Circuit JSON must contain an array of elements representing the footprint to match.

### Options

- `-o, --output <path>` – output TSX, footprinter text, or discovery JSON file path. KiCad-to-TSX conversion defaults to the input directory; discovery prints to the terminal when omitted.
- `-n, --name <component>` – exported component name for KiCad-to-TSX conversion (defaults to the input filename without extension).
- `--footprinter` – discover a footprinter string instead of generating TSX.
- `--json` – output discovery details, including the best match and candidates; requires `--footprinter`.

Run `tsci convert --help` to check the options supported by your installed CLI.

## Convert KiCad to TSX

Convert a footprint using defaults:

```bash
tsci convert MyFootprint.kicad_mod
# Creates MyFootprint.tsx in the same directory
```

Convert with a custom component name and output path:

```bash
tsci convert MyFootprint.kicad_mod --name CustomPad --output src/components/CustomPad.tsx
```

## Discover a compact footprinter string

Use discovery when an imported component has a long `footprint={<footprint>...</footprint>}`
and you want to find a shorter string describing the same pad layout:

```bash
# Print the suggested string and copper overlap score
tsci convert imports/F1C100S.tsx --footprinter

# Save just the string to a text file
tsci convert imports/F1C100S.tsx --footprinter -o f1c100s.footprinter.txt

# Save the full report for geometry and pin-mapping review
tsci convert imports/F1C100S.tsx --footprinter --json -o f1c100s.footprinter.json

# Discovery also accepts KiCad footprints and Circuit JSON
tsci convert MyFootprint.kicad_mod --footprinter
tsci convert MyFootprint.circuit.json --footprinter --json
```

Discovery does not rewrite the source component. Review the result, then replace
its `footprint` prop with the selected string while preserving its pin labels,
pin attributes, schematic configuration, and other component props.

### Check geometry and pin mapping before replacing

The JSON report contains `best` and `candidates`. Inspect `footprinterString`,
`copperIntersectionOverUnion`, `holeIntersectionOverUnion`, `geometryScore`,
`pinMatchRate`, `pinsMatch`, and `pinMismatches`. Copper overlap near 1 does not
prove that every pad maps to the correct electrical pin.

1. Keep the original footprint as a baseline. Render the proposed replacement in isolation so saved board/module geometry cannot hide the change.
2. Compare every pad's center, size, shape, corner radius, rotation, layer, and drill geometry in a common coordinate system. Check pin-1 orientation and exposed-pad dimensions against the package drawing.
3. Verify each pad's port hints resolve to the intended chip pin. Resolve every pin mismatch, including the exposed pad, and check its net connection.
4. Rebuild and inspect a PCB snapshot after applying the change. Retain the explicit footprint if the string cannot preserve the required geometry or pin mapping.

### Example: F1C100S exposed pad

For an F1C100S footprint with 88 perimeter pads and one exposed ground pad,
discovery suggested:

```text
mlp88_thermalpad6.75mmx6.75mm_p0.4mm_h11mm_pw0.2mm_pl0.8mm_pin1location(bottomside,left)
```

The copper overlap was approximately 0.999, but `pinsMatch` was `false`: the
original exposed pad used the `thermalpad` port hint while the candidate used
`pin89`. Map the generated pad to the chip's physical pin 89 by adding the
`thermalpad` alias to its existing ground labels. Preserve all other labels:

```tsx
const pinLabels = {
  // ...existing pin1 through pin88 labels
  pin89: ["GND", "thermalpad"],
} as const
```

For this footprint, appending `_rounded0` also preserved the original rectangular
pad corners. The verified replacement string was:

```text
mlp88_thermalpad6.75mmx6.75mm_p0.4mm_h11mm_pw0.2mm_pl0.8mm_pin1location(bottomside,left)_rounded0
```

Exposed-pad numbering and corner geometry are package-specific. Check your
component's original footprint and datasheet rather than copying this mapping
for other chips.
