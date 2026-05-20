---
title: User-Facing Tools
sidebar_position: 3
description: Map the tscircuit tools users interact with to the repositories that maintain them.
---

This page maps the tscircuit tools that users see directly to the repositories
that maintain them. Use it when you are deciding where to report a bug, open a
pull request, or look for related implementation details.

## Design and Sharing

| Tool                                             | What users use it for                                                                  | Main repository                                                       |
| ------------------------------------------------ | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [tscircuit editor](https://tscircuit.com/editor) | Write, preview, and share circuit boards in the browser.                               | [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com) |
| [tsci CLI](../command-line/tsci-init.md)         | Create local projects, run `tsci dev`, and work with packages from a terminal.         | [tscircuit/cli](https://github.com/tscircuit/cli)                     |
| [tscircuit docs](https://docs.tscircuit.com)     | Learn the React component API, tutorials, guides, web APIs, and contribution workflow. | [tscircuit/docs](https://github.com/tscircuit/docs)                   |
| [Package registry](https://tscircuit.com/search) | Find, install, and publish reusable tscircuit packages.                                | [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com) |

## Circuit Previews

| Tool                                           | What users use it for                                                        | Main repository                                                             |
| ---------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [RunFrame](https://runframe.tscircuit.com)     | Embed a live tscircuit preview in docs, examples, apps, and generated sites. | [tscircuit/runframe](https://github.com/tscircuit/runframe)                 |
| PCB viewer                                     | Render interactive 2D PCB views from Circuit JSON.                           | [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer)             |
| 3D viewer                                      | Render 3D board previews and component models.                               | [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer)               |
| Schematic viewer                               | Render schematic views from Circuit JSON.                                    | [tscircuit/schematic-viewer](https://github.com/tscircuit/schematic-viewer) |
| [Circuit JSON viewer](https://circuitjson.com) | Inspect Circuit JSON and convert it into visual formats.                     | [tscircuit/circuitjson.com](https://github.com/tscircuit/circuitjson.com)   |

## Parts and Footprints

| Tool                                             | What users use it for                                                     | Main repository                                                                               |
| ------------------------------------------------ | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [Footprinter](https://footprinter.tscircuit.com) | Generate PCB footprints from short footprint strings.                     | [tscircuit/footprinter](https://github.com/tscircuit/footprinter)                             |
| [JLC search](https://jlcsearch.tscircuit.com)    | Search JLCPCB parts and inspect part metadata before importing parts.     | [tscircuit/jlcsearch](https://github.com/tscircuit/jlcsearch)                                 |
| EasyEDA converter                                | Convert EasyEDA and JLCPCB package data into tscircuit-compatible assets. | [tscircuit/easyeda-converter](https://github.com/tscircuit/easyeda-converter)                 |
| KiCad component converter                        | Convert KiCad symbols and footprints into tscircuit component data.       | [tscircuit/kicad-component-converter](https://github.com/tscircuit/kicad-component-converter) |

## Routing and Fabrication

| Tool                                       | What users use it for                                                  | Main repository                                                                         |
| ------------------------------------------ | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [Autorouting.com](https://autorouting.com) | Try routing jobs and inspect autorouter behavior outside the editor.   | [tscircuit/autorouting](https://github.com/tscircuit/autorouting)                       |
| Autorouter                                 | Route traces between PCB pads from Circuit JSON and Simple Route JSON. | [tscircuit/tscircuit-autorouter](https://github.com/tscircuit/tscircuit-autorouter)     |
| Circuit JSON to Gerber                     | Export fabrication files for PCB manufacturers.                        | [tscircuit/circuit-json-to-gerber](https://github.com/tscircuit/circuit-json-to-gerber) |
| Circuit JSON to KiCad                      | Export tscircuit projects into KiCad-compatible formats.               | [tscircuit/circuit-json-to-kicad](https://github.com/tscircuit/circuit-json-to-kicad)   |

## Libraries Behind the Tools

| Library           | What it owns                                                             | Main repository                                                               |
| ----------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Core              | The React component runtime that turns components into Circuit JSON.     | [tscircuit/core](https://github.com/tscircuit/core)                           |
| Props             | The shared prop definitions for built-in tscircuit elements.             | [tscircuit/props](https://github.com/tscircuit/props)                         |
| Circuit JSON      | The data format used between renderers, routers, exporters, and viewers. | [tscircuit/circuit-json](https://github.com/tscircuit/circuit-json)           |
| Schematic symbols | Symbol data used by schematic renderers and docs examples.               | [tscircuit/schematic-symbols](https://github.com/tscircuit/schematic-symbols) |
