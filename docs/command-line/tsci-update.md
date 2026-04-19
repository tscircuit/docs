---
title: tsci update
description: Update tscircuit component packages to their latest version
---

`tsci update` updates tscircuit packages in your project. When given a package specifier, it updates only that package. When run without arguments, it updates all dependencies in `package.json` that start with `@tsci/` or `@tscircuit/`.

## Usage

```bash
tsci update [packageSpec]
```

### Arguments
- `packageSpec` *(optional)* – a package to update (e.g. `@tscircuit/math-utils`). When omitted, updates all `@tsci/*` and `@tscircuit/*` dependencies found in `dependencies` and `devDependencies`.

## Examples

Update a specific package:

```bash
$ tsci update @tscircuit/seveibar/PICO_W
Updating @tsci/seveibar.PICO_W...
> bun update @tsci/seveibar.PICO_W
bun update v1.3.11 (af24e281)

installed @tsci/seveibar.PICO_W@0.1.0

1 package installed [1095.00ms]
✓ Updated @tsci/seveibar.PICO_W successfully
```

Update all tscircuit packages:

```bash
$ tsci update
Updating 2 packages: @tsci/seveibar.HS91L02W2C01 @tsci/seveibar.PICO_W...
> bun update @tsci/seveibar.HS91L02W2C01 @tsci/seveibar.PICO_W
bun update v1.3.11 (af24e281)

installed @tsci/seveibar.HS91L02W2C01@0.0.1
installed @tsci/seveibar.PICO_W@0.1.0

2 packages installed [567.00ms]
✓ Updated all tscircuit packages successfully
```
