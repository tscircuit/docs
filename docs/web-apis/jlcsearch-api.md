---
title: jlcsearch API
sidebar_position: 6
---

# jlcsearch.tscircuit.com

jlcsearch is an in‑stock search engine for JLCPCB parts. Any listing page on
this site can return JSON by appending `.json` to the URL. This makes it easy to
script queries or integrate the data into other tools.

## Querying components

### `GET /components/list.json`

Returns a list of components from the aggregated database.

**Query Parameters**

- `subcategory_name` – optional subcategory filter.
- `package` – optional footprint name.
- `search` – search term matched against description, manufacturer part number or LCSC code.
- `full` – when `true` the response includes all database fields.

Example request:

```http
GET https://jlcsearch.tscircuit.com/components/list.json?search=555&package=SOIC-8
```

A successful response looks like:

```json
{
  "components": [
    {
      "lcsc": 123456,
      "mfr": "...",
      "package": "SOIC-8",
      "description": "...",
      "stock": 1000,
      "price": "0.02"
    }
  ]
}
```

## Category endpoints

There are specialized listing endpoints for many component types. Examples
include:

- `/resistors/list.json`
- `/capacitors/list.json`
- `/microcontrollers/list.json`
- `/voltage_regulators/list.json`

Each endpoint accepts query parameters relevant to the component type (for
instance `/resistors/list.json` supports `package` and `resistance`). The HTML
pages show a **json** button which links to the same request in API form so you
can inspect the available parameters.

## General search

### `GET /api/search`

Full-text search across all components.

**Query Parameters**

- `q` – search query string.
- `package` – optional package filter.
- `limit` – maximum number of results to return (default 100).
- `full` – include all database fields when `true`.

Example:

```http
GET https://jlcsearch.tscircuit.com/api/search?q=STM32&limit=5
```

Response body:

```json
{
  "components": [ /* component objects */ ]
}
```

## Other endpoints

- `GET /categories/list.json` – high level categories and subcategories.
- `GET /footprint_index/list.json` – database footprints recognized by tscircuit.
- `GET /health` – simple health check returning `{ "ok": true }`.

Dropping the `.json` suffix from any of these routes returns the same data in an
interactive HTML table.
