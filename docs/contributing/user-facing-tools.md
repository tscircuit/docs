---
title: User-Facing Tools
sidebar_position: 3
description: A quick map of the tscircuit tools people use to create, preview, route, and share circuit boards.
---

tscircuit includes several user-facing tools. Use this page to pick the right
tool for your workflow or to find the repository behind a tool you want to
contribute to.

| Tool | What it is for | Links |
| --- | --- | --- |
| Online editor | Build boards and modules in a browser with live PCB, schematic, and 3D previews. | [Open editor](https://tscircuit.com/editor) · [Quickstart web](../intro/quickstart-web.md) · [Repo](https://github.com/tscircuit/tscircuit.com) |
| CLI (`tsci`) | Create projects, run a local dev server, build circuits, export fabrication files, and publish packages from the command line. | [Install guide](../intro/installation.md) · [Command reference](../command-line/tsci-build.md) · [Repo](https://github.com/tscircuit/cli) |
| Registry | Search and reuse public packages, boards, modules, footprints, and snippets. | [tscircuit.com/search](https://tscircuit.com/search) · [Registry API](../web-apis/the-registry-api.md) |
| RunFrame | Embed runnable tscircuit examples in websites or docs. | [Display Circuit JSON guide](../guides/running-tscircuit/displaying-circuit-json-on-a-webpage.mdx) · [Iframe guide](../guides/running-tscircuit/running-tscircuit-inside-an-iframe.mdx) · [Repo](https://github.com/tscircuit/runframe) |
| PCB Viewer | Render and inspect PCB layouts, including measurement and manual-edit workflows. | [Manual edits guide](../guides/tscircuit-essentials/manual-edits.mdx) · [Repo](https://github.com/tscircuit/pcb-viewer) |
| 3D Viewer | Render 3D circuit previews and CAD models. | [Repo](https://github.com/tscircuit/3d-viewer) |
| autorouting.com | Run hosted autorouting workflows for tscircuit boards. | [autorouting.com](https://autorouting.com) · [Platform configuration](../guides/running-tscircuit/platform-configuration.md) |
| Converters | Convert external PCB/CAD formats into tscircuit data, including KiCad, EasyEDA/JLCPCB, DSN, Circuit JSON, SVG, GLTF, and STEP workflows. | [Overview of projects](./overview-of-projects.md) · [DSN converter](https://github.com/tscircuit/dsn-converter) · [KiCad converter](https://github.com/tscircuit/kicad-component-converter) |
| Datasheet SDK | Create and look up chip datasheets from applications and scripts. | [Datasheet SDK](../web-apis/datasheet-sdk.md) |

## How the tools fit together

- Start in the [online editor](https://tscircuit.com/editor) when you want the
  fastest way to write and preview a circuit.
- Use the [CLI](https://github.com/tscircuit/cli) when you want a local project,
  version control, or fabrication exports.
- Use the registry and converters when you need existing packages, footprints, or
  external design data.
- Use RunFrame, PCB Viewer, and 3D Viewer when you want to embed or inspect
  generated Circuit JSON in another application.
- Use autorouting.com when you want hosted routing instead of running autorouting
  locally.
