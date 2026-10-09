---
title: tsci check
description: Build and validate circuit artifacts
---

`tsci check` builds and validates specific aspects of your circuit, such as the netlist, component placement, and routing.

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

Detect long odd-angle trace runs and unnecessary stair stepping using default rules. Source files are built and routed before analysis.

```bash
tsci check pcb-style [file]
```

- `file` *(optional)* – source entrypoint or prebuilt Circuit JSON; defaults to the project's entrypoint
- `--json` – print the analysis as JSON
- `--svg <file>` – choose the SVG output path (default: `checks/check-pcb-style/pcb.svg`)

Reports the issue count and saves a highlighted SVG overview. Exits with code `1` if style issues are found.
