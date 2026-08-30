---
title: Report an Autorouter Bug
description: Learn how to report an autorouter bug so that the tscircuit team can fix it.
---

import YouTubeEmbed from '../../src/components/YouTubeEmbed';

## Overview

An autorouter bug report contains the input for one routing phase so that the
autorouting developers can reproduce and debug the problem. You can submit a
report from the tscircuit interface or the command line.

## Reporting from the tscircuit interface

Go to `Errors -> Open Autorouter Log -> Report Bug` and select the routing log
that shows the problem.

When you report a bug, your autorouting data is sent to the tscircuit API so
that the autorouting developers can debug the issue.

<YouTubeEmbed youtubeId="lXedg8mlP1s" />

## Reporting from the command line

First, sign in to tscircuit:

```bash
tsci login
```

Build the circuit and save the input for the failed autorouting phase:

```bash
tsci build index.circuit.tsx --autorouter-dump-srj failed
```

An autorouter failure can make the build exit with an error, but the captured
input is still written to `dist/autorouter-debug`. Use the phase number shown in
the command output to report that input:

:::warning Public bug reports

Autorouter bug reports are public. Anyone can list a report and download its
Simple Route JSON file. The file contains connection names, obstacles, and
board routing geometry, so inspect it before uploading if the design is
sensitive. Your project source files are not uploaded.

:::

```bash
tsci report autorouter \
  dist/autorouter-debug/phase-0.input.simple-route.json \
  --title "Router fails near the USB connector"
```

The command prints a bug-report URL. Share that URL with the tscircuit team.
It asks you to confirm the public upload; pass `--yes` when running
non-interactively.

If routing completes but the result is incorrect, use
`--autorouter-dump-srj all` instead, then report the input for the affected
phase. You can use `tscircuit` in place of `tsci` for any of these commands.
Run `tsci upgrade` if `report` is not listed in `tsci --help`.

## Simulating your bug with the Autorouting Debugger

After you've created a bug report, you can take things a step further by
downloading your reproduction to the codebase. To do this, you should do
the following:

1. Clone the [tscircuit-autorouter](https://github.com/tscircuit/tscircuit-autorouter) repository.
2. Run `bun i` to install the dependencies.
3. Run `bun run bug-report <url-to-your-bug-report>` to download the reproduction. This will output the name of your bug report directory.
4. Run `bun run start` and search for your bug report directory, it will
   appear inside the autorouting debugger.

## Helping Contributors solve your autorouting bug

- [Create a high density solving fixture for your problem](https://youtu.be/cANWCNp_ggg)
