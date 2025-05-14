---
title: Report an Autorouter Bug
description: Learn how to report an autorouter bug so that the tscircuit team can fix it.
---

## Overview

You can report autorouter bugs by going to `Errors -> Open Autorouter Log -> Report Bug` inside the tscircuit interface.

When you report a bug, your autorouting data is sent to the tscircuit API so that the autorouting developers can debug the issue.

<iframe width="560" height="315" src="https://www.youtube.com/embed/lXedg8mlP1s?si=FxZ_JWLuqmBinYkg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Simulating your bug with the Autorouting Debugger

After you've created a bug report, you can take things a step further by
downloading your reproduction to the codebase. To do this, you should do
the following:

1. Clone the [tscircuit-autorouter](https://github.com/tscircuit/tscircuit-autorouter) repository.
2. Run `bun i` to install the dependencies.
3. Run `bun run bug-report <url-to-your-bug-report>` to download the reproduction. This will output the name of your bug report directory
4. Run `bun run start` and search for your bug report directory, it will
   appear inside the autorouting debugger.
