# Vismaya M — Operator Console

A personal portfolio site, styled as a systems/telemetry console rather than a
generic template — because the underlying work (sensor fusion, real-time
pipelines, dashboards) actually looks like this.

No framework, no build step: hand-written HTML, CSS and vanilla JS.

## Structure

```
index.html                 → all page content/sections
assets/css/style.css        → design system (colors, layout, components)
assets/js/main.js           → clock, nav scrollspy, radar chart, reveal-on-scroll, clipboard copy
assets/files/Vismaya_M_Resume.pdf → downloadable resume (update this file to refresh the download)
assets/img/profile.jpg      → headshot used in the ID card (add this file; falls back to "NO SIGNAL" if missing)
```

## Editing content

Everything is plain HTML in `index.html` — search for the section by its
`id` (`profile`, `modules`, `ops-log`, `subsystems`, `credentials`, `uplink`)
and edit the markup directly. Project "modules" are self-contained
`<article class="module-card">` blocks including their own inline SVG
architecture diagram — copy a whole block to add a new project.

To add a project's live repo link, replace the placeholder tag inside its
`.module-links` div, e.g.:

```html
<div class="module-links" data-repo-slot="flashrescue">
  <a class="tag tag-cyan" href="https://github.com/you/flashrescue" target="_blank" rel="noopener">VIEW REPO ↗</a>
</div>
```

## Running locally

Just open `index.html` in a browser — no server required. If you want live
reload while editing, any static file server works, e.g.:

```
npx serve .
```

## Deploying

This is a static site, so any of these work with zero config:

- **GitHub Pages** — push this folder to a repo, enable Pages on the `main`
  branch.
- **Vercel / Netlify** — drag-and-drop the folder or connect the repo; no
  build command needed (root = output directory).
