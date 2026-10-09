---
title: tsci check
description: Validate circuit artifacts and PCB routing style
---

`tsci check` validates specific aspects of your circuit. Some subcommands use a partial build; `pcb-style` builds and routes source files before analyzing the PCB.

## Usage

```bash
tsci check <subcommand> [options]
```

## Subcommands

### `tsci check netlist`

Partially build and validate the netlist.

```bash
tsci check netlist [refdeses]
```

- `refdeses` *(optional)* – reference designators to scope the check (e.g. `R1 C1`)

### `tsci check placement`

Partially build and validate component placement.

```bash
tsci check placement [refdeses]
```

- `refdeses` *(optional)* – reference designators to scope the check

### `tsci check routing`

Partially build and validate the routing.

```bash
tsci check routing
```

:::note
These subcommands are currently under development and may not be fully implemented yet.
:::

### `tsci check pcb-style`

Check PCB traces for long odd-angle runs and unnecessary stair stepping. Both rules run automatically with sensible defaults:

- Odd-angle analysis checks runs longer than 5 mm that deviate from the standard 45° routing directions, with a 4° tolerance. Splitting a long run into short segments does not hide it.
- Staircase analysis detects repeated short alternating bends, even when each individual segment follows a standard routing direction.

```bash
# Check the project's entrypoint
tsci check pcb-style

# Build and route a source file, then check its PCB traces
tsci check pcb-style index.tsx

# Analyze an existing Circuit JSON file
tsci check pcb-style board.circuit.json
```

The optional file argument accepts a source entrypoint or a prebuilt Circuit JSON array. When omitted, the command uses the project's entrypoint.

The command reports the issue count and affected trace locations. It also saves a highlighted SVG overview to `checks/check-pcb-style/pcb.svg`, including the number of issues detected. Clean runs write a new overview with zero issues.

#### Output options

| Option | Description |
| --- | --- |
| `--json` | Print the analysis as JSON. |
| `--svg <file>` | Choose the SVG output path. |

```bash
tsci check pcb-style board.circuit.json --json --svg checks/style.svg
```

Exit code `0` means no style issues were found. Exit code `1` means style issues were found or the command encountered an input or execution error.
