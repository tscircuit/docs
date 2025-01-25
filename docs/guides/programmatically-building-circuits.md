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
other formats or display directly inside a [CircuitJsonPreview](./displaying-circuit-json-on-a-webpage.mdx) component.

## Evaluating Typescript Circuits

`@tscircuit/eval` can be used to evaluate Typescript/React code and
automatically import modules from the tscircuit registry.

```tsx
import { CircuitRunner } from "@tscircuit/eval"

const circuitRunner = new CircuitRunner()

await circuitRunner.execute(`
import { RedLed } from "@tsci/seveibar.red-led"

circuit.add(
  <board width="10mm" height="10mm">
    <RedLed name="LED1" />
  </board>
)`)

await circuitRunner.renderUntilSettled()

const circuitJson = await circuitRunner.getCircuitJson()

// Display or convert the circuit json to any other format!
```

### Evaluating tscircuit inside a web worker

```tsx
import { createCircuitWebWorker } from "@tscircuit/eval/webworker"

const circuitWebWorker = createCircuitWebWorker()

await circuitWebWorker.execute(`
import { RedLed } from "@tsci/seveibar.red-led"

circuit.add(
  <board width="10mm" height="10mm">
    <RedLed />
  </board>
)
`)

await circuitWebWorker.renderUntilSettled()

const circuitJson = await circuitWebWorker.getCircuitJson()
```

## Converting Circuit JSON to other formats

You can convert [Circuit JSON](https://github.com/tscircuit/circuit-json) to many
other formats:

- [Gerber files](https://github.com/tscircuit/circuit-json-to-gerber)
- [Specctra DSN Autorouting files](https://github.com/tscircuit/dsn-converter)
- [Pick'n'Place Files](https://github.com/tscircuit/circuit-json-to-pnp)
- [PCB and Schematic SVGs](https://github.com/tscircuit/circuit-to-svg)
- [Bill of Materials](https://github.com/tscircuit/circuit-json-to-bom)
- [SPICE netlists and simulations](https://github.com/tscircuit/circuit-json-to-spice)
