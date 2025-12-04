---
title: Installing KiCad Libraries
sidebar_position: 4
description: Install KiCad footprint libraries from GitHub and use them in your tscircuit projects with full TypeScript support.
---

## Overview

You can install KiCad footprint libraries directly from GitHub using the `tsci add` or `tsci install` command. This is the easiest way to use existing KiCad footprints in your tscircuit projects, with automatic TypeScript type generation for full IDE support.

## Installation

To install a KiCad library from GitHub, use the `tsci add` command with the repository URL:

```bash
tsci add https://github.com/espressif/kicad-libraries
```

![Installing KiCad library from GitHub](/img/guides/installing-kicad-library/install-lib.png)

:::tip
`tsci install` is an alias for `tsci add` - both commands work identically.
:::

## What Happens During Installation

When you install a repository containing `.kicad_mod` files, `tsci` will automatically:

1. **Add the package to `package.json`** - The library is added as a dependency
2. **Install in `node_modules`** - The package is downloaded and installed
3. **Detect KiCad footprints** - Scans for `.kicad_mod` files in the repository
4. **Generate TypeScript types** - Creates type definitions in `types/<package-name>.d.ts`
5. **Configure `tsconfig.json`** - Adds the types directory to `typeRoots`

## Using KiCad Footprints in Your Circuit

After installation, you can import `.kicad_mod` files directly in your circuit code:

```tsx
import kicadMod from "kicad-libraries/footprints/Espressif.pretty/ESP32-S2-MINI-1.kicad_mod"

export default () => {
  return (
    <board width="20mm" height="20mm">
      <chip footprint={kicadMod} name="U1" />
    </board>
  )
}
```

The imported `kicadMod` can be used directly as the `footprint` prop on components like `<chip>`.

![ESP32-S2-MINI-1 PCB footprint](/img/guides/installing-kicad-library/pcb.png)

## Generated Type Definitions

When you install a KiCad library, `tsci` creates a type definition file in the `types/` directory. For example, installing `kicad-libraries` creates `types/kicad-libraries.d.ts`:

```typescript
declare module "kicad-libraries/footprints/Espressif.pretty/ESP32-S2-MINI-1.kicad_mod" {
  const value: string
  export default value
}

declare module "kicad-libraries/footprints/Espressif.pretty/ESP32-C3-MINI-1.kicad_mod" {
  const value: string
  export default value
}
// ... declarations for all .kicad_mod files in the library
```

This provides:
- **Full TypeScript support** - No type errors when importing `.kicad_mod` files
- **IDE autocomplete** - Your editor can suggest available footprint paths
- **Import validation** - Catch typos in import paths at compile time

## tsconfig.json Configuration

The command automatically updates your `tsconfig.json` to include the types directory:

```json
{
  "compilerOptions": {
    "typeRoots": ["./types", "./node_modules/@types"]
  }
}
```

If your project doesn't have a `tsconfig.json`, one will be created with the necessary configuration.

## See Also

- [Importing from KiCad](/guides/importing-modules-and-chips/importing-from-kicad) - Other methods to import KiCad components
- [KiCad Footprints](/footprints/kicad-footprints) - Using KiCad's standard library footprints with the `kicad:` prefix
- [tsci add](/command-line/tsci-add) - Installing tscircuit registry packages
