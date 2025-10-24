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

Run `tsci auth --help` to see other auth functions, such as printing your token
for use with the [Registry API](../web-apis/the-registry-api.md)
