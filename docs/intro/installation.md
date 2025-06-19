---
title: Installation
sidebar_position: 2
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

CLI for developing tscircuit snippets

# Options:
#   -V, --version            output the version number
#   -h, --help               display help for command

# Commands:
#   init                     Initialize a new TSCircuit project in the current directory
#   dev [options] [file]     Start development server for a snippet
#   clone <snippet>          Clone a snippet from the registry
#   auth                     Login/logout
#   login                    Login to tscircuit registry
#   config                   Manage tscircuit CLI configuration
#   export [options] <file>  Export tscircuit code to various formats
#   help [command]           display help for command
```

You can also run `tsci` without any arguments to start the interactive CLI.

```bash
tsci

# ? Choose command ›
# ❯   tsci init - Initialize a new TSCircuit project in the current directory
#     tsci dev - Start development server for a snippet
#     tsci clone - Clone a snippet from the registry
#     tsci auth - Login/logout
#     tsci login - Login to tscircuit registry
#     tsci config - Manage tscircuit CLI configuration
#     tsci export - Export tscircuit code to various formats
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
- [Understanding essential tscircuit elements](../guides/essential-elements.mdx)
- [What are electronics made of?](../building-electronics/what-are-electronics-made-of.mdx)
