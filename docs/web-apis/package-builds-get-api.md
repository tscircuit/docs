---
title: Package Builds Get API
description: Fetch build status, errors, and log stream URL for a package build
---

# `package_builds/get`

Get a package build by `package_build_id`.

Use this endpoint to poll build progress after creating a one-off build with
[`/package_builds/create`](./package-builds-create-api), and to read the
`user_code_job_log_stream_url` field for long-running build logs.

Base URL: `https://api.tscircuit.com`

## Request

### `POST /package_builds/get`

Request body:

```json
{
  "package_build_id": "77259a87-8a4f-4365-888c-45d5d70567a8"
}
```

### Fields

- `package_build_id` (required, UUID): The package build ID returned by
  [`/package_builds/create`](./package-builds-create-api).

## Example Success Response

```json
{
  "ok": true,
  "package_build": {
    "package_build_id": "77259a87-8a4f-4365-888c-45d5d70567a8",
    "package_release_id": "96cc184a-fb65-4458-8eca-488c38977a8d",
    "created_at": "2025-08-15T16:13:14.625Z",
    "build_in_progress": false,
    "transpilation_in_progress": false,
    "circuit_json_build_in_progress": false,
    "image_generation_in_progress": false,
    "transpilation_error": null,
    "circuit_json_build_error": null,
    "image_generation_error": null,
    "user_code_job_error": null,
    "user_code_job_log_stream_url": null,
    "user_code_job_completed_logs": null
  }
}
```

## Example Error Responses

### Missing `package_build_id`

```json
{
  "ok": false,
  "error": {
    "message": "`package_build_id` is required",
    "error_code": "validation_error"
  }
}
```

### Build not found

```json
{
  "error": {
    "error_code": "package_build_not_found",
    "message": "Package build not found"
  }
}
```

## Polling and log stream workflow

1. Create a build with [`POST /package_builds/create`](./package-builds-create-api).
2. Poll `POST /package_builds/get` every few seconds with the returned
   `package_build_id`.
3. While `build_in_progress` is `true`, check `user_code_job_log_stream_url`:
   - if non-null, connect to that URL to follow the long stream of logs.
4. When `build_in_progress` becomes `false`, inspect `*_error` fields and
   `user_code_job_completed_logs`.
