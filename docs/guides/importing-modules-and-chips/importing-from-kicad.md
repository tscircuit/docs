---
title: Importing from KiCad
sidebar_position: 3
description: You can import KiCad components or projects into tscircuit.
---

## Overview

You can import KiCad components or projects into tscircuit.

:::tip
If you're trying to use a footprint from KiCad's standard libraries, you can skip manual importing and reference it directly with the `kicad:` prefix (e.g. `kicad:Resistor_SMD/R_0402_1005Metric`). See [KiCad Footprints](/footprints/kicad-footprints) for more details.
:::

To import from KiCad, you should understand the different file formats KiCad
uses:

- Files for KiCad components
  - `kicad_mod` - PCB footprint file for a single component
  - `kicad_sym` - Schematic symbol file for a single component
- Files for KiCad projects
  - `kicad_pro` - KiCad project file
  - `kicad_pcb` - KiCad PCB board file
  - `kicad_sch` - KiCad Schematic board file

:::info
We're still building KiCad import directly into tscircuit.com, stay tuned for
when that's available!
:::

## Importing KiCad Components

Currently the easiest way to import KiCad components is to go to [kicad-component.tscircuit.com](https://kicad-component.tscircuit.com/)
and upload your `kicad_mod` and/or `kicad_sym` file.

### Converting a `.kicad_mod` file to TSX

The converter site generates ready-to-use TSX that you can paste directly into a
tscircuit project. The basic workflow looks like this:

1. Visit [kicad-component.tscircuit.com](https://kicad-component.tscircuit.com/)
   and drag your `.kicad_mod` file (or click the upload button) onto the
   drop-zone.
2. Wait for the converter to parse the footprint. The preview tab shows the
   rendered footprint so you can verify pad positions, drill sizes, and
   reference text before exporting.
3. Switch to the **TSX** tab and copy the generated component definition. The
   snippet includes a `<module />` wrapper with `<pcbVia />`, `<pcbSmtpad />`,
   and other primitives that mirror the original footprint.
4. Paste the TSX into a file such as `src/components/MyFootprint.tsx`, export
   the module, and reference it inside your board (e.g. `<MyFootprint
   name="U1" />`).
5. If the footprint has named pads, the converter also provides a `pinLabels`
   object; update names as needed to match your schematic conventions.

When you update the KiCad source file later, you can re-upload it to the
converter to receive an updated TSX snippet. This keeps your tscircuit modules
in sync with the authoritative KiCad footprint.

### Importing KiCad Components using the CLI

Using tscircuit's [open-source KiCad component converter](https://github.com/tscircuit/kicad-component-converter),
we can convert KiCad files on the command line.

First install the component converter:

```bash
npm install -g kicad-mod-converter
```

Next, run the following command to convert your KiCad files:

```bash
# Convert a directory ./my-footprints.pretty to a tscircuit project
kicad-mod-converter convert-kicad-directory --input-dir ./my-footprints.pretty --output-dir ./my-tscircuit-footprints
```

### Importing KiCad Components Programmatically

```bash
bun add kicad-mod-converter
```

```tsx
import { parseKicadModToCircuitJson } from "kicad-component-converter"
import { readFileSync } from "node:fs"

const fileContent = readFileSync("SW_SP3T_PCM13.kicad_mod")
const circuitJson = await parseKicadModToCircuitJson(fileContent)
/* [
 *  {
 *    "type": "pcb_smtpad",
 *    "x": 0.345,
 *    ...
 */
```

[Circuit JSON](https://github.com/tscircuit/circuit-json) can then be converted
into regular tscircuit modules using [circuit-json-to-tscircuit](https://github.com/tscircuit/circuit-json-to-tscircuit)
