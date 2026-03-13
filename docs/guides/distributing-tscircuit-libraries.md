---
title: Distributing tscircuit Libraries
description: Publish and distribute tscircuit libraries, including how to make private package builds installable without authorization.
---

## Overview

tscircuit libraries are typically distributed from a published package page on
[tscircuit.com](https://tscircuit.com). In many cases you want the package to
stay private while still allowing downstream tools and users to install the
generated distribution files.

You can do that by turning on **Enable Public Dist** in the package settings.
This keeps the package private while making the built distribution artifacts
publicly fetchable, which means they can be installed without authorization.

## When to Enable Public Dist

Enable **Public Dist** when:

- You want to keep the package itself private on tscircuit.com
- You still want consumers to install the package's built outputs
- You need unauthenticated access for package distribution flows

This is especially useful for library distribution workflows where the install
step needs to succeed without a signed-in tscircuit session.

## How to Enable Public Dist

1. Open your package page on [tscircuit.com](https://tscircuit.com).
2. Go to the package **Settings** page.
3. Turn on **Enable Public Dist**.
4. Save the setting if prompted.

<figure>
  <img
    src="/img/guides/distributing-tscircuit-libraries/enable-public-dist.png"
    alt="Enable Public Dist option in the tscircuit package settings page"
  />
  <figcaption>
    The package settings page includes an <strong>Enable Public Dist</strong>
    option for exposing distribution artifacts without requiring authorization.
  </figcaption>
</figure>

## Result

After **Enable Public Dist** is turned on, the package's distribution artifacts
can be installed without authorization even if the package remains private.
Use this when you want private package management with public, installable build
outputs.
