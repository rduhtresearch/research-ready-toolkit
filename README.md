# Back on Track Toolkit

A clean, static decision-tree web app for working through recruitment delivery issues in research studies.

## Files

- `index.html` contains the page structure.
- `styles.css` contains the refreshed NHS-leaning visual system and layout modes.
- `data.js` contains the decision-tree content and routing data.
- `app.js` contains the rendering, navigation, history log, view-mode state, and export logic.

## Run locally

No build step is required.

1. Open `index.html` directly in a browser.
2. Click through the toolkit.

Because the app uses only relative paths and plain browser JavaScript, it works from `file://` as well as a static web host.

## Features

- Toggle between `Split view` and `Focus view`.
- Review the live `Path taken` summary as you answer questions.
- Copy the journey summary to the clipboard.
- Download the pathway taken as a CSV file.

## Deploy to GitHub Pages

1. Push these files to the root of the `research-ready-toolkit` repository.
2. In GitHub, open `Settings` > `Pages`.
3. Set the source to deploy from the `main` branch root.
4. Save the settings and wait for the Pages site to publish.

The app does not require a backend, package install, build command, or external dependency.

## Editing the toolkit flow

Most future content changes should happen in `data.js`.

- Update question text, helper text, or action text inside `window.toolkitData.nodes`.
- Change routing by editing each option's `next` value.
- Update the ordered section list at the top of `data.js` if the section structure changes.
