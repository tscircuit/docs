---
title: Installation
sidebar_position: 2
description: Install tscircuit CLI globally or per-project to start building electronic circuits with TypeScript.
---

## Dependencies

To use tscircuit, you'll need to have [npm](https://npmjs.com) or [bun](https://bun.sh) installed. We recommend using [bun](https://bun.sh) for its speed and ease of use.

## Installing tscircuit

To install tscircuit's command line tool, just run:

```bash
npm install -g tscircuit

# or

bun install --global tscircuit
```

This will install a `tsci` command globally!

:::info
If you're using [tscircuit online](https://tscircuit.com), you can skip installation. tscircuit is fully-featured and usable online!
:::

You can test it out by running `tsci --help`!

```bash
tsci --help

Usage: tsci [options] [command]

CLI for developing tscircuit packages

# Options:
#   -h, --help                   display help for command

# Commands:
#   init [options] [directory]   Initialize a new TSCircuit project
#   dev [options] [file]         Start development server for a package
#   clone [options] [package]    Clone a package from the registry
#   push [options] [file]        Save package code to Registry API
#   auth                         Login/logout
#   login                        Login to tscircuit registry
#   logout                       Logout from tscircuit registry
#   config                       Manage tscircuit CLI configuration
#   export [options] <file>      Export tscircuit code to various formats
#   build [options] [file]       Run tscircuit eval and output circuit json
#   transpile [file]             Transpile TypeScript/TSX to JavaScript
#   add <packageSpec>            Add a tscircuit component package
#   remove <component>           Remove a tscircuit component package
#   snapshot [options] [path]    Generate schematic/PCB snapshots
#   setup                        Setup utilities like GitHub Actions
#   install [packageSpec]        Install project dependencies or a package
#   upgrade                      Upgrade CLI to the latest version
#   doctor                       Run diagnostic checks
#   check                        Partially build and validate circuit artifacts
#   registry                     Manage tscircuit registry resources
#   search [options] <query...>  Search for footprints, CAD models, or packages
#   import [options] <query...>  Search/import components from JLCPCB or registry
#   convert [options] <file>     Convert .kicad_mod to a tscircuit component
#   simulate                     Run a simulation
#   version [options]            Print CLI version
#   help [command]               display help for command
```

You can also run `tsci` without any arguments to start the interactive CLI.

```bash
tsci

# ? Choose command ›
# ❯   tsci init - Initialize a new TSCircuit project in the current directory
#     tsci dev - Start development server for a package
#     tsci clone - Clone a package from the registry
#     tsci push - Save package code to Registry API
#     tsci auth - Login/logout
#     tsci login - Login to tscircuit registry
#     tsci logout - Logout from tscircuit registry
#     tsci config - Manage tscircuit CLI configuration
#     tsci export - Export tscircuit code to various formats
#     tsci build - Run tscircuit eval and output circuit json
#     tsci add - Add a tscircuit component package
#     tsci snapshot - Generate schematic and PCB snapshots
#     tsci doctor - Run diagnostic checks
#     tsci search - Search for footprints, CAD models or packages
```

### Creating a new project

The easiest way to create a template project is to use `tsci init` inside a project directory.

```bash
mkdir my-project

cd my-project

tsci init
```

This will bootstrap a fresh tscircuit project! Read more about
starting the development server and exporting files in our
[Quickstart CLI Guide](./quickstart-cli.md).

## Installing `tscircuit` per project

You can install `tscircuit` on a per-project basis by installing it as a dev dependency.

```bash
npm add -D tscircuit

# or

bun add -D tscircuit
```

## TypeScript Configuration

If TypeScript can't find the tscircuit types in your project, add the `types` field to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["tscircuit"]
  }
}
```

## Next Steps

Now that you've installed tscircuit, you can start developing your first electronic device!

- [Quickstart CLI Guide](./quickstart-cli.md)
- [Understanding essential tscircuit elements](../guides/tscircuit-essentials/essential-elements.mdx)
- [What are electronics made of?](../building-electronics/what-are-electronics-made-of.mdx)
