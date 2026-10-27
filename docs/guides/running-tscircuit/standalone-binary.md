---
title: Standalone binary
description: Install the standalone tscircuit CLI and run a local circuit preview.
---

The standalone distribution packages the tscircuit CLI and JavaScript runtime in a binary. You do not need a separate Node.js or Bun installation. This is different from the [browser script-tag build](./running-tscircuit-standalone.mdx).

## Download and install

Open the [standalone releases](https://github.com/tscircuit/tscircuit-standalone/releases) and select a published release for your machine. Current daily and manual releases are development prereleases. For a repeatable demo, use the same release on every machine and retain the downloaded installer or archive.

- **macOS:** Download the `.pkg` for Apple Silicon (arm64) or Intel (x64), open it and follow the installer. Administrator approval is required. The installers are signed and notarized.
- **Windows x64:** Download `tscircuit-standalone-windows-x64-setup.exe` and run it. Open a new terminal after installation. Setup asks before taking precedence over an existing `tsci` command.
- **Linux x64 or arm64:** Download the matching `.tar.gz`, extract it and run `./tsci --version` from the extracted directory. Put `tsci` on your PATH if desired.

The [release instructions](https://github.com/tscircuit/tscircuit-standalone/blob/main/docs/releases.md) cover portable binaries, checksum verification, installation details and platform test coverage. Keep the accompanying license and notice files when redistributing the binary. Downloading releases requires network access; transfer the selected files to an isolated machine before installation.

Open a new terminal and check the installed version:

```sh
tsci --version
```

For a portable Linux archive, use `./tsci` instead of `tsci` in the commands below unless it is on your PATH.

## Build and preview a local circuit

Save the following as `board.circuit.tsx` in a project directory:

```tsx
export default () => <board width="10mm" height="10mm" />
```

Run the build and start the local editor:

```sh
tsci build board.circuit.tsx
tsci dev board.circuit.tsx
```

Open the URL printed by `tsci dev` in a browser. Stop the server with Ctrl+C. Use `tsci --help` and `tsci dev --help` for available commands and options.

## Offline use and limitations

The binary embeds the JavaScript assets used by the local viewer. `tsci dev` serves them locally, and `tsci build --site` copies them into the generated site. This does **not** make every CLI command or viewer feature offline: remote parts, routing, browser resources, registry operations and other services may require network access. The `tsci import` command can search remote services; do not assume a part is available offline. Use local project files and assets, and test the exact circuit and operations with networking disabled before relying on an isolated environment.

macOS portable binaries may need internet for their first notarization check; the `.pkg` installer has a stapled ticket. See the [standalone README](https://github.com/tscircuit/tscircuit-standalone#readme) for the current distribution and its limitations.
