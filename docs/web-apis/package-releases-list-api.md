---
title: Package Releases List API
description: List releases for a package from the tscircuit registry API
---

# `package_releases/list`

List all releases for a package.

Base URL: `https://api.tscircuit.com`

Auth header:

```http
Authorization: Bearer <your_token>
```

## Request

### `POST /package_releases/list`

Use one of the following request body shapes:

```json
{
  "package_name": "<owner>/<package_name>"
}
```

```json
{
  "package_id": "<package_id>"
}
```

## Example Success Response

```json
{
  "ok": true,
  "package_releases": [
    {
      "package_release_id": "pkgrls_11111111-aaaa-bbbb-cccc-1234567890ab",
      "package_id": "pkg_12345678-aaaa-bbbb-cccc-1234567890ab",
      "version": "0.4.1",
      "is_latest": false,
      "is_locked": true,
      "created_at": "2026-01-10T09:00:00.000Z"
    },
    {
      "package_release_id": "pkgrls_12345678-aaaa-bbbb-cccc-1234567890ab",
      "package_id": "pkg_12345678-aaaa-bbbb-cccc-1234567890ab",
      "version": "0.4.2",
      "is_latest": true,
      "is_locked": false,
      "created_at": "2026-01-15T12:34:56.000Z"
    }
  ]
}
```

## Example Error Response

```json
{
  "ok": false,
  "error": {
    "message": "package_id or package_name is required",
    "error_code": "validation_error"
  }
}
```
