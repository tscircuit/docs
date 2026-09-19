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
- `--disable-parts-engine`: Disable the parts engine during circuit evaluation
- `--show-courtyards`: Show courtyard outlines in PCB images
- `--layer <layer>`: Choose `top` or `bottom`; during X-Ray, this layer is drawn in front
- `--x-ray-net <name-or-id>`: X-Ray a connected PCB net; repeat to select multiple nets
- `--hidden-layer-opacity <opacity>`: Opacity of other copper during X-Ray, from `0` to `1` (default: `0.2`)

## Supported Formats

The following export formats are supported:

| Format | Description |
|--------|-------------|
| `json` | Circuit JSON format (alias for `circuit-json`) |
| `circuit-json`| Circuit JSON format |
| `schematic-svg` | Schematic view as SVG |
| `pcb-svg` | PCB layout as SVG |
| `pcb-png` | PCB layout as PNG |
| `assembly-svg` | Assembly view as SVG |
| `gerbers` | Gerber fabrication files (zipped) |
| `readable-netlist` | Human-readable netlist |
| `specctra-dsn` | Specctra DSN format for autorouting |
| `gltf` | Text-based 3D scene (glTF 2.0) that references board meshes and textures |
| `glb` | Binary glTF bundle that packs geometry, materials, and textures into a single file |
| `step` | STEP 3D model (ISO-10303-21) for high-fidelity CAD integration |
| `kicad_sch` | KiCad schematic file |
| `kicad_pcb` | KiCad PCB layout file |
| `kicad_zip` | Zipped KiCad project (schematic + PCB) |
| `kicad-library` | KiCad library with symbols, footprints, and 3D models (see [Exporting KiCad Library](../guides/kicad/exporting-kicad-library.md)) |
| `spice` | SPICE netlist with simulation results exported as `.spice.cir` and `.csv` |

## Examples

Export to circuit JSON:
```bash
tsci export circuit.tsx
```

Export as schematic SVG:
```bash
tsci export circuit.tsx -f schematic-svg
```

Export as assembly SVG:

```bash
tsci export circuit.tsx -f assembly-svg
```

Export PCB layout with custom output path:
```bash
tsci export circuit.tsx -f pcb-svg -o my-pcb-layout.svg
```

Export PCB SVG with courtyard outlines:

```bash
tsci export circuit.tsx -f pcb-svg --show-courtyards
```

Export to Specctra DSN format:
```bash
tsci export circuit.tsx -f specctra-dsn
```

## X-Ray PCB nets

Use X-Ray to inspect selected nets across all copper layers in a PCB SVG or PNG.
Selected pads, traces, vias, plated holes, copper pours, and copper text render at
full opacity, including the selected net's via and plated-hole drills. Other
copper uses `--hidden-layer-opacity`; board outlines, silkscreen, other non-copper
layers, and unrelated drills are hidden.

```bash
# Inspect one net as SVG with 20% background copper
tsci export board.tsx -f pcb-svg --x-ray-net GND --hidden-layer-opacity 0.2 -o ground.svg

# Inspect two nets as PNG, with bottom copper drawn in front
tsci export board.circuit.json -f pcb-png --x-ray-net GND --x-ray-net VCC --layer bottom -o power.png
```

Selectors accept an exact source net name, source trace name, trace display name,
or connected Circuit JSON element ID. Quote names containing spaces, such as
`--x-ray-net "U1.1 to U2.2"`. An element ID selects its entire connected net.
Unknown names, ambiguous names, and selections without PCB copper produce errors;
use an element ID to distinguish nets with the same name.

Repeat `--x-ray-net` to select more nets. During X-Ray, `--layer top` or
`--layer bottom` chooses the frontmost layer without hiding the selected net's
copper on other layers. `--hidden-layer-opacity 0.05` makes unselected copper 5%
visible; `0` hides it and `1` makes it fully opaque. The default is `0.2`.
X-Ray options require `pcb-svg` or `pcb-png` output.

For reusable defaults, configure
[`pcbSnapshotSettings`](../guides/tscircuit-essentials/tscircuit-config.mdx#pcbsnapshotsettings).
For regression images, use [X-Ray snapshots](./tsci-snapshot.md#x-ray-snapshots).

## Exporting 3D models

Use the `gltf`, `glb`, or `step` formats when you want a 3D representation of your board for use in CAD tools, AR viewers, or when embedding on the web.

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

### Export as STEP

```bash
tsci export circuit.tsx --format step
```

This produces a `.step` file that can be imported into most mechanical CAD tools.

## Output Files

By default, the exported file will be saved in the same directory as the input file, with a filename based on the input filename and the chosen format. For example:

- Input: `my-circuit.tsx`
- Format: `pcb-svg`
- Default output: `my-circuit-pcb.svg`

You can override the output location using the `-o` or `--output` option.
