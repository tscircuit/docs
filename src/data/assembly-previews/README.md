# Assembly preview data

These Circuit JSON files are generated from the `code` props in the assembly
reference pages and mounting guide. `CircuitPreview` displays the original code
and renders this data because the hosted SVG service's evaluator predates the
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
