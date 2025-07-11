---
title: Retrieve datasheets with the SDK
sidebar_position: 5
---

The [`@tscircuit/api`](https://github.com/tscircuit/api) package provides a
convenient client for interacting with the Datasheet API. To follow the examples
below you'll need an API token which can be obtained with the
[`tsci auth print-token`](../command-line/tsci-auth-print-token.md) command.

## Installation

```bash
npm install @tscircuit/api
```

## Basic usage

```ts
import { TscircuitApiClient } from "@tscircuit/api"

const client = new TscircuitApiClient({ apiKey: "your-api-key" })
```

### Create a datasheet

```ts
const datasheet = await client.datasheets.create({ chip_name: "RP2040" })
```

### Get a datasheet

Retrieve by id or by chip name:

```ts
// by id
const dsById = await client.datasheets.get({ datasheet_id: datasheet.datasheet_id })

// by chip name
const dsByName = await client.datasheets.get({ chip_name: "RP2040" })
```

### Convenience helper

`findCreateWait` will look up a datasheet by `chip_name`, create it if needed and
then poll until the `pin_information` field is populated.

```ts
const processed = await client.datasheets.findCreateWait({ chip_name: "RP2040" })
```

The promise resolves when processing completes or throws on timeout.

### Example response

A successful call to `datasheets/get` returns all datasheet fields. Below is an
abbreviated example for the RP2040:

```json
{
  "datasheet": {
    "datasheet_id": "2a51fc64-5154-4513-ad7c-29429bdc973e",
    "chip_name": "RP2040",
    "datasheet_pdf_urls": [
      "https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf"
    ],
    "pin_information": [
      {
        "name": ["IOVDD"],
        "pin_number": "1",
        "description": "Power supply for digital GPIOs, nominal voltage 1.8V to 3.3V.",
        "capabilities": ["Power Supply (Digital IO)"]
      }
    ]
  }
}
```
