---
title: Importing from Ultra Librarian
sidebar_position: 3.5
description: Download a KiCad symbol, footprint, and 3D model from Ultra Librarian and import them directly into tscircuit.
---

## Overview

You can download schematic symbols, PCB footprints, and 3D models from
[Ultra Librarian](https://www.ultralibrarian.com/) and import them directly into
tscircuit.

## Downloading from Ultra Librarian

1. Visit [Ultra Librarian](https://www.ultralibrarian.com/).
2. Search for the manufacturer part number.
3. Select the footprint variant you need.
4. Click **Download Now**.
5. Sign in or create an Ultra Librarian account when prompted.
6. Choose the **KiCad v5** or **KiCad v6+** format and the CAD model.
7. Download and extract the ZIP file.

The extracted files include:

- the `.kicad_mod` file for the PCB footprint
- the `.kicad_sym` file for the schematic symbol
- the `.stp` file for the 3D model

## Importing Ultra Librarian Components

Copy the files into your tscircuit project. Import them and pass them to the
`footprint`, `symbol`, and `cadModel` props of a `<chip />`:

```tsx
import stepUrl from "./CadModel.step"
import kicadMod from "./footprint.kicad_mod"
import kicadSymbol from "./symbol.kicad_sym"

export default () => {
  return (
    <board>
      <chip
        footprint={kicadMod}
        name="U1"
        symbol={kicadSymbol}
        cadModel={stepUrl}
      />
    </board>
  )
}
```

The `.kicad_mod` file provides the PCB footprint, while the `.kicad_sym` file
provides the schematic symbol. The `.stp` file provides the 3D model for the
3D view and STEP exports.
