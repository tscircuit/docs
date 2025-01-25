---
title: What are electronics made of?
sidebar_position: 1
---

## Overview

In this tutorial, we're going to be talking about the different elements that
make up a Printed Circuit Board (PCB). For each element, we'll show different
ways that the element can be represented in tscircuit.

## What is copper? Why are PCBs green?

Copper is a conductive material that's used on a PCB to make an electrical
connection between chips. A PCB is mostly made up of fiberglass with a small
layer of precisely etched copper. The fiberglass is non-conductive and often
coated with non-conductive green "soldermask" to cover parts of the copper that
aren't meant to be connected to chips.

<figure style={{ textAlign: "center" }}>
<img style={{ width: 400, height: 240, objectFit: "cover" }} src="/img/ai-pcb-1.webp" alt="AI Generated PCB Image" />
<figcaption>An AI-generated PCB image. All the yellow parts represent copper, while the green parts represent fiberglass with a green soldermask</figcaption>
</figure>

A PCB can be thought of as a bunch of "printed" copper separated by fiberglass
sections that "insulate" or don't conduct electricity. We "glue" (solder) chips
to the copper "pads" to add them to the circuit.

## What are PCB layers?

When you print on a piece of paper, you can print "single-sided" or "double-sided",
PCBs can also be printed singled-sided or double-sided! The "front" of the PCB
is called the "top" layer, and the "back" of the PCB is called the "bottom" layer.

We can "print" copper to each of these layers to draw lots of wires and connect
lots of chips. Sometimes a wire needs to "go over"/"go under" another wire
because the wires aren't allowed to cross. When this happens, we can use the
"back" or "bottom layer" of the PCB to draw the wire so that the wires don't
accidentally touch.

## Vias

Vias are holes that connect different layers of PCB. Let's say you have a chip
on the top layer of a PCB and the back layer of a PCB. How can you connect them?
The copper on the top needs some way to "pass through" to the bottom layer.

This is where vias come in. A via is a hole that is "filled with copper" so that
the top layer can pass to the bottom.

<figure>
<img src="/img/via.png" alt="Vias" /> 
<figcaption>Vias connect different layers of a PCB</figcaption> 
</figure>

```tsx title="via.tsx"
<via x={0} y={0} toLayer="bottom" fromLayer="top" outerDiameter="0.35mm" />
```

```json titile="via.circuit.json"
{
  "type": "pcb_via",
  "position": {
    "x": 0,
    "y": 0
  },
  "hole_diameter": "0.25mm",
  "outer_diameter": "0.35mm",
  "from_layer": "top",
  "to_layer": "bottom",
  "layers": ["top", "bottom"]
}
```

## Plated Holes

A plated hole is similar to a via but it's hollow so that you can push metal pins
through it. This is important for chips that have big pins that need to fit into
holes. Chips with big pins that must go through holes are called "through-hole"
chips, and chips with small
pins are called "surface-mount" chips.

```tsx title="plated-hole.tsx"
<platedhole
  shape="circle"
  x="5mm"
  y="2.4mm"
  holeDiameter="0.25mm"
  outerDiameter="0.35mm"
/>
```

```json title="plated-hole.circuit.json"
{
  "type": "pcb_plated_hole",
  "shape": "circle",
  "outer_diameter": "1.2mm",
  "hole_diameter": "0.08in",
  "x": "3mm",
  "y": "1mm",
  "layers": ["top", "bottom"],
  "port_hints": ["1", "left"],
  "pcb_component_id": "pcb_component_1",
  "pcb_port_id": "pcb_port_1"
}
```

## Unplated Holes "Regular Holes"

Unplated holes or "regular holes" are just holes in the printed circuit board
without any copper around them. They don't electrically connect anything, but
can be very helpful for mounting the printed circuit board.

```tsx title="unplated-hole.tsx"
<hole x="5mm" y="2.4mm" holeDiameter="0.25mm" />
```

```json titile="unplated-hole.circuit.json"
{
  "type": "pcb_hole",
  "x": "5mm",
  "y": "2.4mm",
  "hole_diameter": "0.25mm"
}
```

## What are inner layers?

Inner layers are layers of PCB that aren't visible, they're sandwiched on the
inside. Sometimes this is useful when you have a lot of wires to connect and
it's almost impossible to stop them from crossing each other.

<figure>
<img src="/img/pcb-layers.png" alt="Inner layers" /> 
<figcaption>Inner layers are layers of PCB that aren't visible, they're sandwiched on the inside. Excellent image from <a href="https://www.pcbway.com/blog/Engineering_Technical/3_STEPS_How_to_determine_calculate_number_of_PCB_layers.html">pcbway</a></figcaption> 
</figure>
