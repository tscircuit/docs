# Assembly preview data

These Circuit JSON files are generated from the `code` props in the assembly
reference pages and mounting guide. `CircuitPreview` displays the original code
and renders this data while downstream evaluator and renderer releases catch up with the
assembly API. The editor link still opens the original source.

After editing any example, regenerate with a core checkout that supports
`modelUrl` on assembly elements and has its dependencies installed:

```sh
bun scripts/generate-assembly-previews.ts /path/to/tscircuit/core
bunx biome format --write src/data/assembly-previews
```

Demo models live in `static/models/assembly`. Their URLs are pinned to a committed
asset revision so previews and editor links work before the docs PR is deployed.
If models change, commit and push the assets, update the URLs in the examples,
and regenerate this data. Never edit the JSON independently of its example.

The printed-part page also sets `threeDImageUrl` to a checked-in PNG. The same
command renders it from the page's first example using `circuit-json-to-gltf`
and `poppygl` from the core checkout. Its lower camera angle exposes the spacer's
posts and center opening beneath the board. Keep the PNG and JSON in sync with
the TSX example.

The Advanced Assembly guide uses shared, complete file maps in
`src/data/advanced-assembly/examples.ts`. Regenerate both of its Circuit JSON
previews and camera-framed PNGs with a core checkout containing motor face
mounting (0.0.2085 or later):

```sh
bun scripts/generate-advanced-assembly-previews.ts /path/to/tscircuit/core
bunx biome format --write src/data/assembly-previews/advanced-assembly-*.json
```

Both CircuitPreview editor links receive the same file maps used by this script.

Cable examples require core 0.0.2088 or later and the published
`circuit-json-to-gltf` 0.0.144 or later. The regeneration script accepts page
paths after the core checkout to update only edited examples:

```sh
bun scripts/generate-assembly-previews.ts /path/to/tscircuit/core \
  elements/assembly-cable.mdx elements/assembly-motor.mdx \
  elements/assembly-printedpart.mdx
```

Each example's `threeDImageUrl` is rendered from its own Circuit JSON.

Cable PNGs use PoppyGL 0.0.32 or later for realistic lighting. The core
checkout used for regeneration must resolve that renderer version.
