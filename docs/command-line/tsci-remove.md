---
title: tsci remove
description: Remove a tscircuit package from your project
---

`tsci remove` removes a tscircuit package from your project, the inverse of [`tsci add`](./tsci-add.mdx).

## Usage

```bash
tsci remove <package>
```

### Arguments
- `package` *(required)* – the package to remove (e.g. `author/package-name`)

## Example

```bash
$ tsci remove seveibar/PICO_W
# Removing @tsci/seveibar.PICO_W...
# Removed @tsci/seveibar.PICO_W successfully.
```
