---
title: tsci install
description: Install project dependencies or a specific package
---

`tsci install` installs all project dependencies when called without arguments, or installs a specific package when given a package specifier. It supports npm packages, GitHub URLs, and KiCad libraries.

## Usage

```bash
tsci install [packageSpec]
```

### Arguments
- `packageSpec` *(optional)* – a package to install. Can be an npm package name, a GitHub URL, or a KiCad library URL. When omitted, installs all project dependencies.

## Examples

Install all project dependencies:
```bash
$ tsci install
Found existing package.json.
Installing dependencies using bun...
> bun install
bun install v1.3.3 (274e01c7)

Checked 307 installs across 338 packages (no changes) [121.00ms]
Dependencies installed successfully.
```

Install a specific package from a GitHub URL:
```bash
tsci install https://github.com/espressif/kicad-libraries
```
