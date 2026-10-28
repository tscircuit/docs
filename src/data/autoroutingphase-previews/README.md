# Autorouting phase preview data

`generate-test-points.json` is Circuit JSON generated from
`generateTestPointsCode` in `docs/elements/autoroutingphase.mdx`.
`CircuitPreview` renders it while the hosted evaluator catches up with
`addTestPoints` (core 0.0.2221). The editor link still opens the original code.

After editing the example, regenerate with a core checkout (0.0.2221 or later)
that has its dependencies installed:

```sh
bun scripts/generate-autoroutingphase-previews.tsx /path/to/tscircuit/core
```

Never edit the JSON independently of its example.
