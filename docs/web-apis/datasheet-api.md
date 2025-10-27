---
title: Datasheet API
description: Store and retrieve structured component datasheets via the tscircuit API
sidebar_position: 4
---

The tscircuit Datasheet API allows you to store and retrieve parsed datasheet information for electronic components.

Use `https://api.tscircuit.com` as the base URL for these endpoints.

## `/datasheets/get`

Retrieves stored datasheet information. You can look up a datasheet either by its UUID or by the chip name.

```http
GET /datasheets/get?chip_name=<name>
POST /datasheets/get { "datasheet_id": "<uuid>" }
```

**Parameters**
- `datasheet_id` – Optional UUID of the datasheet.
- `chip_name` – Optional string chip identifier.

**Response**
```json
{
  "datasheet": {
    "datasheet_id": "<uuid>",
    "chip_name": "<name>",
    "datasheet_pdf_urls": ["https://..."],
    "pin_information": [ /* pin objects */ ]
  }
}
```

### Pin Information Schema

Each entry in `pin_information` describes one pin on the device and has the
following structure:

```json
{
  "pin_number": "1",
  "name": ["VCC"],
  "description": "Power supply for the device.",
  "capabilities": ["power"]
}
```

`pin_number` is always a string and may include alphanumeric values (e.g. `"1"`
or `"A1"`). The `name` array contains all aliases for the pin. `description` is
a human‑readable explanation of the pin's function and `capabilities` enumerates
how the pin can be used.

### Example Response Snippet

Below is an excerpt from the RP2040 datasheet entry:

```bash
$ curl https://api.tscircuit.com/datasheets/get?chip_name=RP2040 | jq '.datasheet.pin_information[:1]'
[
  {
    "name": [
      "IOVDD"
    ],
    "pin_number": "1",
    "description": "Power supply for digital GPIOs, nominal voltage 1.8V to 3.3V.",
    "capabilities": [
      "Power Supply (Digital IO)"
    ]
  }
]
```

## `/datasheets/create`

Creates a new datasheet entry so it can later be parsed and fetched.
This endpoint requires an API token. You can print your token with the [`tsci auth print-token`](../command-line/tsci-auth-print-token.md) command.

```http
POST /datasheets/create
{
  "chip_name": "<name>",
}
```

**Response**
```json
{
  "datasheet_id": "<uuid>",
  "chip_name": "<name>",
  "datasheet_pdf_urls": null,
  "pin_information": null
}
```

After creation the datasheet will be processed asynchronously to find pdf urls and extract pin information.
