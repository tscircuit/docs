---
title: Platform Configuration
description: >-
  The Platform Configuration allows you to change tscircuit behavior to best
  suit the platform the tscircuit code is running on.
---

## Overview

The Platform Configuration allows you to change tscircuit behavior to best suit
the platform the tscircuit code is running on.

Some use cases:

- Organizations may want to customize the cloud autorouter to avoid sending sensitive designs outside your company
- Organizations may want to introduce custom footprint strings
  using a prefix like `footprint="my-company:*"`
- Organizations may want to use their own internal registry for importing circuits instead of [tscircuit.com](https://tscircuit.com)
- For [autorouting.com](https://autorouting.com), we configure the platform to not perform any autorouting

## Customizing the Platform

All of the following features of the platform can be configured:

- **partsEngine** - The engine used to automatically find parts matching component specifications
- **registryApiUrl** - The registry to use, defaults to `https://registry-api.tscircuit.com`. See [Registry API](../web-apis/the-registry-api.md) for more details
- **cloudAutorouterUrl** - The cloud autorouter to use, defaults to a tscircuit cloud service that uses freerouting
- Disable specific circuit outputs to optimize build times, such as disabling autorouting
- **footprintLibraryMap** - Configure custom prefixes for loading footprint strings from a server. This is how the `kicad:*` footprint strings are loaded!

### The Default Platform

The tscircuit default platform configuration sources parts from multiple vendors
and uses the tscircuit backend for autorouting and `@tsci/*` imports.

Current vendors used for automatic part sourcing:

- [JLCPCB](https://jlcpcb.com)
- Digikey (coming soon!)
- Mouser (coming soon!)

For each vendor, tscircuit populates multiple available chips. This means even
if tscircuit finds parts for a vendor, you don't have to use that vendor!

## Using your Platform

:::info
Want more platform features? Tell us about your use case in [this GitHub Discussion!](https://github.com/orgs/tscircuit/discussions/514)
:::

When you initialize a `RootCircuit`, you can provide the platform configuration
as the `{ platform }` parameter:

```tsx
import { RootCircuit } from "@tscircuit/core"

const circuit = new RootCircuit({
  platform: {
    registryApiUrl: "https://my-tscircuit-registry.mycompany.com",
  },
})
```

This can also be provided to modules like `@tscircuit/eval` to evaluate tscircuit
code:

```tsx
import { CircuitRunner } from "@tscircuit/eval-webworker"
import myPartsEngine from "./my-parts-engine"

const circuitRunner = new CircuitRunner({
  platform: {
    partsEngine: myPartsEngine,
  },
})

await circuitRunner.execute(`
circuit.add(
  <board width="10mm" height="10mm">
    <led name="LED1" footprint="0603" color="red" />
  </board>
)`)

await circuitRunner.renderUntilSettled()

const circuitJson = await circuitRunner.getCircuitJson()
```

:::info
Interested in running the entire tscircuit platform privately inside your company?
We're happy to help! Reach out to **enterprise@tscircuit.com**
:::
