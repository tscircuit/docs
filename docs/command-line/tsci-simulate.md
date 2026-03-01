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
$ tsci simulate analog my-circuit.circuit.tsx
ngspice 1 -> ngspice 1 -> 
Note: No compatibility mode selected!


Circuit: * circuit json to spice netlist

ngspice 2 -> Doing analysis at TEMP = 27.000000 and TNOM = 27.000000

Using SPARSE 1.3 as Direct Linear Solver
Operating point simulation skipped by 'uic',
  now using transient initial conditions.

No. of Data Rows : 1011
ngspice 3 -> binary raw file "out.raw"

Index  time         v(n1)          v(n2)          v(vp_in1)      i(vsimulation_voltage_source_0)
0      1.000000e-6  6.283184e-4    6.283184e-4    1.256637e-3    -1.742483e-15                  
1      2.000000e-6  1.256637e-3    1.256637e-3    2.513274e-3    -3.485349e-15                  
2      4.000000e-6  2.513273e-3    2.513273e-3    5.026547e-3    -6.972993e-15                  
3      8.000000e-6  5.026544e-3    5.026544e-3    1.005309e-2    -1.396437e-14                  
4      1.600000e-5  1.005307e-2    1.005307e-2    2.010614e-2    -2.807686e-14                  
5      3.200000e-5  2.010598e-2    2.010598e-2    4.021195e-2    -5.737260e-14                  
```
