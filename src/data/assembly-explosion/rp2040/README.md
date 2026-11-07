# RP2040 assembly preview

Copied from the TSX-generated [3d-viewer fixture](https://github.com/tscircuit/3d-viewer/tree/main/stories/fixtures/rp2040-motor-assembly). The original circuit JSON is unchanged; `generation.json` records its SHA-256 and pinned renderer/exporter versions. See that fixture for the complete assembly TSX and reproduction script. The PCB is our RP2040 motor-controller design, published as [imrishabh18/rp2040-motor-controller](https://tscircuit.com/imrishabh18/rp2040-motor-controller).

To update, regenerate in 3d-viewer using its documented pinned board environment, then copy `assembled.circuit.json` and `generation.json` together. Do not re-route the board or remove its copper guards for a docs image.

The embedded `static/videos/rp2040-explosion.mp4` is copied byte-for-byte from the [CLI's committed video test artifact](https://github.com/tscircuit/cli/blob/88e59a419e1f3564672bf28d96182771b2d770d2/tests/cli/export/__snapshots__/rp2040-explosion.mp4). Regenerate it in the CLI repository with `BUN_UPDATE_SNAPSHOTS=1 bun test tests/cli/export/export-explosion-mp4.test.ts`, review the video and stage snapshots, then copy the MP4 here.
