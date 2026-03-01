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
tsci import "ESP32-S3"
```

Search only JLCPCB:
```bash
tsci import "0402 100nF" --jlcpcb
```

Search only the tscircuit registry:
```bash
tsci import "usb-c" --tscircuit
```

After selecting a component, `tsci import` will automatically install it into your project.
