---
title: Standalone binary
description: Install the standalone tscircuit CLI and run a local circuit preview.
---

The standalone distribution packages the tscircuit CLI and JavaScript runtime in a binary. You do not need a separate Node.js or Bun installation. This is different from the [browser script-tag build](./running-tscircuit-standalone.mdx).

## Download and install

Install the latest published release from a terminal:

**macOS / Linux**

```sh
curl -fsSL https://raw.githubusercontent.com/tscircuit/tscircuit-standalone/main/scripts/install.sh | sh
```

**Windows (PowerShell)**

```powershell
curl.exe -fsSL https://raw.githubusercontent.com/tscircuit/tscircuit-standalone/main/scripts/install-windows.ps1 | Out-String | iex
```

Alternatively, download an installer or archive from the [standalone releases](https://github.com/tscircuit/tscircuit-standalone/releases):

- **macOS:** Download the `.pkg` for Apple Silicon (arm64) or Intel (x64), open it and follow the installer. Administrator approval is required. The installers are signed and notarized.
- **Windows x64:** Download `tscircuit-standalone-windows-x64-setup.exe` and run it. Open a new terminal after installation. Setup asks before taking precedence over an existing `tsci` command.
- **Linux x64 or arm64:** Download the matching `.tar.gz`, extract it and run `./tsci --version` from the extracted directory. Put `tsci` on your PATH if desired.

The [release instructions](https://github.com/tscircuit/tscircuit-standalone/blob/main/docs/releases.md) cover portable binaries, checksum verification, installation details and platform test coverage. Keep the accompanying license and notice files when redistributing the binary.

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
