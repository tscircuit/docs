---
title: tsci config
description: Manage tscircuit CLI configuration
---

`tsci config` lets you view and modify tscircuit CLI configuration values. There are two types of configuration: **global** CLI settings and **project-specific** settings stored in `tscircuit.config.json`.

## Subcommands

### `tsci config print`

Print the current global CLI configuration as JSON.

```bash
tsci config print
```

### `tsci config set`

Set a configuration value.

```bash
tsci config set <key> <value>
```

#### Global Configuration Keys

| Key | Type | Description |
|-----|------|-------------|
| `alwaysCloneWithAuthorName` | boolean | Always include author name when cloning packages |

#### Project Configuration Keys

These keys are saved to `tscircuit.config.json` in your project directory:

| Key | Description |
|-----|-------------|
| `mainEntrypoint` | Path to the main circuit entrypoint file |
| `kicadLibraryEntrypointPath` | Path to the KiCad library entrypoint |
| `previewComponentPath` | Path to the preview component |
| `siteDefaultComponentPath` | Default component for static site generation |
| `prebuildCommand` | Command to run before building |
| `buildCommand` | Custom build command |

## Examples

```bash
# Always include author in clone directory names
tsci config set alwaysCloneWithAuthorName true

# Set the project entrypoint
tsci config set mainEntrypoint lib/index.tsx

# View current config
tsci config print
```
