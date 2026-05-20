---
title: Overview of Projects
sidebar_position: 2
description: Explore the key tscircuit repositories including core libraries, tools, and web components that power the ecosystem.
---

# Overview of tscircuit projects

tscircuit is split across focused repositories. Use this page to find the right place to report an issue, open a pull request, or start a bounty attempt.

## Start here

| Repo | What belongs there |
| --- | --- |
| [tscircuit/tscircuit](https://github.com/tscircuit/tscircuit) | Main user-facing package for writing electronics with TypeScript and React. Start here for examples and high-level user experience issues. |
| [tscircuit/core](https://github.com/tscircuit/core) | Core compiler that turns React components into Circuit JSON. Use this for component behavior, prop handling, and render-to-data bugs. |
| [tscircuit/cli](https://github.com/tscircuit/cli) | Local development server and command-line workflow, including project creation, preview, build, import, export, and auth commands. |
| [tscircuit/docs](https://github.com/tscircuit/docs) | Documentation, tutorials, reference pages, and contributor guides. |
| [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com) | Main website, playground, registry UI, and online development environment. |

## Circuit JSON and validation

| Repo | What belongs there |
| --- | --- |
| [tscircuit/circuit-json](https://github.com/tscircuit/circuit-json) | Schema and types for the low-level circuit representation used across the ecosystem. |
| [tscircuit/props](https://github.com/tscircuit/props) | Shared prop definitions for supported tscircuit components. |
| [tscircuit/checks](https://github.com/tscircuit/checks) | Design-rule and validity checks for Circuit JSON. |
| [tscircuit/eval](https://github.com/tscircuit/eval) | Evaluates tscircuit code to Circuit JSON in browsers, Node.js, or web workers. |
| [tscircuit/runframe](https://github.com/tscircuit/runframe) | Runs tscircuit code in a web worker and powers preview experiences. |

## Viewers and renderers

| Repo | What belongs there |
| --- | --- |
| [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg) | Renders Circuit JSON to schematic, PCB, and assembly SVGs. |
| [tscircuit/circuit-to-canvas](https://github.com/tscircuit/circuit-to-canvas) | Draws Circuit JSON to Canvas-compatible targets. |
| [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer) | React PCB viewer. |
| [tscircuit/schematic-viewer](https://github.com/tscircuit/schematic-viewer) | React schematic viewer. |
| [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer) | 3D viewer for boards created with tscircuit. |
| [tscircuit/svg.tscircuit.com](https://github.com/tscircuit/svg.tscircuit.com) | Service for rendering encoded tscircuit snippets into SVGs for docs and embeds. |

## Importers, exporters, and manufacturing formats

| Repo | What belongs there |
| --- | --- |
| [tscircuit/circuit-json-to-gerber](https://github.com/tscircuit/circuit-json-to-gerber) | Exports Circuit JSON to Gerber. |
| [tscircuit/circuit-json-to-kicad](https://github.com/tscircuit/circuit-json-to-kicad) | Exports Circuit JSON to KiCad. |
| [tscircuit/circuit-json-to-step](https://github.com/tscircuit/circuit-json-to-step) | Exports Circuit JSON to STEP. |
| [tscircuit/circuit-json-to-gltf](https://github.com/tscircuit/circuit-json-to-gltf) | Exports Circuit JSON to GLTF/GLB. |
| [tscircuit/circuit-json-to-tscircuit](https://github.com/tscircuit/circuit-json-to-tscircuit) | Converts Circuit JSON back into tscircuit code. |
| [tscircuit/kicad-to-circuit-json](https://github.com/tscircuit/kicad-to-circuit-json) | Imports KiCad projects into Circuit JSON. |
| [tscircuit/easyeda-converter](https://github.com/tscircuit/easyeda-converter) | Converts EasyEDA/JLCPCB footprint data into tscircuit-compatible formats. |
| [tscircuit/footprinter](https://github.com/tscircuit/footprinter) | Footprint DSL and micro-builder designed to be friendly to AI-generated footprints. |
| [tscircuit/jscad-electronics](https://github.com/tscircuit/jscad-electronics) | JSCAD functions for electronics geometry. |

## Routing and layout

| Repo | What belongs there |
| --- | --- |
| [tscircuit/tscircuit-autorouter](https://github.com/tscircuit/tscircuit-autorouter) | Main MIT-licensed PCB autorouter. |
| [tscircuit/schematic-trace-solver](https://github.com/tscircuit/schematic-trace-solver) | Schematic trace routing and net-label placement. |
| [tscircuit/calculate-packing](https://github.com/tscircuit/calculate-packing) | The `pack` layout algorithm. |
| [tscircuit/copper-pour-solver](https://github.com/tscircuit/copper-pour-solver) | Copper pour polygon solver. |
| [tscircuit/hypergraph](https://github.com/tscircuit/hypergraph), [tscircuit/tiny-hypergraph](https://github.com/tscircuit/tiny-hypergraph), and [tscircuit/pcb-poly-hyper-graph](https://github.com/tscircuit/pcb-poly-hyper-graph) | Graph utilities used by routing and layout tools. |

## Parts, packages, and examples

| Repo | What belongs there |
| --- | --- |
| [tscircuit/common](https://github.com/tscircuit/common) | Community-contributed components. |
| [tscircuit/jlcsearch](https://github.com/tscircuit/jlcsearch) | Finds JLCPCB parts matching design constraints. |
| [tscircuit/parts-engine](https://github.com/tscircuit/parts-engine) | Platform parts engine. |
| [tscircuit/sparkfun-boards](https://github.com/tscircuit/sparkfun-boards) | SparkFun boards recreated in tscircuit. |
| [tscircuit/example-custom-autorouter](https://github.com/tscircuit/example-custom-autorouter) | Example repo for using a custom autorouter. |

## How to choose a repository

1. If your change affects the code users write, start with `tscircuit`, `core`, or `props`.
2. If your change affects generated data, start with `circuit-json`, `checks`, or `eval`.
3. If your change affects visual output, start with a viewer or renderer repo.
4. If your change affects manufacturing/export files, start with a converter repo.
5. If your change affects routing or layout quality, start with the autorouter, solver, or hypergraph repos.
6. If you are unsure, open a small issue in the closest repo and include a minimal reproduction.

## Pull request checklist

- Link the issue or bounty in the PR body.
- Keep the change scoped to one repo and one behavior when possible.
- Add or update tests for code changes.
- Update docs or examples when user-facing behavior changes.
- Include the exact local commands you ran to verify the change.
