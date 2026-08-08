---
title: tsci search
description: Search supplier inventory, footprints, and packages across the tscircuit ecosystem
---

`tsci search` finds supplier components, footprints, and packages across the
tscircuit ecosystem.

## Options

- `--kicad` – search KiCad footprints
- `--jlcpcb` – search JLCPCB components
- `--lcsc` – alias for `--jlcpcb`
- `--digikey` – search DigiKey components
- `--mouser` – search Mouser components
- `--tscircuit` – search tscircuit registry packages
- `--json` – output search results as JSON

When no source option is provided, the command searches JLCPCB. You can combine
source options to search multiple providers in the same command.

## Usage

```bash
$ tsci search resistor
Found 10 component(s) in JLC search:
1. 0603WAF1002T5E (C25804) - ... (stock: 37,165,617)
```

Select a source when you need a particular kind of result:

```bash
# Distributor inventory
$ tsci search --digikey "10k 0603 resistor"
$ tsci search --mouser "10k 0603 resistor"

# Compare DigiKey and Mouser in one result set
$ tsci search --digikey --mouser "STM32F4 microcontroller"

# Footprints or reusable tscircuit packages
$ tsci search --kicad "QFP-32"
$ tsci search --tscircuit "ESP32"
```

The distributor output includes the manufacturer part number, the supplier's
orderable part number, description, and cached stock quantity. DigiKey results
are served through
[digikeysearch.tscircuit.com](https://digikeysearch.tscircuit.com), while
Mouser results are served through
[mousersearch.tscircuit.com](https://mousersearch.tscircuit.com).

:::note

Stock and price values are cached snapshots and may differ from the supplier's
checkout page. `--digikey` and `--mouser` are discovery options; `tsci import`
does not currently import components directly from those distributors.

:::

## JSON output

Use `--json` for scripts and tools. Every result has a `source` discriminator;
DigiKey and Mouser results use `digikey_product_number` and
`mouser_product_number`, respectively.

```bash
$ tsci search --digikey --mouser "10k 0603 resistor" --json
```

```json
{
  "query": "10k 0603 resistor",
  "results": [
    {
      "source": "digikey",
      "digikey_product_number": "311-10.0KHRCT-ND",
      "mfr": "RC0603FR-0710KL",
      "manufacturer": "YAGEO",
      "package": "0603",
      "description": "RES 10K OHM 1% 1/10W 0603",
      "stock": 100000,
      "price": 0.1
    },
    {
      "source": "mouser",
      "mouser_product_number": "603-RC0603FR-0710KL",
      "mfr": "RC0603FR-0710KL",
      "manufacturer": "YAGEO",
      "package": "0603",
      "description": "Thick Film Resistors - SMD 10K ohm 1%",
      "stock": 100000,
      "price": 0.1
    }
  ]
}
```
