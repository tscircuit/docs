---
title: tsci transpile
description: Transpile TypeScript/TSX to JavaScript for distribution as a reusable library
---

`tsci transpile` converts your TypeScript/TSX circuit files into distributable JavaScript bundles (ESM, CommonJS, and type declarations). This is useful when you want to publish your circuit as a reusable module.

## Usage

```bash
tsci transpile [file]
```

### Arguments
- `file` *(optional)* – path to the entry file. If omitted, the command uses the detected entrypoint (same logic as `tsci build`).

## Output

The transpile command generates three files in the `dist/` directory:

| File | Format |
|------|--------|
| `index.js` | ESM bundle |
| `index.cjs` | CommonJS bundle |
| `index.d.ts` | TypeScript type declarations |

:::tip
`tsci transpile` is equivalent to running `tsci build --transpile` without the circuit JSON generation step. Use `tsci build --transpile` when you want both `circuit.json` and the transpiled output.
:::
