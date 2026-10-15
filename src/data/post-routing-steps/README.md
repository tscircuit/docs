# Post-routing step preview data

`docs/advanced/post-routing-steps.mdx` shows six examples of `<pcbpostroutingstep />`. Their file maps live in
`examples.ts`. Each `*.json` here is the Circuit JSON one of them renders, and
`static/img/post-routing-steps/*-3d.png` is its 3D view. `CircuitPreview` shows the code and renders this data until
the hosted evaluator includes the element.

Regenerate after editing an example, with a core checkout that has `<pcbpostroutingstep />` and its dependencies
installed:

```sh
bun scripts/generate-post-routing-step-previews.ts /path/to/tscircuit/core
```

The script formats the JSON and prints each example's error count: the DRC example should report 2 errors, the others
0. Never edit the JSON independently of its example.
