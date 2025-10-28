---
title: Compile API
description: Compile tscircuit code into Circuit JSON through the hosted API
sidebar_position: 2
---

# compile.tscircuit.com

Compiles tscircuit user code into [Circuit JSON](https://github.com/tscircuit/circuit-json).

## API Usage

The API provides endpoints to compile tscircuit JSX/TSX code into circuit JSON.

### Compile Endpoint

#### `GET /compile`

Compile tscircuit code via GET request with compressed code parameter.

```http
GET /compile?code={compressed_code}
```

- `code`: Compressed Base64 string of tscircuit JSX/TSX code (generated using `@tscircuit/create-snippet-url`)
- Alternatively, you can use `fs_map` parameter with a compressed JSON object mapping filenames to code

**Example using fetch:**

```javascript
import { getCompressedBase64SnippetString } from "@tscircuit/create-snippet-url"

const circuitCode = `
export default () => (
  <resistor name="R1" resistance="1k" />
)`

const compressedCode = getCompressedBase64SnippetString(circuitCode)
const response = await fetch(
  `https://compile.tscircuit.com/api/compile?code=${encodeURIComponent(
    compressedCode
  )}`
)
const data = await response.json()
// data.circuit_json contains the compiled circuit
```

The response also includes a `logs` array detailing events during the compile process. The first entry records the version of `tscircuit` used for the build.

#### `POST /compile`

Compile tscircuit code via POST request with an filesystem map.

```http
POST /compile
Content-Type: application/json

{
  "fs_map": {
    "user-code.tsx": "export default () => <resistor name=\"R1\" resistance=\"1k\" />"
  }
}
```

- Request body should contain a JSON object with an `fs_map` property
- `fs_map` is an object mapping filenames to their content as strings

**Example using fetch:**

```javascript
const response = await fetch("https://compile.tscircuit.com/api/compile", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    fs_map: {
      "user-code.tsx": `
        export default () => (
          <capacitor name="C1" capacitance="10uF" />
        )
      `,
    },
  }),
})
const data = await response.json()
// data.circuit_json contains the compiled circuit
```

### Health Check

`GET /api/health`

Returns a status indicating if the service is operational. The response also includes the version of `tscircuit` used by the compile server:

```json
{
  "ok": true,
  "compile_server_health": { "tscircuit_version": "<version>" }
}
```

## Development

```bash
bun run start
```
