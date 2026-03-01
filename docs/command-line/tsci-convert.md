---
title: tsci convert
description: Convert a KiCad footprint file to a tscircuit component
---

`tsci convert` takes a `.kicad_mod` footprint file and converts it into a tscircuit TSX component, making it easy to reuse existing KiCad footprints in your tscircuit projects.

## Usage

```bash
tsci convert <file> [options]
```

### Arguments
- `file` *(required)* – path to the `.kicad_mod` file

### Options
- `-o, --output <path>` – output TSX file path (defaults to the same directory as the input file)
- `-n, --name <component>` – component name for the export (defaults to the input filename without extension)

## Examples

Convert a footprint using defaults:
```bash
tsci convert MyFootprint.kicad_mod
# Creates MyFootprint.tsx in the same directory
```

Convert with a custom component name and output path:
```bash
tsci convert MyFootprint.kicad_mod --name CustomPad --output src/components/CustomPad.tsx
```
