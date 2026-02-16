---
title: Running Autorouter Benchmarks
description: Learn how to run benchmarks on autorouter changes using the /benchmark command
---

## Overview

When contributing to the [tscircuit-autorouter](https://github.com/tscircuit/tscircuit-autorouter) repository, you can run benchmarks to measure the performance of your changes. This helps ensure that autorouting improvements actually improve solving rates and performance.

## Running Benchmarks on Pull Requests

Maintainers can trigger benchmarks on any pull request by commenting with the `/benchmark` command.

### Basic Usage

```
/benchmark
```

This will run the benchmark with the default solver on all scenarios.

### Specifying a Solver

```
/benchmark AutoroutingPipelineSolver3_HgPortPointPathing
```

You can specify any solver that is exported from the autorouter's `lib/index.ts`. The list of available solvers may change as the autorouter is updated.

### Limiting Scenarios

To run a quick benchmark with fewer scenarios:

```
/benchmark AutoroutingPipelineSolver3_HgPortPointPathing 10
```

Use `_` as a placeholder for the default solver:

```
/benchmark _ 20
```

## What Happens When You Run a Benchmark

1. A comment appears showing "Running benchmark..." with a link to view live progress
2. The workflow:
   - Checks out your PR branch
   - Builds the autorouter
   - Runs the benchmark against the dataset
   - Uploads HTML visualization as an artifact
3. The comment is updated with results showing:
   - Solver name and package version
   - Results table with completion rate, DRC pass rate, and timing
   - Link to download the HTML visualization

## Example Output

```
Loading autorouter from: /home/runner/work/tscircuit-autorouter/tscircuit-autorouter/benchmark-solver.ts
✓ Using autorouter: AutoroutingPipelineSolver3_HgPortPointPathing
✓ From package: @tscircuit/capacity-autorouter@0.0.12

+-----------------------------------------------+-------------+--------------------+----------+----------+
| Solver                                        | Completed % | Relaxed DRC Pass % | P50 Time | P95 Time |
+-----------------------------------------------+-------------+--------------------+----------+----------+
| AutoroutingPipelineSolver3_HgPortPointPathing | 50.0%       | n/a                | 0.4s     | 1.4s     |
+-----------------------------------------------+-------------+--------------------+----------+----------+

✓ Bundled autorouter (2258.7 KB)
✓ Bundle written to: results/AutoroutingPipelineSolver3_HgPortPointPathing.bundle.js
✓ HTML results written to: results/AutoroutingPipelineSolver3_HgPortPointPathing.html
```

## Running Benchmarks Locally

You can also run benchmarks locally using the CLI:

```bash
# Install the benchmark CLI
bun add -g @tscircuit/autorouting-dataset-01

# Create a solver entry file
echo 'export * from "./lib"' > benchmark-solver.ts

# Run benchmark
autorouting-dataset-runner benchmark-solver.ts

# Run with specific solver
autorouting-dataset-runner benchmark-solver.ts AutoroutingPipelineSolver3_HgPortPointPathing

# Limit scenarios for quick testing
autorouting-dataset-runner benchmark-solver.ts --scenario-limit 10
```

## Understanding the Results

- **Completed %**: Percentage of scenarios where the autorouter successfully found a solution
- **Relaxed DRC Pass %**: Percentage of completed scenarios that pass design rule checks
- **P50 Time**: Median time to solve a scenario
- **P95 Time**: 95th percentile time (indicates worst-case performance)

## Downloading the HTML Visualization

After the benchmark completes, you can download the HTML visualization from the workflow artifacts. This interactive visualization lets you:

- View each scenario's routing result
- Debug failed scenarios
- Compare performance across different circuits
