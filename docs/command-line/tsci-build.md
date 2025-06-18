---
title: tsci build
description: Generate circuit JSON from your source files
---

`tsci build` runs the TSCircuit evaluator and writes `circuit.json` files.

## Usage

```bash
tsci build [file] [--ignore-errors] [--ignore-warnings]
```

### Arguments
- `file` *(optional)* – path to a `.tsx` file to build. If omitted, the command searches for a project entrypoint such as `index.tsx` or the `mainEntrypoint` defined in `tscircuit.config.json`. In addition, all files matching the `*.circuit.tsx` pattern are built automatically.

### Output
Output files are placed in a `dist/` directory relative to your project. The main entrypoint produces `dist/circuit.json`. Each `*.circuit.tsx` file generates its own subdirectory. For example, `src/blink.circuit.tsx` becomes `dist/src/blink/circuit.json`.

### Options
- `--ignore-errors` – do not exit with code `1` on evaluation errors.
- `--ignore-warnings` – suppress warning messages.

Use this command before publishing or in CI to ensure your circuits evaluate correctly.
