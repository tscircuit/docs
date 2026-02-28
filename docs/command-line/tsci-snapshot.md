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
- `--disable-parts-engine` – disable the parts engine while rendering snapshots.

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

If `--3d` is specified, a `-3d.snap.svg` is also produced.

Running without `--update` verifies that the generated output matches the existing snapshots. Differences cause a non-zero exit code.
