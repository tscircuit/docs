---
title: tsci login
description: Sign in to the tscircuit registry to enable publishing and cloud tools
sidebar_position: 1
---

`tsci login` allows you to login to the tscircuit registry. You don't need to
login to tscircuit to use any tools, but logging in does enable the following
great features:

- Cloud Autorouting (`autorouter="auto-cloud"`)
- Package Management (publishing and automatic bundling)

:::info
You don't need a tscircuit account to download and use other people's packages
:::

`tsci login` will take you to a login page where you'll sign in with Github.
After the login flow you'll have have token on your machine that authenticates
you to publish packages or use the cloud autorouter.

## Logout

To logout again, just run `tsci logout`

## Other Auth Functions

Run `tsci auth --help` to see all available auth subcommands.

### `tsci auth whoami`

Show information about the currently authenticated user, including your tscircuit handle, email, account ID, and session details.

```bash
tsci auth whoami
```

### `tsci auth set-token`

Manually set your authentication token (must be a valid JWT).

```bash
tsci auth set-token <token>
```

### `tsci auth setup-npmrc`

Configure your global `.npmrc` file with authentication for tscircuit private packages. You must be logged in first.

```bash
tsci auth setup-npmrc
```

See also: [`tsci auth print-token`](./tsci-auth-print-token.md) for printing your token for use with the [Registry API](../web-apis/the-registry-api.md).
