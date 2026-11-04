---
title: Overview of Projects
sidebar_position: 2
description: Pick the right tscircuit repository for core libraries, tooling, viewers, solvers, converters, docs, and web app contributions.
---

tscircuit is split across focused repositories. Use this guide to decide where
to open an issue, where to send a pull request, and which repo owns the behavior
you want to change.

## Quick Chooser

| If you want to work on... | Start here |
| --- | --- |
| React elements such as `<board />`, `<chip />`, traces, nets, and layout behavior | [tscircuit/core](https://github.com/tscircuit/core) |
| TypeScript props accepted by tscircuit elements | [tscircuit/props](https://github.com/tscircuit/props) |
| The shared circuit data format emitted by tscircuit | [tscircuit/circuit-json](https://github.com/tscircuit/circuit-json) |
| Evaluating user TSX/TypeScript circuit files in the browser or worker | [tscircuit/eval](https://github.com/tscircuit/eval) |
| Schematic or PCB SVG rendering | [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg) |
| Footprint strings and footprint parsing | [tscircuit/footprinter](https://github.com/tscircuit/footprinter) |
| Schematic symbols | [tscircuit/schematic-symbols](https://github.com/tscircuit/schematic-symbols) |
| Parametric 3D electronic component models | [tscircuit/jscad-electronics](https://github.com/tscircuit/jscad-electronics) |
| The online editor, package pages, accounts, or dashboard UI | [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com) |
| Local commands such as `tsci dev`, `tsci build`, and `tsci export` | [tscircuit/cli](https://github.com/tscircuit/cli) |
| Embedded previews used in docs and external sites | [tscircuit/runframe](https://github.com/tscircuit/runframe) |
| PCB viewer interaction or rendering | [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer) |
| 3D board previews and model loading | [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer) |
| PCB autorouting, schematic trace routing, or component packing solvers | [tscircuit/tscircuit-autorouter](https://github.com/tscircuit/tscircuit-autorouter), [tscircuit/schematic-trace-solver](https://github.com/tscircuit/schematic-trace-solver), [tscircuit/matchpack](https://github.com/tscircuit/matchpack) |
| Documentation, tutorials, contribution guides, or examples | [tscircuit/docs](https://github.com/tscircuit/docs) |

## Core & Language

| Repo | What it owns | Good contributions | Open issues |
| --- | --- | --- | --- |
| [tscircuit/core](https://github.com/tscircuit/core) | Converts React components into Circuit JSON, schematics, and PCB outputs. | Element behavior, layout logic, routing inputs, regression tests. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/core)](https://github.com/tscircuit/core/issues) |
| [tscircuit/props](https://github.com/tscircuit/props) | TypeScript and Zod prop definitions for tscircuit elements. | Prop additions, prop docs, stricter element typing. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/props)](https://github.com/tscircuit/props/issues) |
| [tscircuit/circuit-json](https://github.com/tscircuit/circuit-json) | The shared data format for circuits, boards, schematic elements, and manufacturing outputs. | Schema changes, validators, fixtures, compatibility notes. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/circuit-json)](https://github.com/tscircuit/circuit-json/issues) |
| [tscircuit/eval](https://github.com/tscircuit/eval) | Bundles and evaluates tscircuit TypeScript/TSX modules into Circuit JSON. | Import resolution, web-worker execution, error reporting. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/eval)](https://github.com/tscircuit/eval/issues) |

## Footprints, Symbols, And 3D Models

| Repo | What it owns | Good contributions | Open issues |
| --- | --- | --- | --- |
| [tscircuit/footprinter](https://github.com/tscircuit/footprinter) | Generates PCB footprints from footprint strings (such as `0402`, `soic8`, `qfn32`). | New footprints, parser fixes, IPC dimension accuracy, footprint snapshots. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/footprinter)](https://github.com/tscircuit/footprinter/issues) |
| [tscircuit/schematic-symbols](https://github.com/tscircuit/schematic-symbols) | Library of reusable schematic symbols used across tscircuit. | Missing symbols, symbol metadata, test fixtures, examples. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/schematic-symbols)](https://github.com/tscircuit/schematic-symbols/issues) |
| [tscircuit/jscad-electronics](https://github.com/tscircuit/jscad-electronics) | Parametric 3D CAD models for electronic packages built with JSCAD. | New package 3D models, pin geometry accuracy, footprint-to-3D matching. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/jscad-electronics)](https://github.com/tscircuit/jscad-electronics/issues) |

## Viewers, Renderers, And Web Apps

| Repo | What it owns | Good contributions | Open issues |
| --- | --- | --- | --- |
| [tscircuit/runframe](https://github.com/tscircuit/runframe) | Embeddable runtime combining code execution, schematic, PCB, and 3D viewers. | Preview runtime bugs, solver web workers, toolbar controls, error overlays. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/runframe)](https://github.com/tscircuit/runframe/issues) |
| [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer) | React PCB viewer used by docs, previews, and apps. | Layer controls, interaction bugs, board rendering, viewer performance. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/pcb-viewer)](https://github.com/tscircuit/pcb-viewer/issues) |
| [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer) | 3D board and component previews. | Model loading, camera behavior, 3D rendering, lighting, performance. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/3d-viewer)](https://github.com/tscircuit/3d-viewer/issues) |
| [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg) | Converts Circuit JSON into schematic, PCB, assembly, and pinout SVGs. | Snapshot fixes, renderer bugs, visual output improvements. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/circuit-to-svg)](https://github.com/tscircuit/circuit-to-svg/issues) |
| [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com) | Main website, online editor, account flows, package pages, and app UI. | Editor bugs, UI polish, dashboard flows, package discovery. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/tscircuit.com)](https://github.com/tscircuit/tscircuit.com/issues) |
| [tscircuit/docs](https://github.com/tscircuit/docs) | Documentation, tutorials, guides, API references, and examples. | Missing docs, clearer examples, docs navigation, contribution guides. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/docs)](https://github.com/tscircuit/docs/issues) |

## Routing And Layout Solvers

| Repo | What it owns | Good contributions | Open issues |
| --- | --- | --- | --- |
| [tscircuit/tscircuit-autorouter](https://github.com/tscircuit/tscircuit-autorouter) | Multi-layer PCB trace autorouter, BGA/bus fanout solver, and capacity routing stages. | Routing completion rate, DRC clearance fixes, via minimization, benchmarks. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/tscircuit-autorouter)](https://github.com/tscircuit/tscircuit-autorouter/issues) |
| [tscircuit/schematic-trace-solver](https://github.com/tscircuit/schematic-trace-solver) | Automatic schematic wire routing and net label placement solver. | Overlap avoidance, cleaner orthogonal schematic wires, net label placement. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/schematic-trace-solver)](https://github.com/tscircuit/schematic-trace-solver/issues) |
| [tscircuit/matchpack](https://github.com/tscircuit/matchpack) | Automatic PCB and schematic component packing and placement solver. | Component spacing, orientation optimization, group boundary packing. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/matchpack)](https://github.com/tscircuit/matchpack/issues) |
| [tscircuit/autorouting](https://github.com/tscircuit/autorouting) | Autorouting datasets, benchmarks, and route problem definitions. | Benchmark cases, dataset curation, solver comparisons. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/autorouting)](https://github.com/tscircuit/autorouting/issues) |

## CLI And Converters

| Repo | What it owns | Good contributions | Open issues |
| --- | --- | --- | --- |
| [tscircuit/cli](https://github.com/tscircuit/cli) | The `tsci` command line workflow for local development, packages, exports, and builds. | Command bugs, clearer errors, package workflow fixes, export options. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/cli)](https://github.com/tscircuit/cli/issues) |
| [tscircuit/circuit-json-to-kicad](https://github.com/tscircuit/circuit-json-to-kicad) | Converts Circuit JSON into KiCad schematics (`.kicad_sch`), layouts (`.kicad_pcb`), and projects (`.kicad_pro`). | KiCad symbol/footprint mapping, design rule export, 3D model path handling. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/circuit-json-to-kicad)](https://github.com/tscircuit/circuit-json-to-kicad/issues) |
| [tscircuit/easyeda-converter](https://github.com/tscircuit/easyeda-converter) | Converts EasyEDA and JLCPCB/LCSC parts into tscircuit footprints, symbols, and TSX components. | Import bugs, part mapping, footprint and 3D model conversion. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/easyeda-converter)](https://github.com/tscircuit/easyeda-converter/issues) |
| [tscircuit/dsn-converter](https://github.com/tscircuit/dsn-converter) | Converts between Specctra DSN/SES files and Circuit JSON. | DSN parsing, autorouter import/export compatibility, fixtures. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/dsn-converter)](https://github.com/tscircuit/dsn-converter/issues) |
| [tscircuit/kicad-converter](https://github.com/tscircuit/kicad-converter) | Converts KiCad footprints and modules for tscircuit workflows. | KiCad import and export fixes, library conversion coverage. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/kicad-converter)](https://github.com/tscircuit/kicad-converter/issues) |

## Before Opening A PR

- Search the target repo's open issues first, then link the issue in your PR.
- Include a small reproduction, unit test, SVG snapshot, or preview link when changing output.
- Put prop changes in `props` before wiring them into `core`.
- Put schema changes in `circuit-json` before relying on them in renderers or viewers.
- Keep docs examples aligned with current element names and props.
- If a bug crosses repos, open the PR in the repo that owns the failing behavior
  and mention any follow-up repos in the description.
