---
title: Overview of Projects
sidebar_position: 2
description: Explore the key tscircuit repositories including core libraries, autorouters, viewers, file exporters, and developer tools powering the ecosystem.
---

The `tscircuit` ecosystem is organized into modular open-source repositories designed for high-performance React-driven electronic design automation (EDA). Contributor opportunities span core compilers, geometry solvers, viewers, and CAD export bridges.

## Core Compiler & React Definitions

| Repo | Description | Open Issues |
| :--- | :--- | :--- |
| [tscircuit/core](https://github.com/tscircuit/core) | Core compiler converting React component trees into Circuit JSON | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/core)](https://github.com/tscircuit/core/issues) |
| [tscircuit/circuit-json](https://github.com/tscircuit/circuit-json) | Standard JSON schema specification and assembly representation for circuits | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/circuit-json)](https://github.com/tscircuit/circuit-json/issues) |
| [tscircuit/props](https://github.com/tscircuit/props) | TypeScript props and attribute specifications for all supported circuit elements | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/props)](https://github.com/tscircuit/props/issues) |
| [tscircuit/eval](https://github.com/tscircuit/eval) | Sandboxed evaluator translating tscircuit code into Circuit JSON in browsers and Node.js | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/eval)](https://github.com/tscircuit/eval/issues) |
| [tscircuit/tscircuit](https://github.com/tscircuit/tscircuit) | High-level unified entrypoint and developer toolkit | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/tscircuit)](https://github.com/tscircuit/tscircuit/issues) |

---

## Routing & Geometric Placement Algorithms

| Repo | Description | Open Issues |
| :--- | :--- | :--- |
| [tscircuit/tscircuit-autorouter](https://github.com/tscircuit/tscircuit-autorouter) | State-of-the-art MIT-licensed automatic PCB trace autorouter | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/tscircuit-autorouter)](https://github.com/tscircuit/tscircuit-autorouter/issues) |
| [tscircuit/schematic-trace-solver](https://github.com/tscircuit/schematic-trace-solver) | Schematic net label placement and trace solver utilizing Minimum Spanning Tree algorithms | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/schematic-trace-solver)](https://github.com/tscircuit/schematic-trace-solver/issues) |

---

## Interactive Viewers & UI Components

| Repo | Description | Open Issues |
| :--- | :--- | :--- |
| [tscircuit/runframe](https://github.com/tscircuit/runframe) | Web Worker runner for executing code with integrated PCB, schematic, and 3D previews | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/runframe)](https://github.com/tscircuit/runframe/issues) |
| [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer) | High-performance React component for rendering 2D printed circuit boards | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/pcb-viewer)](https://github.com/tscircuit/pcb-viewer/issues) |
| [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer) | Three.js powered interactive 3D board visualizer | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/3d-viewer)](https://github.com/tscircuit/3d-viewer/issues) |
| [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com) | Main community cloud platform, registry, and collaborative online board editor | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/tscircuit.com)](https://github.com/tscircuit/tscircuit.com/issues) |

---

## Footprints, Symbols & Exporters

| Repo | Description | Open Issues |
| :--- | :--- | :--- |
| [tscircuit/footprinter](https://github.com/tscircuit/footprinter) | Micro-builder and string-to-footprint DSL for AI and programmatically generated footprints | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/footprinter)](https://github.com/tscircuit/footprinter/issues) |
| [tscircuit/schematic-symbols](https://github.com/tscircuit/schematic-symbols) | Comprehensive vector library of standard schematic symbols | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/schematic-symbols)](https://github.com/tscircuit/schematic-symbols/issues) |
| [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg) | Vector engine converting Circuit JSON into exportable SVG schematics and layouts | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/circuit-to-svg)](https://github.com/tscircuit/circuit-to-svg/issues) |
| [tscircuit/circuit-json-to-kicad](https://github.com/tscircuit/circuit-json-to-kicad) | Converter exporting Circuit JSON into native KiCad schematic and PCB formats | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/circuit-json-to-kicad)](https://github.com/tscircuit/circuit-json-to-kicad/issues) |
| [tscircuit/circuit-json-to-gerber](https://github.com/tscircuit/circuit-json-to-gerber) | Gerber (RS-274X) and Excellon drill file generator for PCB manufacturing | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/circuit-json-to-gerber)](https://github.com/tscircuit/circuit-json-to-gerber/issues) |
| [tscircuit/jscad-to-step](https://github.com/tscircuit/jscad-to-step) | 3D mechanical CAD exporter converting OpenJSCAD geometry to standard STEP files | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/jscad-to-step)](https://github.com/tscircuit/jscad-to-step/issues) |
| [tscircuit/easyeda-converter](https://github.com/tscircuit/easyeda-converter) | CLI utility for importing EasyEDA and JLCPCB footprint definitions into Circuit JSON | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/easyeda-converter)](https://github.com/tscircuit/easyeda-converter/issues) |

---

## Developer Tooling & Verification

| Repo | Description | Open Issues |
| :--- | :--- | :--- |
| [tscircuit/cli](https://github.com/tscircuit/cli) | Local development server, live reloading, and package publishing CLI | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/cli)](https://github.com/tscircuit/cli/issues) |
| [tscircuit/checks](https://github.com/tscircuit/checks) | Design Rule Checking (DRC) and validity validators for circuit boards | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/checks)](https://github.com/tscircuit/checks/issues) |
