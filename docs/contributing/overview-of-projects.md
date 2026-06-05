---
title: Overview of Projects
sidebar_position: 2
description: Pick the right tscircuit repository for core libraries, tooling, viewers, converters, docs, and web app contributions.
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
| Schematic or PCB SVG rendering | [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg) |
| Footprint strings and footprint parsing | [tscircuit/footprinter](https://github.com/tscircuit/footprinter) |
| Schematic symbols | [tscircuit/schematic-symbols](https://github.com/tscircuit/schematic-symbols) |
| The online editor, package pages, accounts, or dashboard UI | [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com) |
| Local commands such as `tsci dev`, `tsci build`, and `tsci export` | [tscircuit/cli](https://github.com/tscircuit/cli) |
| Embedded previews used in docs and external sites | [tscircuit/runframe](https://github.com/tscircuit/runframe) |
| PCB viewer interaction or rendering | [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer) |
| 3D board previews and model loading | [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer) |
| Autorouting algorithms, route problems, or routing benchmarks | [tscircuit/autorouting](https://github.com/tscircuit/autorouting) |
| Documentation, tutorials, contribution guides, or examples | [tscircuit/docs](https://github.com/tscircuit/docs) |

## Core Libraries

| Repo | What it owns | Good contributions | Open issues |
| --- | --- | --- | --- |
| [tscircuit/core](https://github.com/tscircuit/core) | Converts React components into Circuit JSON, schematics, and PCB outputs. | Element behavior, layout logic, routing inputs, regression tests. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/core)](https://github.com/tscircuit/core/issues) |
| [tscircuit/props](https://github.com/tscircuit/props) | TypeScript prop definitions for tscircuit elements. | Prop additions, prop docs, stricter element typing. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/props)](https://github.com/tscircuit/props/issues) |
| [tscircuit/circuit-json](https://github.com/tscircuit/circuit-json) | The shared data format for circuits, boards, schematic elements, and manufacturing outputs. | Schema changes, validators, fixtures, compatibility notes. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/circuit-json)](https://github.com/tscircuit/circuit-json/issues) |
| [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg) | Converts Circuit JSON into schematic and PCB SVGs. | Snapshot fixes, renderer bugs, visual output improvements. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/circuit-to-svg)](https://github.com/tscircuit/circuit-to-svg/issues) |

## Authoring Tools

| Repo | What it owns | Good contributions | Open issues |
| --- | --- | --- | --- |
| [tscircuit/cli](https://github.com/tscircuit/cli) | The `tsci` command line workflow for local development, packages, exports, and builds. | Command bugs, clearer errors, package workflow fixes, export options. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/cli)](https://github.com/tscircuit/cli/issues) |
| [tscircuit/docs](https://github.com/tscircuit/docs) | Documentation, tutorials, guides, API references, and examples. | Missing docs, clearer examples, docs navigation, contribution guides. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/docs)](https://github.com/tscircuit/docs/issues) |
| [tscircuit/runframe](https://github.com/tscircuit/runframe) | Embeddable runtime for previewing and running tscircuit code. | Preview runtime bugs, iframe behavior, editor integration, loading states. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/runframe)](https://github.com/tscircuit/runframe/issues) |

## Viewers And Web Apps

| Repo | What it owns | Good contributions | Open issues |
| --- | --- | --- | --- |
| [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com) | Main website, online editor, account flows, package pages, and app UI. | Editor bugs, UI polish, dashboard flows, package discovery. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/tscircuit.com)](https://github.com/tscircuit/tscircuit.com/issues) |
| [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer) | React PCB viewer used by docs, previews, and apps. | Layer controls, interaction bugs, board rendering, viewer performance. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/pcb-viewer)](https://github.com/tscircuit/pcb-viewer/issues) |
| [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer) | 3D board and component previews. | Model loading, camera behavior, 3D rendering, lighting, performance. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/3d-viewer)](https://github.com/tscircuit/3d-viewer/issues) |
| [tscircuit/autorouting.com](https://github.com/tscircuit/autorouting.com) | Web interface for autorouting experiments and debugging. | Route visualization, job status UX, debug views, integration fixes. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/autorouting.com)](https://github.com/tscircuit/autorouting.com/issues) |

## Symbols, Footprints, And Converters

| Repo | What it owns | Good contributions | Open issues |
| --- | --- | --- | --- |
| [tscircuit/schematic-symbols](https://github.com/tscircuit/schematic-symbols) | Reusable schematic symbols. | Missing symbols, symbol metadata, test fixtures, examples. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/schematic-symbols)](https://github.com/tscircuit/schematic-symbols/issues) |
| [tscircuit/footprinter](https://github.com/tscircuit/footprinter) | Generates PCB footprints from footprint strings. | New footprints, parser fixes, footprint snapshots. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/footprinter)](https://github.com/tscircuit/footprinter/issues) |
| [tscircuit/easyeda-converter](https://github.com/tscircuit/easyeda-converter) | Converts EasyEDA and JLCPCB data into tscircuit-compatible output. | Import bugs, part mapping, footprint conversion. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/easyeda-converter)](https://github.com/tscircuit/easyeda-converter/issues) |
| [tscircuit/kicad-converter](https://github.com/tscircuit/kicad-converter) | Converts KiCad data for tscircuit workflows. | KiCad import and export fixes, library conversion coverage. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/kicad-converter)](https://github.com/tscircuit/kicad-converter/issues) |
| [tscircuit/eagle-xml-converter](https://github.com/tscircuit/eagle-xml-converter) | Converts Eagle XML files into tscircuit-compatible data. | Eagle import coverage, converter bugs, fixture tests. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/eagle-xml-converter)](https://github.com/tscircuit/eagle-xml-converter/issues) |
| [tscircuit/dsn-converter](https://github.com/tscircuit/dsn-converter) | Converts Specctra DSN files into Circuit JSON. | DSN parsing, autorouter import/export compatibility, fixtures. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/dsn-converter)](https://github.com/tscircuit/dsn-converter/issues) |

## Autorouting And Infrastructure

| Repo | What it owns | Good contributions | Open issues |
| --- | --- | --- | --- |
| [tscircuit/autorouting](https://github.com/tscircuit/autorouting) | Autorouting algorithms, datasets, benchmarks, and route problem definitions. | Algorithm improvements, reduced route failures, benchmark cases. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/autorouting)](https://github.com/tscircuit/autorouting/issues) |
| [tscircuit/contribution-tracker](https://github.com/tscircuit/contribution-tracker) | Contribution summaries and sponsorship signals. | Scoring logic, contribution ingestion, dashboard data fixes. | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/contribution-tracker)](https://github.com/tscircuit/contribution-tracker/issues) |

## Before Opening A PR

- Search the target repo's open issues first, then link the issue in your PR.
- Include a small reproduction, fixture, screenshot, or preview link when changing visual output.
- Put prop changes in `props` before wiring them into `core`.
- Put schema changes in `circuit-json` before relying on them in renderers or viewers.
- Keep docs examples aligned with current element names and props.
- If a bug crosses repos, open the PR in the repo that owns the failing behavior
  and mention any follow-up repos in the description.
