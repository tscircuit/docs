---
title: tsci import
description: Search JLCPCB or the tscircuit registry and import a component into your project
---

`tsci import` searches for components across JLCPCB and the tscircuit registry, then lets you interactively select and install one into your project. It is a convenient way to discover and add parts without leaving the terminal.

## Usage

```bash
tsci import <query> [options]
```

### Arguments
- `query` *(required)* – chip name, part number, or package name to search for

### Options
- `--jlcpcb` – search JLCPCB components only
- `--lcsc` – alias for `--jlcpcb`
- `--tscircuit` – search tscircuit registry packages only

When no filter options are provided, both JLCPCB and the tscircuit registry are searched.

## Examples

Search everywhere and pick a component interactively:
```bash
$ tsci import "ESP32-S3"
✔ Select a part to import › seveibar/esp32-s3-mini-1-n8 - Generated from JLCPCB part number C2913206
⠋ Installing seveibar/esp32-s3-mini-1-n8...Adding @tsci/seveibar.esp32-s3-mini-1-n8...
> bun add @tsci/seveibar.esp32-s3-mini-1-n8
bun add v1.3.3 (274e01c7)

installed @tsci/seveibar.esp32-s3-mini-1-n8@0.1.0

1 package installed [1.91s]
✓ Added @tsci/seveibar.esp32-s3-mini-1-n8 successfully
✔ Installed seveibar/esp32-s3-mini-1-n8
```

Search only JLCPCB:
```bash
$ tsci import "C16040" --jlcpcb
✔ Imported /home/rushabh/testing/imports/MCP4822_E_SN.tsx
```

Search only the tscircuit registry:
```bash
$ tsci import "usb-c" --tscircuit
✔ Select a part to import › seveibar/smd-usb-c
⠋ Installing seveibar/smd-usb-c...Adding @tsci/seveibar.smd-usb-c...
> bun add @tsci/seveibar.smd-usb-c
bun add v1.3.3 (274e01c7)

installed @tsci/seveibar.smd-usb-c@0.0.2

1 package installed [18.02s]
✓ Added @tsci/seveibar.smd-usb-c successfully
✔ Installed seveibar/smd-usb-c
```

After selecting a component, `tsci import` will automatically install it into your project.
