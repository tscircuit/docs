---
title: Exporting a KiCad Library
description: >-
  Export your tscircuit designs as a KiCad library containing symbols,
  footprints, and 3D models that can be reused across multiple KiCad projects.
---

## Overview

tscircuit allows you to export your circuit designs as a **KiCad Library**. Unlike the KiCad Project export (which creates a complete project file), the KiCad Library export creates reusable components that can be imported into any KiCad project.

The exported library includes:

- **Symbol Libraries** (`symbols/` folder) - Schematic symbols for all components
- **Footprint Libraries** (`footprints/` folder) - PCB footprints for all components
- **3D Models** (`3dmodels/` folder) - 3D model files (STEP/WRL) referenced by footprints
- **Library Tables** (`fp-lib-table`, `sym-lib-table`) - Configuration files for KiCad

## User vs Builtin Components

tscircuit automatically separates your components into two library categories:

### User Components

Components that use **custom footprints or symbols** are placed in the user library, named after your project (e.g., `my-library`). These include:

- Components with a custom `footprint` prop (JSX footprint definition):

```tsx
<chip
  name="U1"
  footprint={
    <footprint>
      <smtpad portHints={["VIN"]} pcbX={-4} pcbY={2} width="2mm" height="2mm" shape="rect" />
      <smtpad portHints={["GND"]} pcbX={4} pcbY={2} width="2mm" height="2mm" shape="rect" />
      <smtpad portHints={["OUT"]} pcbX={0} pcbY={-2} width="2mm" height="2mm" shape="rect" />
      <silkscreenpath
        route={[
          { x: -6, y: -4 },
          { x: 6, y: -4 },
          { x: 6, y: 4 },
          { x: -6, y: 4 },
          { x: -6, y: -4 },
        ]}
      />
    </footprint>
  }
/>
```

- Components with a custom `symbol` prop (JSX symbol definition):

```tsx
<chip
  name="U1"
  symbol={
    <symbol>
      <schematicrect schX={0} schY={0} width={2} height={1.5} isFilled={false} />
      <schematiccircle center={{ x: 0, y: 0 }} radius={0.3} isFilled={true} />
      <port name="in" direction="left" schX={-1} schY={0} />
      <port name="out" direction="right" schX={1} schY={0} />
    </symbol>
  }
/>
```

### Builtin Components

Components that use **standard footprinter strings** (e.g., `0402`, `soic8`) are placed in the `tscircuit_builtin` library. This includes all footprints that tscircuit supports by default.

## Directory Structure

```
my-library/
├── symbols/
│   ├── my-library.kicad_sym          # User symbols (custom symbols)
│   └── tscircuit_builtin.kicad_sym   # Builtin symbols (standard symbols)
├── footprints/
│   ├── my-library.pretty/            # User footprints
│   │   └── MyCustomSwitch.kicad_mod
│   └── tscircuit_builtin.pretty/     # Builtin footprints
│       ├── resistor_0402.kicad_mod
│       └── chip_soic8.kicad_mod
├── 3dmodels/
│   └── switch.step
├── fp-lib-table
└── sym-lib-table
```

## How to Export

### Using the Browser

1. Run `tsci dev` in your project directory
2. Navigate to **File > Export > KiCad Library**
3. A zip file will be downloaded containing all library files

### Using the CLI

```bash
tsci export ./lib/my-library.ts -f kicad-library
```

The CLI will:
1. Discover all component exports from the entry file
2. Build each component to circuit JSON
3. Extract and classify footprints/symbols (user vs builtin)
4. Generate the KiCad library files

### Customizing the Library Name

By default, the library name is derived from your package name. You can specify a custom library name using the `--kicad-library-name` flag:

```bash
tsci build --kicad-library --kicad-library-name "my-custom-lib"
```

Alternatively, configure it in your `tscircuit.config.json`:

```json
{
  "mainEntrypoint": "./lib/index.tsx",
  "kicadLibraryName": "My Custom Library"
}
```

The custom name is used for:
- Symbol and footprint library filenames
- PCM package display name (when using `--kicad-pcm`)

## Using the Library in KiCad

1. **Extract/Copy the library** to your KiCad project folder or a shared libraries location

2. **Add the library tables** to your KiCad project:
   - Copy `fp-lib-table` and `sym-lib-table` to your project folder, OR
   - Merge the entries into your existing library tables

3. **Use the symbols and footprints** in your schematic and PCB:
   - Custom symbols appear under your library name (e.g., `my-library`)
   - Standard symbols appear under `tscircuit_builtin`

## Including 3D Models

Add a `cadModel` prop to include 3D models in your export:

```tsx
import stepUrl from "./switch.step"

<chip
  name="SW1"
  footprint="pushbutton"
  cadModel={
    <cadmodel
      modelUrl={stepUrl}
      rotationOffset={{ x: 0, y: 0, z: 270 }}
      positionOffset={{ x: 0.5, y: -0.3, z: 0 }}
    />
  }
/>
```

The 3D model will be:
- Referenced in the footprint file with the correct path
- Included in the `3dmodels/` folder of the export
