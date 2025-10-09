# Project Instructions for AI Assistants

This file contains instructions and context to help AI assistants work effectively with tscircuit projects.

## Project Description

<!-- Describe your project here -->
**Project Name**: [Your Project Name]

**Form Factor**: [e.g., Arduino Shield, Raspberry Pi Hat, Custom Board]

**Purpose**: [Brief description of what this circuit does]

**Key Requirements**:
- Requirement 1
- Requirement 2
- Requirement 3

**Expected Functionality**:
- Feature 1
- Feature 2
- Feature 3

---

## tscircuit Syntax Primer

tscircuit uses JSX/TSX syntax to define electronic circuits. Here's a quick reference:

### Core Elements

Most elements have a `name` and `footprint` prop. Most properties are optional.

- `<board />` - root element (can specify `width` and `height`)
- `<group />` - group of elements
- `<chip name="U1" pinLabels={{ pin1: "VCC", ... }} />` - any generic chip
- `<resistor name="R1" resistance="1k" footprint="0402" />` - `resistance`
- `<capacitor name="C1" capacitance="100n" footprint="0402" />` - `capacitance`
- `<inductor name="L1" inductance="100n" footprint="0402" />` - `inductance`
- `<led name="LED1" color="red" />` - `color`
- `<diode name="D1" variant="standard" />` - `variant` (standard/schottky/zener/avalanche/photo/tvs)
- `<trace from="U1.VCC" to="R1.pin1" />` - `from`, `to`
- `<transistor name="Q1" type="npn" />` - `type` (npn/pnp/nmos/pmos)
- `<mosfet name="M1" channelType="n" mosfetMode="enhancement" />` - `channelType` (n/p), `mosfetMode` (enhancement/depletion)
- `<pinheader />` - `pinCount`, `schFacingDirection`, `gender` (male/female/unpopulated)
- `<pushbutton name="SW1" />`
- `<crystal name="X1" frequency="10MHz" />` - `frequency`
- `<battery name="BAT1" />` - `capacity`, `voltage`

### Chip Configuration

The `<chip />` element is the most versatile:

```tsx
<chip
  name="U1"
  footprint="soic8"
  pinLabels={{
    pin1: "VCC",
    pin2: "DISCH",
    pin3: "THRES",
    pin4: "CTRL",
    pin5: "GND",
    pin6: "TRIG",
    pin7: "OUT",
    pin8: "RESET"
  }}
  schPinArrangement={{
    leftSide:  { direction: "top-to-bottom", pins: ["RESET","CTRL","THRES","TRIG"] },
    rightSide: { direction: "top-to-bottom", pins: ["VCC","OUT","DISCH","GND"] },
  }}
/>
```

### Connection Methods

**Using trace elements:**
```tsx
<trace from="U1.VCC" to="R1.pin1" />
<trace from="R1.pin2" to="LED1.pin1" />
```

**Using connections prop:**
```tsx
<chip
  name="U1"
  connections={{
    VCC: "net.V5",
    GND: "net.GND",
    OUT: "R1.pin1"
  }}
/>
```

### Selector Syntax

When specifying connections, use:
- `"U1.VCC"` - Component pin by label
- `"R1.pin1"` - Component pin by number
- `"net.VCC"` - Named net
- `"net.GND"` - Ground net

### Common Footprints

- SMD Resistors/Capacitors: "0402", "0603", "0805", "1206", "1210"
- ICs: "soic8", "soic16", "dip8", "dip16", "tssop8", "qfp16", "qfn16"
- Transistors: "sot23", "sot23_5", "sot223", "to92", "to220"
- Connectors: "pinrow2", "pinrow6", "pinrow8"
- LEDs: "led0603", "led0805"

You can modify footprints with parameters like "soic8_w4mm" or "pinrow8_p1mm".

---

## tscircuit CLI Commands

AI assistants can use these commands to help build circuits:

### `tsci search [query]`

Search for footprints and components across the tscircuit ecosystem.

**Usage:**
```bash
tsci search "usb-c connector"
tsci search "temperature sensor"
tsci search "atmega328"
```

**Output:** Returns matching footprints from KiCad libraries and published packages from the tscircuit registry.

### `tsci import [component]`

Import a component from the registry into your project.

**Usage:**
```bash
tsci import seveibar/usb-c-connector
tsci import johndoe/555-timer-circuit
```

**Effect:** Adds the component to your project dependencies and makes it available for import in circuit files.

### `tsci dev`

Start the development server to preview your circuit in real-time.

**Usage:**
```bash
tsci dev
```

**Effect:** Opens a browser window showing your circuit with live reload on changes.

### `tsci build`

Build your circuit and generate output files.

**Usage:**
```bash
tsci build
tsci build --site  # Build a static site
```

**Output:** Generates circuit JSON and other output files in the `dist/` directory.

### `tsci export [format]`

Export your circuit to various formats.

**Usage:**
```bash
tsci export gerber
tsci export svg
tsci export png
tsci export circuit-json
```

**Output:** Generates files in the specified format for fabrication or documentation.

---

## Best Practices for AI Assistants

1. **Search Before Creating**: Use `tsci search` to find existing components before creating custom ones
2. **Use Appropriate Footprints**: Select footprints that match manufacturing requirements
3. **Connect Everything**: Ensure all component pins are properly connected
4. **Follow Conventions**: Use standard reference designators (R1, C1, U1, etc.)
5. **Add Power Rails**: Connect VCC and GND to all ICs
6. **Include Decoupling**: Add decoupling capacitors near ICs
7. **Label Nets**: Use descriptive net names like "net.VCC", "net.SDA", "net.SCL"
8. **Verify Layout**: Consider physical constraints and component placement

---

## Common Circuit Patterns

### Power Supply Decoupling
```tsx
<chip name="U1" ... />
<capacitor
  name="C1"
  capacitance="0.1uF"
  footprint="0402"
  connections={{ pin1: "U1.VCC", pin2: "U1.GND" }}
/>
```

### Pull-up Resistor
```tsx
<resistor
  name="R1"
  resistance="10k"
  footprint="0603"
  connections={{ pin1: "net.VCC", pin2: "U1.RESET" }}
/>
```

### LED with Current Limiting
```tsx
<resistor name="R1" resistance="330" footprint="0805" />
<led name="LED1" color="red" footprint="led0603" />
<trace from="net.GPIO1" to="R1.pin1" />
<trace from="R1.pin2" to="LED1.pin1" />
<trace from="LED1.pin2" to="net.GND" />
```

---

## Additional Resources

- [tscircuit Documentation](https://docs.tscircuit.com)
- [Component Registry](https://registry.tscircuit.com)
- [Essential Elements Guide](https://docs.tscircuit.com/guides/tscircuit-essentials/essential-elements)
- [Layout Properties](https://docs.tscircuit.com/guides/tscircuit-essentials/layout-properties)
