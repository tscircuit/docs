---
title: Package Builds Create API
description: Create one-off builds for a package release, including optional prop injection
---

# `package_builds/create`

Create a one-off package build from an existing package release.

This endpoint is useful when you want to rebuild a published release with runtime
props injected into the build command (without changing the release's active
build).

Base URL: `https://api.tscircuit.com`

Auth header:

```http
Authorization: Bearer <your_token>
```

## Request

### `POST /package_builds/create`

Request body:

```json
{
  "package_release_id": "<uuid>",
  "props_to_inject": {
    "resistance": "10k",
    "nested": {
      "ledColor": "green"
    }
  }
}
```

### Fields

- `package_release_id` (required, UUID): The package release to build from.
- `props_to_inject` (optional, object): Arbitrary JSON object written to
  `props.json` and passed to the build process with
  `--inject-props-file props.json`.

## Example Success Response

```json
{
  "ok": true,
  "package_build_id": "3ab679fa-09bc-4c66-8fd8-b3a4f2d262f8"
}
```

## Example Error Responses

### Package release not found

```json
{
  "error": {
    "error_code": "package_release_not_found",
    "message": "Package release not found"
  }
}
```

### No permission to manage package

```json
{
  "error": {
    "error_code": "forbidden",
    "message": "You do not have permission to create a build for this package release"
  }
}
```

## Notes

- This endpoint requires a logged-in session authorized to manage the package's
  owner org.
- Builds created with this endpoint are queued as one-off package builds and do
  not update `active_package_build_id` on the package release.
- Use [`/package_builds/get`](./package-builds-get-api) with the returned
  `package_build_id` to poll status and read `user_code_job_log_stream_url`.
