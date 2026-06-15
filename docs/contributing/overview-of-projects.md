---
title: Overview of Projects
sidebar_position: 2
description: Explore the key tscircuit repositories including core libraries, tools, and web components that power the ecosystem.
---

tscircuit is spread across many focused repositories. This page groups them by
area so you can quickly find where to contribute.

## Core Libraries

These repos form the foundation that everything else builds on.

| Repo | Description | Open Issues |
| ---- | ----------- | ----------- |
| [tscircuit/core](https://github.com/tscircuit/core) | Core library — converts React components into Circuit JSON (schematic, PCB, BOM) | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/core)](https://github.com/tscircuit/core/issues) |
| [tscircuit/circuit-json](https://github.com/tscircuit/circuit-json) | The intermediate "assembly language" format all tscircuit tools share | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/circuit-json)](https://github.com/tscircuit/circuit-json/issues) |
| [tscircuit/props](https://github.com/tscircuit/props) | TypeScript type definitions and prop specs for every tscircuit React component | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/props)](https://github.com/tscircuit/props/issues) |

## Rendering & Viewers

These repos turn Circuit JSON into visual output (SVG, React viewers, 3D).

| Repo | Description | Open Issues |
| ---- | ----------- | ----------- |
| [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg) | Converts Circuit JSON into schematic and PCB SVG images | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/circuit-to-svg)](https://github.com/tscircuit/circuit-to-svg/issues) |
| [tscircuit/schematic-symbols](https://github.com/tscircuit/schematic-symbols) | SVG schematic symbols library (resistors, capacitors, ICs, …) used by circuit-to-svg | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/schematic-symbols)](https://github.com/tscircuit/schematic-symbols/issues) |
| [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer) | React component for interactive PCB viewing | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/pcb-viewer)](https://github.com/tscircuit/pcb-viewer/issues) |
| [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer) | React component for 3D PCB and component previews | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/3d-viewer)](https://github.com/tscircuit/3d-viewer/issues) |
| [tscircuit/runframe](https://github.com/tscircuit/runframe) | React component that runs tscircuit code and shows live schematic/PCB/3D previews | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/runframe)](https://github.com/tscircuit/runframe/issues) |

## Autorouting

| Repo | Description | Open Issues |
| ---- | ----------- | ----------- |
| [tscircuit/autorouting](https://github.com/tscircuit/autorouting) | Collection of PCB autorouting algorithms (IjumpAstar, MultilayerIjump, …) | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/autorouting)](https://github.com/tscircuit/autorouting/issues) |

## Component Libraries & Footprints

| Repo | Description | Open Issues |
| ---- | ----------- | ----------- |
| [tscircuit/footprinter](https://github.com/tscircuit/footprinter) | Generates PCB footprints from concise string descriptions (e.g. `"soic8"`) | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/footprinter)](https://github.com/tscircuit/footprinter/issues) |
| [tscircuit/easyeda-converter](https://github.com/tscircuit/easyeda-converter) | Imports EasyEDA/JLCPCB component data and converts it to tscircuit footprints | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/easyeda-converter)](https://github.com/tscircuit/easyeda-converter/issues) |
| [tscircuit/jlcsearch](https://github.com/tscircuit/jlcsearch) | Searchable JLCPCB component database with REST API | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/jlcsearch)](https://github.com/tscircuit/jlcsearch/issues) |

## Developer Tools & Web Apps

| Repo | Description | Open Issues |
| ---- | ----------- | ----------- |
| [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com) | Main web editor at tscircuit.com — share and publish circuit snippets | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/tscircuit.com)](https://github.com/tscircuit/tscircuit.com/issues) |
| [tscircuit/cli](https://github.com/tscircuit/cli) | Local development CLI — `tsci dev` spins up a live-reload circuit preview server | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/cli)](https://github.com/tscircuit/cli/issues) |

## Where to Start

- **Fix a bug in schematic rendering** → [circuit-to-svg](https://github.com/tscircuit/circuit-to-svg) or [schematic-symbols](https://github.com/tscircuit/schematic-symbols)
- **Add a missing component prop** → [props](https://github.com/tscircuit/props) then [core](https://github.com/tscircuit/core)
- **Improve the PCB viewer UI** → [pcb-viewer](https://github.com/tscircuit/pcb-viewer)
- **Add a footprint** → [footprinter](https://github.com/tscircuit/footprinter)
- **Work on autorouting algorithms** → [autorouting](https://github.com/tscircuit/autorouting)
- **New to tscircuit?** → [getting-started-as-a-contributor](./getting-started-as-a-contributor.md)
