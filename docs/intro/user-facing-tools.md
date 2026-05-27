---
title: User-Facing Tools
description: A quick map of the main tscircuit tools you can use to design, preview, convert, route, and ship circuit boards.
sidebar_position: 6
---

# User-Facing Tools

tscircuit is a set of tools around the same circuit-as-code workflow. You can
start in the online editor, move to local development with the CLI, and use
previewers, converters, and web APIs when you need to integrate tscircuit into a
larger toolchain.

## Design and Editing

| Tool | Use it for | Where to start |
| --- | --- | --- |
| [tscircuit.com editor](https://tscircuit.com/editor) | Writing and previewing tscircuit projects in the browser | [Quickstart: web editor](/intro/quickstart-web) |
| [tsci CLI](/command-line/tsci-init) | Creating, developing, building, and exporting projects locally | [Quickstart: CLI](/intro/quickstart-cli) |
| [RunFrame](/guides/running-tscircuit/running-tscircuit-inside-an-iframe) | Embedding a live tscircuit runner inside another web page | [Run tscircuit in an iframe](/guides/running-tscircuit/running-tscircuit-inside-an-iframe) |

## Preview and Inspection

| Tool | Use it for | Where to start |
| --- | --- | --- |
| [PCB viewer](https://github.com/tscircuit/pcb-viewer) | Rendering and inspecting PCB layouts from Circuit JSON | [Display Circuit JSON on a webpage](/guides/running-tscircuit/displaying-circuit-json-on-a-webpage) |
| [3D viewer](https://github.com/tscircuit/3d-viewer) | Showing board assemblies with 3D component models | [Cad model element](/elements/cadmodel) |
| [Circuit preview component](/guides/running-tscircuit/displaying-circuit-json-on-a-webpage) | Showing schematic, PCB, pinout, and 3D previews in docs or apps | [Programmatically building circuits](/guides/running-tscircuit/programmatically-building-circuits) |

## Conversion and Importing

| Tool | Use it for | Where to start |
| --- | --- | --- |
| [JLCPCB import](/guides/importing-modules-and-chips/importing-from-jlcpcb) | Turning JLCPCB parts into tscircuit components | [Importing from JLCPCB](/guides/importing-modules-and-chips/importing-from-jlcpcb) |
| [KiCad import](/guides/importing-modules-and-chips/importing-from-kicad) | Reusing KiCad libraries and symbols in tscircuit projects | [Importing from KiCad](/guides/importing-modules-and-chips/importing-from-kicad) |
| [Circuit JSON import](/guides/importing-modules-and-chips/importing-from-circuit-json) | Converting existing Circuit JSON into reusable tscircuit code | [Importing from Circuit JSON](/guides/importing-modules-and-chips/importing-from-circuit-json) |

## Routing, Exporting, and Ordering

| Tool | Use it for | Where to start |
| --- | --- | --- |
| [Autorouting API](/web-apis/autorouting-api) | Routing PCB traces from Circuit JSON in automated workflows | [Autorouting API](/web-apis/autorouting-api) |
| [Export commands](/command-line/tsci-export) | Exporting fabrication files, images, and project outputs locally | [tsci export](/command-line/tsci-export) |
| [Ordering API](/web-apis/ordering-api) | Connecting generated board files to manufacturing and ordering flows | [Ordering API](/web-apis/ordering-api) |

## Core Libraries

| Tool | Use it for | Where to start |
| --- | --- | --- |
| [tscircuit/core](https://github.com/tscircuit/core) | The React-to-Circuit-JSON engine used by the editor, CLI, and previews | [Programmatically building circuits](/guides/running-tscircuit/programmatically-building-circuits) |
| [Circuit JSON](https://github.com/tscircuit/circuit-json) | The intermediate format shared by viewers, exporters, and APIs | [Display Circuit JSON on a webpage](/guides/running-tscircuit/displaying-circuit-json-on-a-webpage) |
| [Footprinter](/footprints/footprinter-strings) | Creating reusable PCB footprints from compact footprint strings | [Footprinter strings](/footprints/footprinter-strings) |
