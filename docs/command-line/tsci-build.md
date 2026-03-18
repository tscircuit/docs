---
title: tsci build
description: Generate circuit JSON from your source files
---

`tsci build` runs the TSCircuit evaluator and writes `circuit.json` files.

## Usage

```bash
tsci build [file] [options]
```

### Arguments
- `file` *(optional)* – path to a source file or directory. If omitted, the command searches for a project entrypoint such as `index.tsx` or the `mainEntrypoint` defined in `tscircuit.config.json`. In addition, all files matching the `*.circuit.tsx` pattern are built automatically.

### Output
Output files are placed in a `dist/` directory relative to your project. Each successful build writes to its own output directory:

- `dist/<outputDir>/circuit.json`
- `dist/<outputDir>/pcb.svg`
- `dist/<outputDir>/schematic.svg`
- `dist/<outputDir>/3d.png`

For example, `src/blink.circuit.tsx` becomes `dist/src/blink/circuit.json`.

### Options

#### Error Handling
- `--ignore-errors` – do not exit with code `1` on evaluation errors.
- `--ignore-warnings` – suppress warning messages.
- `--ignore-netlist-drc` – ignore netlist DRC errors and warnings.
- `--ignore-pin-specification-drc` – ignore pin-specification DRC errors and warnings.
- `--ignore-placement-drc` – ignore placement DRC errors and warnings.
- `--ignore-routing-drc` – ignore routing DRC errors and warnings.
- `--ignore-config` – ignore options from `tscircuit.config.json`.

#### Build Control
- `--ci` – run install and optional prebuild/build commands (or default CI build).
- `--disable-pcb` – disable PCB outputs.
- `--disable-parts-engine` – disable the parts engine.
- `--concurrency <number>` – number of files to build in parallel (default: 1).

#### Output Formats

##### Images & 3D Models
- `--preview-images` – generate images for one selected build output.
- `--all-images` – generate images for every successful build output.
- `--pngs` – Generate PNG outputs during build generation`.
- `--svgs` – generate both `pcb.svg` and `schematic.svg`.
- `--pcb-svgs` – generate only `pcb.svg`.
- `--schematic-svgs` – generate only `schematic.svg`.
- `--3d` – include `3d.png` while keeping the default SVG behavior.
- `--pcb-only` – generate only `pcb.svg` from the selected SVG outputs.
- `--schematic-only` – generate only `schematic.svg` from the selected SVG outputs.
- `--preview-gltf` – generate a GLTF file from the preview entrypoint.
- `--glbs` – generate GLB 3D model files for every successful build output.

##### KiCad Export
- `--kicad-project` – generate KiCad project directories (`.kicad_sch`, `.kicad_pcb`, `.kicad_pro`) for each successful build output.
- `--kicad-library` – generate KiCad symbol/footprint library in `dist/kicad-library`.
- `--kicad-library-name <name>` – specify the name of the KiCad library.
- `--kicad-pcm` – generate KiCad PCM (Plugin and Content Manager) assets in `dist/pcm`.

##### Diagnostics
- `--profile` – log per-circuit `circuit.json` generation time during build.

##### Library & Site Generation
- `--transpile` – transpile the entry file to JavaScript for use as a library.
- `--site` – generate a static site in the dist directory.
- `--use-cdn-javascript` – use CDN-hosted JavaScript instead of bundled standalone file for `--site`.

### Targeting specific sources
- `tsci build path/to/file.circuit.tsx` – builds the given file, even if it does not match the `includeBoardFiles` glob in `tscircuit.config.json`.
- `tsci build path/to/directory` – scans only the files inside `path/to/directory` that both satisfy the `includeBoardFiles` glob and reside within the directory. Files outside the directory or filtered out by the glob are skipped.

Use this command before publishing or in CI to ensure your circuits evaluate correctly.

## Image generation behavior

`--preview-images` and `--all-images` choose which build outputs receive images:

- `--preview-images` writes image files for one selected build.
- `--all-images` writes image files for every successful build.

The image selection flags choose which files are written for each selected build:

- If you do not pass any image selection flags, the default image set is `pcb.svg`, `schematic.svg`, and `3d.png`.
- If you pass any image selection flags, those flags explicitly control which files are written.
- `--pcb-only` and `--schematic-only` filter SVG outputs.
- `--3d` can be combined with the newer flags and adds `3d.png`.
- Use the image selection flags with either `--preview-images` or `--all-images`.

Preview target selection uses this precedence:

1. `previewComponentPath`
2. `mainEntrypoint`
3. The first successful build

## Output Directory Structure

When using various build options, the output structure looks like:

```text
dist/
├── my-circuit/
│   ├── circuit.json          # Always generated for that build output
│   ├── pcb.svg               # With --preview-images/--all-images, --svgs, --pcb-svgs, etc.
│   ├── schematic.svg         # With --preview-images/--all-images, --svgs, --schematic-svgs, etc
│   ├── 3d.png                # With --preview-images/--all-images, --pngs, or --3d
│   ├── 3d.glb                # With --glbs
│   └── kicad/
│       ├── my-circuit.kicad_sch   # With --kicad-project
│       ├── my-circuit.kicad_pcb   # With --kicad-project
│       └── my-circuit.kicad_pro   # With --kicad-project
├── my-circuit.gltf           # With --preview-gltf (preview entrypoint only)
├── kicad-library/            # With --kicad-library
├── pcm/                      # With --kicad-pcm
├── index.html                # With --site
├── standalone.min.js         # With --site (unless --use-cdn-javascript)
├── index.js                  # With --transpile
├── index.cjs                 # With --transpile
└── index.d.ts                # With --transpile
```

## Transpiling circuit entrypoints

Pass the `--transpile` flag when you want your codebase to be a reusable module that can be imported into other projects. Your "entrypoint", usually `lib/index.tsx` will be the source for the bundle. Export any circuits you'd like out of that file

- `dist/<entry>/index.js` – an ESM bundle
- `dist/<entry>.cjs` – a CommonJS bundle
- `dist/<entry>.d.ts` – generated type declarations that reflect the JSX surface of your entry file

### Example project

Spin up a scratch directory with `tsci init` to reproduce the transpile flow locally:

```bash
mkdir tsci-transpile-demo
cd tsci-transpile-demo
tsci init
```

Replace the generated `index.tsx` with a tiny RC circuit:

```tsx title="index.tsx"
import React from "react"

export default () => (
  <board>
    <resistor resistance="1k" footprint="0402" name="R1" schX={3} pcbX={3} />
    <capacitor
      capacitance="1000pF"
      footprint="0402"
      name="C1"
      schX={-3}
      pcbX={-3}
    />
    <trace from=".R1 > .pin1" to=".C1 > .pin1" />
  </board>
)
```

Then run the transpile build:

```bash
tsci build --transpile
```

The build writes `dist/index/circuit.json` as usual, then finishes by bundling the entrypoint and printing the paths to the emitted ESM, CJS, and type declaration artifacts.


```text
dist
├── index
│   └── circuit.json
├── index.cjs
├── index.d.ts
└── index.js

2 directories, 4 files
```
