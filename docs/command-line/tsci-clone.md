---
title: tsci clone
description: Clone a package from the tscircuit registry to your local machine
---

`tsci clone` downloads a package from the [tscircuit registry](https://tscircuit.com/trending) into a local directory so you can inspect, modify, or build on top of it.

## Usage

```bash
tsci clone [package] [options]
```

### Arguments
- `package` – package identifier in one of these forms:
  - `author/packageName`
  - `@tsci/author.packageName`
  - `https://tscircuit.com/author/packageName`

### Options
- `-a, --include-author` – include the author name in the directory path (creates `author.packageName/` instead of `packageName/`)
- `--bug-report <bugReportId>` – clone a bug report project instead of a regular package

## Examples

Clone a package by name:
```bash
tsci clone seveibar/PICO_W
```

Clone using a URL:
```bash
tsci clone https://tscircuit.com/seveibar/PICO_W
```

Clone with the author prefix in the directory name:
```bash
tsci clone seveibar/PICO_W --include-author
# Creates seveibar.PICO_W/
```

Clone a bug report:
```bash
tsci clone --bug-report abc123
```

## Configuration

You can set the `alwaysCloneWithAuthorName` config key to always include the author name without passing `-a`:

```bash
tsci config set alwaysCloneWithAuthorName true
```
