---
title: tsci export
description: Export tscircuit files to various formats including SVG schematics, PCB layouts, and fabrication files.
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
| `gltf` | Text-based 3D scene (glTF 2.0) that references board meshes and textures |
| `glb` | Binary glTF bundle that packs geometry, materials, and textures into a single file |
| `kicad-library` | KiCad library with symbols, footprints, and 3D models (see [Exporting KiCad Library](/docs/guides/exporting-kicad-library)) |

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

## Exporting 3D models

Use the `gltf` or `glb` formats when you want a 3D representation of your board for use in CAD tools, AR viewers, or when embedding on the web.

### Export as glTF

```bash
tsci export circuit.tsx --format gltf
```

This produces a `.gltf` file (plus any referenced texture files) that follows the [glTF 2.0](https://www.khronos.org/gltf/) spec. Because the assets stay separate, glTF exports are easier to diff in git and you can selectively optimize textures.

### Export as GLB

```bash
tsci export circuit.tsx --format glb
```

The `glb` format wraps the same data into a single binary so you can upload one file to a web viewer (for example, https://gltf.report/ or `model-viewer`). This is handy for sharing previews or attaching a lightweight CAD model to a manufacturing request.

Both commands work with `.tsx` source files as well as `.circuit.json` files, so you can export whichever representation you already have. Each command writes the 3D model next to the input file unless you override the location with `--output <path>`.

## Output Files

By default, the exported file will be saved in the same directory as the input file, with a filename based on the input filename and the chosen format. For example:

- Input: `my-circuit.tsx`
- Format: `pcb-svg`
- Default output: `my-circuit-pcb.svg`

You can override the output location using the `-o` or `--output` option.
