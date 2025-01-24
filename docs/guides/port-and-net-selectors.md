---
title: Port and Net Selectors
---

Selectors are a string used to reference a port, net or any component. They're most
commonly used in traces like this:

```tsx
<trace from=".R1 > .pin1" to=".C1 > .pos" />
```

However they can also be used anywhere where a port is referenced, for example to indicate what a capacitor should decouple or a resistor should pullup to:

```tsx
<resistor pullupFor=".U1 > .GPIO1" pullupTo="net.VCC" />

<capactor decouplingFor=".U1 .VCC" decouplingTo="net.GND" />
```

Selectors use the same semantics as CSS selectors:

- `>` means "direct child"
- `.` means "name" (in CSS, this can be any class name, but in tscircuit components are limited to a single name)
- `.U1` means "something with the name `U1`"
- `net.GND` means "a net with the name `GND`"

## Selectors don't cross subcircuit boundaries unless told to

When a selector is specified, it's resolved relative to the
subcircuit of the component where it's specified.

This means within a subcircuit the selector `.U1` will match any component with the name `U1` anywhere in that subcircuit without going into other subcircuits.

Subcircuits can be nested and have names, so you can use this
to reference components in nested subcircuits:

```tsx
<subcircuit>
  <subcircuit name="S1">
    <resistor name="R1" />
  </subcircuit>
  <capacitor name="C1" />

  {/* We must include ".S1" in the selector to select the resistor from the inner subcircuit */}
  <trace from=".S1 .R1 .pin1" to=".C1 .pos" />
</subcircuit>
```

Because subcircuits are isolated from each other, you can
re-use reference designators in different subcircuits (globally
unique reference designators are generated on export)
