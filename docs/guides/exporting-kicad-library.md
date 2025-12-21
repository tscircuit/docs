---
title: Exporting KiCad Library
description: >-
  Export your tscircuit designs as a KiCad library containing symbols,
  footprints, and 3D models that can be reused across multiple KiCad projects.
---

## Overview

tscircuit allows you to export your circuit designs as a **KiCad Library**. Unlike the KiCad Project export (which creates a complete project file), the KiCad Library export creates reusable components that can be imported into any KiCad project.

The exported library includes:

- **Symbol Library** (`.kicad_sym`) - Schematic symbols for all components
- **Footprint Library** (`.pretty` folder) - PCB footprints for all components
- **3D Models** (`.3dshapes` folder) - 3D model files (STEP/WRL) referenced by footprints
- **Library Tables** (`fp-lib-table`, `sym-lib-table`) - Configuration files for KiCad to locate the libraries

## How to Export KiCad Library

### Using the Browser (RunFrame / tsci dev)

1. Run `tsci dev` in your project directory to start the development server
2. Navigate to **File > Export > KiCad Library**
3. A zip file will be downloaded containing all library files

### Using the CLI

You can also export directly from the command line:

```bash
tsci export ./my-circuit.tsx -f kicad-library
```

This creates a directory in the same location as the input file:

```
my-circuit-kicad-library/
├── my-circuit.kicad_sym          # Symbol library
├── my-circuit.pretty/            # Footprint library
│   ├── simple_resistor.kicad_mod
│   ├── simple_capacitor.kicad_mod
│   └── ...
├── my-circuit.3dshapes/          # 3D models
│   └── component.step
├── fp-lib-table                  # Footprint library table
└── sym-lib-table                 # Symbol library table
```

## What's Inside the Export

### Symbol Library (`.kicad_sym`)

Contains schematic symbols for all components in your circuit. Each symbol includes:
- Pin definitions with correct electrical types
- Reference designator (e.g., R1, C1, U1)
- Footprint association linking to the corresponding footprint

### Footprint Library (`.pretty` folder)

Contains PCB footprints for each unique component. Each `.kicad_mod` file includes:
- Pad definitions (SMD or through-hole)
- Silkscreen graphics
- Courtyard outlines
- 3D model references (pointing to the `.3dshapes` folder)

### 3D Models (`.3dshapes` folder)

Contains STEP files for 3D visualization in KiCad's 3D viewer. These are automatically:
- **CLI**: Copied from the source paths in your project
- **Browser**: Fetched via HTTP and included in the zip

### Library Tables

Configuration files that tell KiCad where to find the libraries:

**`fp-lib-table`** - Footprint library configuration:
```
(fp_lib_table
  (lib (name my-circuit)(type KiCad)(uri ${KIPRJMOD}/my-circuit.pretty)(options "")(descr ""))
)
```

**`sym-lib-table`** - Symbol library configuration:
```
(sym_lib_table
  (lib (name my-circuit)(type KiCad)(uri ${KIPRJMOD}/my-circuit.kicad_sym)(options "")(descr ""))
)
```

## Using the Library in KiCad

1. **Extract/Copy the library** to your KiCad project folder or a shared libraries location

2. **Add the library tables** to your KiCad project:
   - Copy `fp-lib-table` and `sym-lib-table` to your project folder, OR
   - Merge the entries into your existing library tables

3. **Use the symbols and footprints** in your KiCad schematic and PCB:
   - Symbols appear under the library name you exported
   - Footprints are automatically linked to symbols

## Including 3D Models

To include 3D models in your export, add a `cadModel` prop to your components:

```tsx
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
- Included in the `.3dshapes` folder of the export

## Example

Here's a complete example of a circuit with components that will be exported:

```tsx
import stepUrl from "./switch.step"

circuit.add(
  <board width="20mm" height="20mm">
    <resistor name="R1" resistance="1k" footprint="0402" />
    <capacitor name="C1" capacitance="1uF" footprint="0603" />
    <chip
      name="SW1"
      footprint="pushbutton"
      cadModel={
        <cadmodel
          modelUrl={stepUrl}
          rotationOffset={{ x: 0, y: 0, z: 270 }}
        />
      }
    />
    <trace from=".R1 .pin2" to=".C1 .pin1" />
  </board>
)
```

Exporting this circuit will create a library with:
- 3 symbols (R1, C1, SW1)
- 3 footprints (0402, 0603, pushbutton)
- 1 3D model (switch.step)
