# CC2340R5 standalone interface examples

Derived from [ShiboSoftwareDev/cc2340r5-reference-design 1.4.0](https://tscircuit.com/ShiboSoftwareDev/cc2340r5-reference-design/customize?package_release_id=bff7bbb1-c0df-4b3e-8cb2-5f5c706caa87),
using the fixture from [core PR #5445](https://github.com/tscircuit/core/pull/5445)
(commit `aa9041887ab2d0cfd76a7d9c55db58a119994a42`).

The 27 components and all 16 original named nets are preserved. Eight formerly
NC GPIO pins get named nets, giving 13 public signals including power, ground,
reset, and SWD. The example is a module adaptation of the published circuit,
not an assertion that the published package already exports these ports.

`files.json` holds the internal circuit and schematic part definitions, with
PCB footprints and 3D models omitted to keep live preview requests small.
`examples.ts` exports the standalone `exposedNets` example. CircuitPreview builds
its schematic from this file map through the hosted renderer. PCB generation is
disabled for this schematic example.
