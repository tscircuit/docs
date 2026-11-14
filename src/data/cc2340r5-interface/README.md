# CC2340R5 standalone interface examples

Derived from [ShiboSoftwareDev/cc2340r5-reference-design 1.4.0](https://tscircuit.com/ShiboSoftwareDev/cc2340r5-reference-design/customize?package_release_id=bff7bbb1-c0df-4b3e-8cb2-5f5c706caa87),
using the fixture from [core PR #5445](https://github.com/tscircuit/core/pull/5445)
(commit `aa9041887ab2d0cfd76a7d9c55db58a119994a42`).

The 27 components and all 16 original named nets are preserved. Eight formerly
NC GPIO pins get named nets, giving 13 public signals including power, ground,
reset, and SWD. The example is a module adaptation of the published circuit,
not an assertion that the published package already exports these ports.

`files.json` holds the internal circuit and the original imported part definitions.
`examples.ts` supplies the three root components: selected exposed nets, explicit
ports, and the same explicit-port module nested in a board. PCB generation is
disabled because these examples document the schematic interface.

The CircuitPreview images in `static/img/elements/cc2340r5-interface` are real
`tsci build --schematic-svgs` output from `tscircuit@0.0.3187` (core 0.0.2376,
circuit-to-svg 0.0.460). Checked-in renders keep the documentation usable while
the hosted SVG service catches up. CircuitPreview includes the complete runnable
file map, not just an image or an incomplete wrapper.

To regenerate from the docs root:

```sh
bun -e 'import { exposedNetFiles, directPortFiles, nestedFiles } from "./src/data/cc2340r5-interface/examples"; for (const [name, files] of Object.entries({"exposed-nets": exposedNetFiles, "direct-ports": directPortFiles, nested: nestedFiles})) for (const [file, contents] of Object.entries(files)) await Bun.write(`codetestingplayground/cc2340r5-interface/${name}/${file === "index.tsx" ? "index.circuit.tsx" : file}`, contents)'
for example in exposed-nets direct-ports nested; do
  bunx --package tscircuit@0.0.3187 tsci build "codetestingplayground/cc2340r5-interface/$example/index.circuit.tsx" --disable-pcb --schematic-svgs
  cp "codetestingplayground/dist/cc2340r5-interface/$example/index/schematic.svg" "static/img/elements/cc2340r5-interface/$example.svg"
done
```

Validation: compare each output's electrical signature to core's
`module-electrical-signature.ts`; for the two standalone variants, traverse
same-net `schematic_trace.edges` from each boundary terminal to its physical MCU
pin (13 continuous wire paths). The nested variant has no boundary or boundary
terminals. Keep generated playground files out of the PR.
