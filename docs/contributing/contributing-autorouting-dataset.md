---
title: Contributing Autorouting Datasets
description: Guidelines for naming, structuring, visualizing, and contributing autorouting datasets.
---

Autorouting datasets help contributors compare routers, reproduce failures, and
keep routing behavior from regressing. This page is a checklist for creating a
dataset and wiring it into the autorouter; use the linked repositories as the
source of truth for implementation details.

## Start from an existing dataset

Before creating a new repository, inspect the latest dataset in the same family
and copy its structure. These repos are good bootstrapping references:

- [`tscircuit/dataset-srj16-bga-breakouts`](https://github.com/tscircuit/dataset-srj16-bga-breakouts)
  for a generated BGA breakout Simple Route JSON dataset with a Cosmos sample
  viewer.
- [`tscircuit/dataset-srj18`](https://github.com/tscircuit/dataset-srj18)
  for a dataset generated from KiCad boards.
- [`tscircuit/tscircuit-autorouter`](https://github.com/tscircuit/tscircuit-autorouter)
  for the current autorouter benchmark integration.

Use the [Simple Route JSON reference](../advanced/simple-route-json.mdx) when
you need field-level details for `bounds`, `obstacles`, `connections`, layers,
and traces.

## Name the dataset

Increase the number from the latest known dataset in the same prefix. Use two
digits for dataset numbers, such as `01`, `02`, or `19`.

| Prefix | Dataset type |
| --- | --- |
| `Z` | Zero-obstacle dataset |
| `SRJ` | Simple Route JSON dataset |
| `HG` | HyperGraph dataset |
| `HD` | High-density node dataset, solved |
| `TS` | tscircuit code dataset |

For example, if the latest Simple Route JSON dataset is `dataset-srj18`, the
next one should be `dataset-srj19`.

## Keep the package GitHub-installable

Dataset packages should install directly from GitHub, because the autorouter
pins dataset dependencies to repository commits:

```bash
bun add https://github.com/tscircuit/dataset-srj19
```

Follow the structure used by the reference repos instead of inventing a new
package layout. In general:

- Keep checked-in sample data in `samples/`, `circuits/`, or another predictable
  dataset directory.
- Export samples from `index.js` and describe those exports in `index.d.ts`.
- Point `package.json` `main` at `index.js` and `types` at `index.d.ts`.
- Do not transpile the dataset package or publish it to npm.
- Do not add an `index.ts`; it can interfere with type resolution after GitHub
  installation.

If the dataset starts from Circuit JSON, generate Simple Route JSON with
`getSimpleRouteJsonFromCircuitJson` from `@tscircuit/core`. The
[`dataset-srj18` README](https://github.com/tscircuit/dataset-srj18)
shows that flow for KiCad-derived samples.

## Add a visualization

Every dataset should have a way to inspect samples before running a benchmark.
Prefer one of these patterns:

- Add a Cosmos sample viewer, like the dataset viewer in
  [`dataset-srj16-bga-breakouts`](https://github.com/tscircuit/dataset-srj16-bga-breakouts),
  that lets contributors browse samples and inspect obstacles, connections, and
  layers with [`graphics-debug`](https://github.com/tscircuit/graphics-debug).
- Add generated SVGs or SVG snapshot tests with
  [`circuit-to-svg`](https://github.com/tscircuit/circuit-to-svg) when the
  dataset starts from Circuit JSON.

The visualization should make the reason for the dataset obvious: a dense node
layout, a hard obstacle pattern, a known router failure, a solved high-density
route, or a minimal regression case.

## Add snapshot tests

Include a small test suite that renders representative samples and checks them
against snapshots. Keep the snapshots easy to inspect when they fail.

Good coverage usually includes:

- A small sample that is easy to reason about.
- A representative medium sample.
- The hardest or most failure-prone samples in the dataset.
- One sample from each generated category, when the generator has categories.

Use Graphic Debug snapshots for routing-focused datasets and `circuit-to-svg`
snapshots for datasets that need PCB or schematic renderings.

## Add the dataset to autorouter benchmarks

After the dataset repository is usable on its own, add a follow-up change to
[`tscircuit/tscircuit-autorouter`](https://github.com/tscircuit/tscircuit-autorouter)
so router contributors can run the dataset locally.

Add the benchmark integration in this order:

1. Pin the dataset in `package.json` using a GitHub URL and commit hash.
2. If TypeScript cannot infer the dataset package types, add a module shim in
   `types/dataset-module-shims.d.ts`.
3. Add the dataset to `scripts/benchmark/scenarios.ts`: include its short name
   in `DATASET_NAMES`, add aliases, add a loader, add the scenario key pattern,
   and update `DATASET_OPTIONS_LABEL`.
4. Update `benchmark.sh` help text and dataset parsing so contributors can run
   the dataset with `./benchmark.sh --dataset srj19`.
5. Add or update benchmark coverage so `--dataset srj19` works consistently in
   `benchmark.sh`, `scripts/benchmark/scenarios.ts`, and `run-sample.sh`.
6. Run one targeted sample and a small benchmark with the dataset name you added
   before opening the PR.

If the dataset captures a reported autorouter bug, also read
[Report Autorouter Bugs](./report-autorouter-bugs.md). The autorouter repo has
helpers for turning bug reports into fixtures and snapshot tests.
