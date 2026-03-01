---
title: tsci check
description: Partially build and validate circuit artifacts
---

`tsci check` partially builds your circuit and validates specific aspects of the output. It is useful for catching issues early without running a full build.

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
