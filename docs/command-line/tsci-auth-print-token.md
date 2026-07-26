---
title: tsci auth print-token
description: Print your current tscircuit API token for use with web services
---

## Usage

```bash
tsci auth print-token
```

Make sure you have previously logged in with [`tsci login`](./tsci-login.md). The command will output a token string that you can pass in the `Authorization: Bearer <token>` header of API requests.
