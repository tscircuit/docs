---
title: tsci init
sidebar_position: 0
description: Initialize a new TSCircuit project
---

`tsci init` bootstraps a fresh project in the current directory. It creates the
basic files needed to start developing a board, including:

- `index.tsx` – your main circuit entrypoint
- `package.json` with the required dependencies
- `tsconfig.json`
- `.gitignore` and other configuration files

You can run the command interactively or pass `-y` to accept all defaults.

```bash
mkdir my-circuit
cd my-circuit
# Initialize with prompts
tsci init
# or skip prompts
tsci init -y
```

After initialization you will see a directory structure similar to the following:

```text
my-circuit/
├─ index.tsx
├─ package.json
├─ tsconfig.json
└─ tscircuit.config.json
```

import tsciInitImage from "../../static/img/tsci-init.png";
import ImageWithCaption from "../../src/components/ImageWithCaption";

<ImageWithCaption
  src={tsciInitImage}
  alt="tsci init output"
  caption="Terminal output from a successful tsci init"
/>

Next, run `tsci dev` to start the development server and view your circuit in the
browser.
