---
title: Platform Configuration
description: >-
  The Platform Configuration allows you to change tscircuit behavior to best
  suit the platform the tscircuit code is running on.
---

import CircuitPreview from "@site/src/components/CircuitPreview"

## Overview

The Platform Configuration allows you to change tscircuit behavior to best suit
the platform the tscircuit code is running on.

Some use cases:

- Organizations may want to customize the cloud autorouter to avoid sending sensitive designs outside your company
- Organizations may want to introduce custom footprint strings
  using a prefix like `footprint="my-company:*"`
- Organizations may want to use their own internal registry for importing circuits instead of [tscircuit.com](https://tscircuit.com)
- For [autorouting.com](https://autorouting.com), we configure the platform to not perform any autorouting

## Platform Configuration Reference

Every platform configuration property is optional. The available properties are
grouped below by purpose.

### Engines and routing

| Property | Type | Description |
| --- | --- | --- |
| `partsEngine` | `PartsEngine` | Finds purchasable parts that match component specifications. |
| `autorouter` | `AutorouterProp` | Selects or configures the autorouter used by the platform. |
| `autorouterMap` | `Record<string, AutorouterDefinition>` | Registers named custom autorouters. Each definition creates an autorouter instance from Simple Route JSON. |
| `allowLegacyAutorouters` | `boolean` | Enables the deprecated `sequential_trace` and `auto_cloud` autorouter presets. Defaults to `false`; enable this only temporarily while migrating projects. |
| `cloudAutorouterUrl` | `string` | Sets the cloud autorouter endpoint. The default tscircuit platform uses a tscircuit cloud service. |
| `defaultSpiceEngine` | `"spicey" \| "ngspice" \| string` | Selects the default SPICE simulation engine. Custom engine names can refer to entries in `spiceEngineMap`. |
| `spiceEngineMap` | `Record<string, SpiceEngine>` | Registers named SPICE engines. Each engine accepts a SPICE netlist and returns simulation-result Circuit JSON. |
| `localCacheEngine` | `LocalCacheEngine` | Provides a `localStorage`-compatible cache for render phases and engines, with `getItem`, `setItem`, and optional `removeItem` methods. |
| `enablePartOrientationAnalysis` | `boolean` | Analyzes rendered and supplier footprints so manufacturing exporters can align their semantic pin 1 orientations. |
| `pcbPackSolverTimeoutMs` | `number` | Sets the maximum time, in milliseconds, that an individual PCB pack solver may run. The timeout is checked between solver steps. |

### Registry and project metadata

| Property | Type | Description |
| --- | --- | --- |
| `registryApiUrl` | `string` | Sets the registry API used to import circuits. It defaults to `https://api.tscircuit.com`. See the [Registry API](../../web-apis/the-registry-api.md) for details. |
| `projectName` | `string` | Sets the project or board name exposed to platform features and exporters. |
| `projectBaseUrl` | `string` | Sets the base URL used to resolve project resources. |
| `version` | `string` | Sets the project or platform version exposed to platform features and exporters. |
| `url` | `string` | Sets the canonical URL associated with the project or platform. |
| `printBoardInformationToSilkscreen` | `boolean` | Prints standard board and platform information, such as the board name and version, on the silkscreen. |
| `includeBoardFiles` | `string[]` | Selects the board files that `tsci build` builds automatically. Entries may be paths or globs; the default is `["**/*.circuit.tsx"]`. |
| `snapshotsDir` | `string` | Sets the directory used by `tsci snapshot`. The default is `tests/__snapshots__`. |
| `unitPreference` | `"mm" \| "in" \| "mil"` | Sets the platform's preferred display unit. |

### Render and DRC controls

| Property | Type | Description |
| --- | --- | --- |
| `pcbDisabled` | `boolean` | Disables PCB rendering. |
| `routingDisabled` | `boolean` | Disables PCB routing. |
| `schematicDisabled` | `boolean` | Disables schematic rendering. |
| `partsEngineDisabled` | `boolean` | Disables automatic part selection through the parts engine. |
| `drcChecksDisabled` | `boolean` | Disables all design-rule checks. |
| `netlistDrcChecksDisabled` | `boolean` | Disables netlist design-rule checks. |
| `routingDrcChecksDisabled` | `boolean` | Disables routing design-rule checks. |
| `placementDrcChecksDisabled` | `boolean` | Disables placement design-rule checks. |
| `pinSpecificationDrcChecksDisabled` | `boolean` | Disables pin-specification design-rule checks. |

### Footprints, files, and platform hooks

| Property | Type | Description |
| --- | --- | --- |
| `footprintLibraryMap` | `Record<string, footprint loader or library>` | Registers footprint-library prefixes and their loaders. This is how strings such as `kicad:*` and `jlcpcb:*` are resolved. A loader returns footprint Circuit JSON and may also return a CAD model. |
| `footprintFileParserMap` | `Record<string, FootprintFileParserEntry>` | Registers footprint-file extensions, such as `kicad_mod`, with parsers that load footprint Circuit JSON from a URL. |
| `staticFileLoaderMap` | `Record<string, static file loader>` | Registers file-extension loaders that convert static-file contents into ES module import results. |
| `resolveProjectStaticFileImportUrl` | `(path: string) => Promise<string>` | Resolves a project-relative static-file path to an importable URL. |
| `nodeModulesResolver` | `(modulePath: string) => Promise<string \| null>` | Resolves a Node module specifier to a loadable path or URL, or returns `null` when it cannot be resolved. |
| `platformFetch` | `typeof fetch` | Replaces the fetch implementation used for platform requests. |

See the source for the complete TypeScript definitions in
[`platformConfig.ts`](https://github.com/tscircuit/props/blob/main/lib/platformConfig.ts).

### The Default Platform

The tscircuit default platform configuration sources parts from multiple vendors
and uses the tscircuit backend for autorouting and `@tsci/*` imports.

Current vendors used for automatic part sourcing:

- [JLCPCB](https://jlcpcb.com)
- Digikey (coming soon!)
- Mouser (coming soon!)

For each vendor, tscircuit populates multiple available chips. This means even
if tscircuit finds parts for a vendor, you don't have to use that vendor!

## Parts engines and footprint libraries

Parts engines and footprint libraries solve different problems:

| Extension point | Use it when you need to... | Input | Output |
| --- | --- | --- | --- |
| `partsEngine` | Select an orderable part for a source component | Component properties and its footprint string | Supplier part numbers, such as a JLCPCB or DigiKey number |
| `footprintLibraryMap` | Resolve a footprint prefix such as `kicad:` or `my-company:` | The text after the prefix | Footprint Circuit JSON and, optionally, a CAD model |
| `footprintFileParserMap` | Load a footprint file referenced by a URL or project path | A URL ending in a registered extension | Footprint Circuit JSON and, optionally, a CAD model |

For example, `footprint="kicad:Resistor_SMD/R_0603_1608Metric"` is
resolved by `footprintLibraryMap.kicad`. It does not call
`partsEngine.findPart`. If you only want to load footprints from a local KiCad
installation, configure a footprint-library loader rather than a parts engine.

### Create a custom parts engine

A parts engine implements the `PartsEngine` interface from `@tscircuit/props`.
Its required `findPart` method receives the rendered source component and the
resolved footprinter string. It returns zero or more recognized supplier part
numbers. Returning an empty object means that the engine did not find a match.

```ts title="parts-engine.ts"
import type {
  PartsEngine,
  SupplierPartNumbers,
} from "@tscircuit/props"

const internalCatalog: Record<string, SupplierPartNumbers> = {
  "simple_resistor:0603": { jlcpcb: ["C25804"] },
  "simple_capacitor:0603": { jlcpcb: ["C14663"] },
}

export const internalPartsEngine: PartsEngine = {
  findPart({ sourceComponent, footprinterString }) {
    const componentType =
      "ftype" in sourceComponent ? sourceComponent.ftype : sourceComponent.type
    const key = `${componentType}:${footprinterString ?? ""}`
    return internalCatalog[key] ?? {}
  },
}
```

Register it for every board in a CLI project:

```ts title="tscircuit.config.ts"
import type { PlatformConfig } from "@tscircuit/props"
import { internalPartsEngine } from "./parts-engine"

export default {
  platformConfig: {
    partsEngine: internalPartsEngine,
  } satisfies PlatformConfig,
}
```

`PartsEngine` also has an optional `fetchPartCircuitJson` method. Implement it
when an engine can retrieve the complete Circuit JSON for a supplier or
manufacturer part number. This is required when a supplier-prefixed footprint
must be loaded through that engine. See the
[`PartsEngine` type](https://github.com/tscircuit/props/blob/main/lib/components/group.ts)
and the open-source
[`@tscircuit/parts-engine`](https://github.com/tscircuit/parts-engine) for the
current contract and production implementations.

:::note
Supplier keys are currently limited to the `SupplierName` values defined by
`@tscircuit/props`, including `jlcpcb`, `digikey`, and `mouser`. Use
`footprintLibraryMap` when you want to introduce an arbitrary prefix such as
`my-company:`.
:::

### Load `kicad:` footprints from a local KiCad installation

The default `kicad:` loader downloads converted footprints from tscircuit's
KiCad cache. A CLI project can replace that loader with one that reads the
`.kicad_mod` files installed on the same computer.

Install the converter and types used by the configuration:

```sh
bun add -D @tscircuit/props kicad-to-circuit-json
```

Set `KICAD_FOOTPRINT_DIR` to the directory containing KiCad's `.pretty`
directories. Common locations include `/usr/share/kicad/footprints` on Linux
and
`/Applications/KiCad/KiCad.app/Contents/SharedSupport/footprints` on macOS.
Then add this configuration:

```ts title="tscircuit.config.ts"
import { readFile } from "node:fs/promises"
import { resolve, sep } from "node:path"
import type { PlatformConfig } from "@tscircuit/props"
import { KicadFootprintToCircuitJsonConverter } from "kicad-to-circuit-json"

const configuredRoot = process.env.KICAD_FOOTPRINT_DIR

if (!configuredRoot) {
  throw new Error("Set KICAD_FOOTPRINT_DIR to KiCad's footprints directory")
}

const footprintRoot = resolve(configuredRoot)

const loadLocalKicadFootprint = async (footprintPath: string) => {
  const segments = footprintPath.split("/")
  if (
    segments.length !== 2 ||
    segments.some(
      (segment) =>
        !segment ||
        segment === "." ||
        segment === ".." ||
        segment.includes("\\"),
    )
  ) {
    throw new Error(
      `Expected a KiCad footprint in the form "Library/Footprint", got "${footprintPath}"`,
    )
  }

  const [libraryName, footprintName] = segments
  const filePath = resolve(
    footprintRoot,
    `${libraryName}.pretty`,
    `${footprintName}.kicad_mod`,
  )

  // Do not allow a footprint reference to escape KICAD_FOOTPRINT_DIR.
  if (!filePath.startsWith(`${footprintRoot}${sep}`)) {
    throw new Error(`Footprint path is outside ${footprintRoot}`)
  }

  const fileContent = await readFile(filePath, "utf8")
  const converter = new KicadFootprintToCircuitJsonConverter()
  converter.addFile(filePath, fileContent)
  converter.runUntilFinished()

  const output = converter.getOutput()
  return {
    footprintCircuitJson: Array.isArray(output) ? output : [output],
  }
}

export default {
  platformConfig: {
    footprintLibraryMap: {
      // This replaces the default network-backed kicad: loader.
      kicad: loadLocalKicadFootprint,
    },
  } satisfies PlatformConfig,
}
```

The normal footprint syntax now reads from disk:

```tsx
export default () => (
  <board width="20mm" height="20mm">
    <resistor
      name="R1"
      resistance="10k"
      footprint="kicad:Resistor_SMD/R_0603_1608Metric"
    />
  </board>
)
```

This file-system loader is intended for CLI commands that load
`tscircuit.config.ts` in the local runtime, such as `tsci build`, `tsci export`,
and `tsci snapshot`. Browser-based runtimes cannot read arbitrary files from
your computer. For `tsci dev`, import a `.kicad_mod` file that is inside the
project directly, or replace the file-system read with a loader that fetches
from a local HTTP service. See [Importing Components from
KiCad](../importing-modules-and-chips/importing-from-kicad.md#import-kicad_mod-and-kicad_sym-files-directly)
for the direct-import approach.

## Using your Platform

:::info
Want more platform features? Tell us about your use case in [this GitHub Discussion!](https://github.com/orgs/tscircuit/discussions/514)
:::

### Configure a project with `tscircuit.config.ts`

For CLI projects, define a `platformConfig` export in `tscircuit.config.ts` at
the root of your project. This lets every board in the project use the same
parts engine, autorouter, registry, or footprint libraries without passing a
platform object into each circuit manually.

For example, the TI parts engine can define components from Texas Instruments
part data. First install it as a development dependency:

```sh
bun add -D github:tscircuit/ti-parts-engine
```

Then configure it in your project:

```ts title="tscircuit.config.ts"
import { createTiPlatformConfig } from "@tscircuit/ti-parts-engine"

export default {
  platformConfig: createTiPlatformConfig(),
}
```

You can now use TI components inside tscircuit with automatically loaded SPICE
and footprints:

<CircuitPreview
  defaultView="pcb"
  mainComponentPath="index.circuit.tsx"
  fsMap={{
    "package.json": JSON.stringify({
      dependencies: {
        "@tscircuit/ti-parts-engine": "github:tscircuit/ti-parts-engine",
      },
    }),
    "tscircuit.config.ts": `import { createTiPlatformConfig } from "@tscircuit/ti-parts-engine"

export default {
  platformConfig: createTiPlatformConfig(),
}
`,
    "index.circuit.tsx": `export default () => (
    <board width="20mm" height="20mm">
      <chip name="U1" footprint="ti:LM358" />
    </board>
  )`,
  }}
/>

### Provide a platform programmatically

When you initialize a `RootCircuit`, you can provide the platform configuration
as the `{ platform }` parameter:

```tsx
import { RootCircuit } from "@tscircuit/core"

const circuit = new RootCircuit({
  platform: {
    registryApiUrl: "https://my-tscircuit-registry.mycompany.com",
  },
})
```

This can also be provided to modules like `@tscircuit/eval` to evaluate tscircuit
code:

```tsx
import { CircuitRunner } from "@tscircuit/eval-webworker"
import myPartsEngine from "./my-parts-engine"

const circuitRunner = new CircuitRunner({
  platform: {
    partsEngine: myPartsEngine,
  },
})

await circuitRunner.execute(`
circuit.add(
  <board width="10mm" height="10mm">
    <led name="LED1" footprint="0603" color="red" />
  </board>
)`)

await circuitRunner.renderUntilSettled()

const circuitJson = await circuitRunner.getCircuitJson()
```

:::info
Interested in running the entire tscircuit platform privately inside your company?
We're happy to help! Reach out to **enterprise@tscircuit.com**
:::
