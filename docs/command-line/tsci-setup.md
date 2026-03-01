---
title: tsci setup
description: Setup utilities for your tscircuit project
---

`tsci setup` provides interactive setup utilities for your tscircuit project through a menu-based interface.

## Usage

```bash
tsci setup
```

## Available Options

### GitHub Action

Sets up a GitHub Actions workflow that automatically builds your circuit and checks snapshots on push and pull request events. This helps catch regressions in your circuit designs during CI.

After selecting this option, a `.github/workflows/` directory will be created with the appropriate workflow configuration.
