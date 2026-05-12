---
title: Overview of Projects
sidebar_position: 2
description: Explore the key tscircuit repositories including core libraries, tools, and web components that power the ecosystem.
---

tscircuit is split across many focused repositories. Use this page to find the
right project to contribute to and to understand how each package fits into the
ecosystem.

## Core authoring tools

| Repo | What it does | Good first contribution areas |
| --- | --- | --- |
| [tscircuit/core](https://github.com/tscircuit/core) | Converts React/TSX circuit components into Circuit JSON. | Element behavior, circuit rendering tests, integration bugs. |
| [tscircuit/cli](https://github.com/tscircuit/cli) | Provides `tsci dev`, `tsci build`, project initialization, auth, package management, and local export workflows. | CLI commands, developer experience, local build/export bugs. |
| [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com) | Hosts the online editor, package registry, snippets, accounts, and web workflows. | Editor UI, package pages, registry flows, onboarding bugs. |
| [tscircuit/circuit-json](https://github.com/tscircuit/circuit-json) | Defines the Circuit JSON schema used between tscircuit tools. | Schema additions, validation, examples, migration helpers. |

## Circuit output and viewers

| Repo | What it does | Good first contribution areas |
| --- | --- | --- |
| [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg) | Converts Circuit JSON into schematic and PCB SVG output. | SVG rendering bugs, snapshot tests, visual correctness. |
| [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer) | React viewer for inspecting PCB layouts. | Interaction behavior, controls, manual edits, viewer performance. |
| [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer) | React viewer for rendering 3D board previews and CAD models. | Model loading, Three.js rendering, caching, viewer controls. |
| [tscircuit/runframe](https://github.com/tscircuit/runframe) | Embeds runnable tscircuit examples and Circuit JSON previews in web pages. | Embedded runtime behavior, examples, iframe integration. |

## Component and footprint libraries

| Repo | What it does | Good first contribution areas |
| --- | --- | --- |
| [tscircuit/props](https://github.com/tscircuit/props) | Defines TypeScript props for tscircuit React components. | Prop typing, docs, component API consistency. |
| [tscircuit/footprinter](https://github.com/tscircuit/footprinter) | Generates PCB footprints from compact footprint strings. | New footprint generators, geometry fixes, parser tests. |
| [tscircuit/schematic-symbols](https://github.com/tscircuit/schematic-symbols) | Stores schematic symbols used across the renderer. | New symbols, symbol corrections, generated previews. |

## Importers, converters, and external formats

| Repo | What it does | Good first contribution areas |
| --- | --- | --- |
| [tscircuit/easyeda-converter](https://github.com/tscircuit/easyeda-converter) | Converts EasyEDA/JLCPCB footprints and parts into tscircuit-compatible data. | Footprint conversion, part import edge cases, tests with real parts. |
| [tscircuit/kicad-component-converter](https://github.com/tscircuit/kicad-component-converter) | Converts KiCad component and footprint data into Circuit JSON and tscircuit metadata. | KiCad parser fixes, schematic symbol support, conversion fixtures. |
| [tscircuit/dsn-converter](https://github.com/tscircuit/dsn-converter) | Converts DSN routing data and related formats. | Router interchange tests, parser coverage, geometry mapping. |
| [tscircuit/circuit-json-to-readable-netlist](https://github.com/tscircuit/circuit-json-to-readable-netlist) | Converts Circuit JSON into readable netlists for humans and AI tools. | Net naming, pin labels, readable output tests. |

## Autorouting and debugging

| Repo | What it does | Good first contribution areas |
| --- | --- | --- |
| [tscircuit/autorouting](https://github.com/tscircuit/autorouting) | Contains autorouting algorithms and datasets used to benchmark routing problems. | Reproduction cases, routing snapshots, algorithm experiments. |
| [tscircuit/tscircuit-autorouter](https://github.com/tscircuit/tscircuit-autorouter) | Implements the production autorouter used by tscircuit workflows. | Trace routing bugs, solver parameters, regression tests. |
| [tscircuit/graphics-debug](https://github.com/tscircuit/graphics-debug) | Displays interactive debug graphics for routing and geometry-heavy problems. | Debug UI controls, performance limits, visualization clarity. |

## How to pick a repo

- Start with [schematic-symbols](https://github.com/tscircuit/schematic-symbols)
  or [footprinter](https://github.com/tscircuit/footprinter) if you want small,
  well-contained contributions.
- Work on [core](https://github.com/tscircuit/core),
  [circuit-to-svg](https://github.com/tscircuit/circuit-to-svg), or the viewers
  when a rendered circuit looks wrong.
- Work on [cli](https://github.com/tscircuit/cli) or
  [tscircuit.com](https://github.com/tscircuit/tscircuit.com) when the user
  workflow, editor, registry, or export process is confusing.
- Work on converter repos when the bug involves importing a part, footprint, or
  board from another EDA tool.

You can also browse issues across the ecosystem with the
[tscircuit issue wheel](https://issues.tscircuit.com/).
