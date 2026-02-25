---
title: Finding Package Releases
description: How to find package IDs, package release IDs, and latest releases in the tscircuit registry API
---

# Finding package release IDs

When calling `package_files` endpoints, you may need one of these values:

- `package_id`
- `package_release_id`
- `package_name_with_version` (for example, `<owner>/<package>@<version>`)

Base URL: `https://api.tscircuit.com`

Auth header:

```http
Authorization: Bearer <your_token>
```

## 1) Find a package

Use `POST /packages/search`.

```json
{
  "query": "<package search text>"
}
```

Example response:

```json
{
  "ok": true,
  "packages": [
    {
      "name": "<owner>/<package_name>",
      "package_id": "pkg_12345678-aaaa-bbbb-cccc-1234567890ab",
      "latest_package_release_id": "pkgrls_12345678-aaaa-bbbb-cccc-1234567890ab",
      "latest_version": "0.4.2"
    }
  ]
}
```

You can often stop here if you only need the latest release, since `latest_package_release_id` is included.

## 2) Get the latest package release

Use `POST /package_releases/get` with `is_latest: true`.

```json
{
  "package_name": "<owner>/<package_name>",
  "is_latest": true
}
```

Example response:

```json
{
  "ok": true,
  "package_release": {
    "package_release_id": "pkgrls_12345678-aaaa-bbbb-cccc-1234567890ab",
    "package_id": "pkg_12345678-aaaa-bbbb-cccc-1234567890ab",
    "version": "0.4.2",
    "is_latest": true,
    "created_at": "2026-01-15T12:34:56.000Z"
  }
}
```

## 3) List all releases for a package

Use `POST /package_releases/list`.

Request by package name:

```json
{
  "package_name": "<owner>/<package_name>"
}
```

Or by package ID:

```json
{
  "package_id": "pkg_12345678-aaaa-bbbb-cccc-1234567890ab"
}
```

Example response:

```json
{
  "ok": true,
  "package_releases": [
    {
      "package_release_id": "pkgrls_11111111-aaaa-bbbb-cccc-1234567890ab",
      "version": "0.4.1",
      "is_latest": false,
      "created_at": "2026-01-10T09:00:00.000Z"
    },
    {
      "package_release_id": "pkgrls_12345678-aaaa-bbbb-cccc-1234567890ab",
      "version": "0.4.2",
      "is_latest": true,
      "created_at": "2026-01-15T12:34:56.000Z"
    }
  ]
}
```

## 4) Build `package_name_with_version`

Combine the package name and version from the responses above:

```text
<owner>/<package_name>@<version>
```

Example:

```text
example-user/example-package@0.4.2
```

You can then use that value in `package_files/list` and `package_files/download`.
