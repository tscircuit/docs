---
title: Using tscircuit KiCad PCM URLs
description: >-
  Install tscircuit component libraries directly into KiCad using the Plugin and
  Content Manager (PCM) with cloud-hosted repository URLs.
---

## Overview

tscircuit packages can be installed directly into KiCad using the **Plugin and Content Manager (PCM)**. Each published tscircuit package includes a KiCad PCM URL that points to a repository hosted on `tscircuit.app` containing the symbols, footprints, and 3D models for all components in the package.

This guide walks you through the process of adding a tscircuit package to KiCad using the PCM URL.

## Step 1: Find the KiCad PCM URL

Navigate to your tscircuit package page on [tscircuit.com](https://tscircuit.com). In the **Releases** section on the right sidebar, you'll find a **KiCad PCM URL** link.

![Find the KiCad PCM URL link on the tscircuit package page](/img/guides/using-pcm-url/01-find-pcm-url-on-package-page.png)

## Step 2: Copy the Repository URL

Click the **KiCad PCM URL** link to open the repository JSON file in your browser. Copy the full URL from the address bar.

![Copy the repository URL from the browser address bar](/img/guides/using-pcm-url/02-copy-repository-url.png)

## Step 3: Add the Repository in KiCad PCM

1. Open KiCad and go to **Tools > Plugin and Content Manager**
2. Click the **Manage...** button in the top-right corner
3. In the "Manage Repositories" dialog, click the **+** button to add a new repository
4. Paste the repository URL you copied and click **OK**
5. Click **Save** to save the repository configuration

![Add the repository URL in KiCad's Plugin and Content Manager](/img/guides/using-pcm-url/03-add-repository-in-kicad-pcm.png)

## Step 4: Select the Repository

After saving, use the repository dropdown at the top-left of the PCM window to select your newly added tscircuit repository.

![Select the tscircuit repository from the dropdown](/img/guides/using-pcm-url/04-select-repository-from-dropdown.png)

## Step 5: Install the Library

1. Navigate to the **Libraries** tab
2. Select the tscircuit library package from the list
3. Click the **Install** button
4. Click **Apply Pending Changes** at the bottom of the window to begin the installation

![Install the library from the Libraries tab](/img/guides/using-pcm-url/05-install-library-from-libraries-tab.png)

The download progress will be displayed:

![Download progress showing successful installation](/img/guides/using-pcm-url/06-download-complete.png)

## Step 6: Verify Installation

Once the installation is complete, switch to the **Installed** tab to verify that the library appears in your installed packages list.

![Library appears in the Installed tab](/img/guides/using-pcm-url/07-library-installed-successfully.png)

## Step 7: Use the Library in Your Project

The library is now ready to use in your KiCad projects. Open the **Schematic Editor** and use **Add Symbol** (shortcut: `A`) to browse and place components from the installed library.

The components will appear under a library name prefixed with `PCM_` (e.g., `PCM_jlc100`).

![Using the tscircuit library components in KiCad's Schematic Editor](/img/guides/using-pcm-url/08-use-library-in-schematic.png)
