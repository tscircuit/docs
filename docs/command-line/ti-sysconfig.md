---
title: Generate and check TI SysConfig files
description: Create a TI .syscfg file from a tscircuit board and validate it with TI SysConfig
---

The `ti` CLI can turn a tscircuit board into a TI SysConfig `.syscfg` file. Use
`generate-sysconfig` to create a file you can open in Code Composer Studio (CCS),
then use `check-sysconfig` to validate the board's requested configuration with
your locally installed TI tools. These are `ti` commands, separate from `tsci`.

## Set up the project

Install [Bun](https://bun.sh/) and a version of `@tscircuit/ti` that includes the
SysConfig commands. Bun must remain on `PATH` when you run `ti`, even if you
installed the CLI with another package manager.

```bash
bun install -g @tscircuit/ti
```

Your board's project must also have `tscircuit` installed to build a TSX input.
The commands accept `.tsx`, `.ts`, `.jsx`, `.js`, `.circuit.json`, or `circuit.json`.

For a reproducible example, use the
[frozen pedometer v0.4.4 source](https://github.com/tscircuit/circuit-json-to-sysconfig/tree/main/tests/fixtures/pedometer).
Extract its source archive, install its dependencies, and copy
`index.circuit.tsx` to `pedometer.tsx` while keeping the `imports/` directory
beside it. Create `pedometer.sysconfig.json` beside the entrypoint:

```json title="pedometer.sysconfig.json"
{
  "component": "U1_MCU",
  "gpios": [
    {
      "source": "DISP_PWR_N",
      "gpio_name": "CONFIG_DISPLAY_ISOLATE",
      "direction": "output",
      "initial_state": "high"
    },
    {
      "source": "CHG_LP",
      "gpio_name": "CONFIG_PMIC_LP",
      "direction": "output",
      "initial_state": "low"
    },
    {
      "source": "ACCEL_INT1",
      "gpio_name": "CONFIG_ACCEL_INT",
      "direction": "input",
      "pull": "none",
      "interrupt": "none"
    }
  ],
  "i2c": {
    "i2c_name": "CONFIG_I2C_0",
    "sda": "I2C_SDA",
    "scl": "I2C_SCL",
    "max_bit_rate": 100000,
    "peripheral_assignment": "suggested"
  },
  "reserved_ports": [
    { "source": "DISP_CS", "reason": "Display bus outside conversion scope" },
    { "source": "DISP_MOSI", "reason": "Display bus outside conversion scope" },
    { "source": "DISP_DC", "reason": "Display behavior outside conversion scope" },
    { "source": "DISP_SCLK", "reason": "Display bus outside conversion scope" },
    { "source": "DISP_RST", "reason": "Display behavior outside conversion scope" },
    { "source": "SWDIO", "reason": "Debug ownership" },
    { "source": "SWDCK", "reason": "Debug ownership" }
  ],
  "firmware": { "rtos": "nortos", "lf_clock_source": "lf_rcosc" }
}
```

`source` names a signal from the circuit. The CLI resolves that signal to one
MCU port, so moving a trace to another MCU pin changes the generated SysConfig
assignment without changing this request file. The request makes GPIO behavior,
I²C, reserved pins, and the low-frequency clock choice explicit; the CLI does
not infer those firmware choices from the schematic.

You can instead use a project-level `ti.sysconfig.json`, or pass
`--config path/to/request.json` to either command. A sibling request file takes
precedence over the project-level file.

## Generate a file for CCS

From the board project, run:

```bash
ti generate-sysconfig ./pedometer.tsx
# Generated pedometer.syscfg.
```

The command builds the TSX into Circuit JSON, resolves the request against the
board, and writes `pedometer.syscfg` beside `pedometer.tsx`. Use
`-o path/to/output.syscfg` to choose another output location. You can also pass
a previously built `.circuit.json` file instead of source TSX.

Open **the generated `pedometer.syscfg`** in CCS/SysConfig. For this pedometer,
check these assignments in the SysConfig editor:

| Setting | Expected value |
| --- | --- |
| Device | CC2340R5, RGE package |
| Display isolation | DIO20, output, initially high |
| PMIC low-power | DIO3, output, initially low |
| Accelerometer interrupt | DIO12, input |
| I²C | SDA DIO8, SCL DIO6, I2C0 at 100 kbit/s |
| LF clock | Internal LF RCOSC |

## Check with TI's installed SysConfig

Install the matching TI SysConfig and SDK locally, then point `ti` to them:

```bash
export TI_SYSCONFIG_NODE=/path/to/sysconfig/nodejs/node
export TI_SYSCONFIG_CLI=/path/to/sysconfig/dist/cli.js
export TI_SDK_ROOT=/path/to/simplelink_lowpower_f3_sdk

ti check-sysconfig ./pedometer.tsx
# SysConfig check passed for ./pedometer.tsx (7 generated files).
```

For the CC2340 pedometer, this check requires TI SysConfig **1.28.1+4785** and
SimpleLink F3 SDK **9.21.00.36**. It converts the source and request into a
*temporary* `.syscfg`, asks TI's CLI to generate C/header files, and compares
the requested GPIO, I²C, clock, and reserved-pin settings with TI's output. It
also checks that LaunchPad-specific flash startup is absent. It exits with an
error if conversion, TI generation, or a supported output check fails.

`check-sysconfig ./pedometer.tsx` checks the configuration **derived from the
TSX and request JSON**. It does not read or validate an existing
`pedometer.syscfg`, so edits made only to that file are not checked. Generate
the file again before showing it in CCS if the source or request has changed.
This check does not compile complete firmware or test the physical board.

The currently supported targets are CC2340R52E0RGER GPIO/I²C and a single
output GPIO on AM2434BSDFHIALVR (A7 or B7). AM2434 checking requires TI
SysConfig **1.14.0+2667** and MCU+ SDK **07.03.01**. Other devices and
configurations fail explicitly.
