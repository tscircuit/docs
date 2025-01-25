---
title: tscircuit Units
---

In tscircuit you can specify a unit explicitly with a string e.g. "0.1mm", but
you can also also specify numbers without units and the unit will be inferred
from [platform](../guides/platform-configuration.md), [board configuration](../elements/board.mdx), [subcircuit configuration](../elements/subcircuit.mdx)
or the defaults below

## Default Units

By default, tscircuit uses the following base units:

| Measurement Type | Base Unit | Description  |
| ---------------- | --------- | ------------ |
| Length           | mm        | Millimeters  |
| Time             | ms        | Milliseconds |
| Mass             | g         | Grams        |
| Angle            | deg       | Degrees      |
| Frequency        | Hz        | Hertz        |
| Volume           | ml        | Milliliters  |
| Voltage          | V         | Volts        |
| Current          | A         | Amperes      |
| Resistance       | Ω         | Ohms         |
| Capacitance      | F         | Farads       |
| Inductance       | H         | Henries      |

Base units are chosen based on the industry convention.
