---
title: Install tscircuit standalone
sidebar_label: Standalone CLI
description: Install the standalone tscircuit CLI and run a local circuit preview.
---

[`tscircuit-standalone`](https://github.com/tscircuit/tscircuit-standalone) bundles the tscircuit CLI and runtime. No Node.js or Bun installation is required. For the browser bundle, see the [script-tag guide](./running-tscircuit-standalone.mdx).

## Download and install

These commands install the newest published release, including development prereleases.

**macOS / Linux**

```sh
curl -fsSL https://raw.githubusercontent.com/tscircuit/tscircuit-standalone/main/scripts/install.sh | sh
```

Supports macOS Apple Silicon/Intel and Linux x64/arm64. Installs `tsci` in `/usr/local/bin` and may request administrator approval. Linux requires `curl`, `tar`, `sha256sum` (or `shasum`), and either `jq` or Python 3.

The Linux installer refuses to replace an unrelated `tsci` installation.

**Windows (PowerShell)**

```powershell
curl.exe -fsSL https://raw.githubusercontent.com/tscircuit/tscircuit-standalone/main/scripts/install-windows.ps1 | Out-String | iex
```

Supports Windows x64. Follow the setup wizard; no administrator access is needed. Setup asks before taking precedence over an existing command.

Alternatively, download an installer or archive from the [standalone releases](https://github.com/tscircuit/tscircuit-standalone/releases):

- **macOS:** Open the `.pkg` for Apple Silicon (arm64) or Intel (x64).
- **Windows:** Run `tscircuit-standalone-windows-x64-setup.exe`.
- **Linux:** Extract the matching x64 or arm64 `.tar.gz` and run `./tsci --version`.

See the [release instructions](https://github.com/tscircuit/tscircuit-standalone/blob/main/docs/releases.md) for portable installation and checksum verification.

## Verify installation

Open a new terminal and check the installed version:

```sh
tsci --version
```

For a portable Linux archive, use `./tsci` instead of `tsci` in the commands below unless it is on your PATH.

## Preview a local circuit

Save the following as `board.circuit.tsx` in a project directory:

```tsx
export default () => <board width="10mm" height="10mm" />
```

Start the local editor:

```sh
tsci dev board.circuit.tsx
```

Open the URL printed by `tsci dev` in a browser. Stop the server with Ctrl+C. Use `tsci --help` and `tsci dev --help` for available commands and options.
