---
title: Overview of Projects
sidebar_position: 2
description: Explore the key tscircuit repositories including core libraries, tools, and web components that power the ecosystem.
---

## Choosing a Repository to Contribute To

Use the project area to decide where an issue or pull request belongs.

| If you want to improve... | Start in this repository |
| ------------------------- | ------------------------ |
| React circuit primitives, rendering behavior, or generated Circuit JSON | [tscircuit/core](https://github.com/tscircuit/core) |
| Component prop definitions and TypeScript types | [tscircuit/props](https://github.com/tscircuit/props) |
| Footprint string parsing or generated pad geometry | [tscircuit/footprinter](https://github.com/tscircuit/footprinter) |
| Local project commands, package commands, or build/export flows | [tscircuit/cli](https://github.com/tscircuit/cli) |
| Browser editor workflows and project pages | [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com) |
| Embedded previews used by docs and external sites | [tscircuit/runframe](https://github.com/tscircuit/runframe) |
| PCB rendering and interaction | [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer) |
| 3D rendering and board previews | [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer) |
| KiCad, EasyEDA, or JLCPCB import/export behavior | [tscircuit/kicad-component-converter](https://github.com/tscircuit/kicad-component-converter), [tscircuit/easyeda-converter](https://github.com/tscircuit/easyeda-converter), or [tscircuit/jlcsearch](https://github.com/tscircuit/jlcsearch) |
| Documentation, tutorials, and contributor guides | [tscircuit/docs](https://github.com/tscircuit/docs) |

When in doubt, open the issue in the repository closest to the user-facing bug
and link to related lower-level repositories in the description. Maintainers can
move or cross-link the issue if the fix belongs elsewhere.

| Repo                                                                          | Description                                                                                    | Open Issues                                                                                                                                 |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [tscircuit/core](https://github.com/tscircuit/core)                           | Core library that powers tscircuit, handles conversion of React components into circuit boards | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/core)](https://github.com/tscircuit/core/issues)                           |
| [tscircuit/schematic-symbols](https://github.com/tscircuit/schematic-symbols) | Library of schematic symbols used across tscircuit                                             | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/schematic-symbols)](https://github.com/tscircuit/schematic-symbols/issues) |
| [tscircuit/footprinter](https://github.com/tscircuit/footprinter)             | Generates PCB footprints from string descriptions                                              | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/footprinter)](https://github.com/tscircuit/footprinter/issues)             |
| [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg)       | Converts Circuit JSON into SVG files                                                           | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/circuit-to-svg)](https://github.com/tscircuit/circuit-to-svg/issues)       |
| [tscircuit/circuit-json](https://github.com/tscircuit/circuit-json)           | Underlying assembly language format that represents tscircuit circuits               | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/circuit-json)](https://github.com/tscircuit/circuit-json/issues)           |
| [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com)         | Main website and circuit board editor                                                          | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/tscircuit.com)](https://github.com/tscircuit/tscircuit.com/issues)         |
| [tscircuit/cli](https://github.com/tscircuit/cli)                             | Main development tool for tscircuit, provides local development server and package management  | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/cli)](https://github.com/tscircuit/cli/issues)                             |
| [tscircuit/runframe](https://github.com/tscircuit/runframe)                   | React component to preview and run tscircuit circuits                                          | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/runframe)](https://github.com/tscircuit/runframe/issues)                   |
| [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer)               | React component for viewing PCBs                                                               | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/pcb-viewer)](https://github.com/tscircuit/pcb-viewer/issues)               |
| [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer)                 | React component for viewing 3D previews                                                        | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/3d-viewer)](https://github.com/tscircuit/3d-viewer/issues)                 |
| [tscircuit/props](https://github.com/tscircuit/props)                         | Specification for the definitions of every React component supported by tscircuit     | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/props)](https://github.com/tscircuit/props/issues)                         |
| [tscircuit/easyeda-converter](https://github.com/tscircuit/easyeda-converter) | Command line utility for converting JLCPCB footprints to tscircuit                             | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/easyeda-converter)](https://github.com/tscircuit/easyeda-converter/issues) |
