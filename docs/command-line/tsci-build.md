---
title: tsci build
description: Generate circuit JSON from your source files
---

`tsci build` runs the TSCircuit evaluator and writes `circuit.json` files.

## Usage

```bash
tsci build [path] [--ignore-errors] [--ignore-warnings] [--all-images]
```

### Arguments
- `path` *(optional)* – path to a source file or directory. If omitted, the command searches for a project entrypoint such as `index.tsx` or the `mainEntrypoint` defined in `tscircuit.config.json`. In addition, all files matching the `*.circuit.tsx` pattern are built automatically.

### Output
Output files are placed in a `dist/` directory relative to your project. The main entrypoint produces `dist/circuit.json`. Each `*.circuit.tsx` file generates its own subdirectory. For example, `src/blink.circuit.tsx` becomes `dist/src/blink/circuit.json`.

### Options
- `--ignore-errors` – do not exit with code `1` on evaluation errors.
- `--ignore-warnings` – suppress warning messages.
- `--all-images` – emit every renderable image (PCB, schematic, 3D preview) for each built circuit into the matching `dist` subdirectory.

### Targeting specific sources
- `tsci build path/to/file.circuit.tsx` – builds the given file, even if it does not match the `includeBoardFiles` glob in `tscircuit.config.json`.
- `tsci build path/to/directory` – scans only the files inside `path/to/directory` that both satisfy the `includeBoardFiles` glob and reside within the directory. Files outside the directory or filtered out by the glob are skipped.

Use this command before publishing or in CI to ensure your circuits evaluate correctly.
