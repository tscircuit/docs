---
title: User-Facing Tools
sidebar_position: 3
description: Learn which tscircuit tools users interact with directly and where each tool fits in the design workflow.
---

tscircuit is made of several packages and applications, but most users only
need a small set of tools while designing, previewing, routing, importing, and
sharing circuit boards.

## Tool Map

| Tool                                                    | What users use it for                                                                                         | Where it fits                          |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| [tscircuit.com](https://tscircuit.com)                  | Writing circuits in the online editor, previewing boards, sharing snippets, and ordering prototypes           | The primary browser-based product      |
| [tsci CLI](https://github.com/tscircuit/cli)            | Creating local projects, running a local preview server, exporting fabrication files, and publishing packages | Local development and automation       |
| [RunFrame](https://github.com/tscircuit/runframe)       | Embedding runnable tscircuit examples inside documentation, apps, and playgrounds                             | Interactive previews inside React apps |
| [PCB Viewer](https://github.com/tscircuit/pcb-viewer)   | Displaying rendered PCB layers and inspecting board geometry                                                  | Board visualization                    |
| [3D Viewer](https://github.com/tscircuit/3d-viewer)     | Showing a 3D preview of assembled boards                                                                      | Mechanical and assembly review         |
| [Autorouting.com](https://autorouting.com)              | Routing traces automatically and experimenting with autorouting algorithms                                    | Routing assistance                     |
| [JLCPCB Search](https://jlcsearch.tscircuit.com)        | Finding JLCPCB parts and importing component data into a tscircuit project                                    | Component sourcing                     |
| [Footprinter](https://github.com/tscircuit/footprinter) | Generating footprint definitions from compact footprint strings                                               | Footprint authoring                    |
| [Converters](#converters)                               | Importing or exporting formats such as KiCad, EasyEDA, DSN, and Circuit JSON                                  | Moving designs between ecosystems      |

## Online Editor

The online editor at [tscircuit.com](https://tscircuit.com) is the fastest
place to try tscircuit. Users can edit TypeScript circuit code, preview the
schematic, PCB, and 3D assembly, then share the result as a snippet.

Use the online editor when you want to:

- Start a board without installing local tooling
- Share a minimal reproduction in an issue or discussion
- Import a template board or component and adjust it visually
- Download fabrication files for a prototype

## Command Line

The [`tsci`](https://github.com/tscircuit/cli) command line tool is the main
local workflow for tscircuit projects. It is useful when a board needs to live
in a repository, use multiple files, run in CI, or generate repeatable build
artifacts.

Common commands include:

| Command                     | Purpose                                             |
| --------------------------- | --------------------------------------------------- |
| `tsci init`                 | Create a new tscircuit project                      |
| `tsci dev`                  | Start a local development server with live previews |
| `tsci build`                | Build a project and generate artifacts              |
| `tsci export`               | Export fabrication files or other output formats    |
| `tsci push`                 | Publish a package or project                        |
| `tsci add` / `tsci install` | Add packages, GitHub libraries, or KiCad libraries  |

## Embeddable Viewers

tscircuit exposes viewer packages so other apps and docs can render circuit
outputs without rebuilding the whole editor.

| Package                                                       | Use it when                                                                  |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [runframe](https://github.com/tscircuit/runframe)             | You need an interactive code-and-preview frame, such as examples inside docs |
| [pcb-viewer](https://github.com/tscircuit/pcb-viewer)         | You only need to render PCB layers from Circuit JSON                         |
| [3d-viewer](https://github.com/tscircuit/3d-viewer)           | You need a 3D board or assembly preview                                      |
| [circuit-to-svg](https://github.com/tscircuit/circuit-to-svg) | You need SVG output for schematics, PCBs, or documentation assets            |

These tools are usually fed by
[Circuit JSON](https://github.com/tscircuit/circuit-json), the intermediate
format produced by tscircuit.

## Routing and Layout

[Autorouting.com](https://autorouting.com) and the tscircuit autorouting
packages help users route traces automatically. This is useful for quick
iterations, early board layout, and reproducing autorouter bugs.

When working on routing issues, include:

- A link to the tscircuit snippet or project
- The Circuit JSON or minimal circuit code
- Screenshots of the problematic route
- Any expected constraints, such as board size, layer count, or keep-out areas

## Parts and Footprints

tscircuit has several tools for turning real-world parts into usable circuit
components.

| Tool                                                                | Purpose                                                      |
| ------------------------------------------------------------------- | ------------------------------------------------------------ |
| [JLCPCB Search](https://jlcsearch.tscircuit.com)                    | Search JLCPCB components and use part data while designing   |
| [footprinter](https://github.com/tscircuit/footprinter)             | Generate footprints from concise footprint strings           |
| [props](https://github.com/tscircuit/props)                         | Defines the supported React component props across tscircuit |
| [schematic-symbols](https://github.com/tscircuit/schematic-symbols) | Provides symbols used in schematic rendering                 |

## Converters

Converters help users move designs and component data between tscircuit and
other electronics tools.

| Converter                                                                           | Purpose                                                            |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [kicad-component-converter](https://github.com/tscircuit/kicad-component-converter) | Convert KiCad component data for use in tscircuit                  |
| [easyeda-converter](https://github.com/tscircuit/easyeda-converter)                 | Convert EasyEDA and JLCPCB component data                          |
| [dsn-converter](https://github.com/tscircuit/dsn-converter)                         | Convert Specctra DSN files for routing and visualization workflows |
| [circuit-json](https://github.com/tscircuit/circuit-json)                           | Use the shared intermediate representation for rendered circuits   |

## Core Libraries

Most users do not import core libraries directly unless they are building tools
around tscircuit. Contributors should still know where the main pieces live:

| Repository                                                | Role                                                                 |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| [core](https://github.com/tscircuit/core)                 | Converts React component trees into Circuit JSON                     |
| [props](https://github.com/tscircuit/props)               | Defines component prop types and shared schemas                      |
| [circuit-json](https://github.com/tscircuit/circuit-json) | Defines the output format used by viewers, exporters, and converters |
| [math-utils](https://github.com/tscircuit/math-utils)     | Shared geometry and layout helpers                                   |

## Choosing the Right Tool

| Goal                               | Start with                                          |
| ---------------------------------- | --------------------------------------------------- |
| Try tscircuit for the first time   | [tscircuit.com](https://tscircuit.com)              |
| Build a real project locally       | `tsci init` and `tsci dev`                          |
| Share a bug reproduction           | A tscircuit snippet or a small GitHub repo          |
| Preview a board inside another app | RunFrame, PCB Viewer, or 3D Viewer                  |
| Import a part from JLCPCB          | JLCPCB Search or the EasyEDA converter              |
| Debug routing                      | Autorouting.com plus a minimal Circuit JSON example |
| Contribute to the ecosystem        | Start with the related repository in the tool map   |
