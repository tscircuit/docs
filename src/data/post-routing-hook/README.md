# Post-routing hook preview data

`docs/advanced/post-routing-hook.mdx` shows four examples of `pcbPostRoutingHook`. Their file maps live in
`examples.ts`. Each `*.json` here is the Circuit JSON one of them renders, and `static/img/post-routing-hook/*-3d.png`
is its 3D view. `CircuitPreview` shows the code and renders this data until the hosted evaluator includes the hook.

Regenerate after editing an example, with a core checkout that has `pcbPostRoutingHook` and its dependencies
installed:

```sh
bun scripts/generate-post-routing-hook-previews.ts /path/to/tscircuit/core
bunx biome format --write src/data/post-routing-hook
```

The script prints each example's error count: the DRC example should report 2 errors, the others 0. Never edit the
JSON independently of its example.
