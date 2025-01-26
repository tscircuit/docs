---
title: Understanding Fabrication Files
---

## Overview

Fabrication files are files that can be uploaded to a fabricator or turn-key
manufacturer to get an entire circuit board made. tscircuit includes three
main types of files inside our fabrication files `zip`:

- **Gerbers** These represent each copper layer of the PCB. We also include
  drilling holes and board cutouts
- **Bill Of Materials CSV**
- **Pick'n'Place CSV** These

## How to get fabrication files

### Web

On the web, you can just hit "Download" on any circuit, then hit "Fabrication Files"

<figure>
<img src="/img/online-editor-download.png" alt="Online Editor Download Button" />
<figcaption>Downloading fabrication files from the online editor</figcaption>
</figure>

### CLI

You can run [tsci export ./main.tsx --to fabrication-zip](../command-line/tsci-export) to export to a fabrication files zip file containing Gerbers, Bill of Materials and
the Pick'n'Place CSV.

## Uploading Fabrication Files

<figure>
<img className="img-rounded" src="/img/jlcpcb-upload.png" />
<figcaption>Many fabricators allow you to directly drop fabrication files on their website!</figcaption>
</figure>
