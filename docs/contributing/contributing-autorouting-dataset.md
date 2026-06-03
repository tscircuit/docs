---
title: Contributing Autorouting Datasets
description: Guidelines for naming, structuring, visualizing, and contributing autorouting datasets.
---

Autorouting datasets help tscircuit contributors compare routers, reproduce
failures, and improve routing behavior over time. A good dataset is small enough
to inspect, named consistently, easy to install from GitHub, and includes a
visualization of the routing problem.

## Dataset naming

When creating a new dataset, increase the number from the last known dataset in
that prefix. Always use two digits for dataset numbers, such as `01`, `02`, or
`05`.

Use these prefixes:

| Prefix | Dataset type |
| --- | --- |
| `Z` | Zero-obstacle dataset |
| `SRJ` | Simple Route JSON dataset |
| `HG` | HyperGraph dataset |
| `HD` | High-density node dataset, solved |
| `TS` | tscircuit code dataset |

For example, if the latest Simple Route JSON dataset is `dataset-srj05`, the
next one should be `dataset-srj06`.

## Dataset library structure

Dataset repositories should be installable directly from GitHub:

```bash
bun add https://github.com/tscircuit/dataset-srj05
```

Use this structure:

```text
dataset-srj05/
├── index.js
├── index.d.ts
├── package.json
└── samples/
    ├── sample001.json
    ├── sample002.json
    └── sample003.json
```

The `package.json` should point to `index.js`:

```json
{
  "name": "@tscircuit/dataset-srj05",
  "main": "index.js",
  "types": "index.d.ts"
}
```

Export samples from `index.js`:

```js
export { default as sample001 } from "./samples/sample001.json"
export { default as sample002 } from "./samples/sample002.json"
export { default as sample003 } from "./samples/sample003.json"
```

Keep `index.d.ts` lightweight:

```ts
import type { SimpleRouteJson } from "@tscircuit/core"

export const sample001: SimpleRouteJson
export const sample002: SimpleRouteJson
export const sample003: SimpleRouteJson
```

Follow these rules:

- Do not transpile the dataset package. Transpiled dataset packages do not work
  reliably with GitHub installation.
- Do not publish the dataset package to npm.
- Do not create an `index.ts` file. It can break type resolution for dataset
  packages.

## Creating Simple Route JSON

To create a Simple Route JSON dataset from Circuit JSON, use
`getSimpleRouteJsonFromCircuitJson` from `@tscircuit/core`:

```ts
import { getSimpleRouteJsonFromCircuitJson } from "@tscircuit/core"

const simpleRouteJson = getSimpleRouteJsonFromCircuitJson(circuitJson)
```

Save the generated Simple Route JSON objects as files in `samples/`.

## Add a visualization

Every useful autorouting dataset should include a visualization so contributors
can quickly understand the routing problem before running a router.

Use one of these approaches:

- A Graphic Debug screenshot or link that shows the obstacles, connections, and
  expected route behavior.
- An SVG generated with
  [`circuit-to-svg`](https://github.com/tscircuit/circuit-to-svg) when the
  dataset starts from Circuit JSON.

The visualization should make it clear why the dataset is interesting, such as a
hard obstacle pattern, dense node layout, known failure case, solved high-density
route, or minimal regression fixture.
