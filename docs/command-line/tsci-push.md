---
title: tsci push
sidebar_position: 2
description: |
  tsci push uploads your package to the tscircuit registry for module re-use
---

import Terminal from "@site/src/components/terminal"
import pushTranscript from "@site/src/data/terminals/push.json"


tscircuit code, like React code, is distributed as a "package". `tsci push` uploads your package to the [tscircuit registry](https://tscircuit.com/trending) to enable sharing with your team.

After publishing, you can use the [tsci add](https://docs.tscircuit.com/command-line/tsci-add) command to install your package as part of a larger circuit.

## Usage

```bash
tsci push [options]
```

## Options

- `--compress` – Compresses the payload before upload. This is useful for large projects and slower connections because it reduces upload size.

After running `tsci push` you can see your package on your tscircuit registry page. Packages default to private visibility, but you can change this from your registry page to enable sharing your package with the broader ecosystem.

import registrySnippetImage from "../../static/img/registry-snippet.png"
import ImageWithCaption from "../../src/components/ImageWithCaption";

<Terminal {...pushTranscript} />

<ImageWithCaption
  src={registrySnippetImage}
  alt="snippet in registry"
  caption="Browser view of the package in the tscircuit Registry"
/>
