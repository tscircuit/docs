---
title: Contributor Repository Map
description: Learn which tscircuit repository to contribute to based on the part of the ecosystem you want to improve.
sidebar_position: 4
---

tscircuit is split across many focused repositories. This map helps you decide
where to open an issue or pull request when you want to improve a specific part
of the ecosystem.

If you are new to tscircuit, start with
[Getting Started as a Contributor](./getting-started-as-a-contributor.md) first,
then use this page to choose the right repository for your change.

## Start Here

| Goal                                 | Best repository                                                               | Good first contribution type                                                    |
| ------------------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Add or fix a schematic symbol        | [tscircuit/schematic-symbols](https://github.com/tscircuit/schematic-symbols) | Add missing symbols, fix pin labels, improve tests                              |
| Add or fix a PCB footprint generator | [tscircuit/footprinter](https://github.com/tscircuit/footprinter)             | Add footprint strings, fix dimensions, add examples                             |
| Improve the local developer workflow | [tscircuit/cli](https://github.com/tscircuit/cli)                             | Fix command output, improve errors, add CLI options                             |
| Improve the website or online editor | [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com)         | Fix UI bugs, improve editor flows, polish onboarding                            |
| Fix circuit compilation behavior     | [tscircuit/core](https://github.com/tscircuit/core)                           | Add failing tests, fix generated Circuit JSON, improve React component behavior |
| Update component prop definitions    | [tscircuit/props](https://github.com/tscircuit/props)                         | Add prop types, clarify component APIs, improve validation                      |
| Improve generated SVG output         | [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg)       | Fix schematic or PCB SVG rendering, add visual fixtures                         |
| Improve the data format itself       | [tscircuit/circuit-json](https://github.com/tscircuit/circuit-json)           | Clarify schemas, add fields, improve type coverage                              |

## Core Circuit Model

Use these repositories when your change affects how circuits are represented,
compiled, or validated.

| Repository                                                          | Owns                                                               | Choose this repo when                                                                                                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| [tscircuit/core](https://github.com/tscircuit/core)                 | React-to-circuit compilation, component behavior, board generation | A circuit compiles incorrectly, a React component produces wrong output, or generated schematics/PCBs are structurally wrong |
| [tscircuit/props](https://github.com/tscircuit/props)               | Public prop definitions for tscircuit components                   | A component accepts the wrong props, a prop is missing, or API documentation generated from props is incomplete              |
| [tscircuit/circuit-json](https://github.com/tscircuit/circuit-json) | The shared data format used between tools                          | The schema needs a new field, a type is unclear, or multiple tools disagree about valid Circuit JSON                         |

Core changes usually need tests that show the exact input circuit and expected
Circuit JSON output. If you are unsure whether a bug belongs in `core` or
`circuit-json`, start from `core` when the problem appears while writing
tscircuit code.

## Symbols, Footprints, and Electronic Parts

Use these repositories when your change improves how real electronic parts are
described or rendered.

| Repository                                                                                    | Owns                                                  | Choose this repo when                                                                                    |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [tscircuit/schematic-symbols](https://github.com/tscircuit/schematic-symbols)                 | Reusable schematic symbols                            | A symbol is missing, visually wrong, mislabeled, or has incorrect pin order                              |
| [tscircuit/footprinter](https://github.com/tscircuit/footprinter)                             | Text-based footprint generation                       | A footprint string should generate pads differently, support a new package, or reject invalid dimensions |
| [tscircuit/easyeda-converter](https://github.com/tscircuit/easyeda-converter)                 | Converting EasyEDA/JLCPCB data into tscircuit formats | Imported JLCPCB or EasyEDA parts produce incorrect tscircuit output                                      |
| [tscircuit/kicad-component-converter](https://github.com/tscircuit/kicad-component-converter) | Converting KiCad components                           | KiCad symbols or footprints do not convert cleanly into tscircuit-compatible data                        |
| [tscircuit/jlcsearch](https://github.com/tscircuit/jlcsearch)                                 | Searching JLCPCB parts and metadata                   | Search results, part metadata, or JLCPCB integration behavior is wrong                                   |

These are often the best repositories for first contributions because fixes can
be verified with small visual fixtures and examples.

## Rendering and Viewers

Use these repositories when the underlying circuit data is correct, but the
preview or exported visual output is wrong.

| Repository                                                              | Owns                                     | Choose this repo when                                                                              |
| ----------------------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg) | SVG generation for schematics and PCBs   | Circuit JSON is correct, but the generated SVG is misplaced, missing labels, or visually incorrect |
| [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer)         | Interactive PCB viewing React components | A PCB preview interaction, layer display, zoom, or rendered board view is wrong                    |
| [tscircuit/3d-viewer](https://github.com/tscircuit/3d-viewer)           | 3D board previews                        | The 3D model, camera, rendering, or component placement in 3D is wrong                             |
| [tscircuit/runframe](https://github.com/tscircuit/runframe)             | Embedded runnable tscircuit previews     | A page or app needs to run and preview tscircuit code inside a React component                     |

For rendering bugs, include a minimal Circuit JSON fixture or tscircuit snippet
plus a screenshot of the expected and actual output.

## User-Facing Tools

Use these repositories when your change affects how users create, edit, preview,
or share circuits.

| Repository                                                            | Owns                                                                               | Choose this repo when                                                                     |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [tscircuit/cli](https://github.com/tscircuit/cli)                     | Local commands such as project creation, development server, and package workflows | A local command fails, output is confusing, or project setup needs improvement            |
| [tscircuit/tscircuit.com](https://github.com/tscircuit/tscircuit.com) | Main website, online editor, dashboard, and hosted user experience                 | A website flow, editor interaction, account page, or hosted circuit experience needs work |
| [tscircuit/runframe](https://github.com/tscircuit/runframe)           | Embeddable runtime preview frame                                                   | A docs page, website, or external app needs a live tscircuit preview                      |

If a bug appears both locally and on the website, check whether the same circuit
fails in the CLI. If it does, the root cause is often in `core`, `props`, or a
renderer. If it only fails on the website, start with `tscircuit.com`.

## Importers, Exporters, and Autorouting

Use these repositories when your change is about moving between tscircuit and
other electronics formats or tools.

| Repository                                                                                    | Owns                                                | Choose this repo when                                                                          |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [tscircuit/dsn-converter](https://github.com/tscircuit/dsn-converter)                         | DSN format conversion                               | DSN import or export output is wrong                                                           |
| [tscircuit/easyeda-converter](https://github.com/tscircuit/easyeda-converter)                 | EasyEDA and JLCPCB conversion                       | EasyEDA/JLCPCB source data converts incorrectly                                                |
| [tscircuit/kicad-component-converter](https://github.com/tscircuit/kicad-component-converter) | KiCad conversion                                    | KiCad component data does not map correctly into tscircuit                                     |
| [tscircuit/autorouting](https://github.com/tscircuit/autorouting)                             | Routing algorithms and route generation experiments | Traces are routed poorly, a routing fixture fails, or an autorouter behavior needs improvement |

Converter issues are easiest to review when the pull request includes the source
file, the current converted output, and the expected converted output.

## How to Choose the Right Repository

1. Reproduce the problem with the smallest possible circuit or input file.
2. Decide whether the issue is data, behavior, visual output, or user interface.
3. Use the tables above to pick the repository that owns that layer.
4. Search existing issues in that repository before opening a new one.
5. Include a minimal reproduction, screenshots when visual, and the expected
   behavior.

When in doubt, open the issue where the problem first becomes visible to users
and mention any lower-level repository you suspect. Maintainers can move the
discussion, but a clear reproduction makes the report useful immediately.
