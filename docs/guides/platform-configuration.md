---
title: Platform Configuration
---

## Overview

The Platform Configuration allows you to change tscircuit behavior to best suite
the platform the tscircuit code is running on.

Some use cases:

- Organizations may want to customize the cloud-autorouter to avoid sending sensitive designs outside your company
- Organizations may want to use their own internal registry for importing circuits instead of [tscircuit.com](https://tscircuit.com)
- For [autorouting.com](https://autorouting.com), we configure the platform to not perform any autorouting

## Configuring the Platform

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

```

:::info
Interested in running the entire tscircuit platform privately inside your company?
We're happy to help! Reach out to **enterprise@tscircuit.com**
:::
