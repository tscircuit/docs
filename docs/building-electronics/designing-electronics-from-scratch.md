---
title: Designing Electronics from Scratch
sidebar_position: 2
---

## Overview

Typically electronics engineers go through the following steps when designing
a new electronic device.

1. Requirements Analysis
2. System Diagramming
3. Schematic Capture
4. PCB Layout
5. Ordering

## Requirements Analysis

This stage is all about making sure you have a clear idea of what the device
should do. Your development and cost preferences are a huge factor here.

1. What should the device do?
2. How much power is needed?
3. How much processing power do I need?
4. Do I want to run linux, MicroPython, or low-level C code? Do I even need
   to run code?
5. How much does cost matter?
6. Should I use only parts available from turn-key manufacturers like JLCPCB?

## System Diagramming

In this phase we create a diagram overview of the system and how things connect
together abstractly

1. What components should I use?
2. How do things connect together at a high level?

The system diagram can instantly communicate how your design works to others.

### System Diagram Example 1: Bluetooth Humidity and CO2 Sensor

Here's an example of a system diagram for a simple IoT device that takes
humidity and CO2 measurements and can communicate them via bluetooth.

<figure>
<img src="/img/system-diagram-1.png" alt="System Diagram Example 1" />
<figcaption>System Diagram Example 1</figcaption>
</figure>

## Schematic Capture

In this phase we create a schematic diagram of the system and how things connect
together.

1. Using reference designs, datasheets or pre-made modules, create all the
   elements of the circuit in tscircuit
2. Run design checks to make sure the circuit is hooked up correctly

In this phase you should create chip modules or [import third party chips](../guides/importing-modules-and-chips)
as you build up your circuit. You shouldn't be configuring chips in
the same file that connects all your chips together- give each chip it's own
module.

After the schematics look good, you can export to a readable netlist and upload
the netlist to AI tools like OpenAI O1 to get a review and make sure everything
is connected properly! This is also a good stage to get your schematic reviewed
by your team members.

## PCB Layout

In this phase we create a layout of the circuit on a PCB.

tscircuit automatically autoroutes the circuit for you, but you may still need
to "drag'n'drop" components in the PCB viewer to the locations you want them to
be in. Use [manual editing](../guides/manual-edits.mdx) to drag'n'drop
components on the PCB.

## Ordering

In this phase we order the PCB from a manufacturer. Typically this is done
by downloading [Fabrication Files](../guides/understanding-fabrication-files.md)
and "dragging and dropping" them into a manufacturer's website.

Sometimes you'll want to assemble the PCB yourself (or sometimes just a single
component that your manufacturer doesn't have!). In this case, you'll need a
lab setup to facilitate soldering.
