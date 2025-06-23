---
title: Datasheet API
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
    "pin_information": { /* ... */ }
  }
}
```

## `/datasheets/create`

Creates a new datasheet entry so it can later be parsed and fetched.
This endpoint requires an API token. You can print your token with the [`tsci auth print-token`](../command-line/tsci-auth-print-token.md) command.

```http
POST /datasheets/create
{
  "chip_name": "<name>",
  "datasheet_pdf_urls": ["https://..."]
}
```

**Response**
```json
{
  "datasheet_id": "<uuid>",
  "chip_name": "<name>",
  "datasheet_pdf_urls": ["https://..."],
  "pin_information": null
}
```

After creation the datasheet will be processed asynchronously to extract pin information.
