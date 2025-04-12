---
title: Understanding Fabrication Files
description: Fabrication files are files that can be uploaded to a fabricator or turn-key
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

On the web, you can just hit "Download" or "Export" on any circuit, then hit "Fabrication Files"

<figure>
<img src="/img/online-editor-download.png" alt="Online Editor Download Button" />
<figcaption>Downloading fabrication files from the online editor</figcaption>
</figure>

### CLI

The easiest way to get fabrication files is to go to `File > Export > Fabrication Files`
in the web browser after doing `tsci dev`

<figure>
<img src="/img/tsci-dev-export.png" alt="CLI Export Button" />
<figcaption>Downloading fabrication files from the online editor</figcaption>
</figure>

## What's inside the zip file?

The zip file contains three types of files:

- `gerbers` Describes the copper layers of your PCB
- `bill-of-materials.csv` This is a csv file with the components in the circuit and their
  quantity.
- `pick-n-place.csv` This is a csv file with the components in the circuit and their
  position on the board.

<figure>
<img className="img-rounded" src="/img/jlcpcb-upload.png" />
<figcaption>Many fabricators allow you to directly drop fabrication files on their website!</figcaption>
</figure>
