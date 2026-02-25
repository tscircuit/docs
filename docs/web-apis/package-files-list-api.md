---
title: Package Files List API
description: List files in a package release from the tscircuit registry API
---

# `package_files/list`

List all files for a package release.

Base URL: `https://api.tscircuit.com`

Auth header:

```http
Authorization: Bearer <your_token>
```

## Request

### `POST /package_files/list`

You can identify the package in several ways. Use one of the following request body shapes.

```json
{
  "package_name_with_version": "<owner>/<package_name>@<version>"
}
```

```json
{
  "package_release_id": "<package_release_id>"
}
```

```json
{
  "package_name": "<owner>/<package_name>",
  "use_latest_version": true
}
```

```json
{
  "package_id": "<package_id>",
  "use_latest_version": true
}
```

## Example Success Response

```json
{
  "ok": true,
  "package_files": [
    {
      "package_file_id": "pkgfile_12345678-aaaa-bbbb-cccc-1234567890ab",
      "package_release_id": "pkgrls_12345678-aaaa-bbbb-cccc-1234567890ab",
      "file_path": "index.tsx",
      "content_mimetype": "text/plain",
      "created_at": "2026-01-15T12:34:56.000Z"
    },
    {
      "package_file_id": "pkgfile_87654321-dddd-eeee-ffff-0987654321ba",
      "package_release_id": "pkgrls_12345678-aaaa-bbbb-cccc-1234567890ab",
      "file_path": "README.md",
      "content_mimetype": "text/markdown",
      "created_at": "2026-01-15T12:34:56.000Z"
    }
  ]
}
```

## Example Error Responses

Missing/invalid request body:

```json
{
  "ok": false,
  "error": {
    "message": "Invalid input",
    "error_code": "validation_error"
  }
}
```

Package release not found:

```json
{
  "error": {
    "error_code": "package_release_not_found",
    "message": "Package release not found"
  }
}
```
