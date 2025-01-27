---
title: Importing from KiCad
sidebar_position: 3
---

## Overview

You can import KiCad components or projects into tscircuit.

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
