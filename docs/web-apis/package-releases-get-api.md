---
title: Package Releases Get API
description: Get one package release, including the latest release, from the tscircuit registry API
---

# `package_releases/get`

Get a single package release.

Base URL: `https://api.tscircuit.com`

Auth header:

```http
Authorization: Bearer <your_token>
```

## Request

### `POST /package_releases/get`

Use one of the following request body shapes:

```json
{
  "package_release_id": "<package_release_id>"
}
```

```json
{
  "package_name_with_version": "<owner>/<package_name>@<version>"
}
```

```json
{
  "package_name": "<owner>/<package_name>",
  "is_latest": true
}
```

## Example Success Response

```json
{
  "ok": true,
  "package_release": {
    "package_release_id": "pkgrls_12345678-aaaa-bbbb-cccc-1234567890ab",
    "package_id": "pkg_12345678-aaaa-bbbb-cccc-1234567890ab",
    "version": "0.4.2",
    "is_latest": true,
    "is_locked": false,
    "created_at": "2026-01-15T12:34:56.000Z"
  }
}
```

## Example Error Response

```json
{
  "error": {
    "error_code": "package_release_not_found",
    "message": "Package release not found"
  }
}
```
