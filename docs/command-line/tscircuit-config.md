---
title: tscircuit.config.json
sidebar_position: 1
description: Configure your TSCircuit project with tscircuit.config.json
---

The `tscircuit.config.json` file configures how the TSCircuit CLI builds and
processes your project. This file is created automatically when you run
`tsci init` and is placed in your project root.

## Schema

Add the `$schema` property to enable autocomplete and validation in your editor:

```json
{
  "$schema": "https://cdn.jsdelivr.net/npm/@tscircuit/cli/types/tscircuit.config.schema.json"
}
```

## Configuration Options

All properties are optional. Here's a complete reference:

### Project Entrypoints

| Property | Type | Description |
|----------|------|-------------|
| `mainEntrypoint` | `string` | Entry file for the circuit project (e.g., `"index.tsx"`) |
| `previewComponentPath` | `string` | Component path used for previews |
| `siteDefaultComponentPath` | `string` | Default component path to show in generated static sites |

### File Patterns

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `includeBoardFiles` | `string[]` | `["**/*.board.tsx", "**/*.circuit.tsx", "**/*.circuit.json"]` | File globs to include as board files |
| `ignoredFiles` | `string[]` | — | File globs to ignore during processing |

### Build Configuration

| Property | Type | Description |
|----------|------|-------------|
| `prebuildCommand` | `string` | Command to run before builds |
| `buildCommand` | `string` | Override command used for cloud builds |
| `snapshotsDir` | `string` | Directory path for storing snapshots |

### KiCad Integration

| Property | Type | Description |
|----------|------|-------------|
| `kicadLibraryEntrypointPath` | `string` | Entry file for KiCad footprint library generation |
| `kicadLibraryName` | `string` | Name for the generated KiCad library (falls back to `package.json` name, then directory name) |

### Cloud Settings

| Property | Type | Description |
|----------|------|-------------|
| `alwaysUseLatestTscircuitOnCloud` | `boolean` | Always use the latest TSCircuit version when building on the cloud |

### Build Output Toggles

The `build` object controls which outputs are generated:

| Property | Type | Description |
|----------|------|-------------|
| `build.circuitJson` | `boolean` | Enable circuit JSON output |
| `build.kicadLibrary` | `boolean` | Enable KiCad library output |
| `build.kicadPcm` | `boolean` | Enable KiCad PCM (Plugin and Content Manager) assets output |
| `build.previewImages` | `boolean` | Enable preview image outputs (PCB, schematic, 3D) |
| `build.typescriptLibrary` | `boolean` | Enable TypeScript library output |

## Examples

### Minimal Configuration

```json
{
  "$schema": "https://cdn.jsdelivr.net/npm/@tscircuit/cli/types/tscircuit.config.schema.json",
  "mainEntrypoint": "index.tsx"
}
```

### Library Project

For a reusable circuit library with KiCad export:

```json
{
  "$schema": "https://cdn.jsdelivr.net/npm/@tscircuit/cli/types/tscircuit.config.schema.json",
  "mainEntrypoint": "lib/index.tsx",
  "kicadLibraryEntrypointPath": "lib/index.tsx",
  "kicadLibraryName": "my-circuit-library",
  "build": {
    "circuitJson": true,
    "kicadLibrary": true,
    "typescriptLibrary": true
  }
}
```

### Custom File Patterns

Include additional file patterns or ignore specific directories:

```json
{
  "$schema": "https://cdn.jsdelivr.net/npm/@tscircuit/cli/types/tscircuit.config.schema.json",
  "includeBoardFiles": [
    "**/*.board.tsx",
    "**/*.circuit.tsx",
    "**/*.circuit.json",
    "examples/**/*.tsx"
  ],
  "ignoredFiles": [
    "test/**/*",
    "node_modules/**/*"
  ]
}
```

### With Prebuild Step

Run a command before building (useful for code generation):

```json
{
  "$schema": "https://cdn.jsdelivr.net/npm/@tscircuit/cli/types/tscircuit.config.schema.json",
  "mainEntrypoint": "index.tsx",
  "prebuildCommand": "bun run generate-types"
}
```

## File Location

The configuration file must be named `tscircuit.config.json` and placed in your
project root directory. The CLI automatically discovers this file when running
commands like `tsci build` or `tsci dev`.
