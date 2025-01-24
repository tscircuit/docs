---
title: Programmatically Building Circuits
---

This guide is about using tscircuit inside of scripts, APIs or inside the browser. Maybe you want to create a website that allows your users drag'n'drop to create custom electronics and turn their designs into real circuits automatically.

For most users, there is no need to programmatically build circuits, you can use the [command line](../command-line/tsci-dev.md) or the [online editor](../intro/quickstart-web.md) to build and export your circuits into any supported format.

If you're not using Typescript or prefer a "zero-installation" setup, you can fully build your circuits with complex parameters using the [Registry API](../web-apis/the-registry-api.md)

## Using `@tscircuit/core` directly

`@tscircuit/core` is the core library for tscircuit, it converts React code into [Circuit JSON](https://github.com/tscircuit/circuit-json), a universally intermediary format that represents an electronic device.

Here's an example of how to use `@tscircuit/core` directly to build a circuit into Circuit JSON:

```tsx
import { RootCircuit } from "@tscircuit/core"

const circuit = new RootCircuit()

circuit.add(
  <board width="10mm" height="10mm">
    <resistor resistance="1k" footprint="0402" name="R1" schX={3} pcbX={3} />
    <capacitor
      capacitance="1000pF"
      footprint="0402"
      name="C1"
      schX={-3}
      pcbX={-3}
    />
    <trace from=".R1 > .pin1" to=".C1 > .pin1" />
  </board>
)

await circuit.renderUntilSettled()

console.log(circuit.getCircuitJson())
```

This will output a long [Circuit JSON](https://github.com/tscircuit/circuit-json) array that you can convert into many
other formats or display directly inside a [<CircuitJsonPreview />](./displaying-circuit-json-on-a-webpage.mdx) component.

## Evaluating Typescript Circuits
