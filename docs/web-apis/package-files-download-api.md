---
title: Package Files Download API
description: Download package file contents from the tscircuit registry API
---

# `package_files/download`

Download a single file from a package release.

Base URL: `https://api.tscircuit.com`

Auth header:

```http
Authorization: Bearer <your_token>
```

## Request

### `GET /package_files/download`

This endpoint uses query parameters (no request body).

Use one of the following parameter sets:

```http
GET /package_files/download?package_file_id=<package_file_id>
```

```http
GET /package_files/download?package_name_with_version=<owner>/<package_name>@<version>&file_path=<file_path>
```

```http
GET /package_files/download?package_release_id=<package_release_id>&file_path=<file_path>
```

## Example Success Response

On success, the response body is the raw file content.

```tsx
import { exampleFootprint } from "@tsci/example-lib"

export const ExamplePackage = () => {
  return <chip footprint={exampleFootprint} />
}
```

## Example Error Responses

Missing/invalid query parameters:

```json
{
  "ok": false,
  "error": {
    "message": "Invalid input",
    "error_code": "validation_error"
  }
}
```

File not found:

```json
{
  "error": {
    "error_code": "not_found",
    "message": "Package file not found"
  }
}
```
