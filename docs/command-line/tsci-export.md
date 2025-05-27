---
title: tsci export
---

import ImageWithCaption from "../../src/components/ImageWithCaption"

## Overview

`tsci export` can be used to convert a `tsx` file or `circuit.json` file into
various output formats including schematics, PCB layouts, fabrication files, and more.

<ImageWithCaption
  src="/img/tsci-dev-export.png"
  alt="Export options in the web interface"
  caption="Export options available in the web interface after running tsci dev"
/>

## Usage

```bash
tsci export <file> [options]
```

### Arguments
- `<file>`: Path to the source file (`.tsx` or `.circuit.json`)

### Options
- `-f, --format <format>`: Output format (defaults to "json")
- `-o, --output <path>`: Custom output file path

## Supported Formats

The following export formats are supported:

| Format | Description |
|--------|-------------|
| `circuit-json`| Circuit JSON format |
| `schematic-svg` | Schematic view as SVG |
| `pcb-svg` | PCB layout as SVG |
| `readable-netlist` | Human-readable netlist |
| `specctra-dsn` | Specctra DSN format for autorouting |

## Examples

Export to circuit JSON:
```bash
tsci export circuit.tsx
```

Export as schematic SVG:
```bash
tsci export circuit.tsx -f schematic-svg
```

Export PCB layout with custom output path:
```bash
tsci export circuit.tsx -f pcb-svg -o my-pcb-layout.svg
```

Export to Specctra DSN format:
```bash
tsci export circuit.tsx -f specctra-dsn
```

## Output Files

By default, the exported file will be saved in the same directory as the input file, with a filename based on the input filename and the chosen format. For example:

- Input: `my-circuit.tsx`
- Format: `pcb-svg`
- Default output: `my-circuit-pcb.svg`

You can override the output location using the `-o` or `--output` option.
