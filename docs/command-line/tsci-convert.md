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

Find a shorter `footprint="..."` for an imported component with explicit pads:

```bash
tsci convert imports/MyChip.tsx --footprinter
tsci convert imports/MyChip.tsx --footprinter --json -o footprint.json
```

Discovery leaves the source unchanged. Inspect `best.footprinterString`,
`pinsMatch`, and `pinMismatches` in the JSON report. Before replacing the footprint,
render the candidate independently and compare pad geometry and electrical pin
mapping, including pin-1 orientation and exposed pads. High copper overlap alone
does not prove equivalence; keep explicit pads if the match is unsuitable.
