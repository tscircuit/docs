---
title: Importing from Ultra Librarian
sidebar_position: 3.5
description: Download a KiCad symbol and footprint from Ultra Librarian and import them directly into tscircuit.
---

## Overview

You can download schematic symbols and PCB footprints from
[Ultra Librarian](https://www.ultralibrarian.com/) and import the KiCad files
directly into tscircuit.

## Downloading from Ultra Librarian

1. Visit [Ultra Librarian](https://www.ultralibrarian.com/).
2. Search for the manufacturer part number.
3. Select the footprint variant you need.
4. Click **Download Now**.
5. Sign in or create an Ultra Librarian account when prompted.
6. Choose the **KiCad v5** or **KiCad v6+** format.
7. Download and extract the ZIP file.

The extracted files include:

- the `.kicad_mod` file for the PCB footprint
- the `.kicad_sym` file for the schematic symbol

## Importing Ultra Librarian Components

Copy both files into your tscircuit project. Import them and pass them to the
`footprint` and `symbol` props of a `<chip />`:

```tsx
import kicadSym from "./symbol.kicad_sym"
import kicadMod from "./footprint.kicad_mod"

export default () => {
  return (
    <board>
      <chip
        name="U1"
        footprint={kicadMod}
        symbol={kicadSym}
      />
    </board>
  )
}
```

The `.kicad_mod` file provides the PCB footprint, while the `.kicad_sym` file
provides the schematic symbol.
