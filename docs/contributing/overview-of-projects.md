---
title: Overview of Projects
sidebar_position: 2
description: Explore the key tscircuit repositories including core libraries, tools, and web components that power the ecosystem.
---

## User-facing tools

Use this table when you want to pick the right tscircuit tool before opening an issue or contributing a fix.

| Tool | Use it for | Main repo |
| ---- | ---------- | --------- |
| [tscircuit.com editor](https://tscircuit.com/editor) | Create, preview, and share circuits in the browser | [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com) |
| [CLI](../command-line/tsci-dev.md) | Run a local development server, build packages, and manage projects from the terminal | [tscircuit/cli](https://github.com/tscircuit/cli) |
| [RunFrame](../guides/running-tscircuit/running-tscircuit-inside-an-iframe.mdx) | Embed runnable tscircuit previews in apps, docs, or iframes | [tscircuit/runframe](https://github.com/tscircuit/runframe) |
| [PCB viewer](https://github.com/tscircuit/pcb-viewer) | Render and inspect PCB views from Circuit JSON | [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer) |
| [3D viewer](https://github.com/tscircuit/3d-viewer) | Render 3D board previews from Circuit JSON | [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer) |
| [autorouting.com](https://autorouting.com) | Try routing services and compare autorouter behavior | [tscircuit/tscircuit-autorouter](https://github.com/tscircuit/tscircuit-autorouter) |
| [Circuit JSON converters](../guides/running-tscircuit/programmatically-building-circuits.md) | Export Gerbers, SVGs, KiCad files, pick-and-place files, BOMs, and SPICE artifacts | [tscircuit/circuit-json](https://github.com/tscircuit/circuit-json) |

## Repository map

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
