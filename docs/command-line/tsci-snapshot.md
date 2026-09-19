---
title: tsci snapshot
description: Generate schematic and PCB snapshots for regression tests
---

`tsci snapshot` renders your boards to SVG images and compares them with saved snapshots.

## Usage

```bash
tsci snapshot [options] [path]
```

### Options
- `-u, --update` – write new snapshots to disk.
- `--force-update` – force writing snapshots even when no visual diff is detected.
- `--3d` – also generate 3D preview snapshots.
- `--pcb-only` – generate only PCB snapshots.
- `--schematic-only` – generate only schematic snapshots.
- `--simulation-only` – generate only simulation snapshots.
- `--layer <layer>` – generate a PCB snapshot for `top` or `bottom`; during X-Ray, choose the frontmost layer.
- `--x-ray-net <name-or-id>` – X-Ray a connected PCB net (repeatable); implies `--pcb-only`.
- `--hidden-layer-opacity <opacity>` – opacity of other copper during X-Ray, from `0` to `1` (default: `0.2`).
- `--disable-parts-engine` – disable the parts engine while rendering snapshots.
- `--show-courtyards` – show courtyard outlines in PCB snapshots.
- `--camera-preset <preset>` – choose the camera angle preset for 3D snapshots. This also implies `--3d`.
- `--ci` – enable CI mode and generate diff artifacts.
- `--test` – enable test mode and generate diff artifacts.
- `--concurrency <number>` – number of files to snapshot in parallel (default: `1`).

### Arguments
- `[path]` – optional file path, directory, or glob pattern used to limit what gets snapshotted.

### Which files are snapped?
The command searches the current project for:
- the detected entrypoint (using the same logic as `tsci build`)
- any files matching `*.board.tsx` or `*.circuit.tsx`

This pattern allows standalone board files (ending in `.circuit.tsx`) to be tested alongside your main project.

### Snapshot location
Snapshots are stored next to each source file in a `__snapshots__` directory. For a file `test.board.tsx` you will see:

```
__snapshots__/test.board-pcb.snap.svg
__snapshots__/test.board-schematic.snap.svg
```

If `--3d` is specified, a `-3d.snap.png` is also produced.

Running without `--update` verifies that the generated output matches the existing snapshots. Differences cause a non-zero exit code.

## X-Ray snapshots

Use the same [net selectors and rendering options as PCB exports](./tsci-export.md#x-ray-pcb-nets):

```bash
# Save an X-Ray snapshot of one net
tsci snapshot board.circuit.tsx --x-ray-net GND --hidden-layer-opacity 0.2 --update

# Save two selected nets, with bottom copper drawn in front
tsci snapshot board.circuit.tsx --x-ray-net GND --x-ray-net VCC --layer bottom --update

# Compare against the saved two-net snapshot
tsci snapshot board.circuit.tsx --x-ray-net GND --x-ray-net VCC --layer bottom --test
```

`--x-ray-net` implies PCB-only output and cannot be combined with
`--schematic-only`, `--simulation-only`, `--3d`, or `--camera-preset`.
Selected copper and its drills remain opaque across layers; other copper defaults
to 20% opacity and non-copper layers are hidden.

X-Ray snapshots use a separate suffix so they do not replace ordinary PCB images:

- `board.circuit-pcb-xray.snap.svg` without `--layer`
- `board.circuit-top-xray.snap.svg` with `--layer top`
- `board.circuit-bottom-xray.snap.svg` with `--layer bottom`

These files are stored in the source file's `__snapshots__` directory. Net names
are not part of the filename: changing the selected nets reuses the same X-Ray
snapshot path. Use the same selectors and options when comparing to a baseline.
