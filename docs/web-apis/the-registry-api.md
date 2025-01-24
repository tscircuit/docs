---
title: The Registry API
---

The tscircuit Registry API is an extension of the NPM Registry API that allows for additional features, such as building Circuit JSON in the cloud, automatic bundling to ESM and CommonJS, and more versioning automations.

## Using the tscircuit NPM Registry

The [regular public NPM registry API](https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md) is available via `npm.tscircuit.com`. You can install endpoints from this registry
by adding the following line to your `.npmrc` (or in
any project with a `package.json` file)

```
@tsci:registry=https://npm.tscircuit.com
```

This line says "any package starting with @tsci should
go to the tscircuit registry instead of the npm registry"

So you can now do `bun add @tsci/seveibar.usb-c-flashlight` to install that
circuit to your npm project!

## tscircuit Package Format

Every tscircuit package is in the format `@tsci/<author>.<package_name>` to
avoid conflicts with other npm packages.

## Advanced Bundling Endpoints

tscircuit runs an ESM and CJS bundling service, you can use these
services to get a bundled version of any circuit, this is great
for dynamic loading and execution, e.g. we use it in our [tscircuit/import](https://github.com/tscircuit/import) module!

## Advanced Registry Endpoints

You can use your tscircuit CLI token to use the advanced API at `https://registry-api.tscircuit.com`.

You can get a tscircuit auth token with `tsci auth get-token`. After you get this token, you just need to add the `Authorization: Bearer ${token}` header to each API request.

The following endpoints are available:

| Endpoint                   | Purpose                                                      |
| -------------------------- | ------------------------------------------------------------ |
| `/package_files/list`      | List all the files in a package                              |
| `/package_files/create`    | Add a file to a package                                      |
| `/package_files/download`  | Download a file from a package                               |
| `/packages/search`         | Search for a package                                         |
| `/packages/list`           | List your packages                                           |
| `/package_releases/create` | Create a new release (version) of a package                  |
| `/package_releases/update` | Update a package release, e.g. to lock it from modifications |
| `/package_releases/get`    | Get a package release                                        |
| `/package_releases/list`   | List package releases for a package                          |

More information about our Advanced Registry API is coming soon, including a full OpenAPI specification!

## Advanced Autorouting Endpoints

You can also use the registry to perform autorouting jobs for a
[Circuit JSON](https://github.com/tscircuit/circuit-json) file.

| Endpoint                       | Purpose                              |
| ------------------------------ | ------------------------------------ |
| `/autorouting/jobs/create`     | Create a new autorouting job         |
| `/autorouting/jobs/get`        | Get the status of an autorouting job |
| `/autorouting/jobs/get_output` | Get the output of an autorouting job |
