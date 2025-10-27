---
title: tsci auth print-token
description: Print your current tscircuit API token for use with web services
---

`tsci auth print-token` prints your current tscircuit API token. This token can be used with the advanced web APIs such as the [Datasheet API](../web-apis/datasheet-api.md).

## Usage

```bash
tsci auth print-token
```

Make sure you have previously logged in with [`tsci login`](./tsci-login.md). The command will output a token string that you can pass in the `Authorization: Bearer <token>` header of API requests.
