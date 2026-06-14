---
title: Contributing Autorouting Datasets
description: Guidelines for naming, structuring, visualizing, and contributing autorouting datasets.
---

Autorouting datasets help develop new features for specific cases. If you are
running into an autorouter issue, you may be able to generate a dataset: start
with a `tsci init` project, create samples that replicate the issue, and put the
dataset into a repo that can be tested directly with our autorouter.

## Start from an existing dataset

Before creating a new repository, inspect the latest dataset in the same family
and copy its structure. These repos are good bootstrapping references:

- [`tscircuit/dataset-srj19`](https://github.com/tscircuit/dataset-srj19)
  for a generated Simple Route JSON dataset with a Cosmos sample viewer.
- [`tscircuit/dataset-srj18`](https://github.com/tscircuit/dataset-srj18)
  for a dataset generated from KiCad boards.
- [`tscircuit/tscircuit-autorouter`](https://github.com/tscircuit/tscircuit-autorouter)
  for the current autorouter benchmark integration.

Use the [Simple Route JSON reference](../advanced/simple-route-json.mdx) when
you need field-level details for `bounds`, `obstacles`, `connections`, layers,
and traces.

## Name the dataset

Use the
[Dataset Naming Guidelines](https://github.com/tscircuit/handbook/blob/main/guides/dataset-guidelines.md#dataset-naming-guidelines)
for dataset naming conventions. In brief, increase the number from the latest
known dataset in the same prefix and use two digits, such as `01`, `02`, or
`19`.

## Keep the package GitHub-installable

Dataset packages should install directly from GitHub because the autorouter pins
dataset dependencies to repository commits. Follow the
[Dataset Library Structure](https://github.com/tscircuit/handbook/blob/main/guides/dataset-guidelines.md#dataset-library-structure)
guidance, then compare your package structure against the reference dataset
repos above.

If the dataset starts from Circuit JSON, follow
[Creating Simple Route JSON from Circuit JSON](https://github.com/tscircuit/handbook/blob/main/guides/dataset-guidelines.md#creating-simple-route-json-from-circuit-json).
The [`dataset-srj18` README](https://github.com/tscircuit/dataset-srj18) shows
that flow for KiCad-derived samples.

## Add a visualization

Every dataset should have a way to inspect samples before running a benchmark.
Use the
[React Visualizers/Debuggers](https://github.com/tscircuit/handbook/blob/main/guides/bootstrapping-repos.md#react-visualizersdebuggers)
guide for the Cosmos sample viewer pattern. The
[`dataset-srj19`](https://github.com/tscircuit/dataset-srj19)
repo is a good public example of a dataset with a viewer.

## Add snapshot tests

Use the
[Dataset Guidelines](https://github.com/tscircuit/handbook/blob/main/guides/dataset-guidelines.md)
for the dataset structure, then include at least one representative test so
changes to generated Simple Route JSON or visualization output are easy to
review.

## Add the dataset to autorouter benchmarks

After the dataset repository is usable on its own, add a follow-up change to
[`tscircuit/tscircuit-autorouter`](https://github.com/tscircuit/tscircuit-autorouter)
so router contributors can run the dataset locally.

After integration, the dataset should appear in the autorouter benchmark list.

![Autorouter benchmark sidebar showing dataset-srj19 selected](/img/autorouter-dataset-srj19-benchmarks.png)

Add the benchmark integration in this order:

1. Pin the dataset in `package.json` using a GitHub URL and commit hash.
2. If TypeScript cannot infer the dataset package types, add a module shim in
   `types/dataset-module-shims.d.ts`.
3. Add the dataset to `scripts/benchmark/scenarios.ts`: include its short name
   in `DATASET_NAMES`, add aliases, add a loader, add the scenario key pattern,
   and update `DATASET_OPTIONS_LABEL`.
4. Follow the
   [`benchmark.sh` guide](https://github.com/tscircuit/handbook/blob/main/guides/benchmark-sh.md)
   while updating `benchmark.sh` help text and dataset parsing so contributors
   can run the dataset with `./benchmark.sh --dataset <dataset-name>`.
5. Add or update benchmark coverage so `--dataset <dataset-name>` works
   consistently in `benchmark.sh`, `scripts/benchmark/scenarios.ts`, and
   `run-sample.sh`.
6. Run one targeted sample and a small benchmark with the dataset name you added
   before opening the PR.

If the dataset captures a reported autorouter bug, also read
[Report Autorouter Bugs](./report-autorouter-bugs.md). The autorouter repo has
helpers for turning bug reports into fixtures and snapshot tests.
