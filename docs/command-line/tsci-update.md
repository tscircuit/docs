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
$ tsci update @tscircuit/math-utils
Updating @tscircuit/math-utils...
> bun update @tscircuit/math-utils
✓ Updated @tscircuit/math-utils successfully
```

Update all tscircuit packages:

```bash
$ tsci update
Updating 2 packages: @tscircuit/math-utils @tscircuit/props...
> bun update @tscircuit/math-utils @tscircuit/props
✓ Updated all tscircuit packages successfully
```
