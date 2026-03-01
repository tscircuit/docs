---
title: tsci simulate
description: Run circuit simulations from the command line
---

`tsci simulate` runs circuit simulations on your tscircuit designs. Currently it supports analog SPICE simulations.

## Usage

```bash
tsci simulate <subcommand> <file> [options]
```

## Subcommands

### `tsci simulate analog`

Run an analog SPICE simulation on a circuit file.

```bash
tsci simulate analog <file> [options]
```

#### Arguments
- `file` *(required)* – path to a tscircuit `.tsx` or `.circuit.json` file

#### Options
- `--disable-parts-engine` – disable the parts engine during circuit evaluation

The command generates a SPICE netlist from your circuit, runs the simulation, and prints the results in a table format.

## Example

```bash
tsci simulate analog my-circuit.circuit.tsx
```
