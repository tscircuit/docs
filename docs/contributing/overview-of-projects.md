---
title: Overview of Projects
sidebar_position: 2
description: Explore the key tscircuit repositories including core libraries, tools, and web components that power the ecosystem.
---

tscircuit is split into many small packages and apps. Use this page to pick the
right repository before opening an issue or pull request.

## Where to Start

- New contributors should start with
  [tscircuit/schematic-symbols](https://github.com/tscircuit/schematic-symbols),
  [tscircuit/footprinter](https://github.com/tscircuit/footprinter), or
  [tscircuit/docs](https://github.com/tscircuit/docs).
- UI contributors should look at
  [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com),
  [tscircuit/runframe](https://github.com/tscircuit/runframe),
  [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer), or
  [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer).
- Compiler and library contributors should look at
  [tscircuit/core](https://github.com/tscircuit/core),
  [tscircuit/circuit-json](https://github.com/tscircuit/circuit-json),
  [tscircuit/props](https://github.com/tscircuit/props), or
  [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg).
- Converter and automation contributors should look at the CLI and converter
  repositories listed below.

## Core Libraries

| Repo | What it owns | Good contributions | Open issues |
| --- | --- | --- | --- |
| [tscircuit/core](https://github.com/tscircuit/core) | Converts React components into Circuit JSON, schematics, and PCBs | Element behavior, layout logic, bug fixes with tests | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/core)](https://github.com/tscircuit/core/issues) |
| [tscircuit/circuit-json](https://github.com/tscircuit/circuit-json) | Shared data format for circuits, boards, schematic elements, and manufacturing outputs | Schema changes, validation, type coverage | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/circuit-json)](https://github.com/tscircuit/circuit-json/issues) |
| [tscircuit/props](https://github.com/tscircuit/props) | TypeScript prop definitions for tscircuit React elements | Prop documentation, type fixes, new element props | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/props)](https://github.com/tscircuit/props/issues) |
| [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg) | Renders Circuit JSON as schematic and PCB SVGs | Snapshot fixes, renderer bugs, visual output improvements | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/circuit-to-svg)](https://github.com/tscircuit/circuit-to-svg/issues) |

## Developer Tools

| Repo | What it owns | Good contributions | Open issues |
| --- | --- | --- | --- |
| [tscircuit/cli](https://github.com/tscircuit/cli) | The `tsci` command line tool for local development, package workflows, and exports | Command bugs, better errors, build and export workflows | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/cli)](https://github.com/tscircuit/cli/issues) |
| [tscircuit/docs](https://github.com/tscircuit/docs) | Documentation, tutorials, guides, and API references | Missing docs, clearer examples, contribution guides | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/docs)](https://github.com/tscircuit/docs/issues) |
| [tscircuit/autorouting](https://github.com/tscircuit/autorouting) | Autorouting algorithms, datasets, and benchmark problems | Routing algorithms, regression cases, benchmark improvements | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/autorouting)](https://github.com/tscircuit/autorouting/issues) |
| [tscircuit/contribution-tracker](https://github.com/tscircuit/contribution-tracker) | Tracks and summarizes tscircuit contributions and sponsorship signals | Scoring logic, contribution summaries, dashboard data fixes | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/contribution-tracker)](https://github.com/tscircuit/contribution-tracker/issues) |

## Web Apps and Viewers

| Repo | What it owns | Good contributions | Open issues |
| --- | --- | --- | --- |
| [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com) | Main website, online editor, account flows, and package pages | Editor bugs, UI polish, dashboard workflows | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/tscircuit.com)](https://github.com/tscircuit/tscircuit.com/issues) |
| [tscircuit/runframe](https://github.com/tscircuit/runframe) | Embeddable React runtime for previewing and running tscircuit code | Preview bugs, iframe/runtime behavior, editor integration | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/runframe)](https://github.com/tscircuit/runframe/issues) |
| [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer) | React PCB viewer used in docs, apps, and previews | PCB interaction bugs, rendering issues, viewer performance | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/pcb-viewer)](https://github.com/tscircuit/pcb-viewer/issues) |
| [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer) | 3D board and component previews | Model loading, camera behavior, 3D rendering performance | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/3d-viewer)](https://github.com/tscircuit/3d-viewer/issues) |
| [tscircuit/autorouting.com](https://github.com/tscircuit/autorouting.com) | Web interface for autorouting experiments and debugging | Route visualization, job status UX, integration fixes | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/autorouting.com)](https://github.com/tscircuit/autorouting.com/issues) |

## Component Libraries and Converters

| Repo | What it owns | Good contributions | Open issues |
| --- | --- | --- | --- |
| [tscircuit/schematic-symbols](https://github.com/tscircuit/schematic-symbols) | Reusable schematic symbols | Add missing symbols, fix symbol metadata, improve examples | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/schematic-symbols)](https://github.com/tscircuit/schematic-symbols/issues) |
| [tscircuit/footprinter](https://github.com/tscircuit/footprinter) | Generates PCB footprint strings and footprint geometry | Add missing footprints, parser fixes, snapshot coverage | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/footprinter)](https://github.com/tscircuit/footprinter/issues) |
| [tscircuit/easyeda-converter](https://github.com/tscircuit/easyeda-converter) | Converts EasyEDA and JLCPCB data into tscircuit-compatible output | Import bugs, footprint conversion, component mapping | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/easyeda-converter)](https://github.com/tscircuit/easyeda-converter/issues) |
| [tscircuit/kicad-converter](https://github.com/tscircuit/kicad-converter) | Converts KiCad data for use in tscircuit workflows | KiCad import/export fixes, library conversion coverage | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/kicad-converter)](https://github.com/tscircuit/kicad-converter/issues) |
| [tscircuit/eagle-xml-converter](https://github.com/tscircuit/eagle-xml-converter) | Converts Eagle XML files for tscircuit-compatible workflows | Eagle import coverage, converter bugs, fixture tests | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/eagle-xml-converter)](https://github.com/tscircuit/eagle-xml-converter/issues) |
| [tscircuit/dsn-converter](https://github.com/tscircuit/dsn-converter) | Converts Specctra DSN files into Circuit JSON | DSN parsing, autorouter import/export compatibility | [![GitHub issues](https://img.shields.io/github/issues/tscircuit/dsn-converter)](https://github.com/tscircuit/dsn-converter/issues) |

## Choosing the Right Repo

| If you want to work on... | Start here |
| --- | --- |
| A broken or missing React element | [tscircuit/core](https://github.com/tscircuit/core) or [tscircuit/props](https://github.com/tscircuit/props) |
| Schematic or PCB SVG output | [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg) |
| The online editor or package pages | [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com) |
| Local commands like `tsci dev`, `tsci build`, or `tsci export` | [tscircuit/cli](https://github.com/tscircuit/cli) |
| Embedded previews inside docs or external sites | [tscircuit/runframe](https://github.com/tscircuit/runframe) |
| PCB rendering or interaction | [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer) |
| 3D rendering or model loading | [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer) |
| Autorouting experiments and route debugging | [tscircuit/autorouting.com](https://github.com/tscircuit/autorouting.com) |
| Footprints and symbols | [tscircuit/footprinter](https://github.com/tscircuit/footprinter) or [tscircuit/schematic-symbols](https://github.com/tscircuit/schematic-symbols) |
| Importing parts from EasyEDA, JLCPCB, or KiCad | [tscircuit/easyeda-converter](https://github.com/tscircuit/easyeda-converter) or [tscircuit/kicad-converter](https://github.com/tscircuit/kicad-converter) |
