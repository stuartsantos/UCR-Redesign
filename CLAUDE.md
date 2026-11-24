# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page static marketing site for United Cooling and Refrigeration (UCR). The project is archived: the Grunt/Compass build tooling was deliberately removed (commit `ed646fa`) because its dependency tree caused constant Dependabot alerts. Do not reintroduce a `package.json`, Grunt, or other npm build tooling unless asked.

## No build, lint, or test commands

There is no `package.json`, no build step, no linter, and no tests. `build/` is committed and is the deployable site.

Because nothing regenerates `build/` from `src/`, a change to the site must be applied by hand to both the source file and every built counterpart, or they drift apart:

| Source | Built output (all committed) | How it was produced |
| --- | --- | --- |
| `src/html/index.html` | `build/index.html` | HTML minified (comments removed, whitespace collapsed) to a single line |
| `src/sass/styles.scss` + `partials/` | `build/css/styles.css` and `build/css/styles.min.css` | Compass compile, then autoprefixer, then cssmin |
| `src/js/main.js` | `build/js/main.js` (plain copy) and `build/js/main.min.js` (uglified) | |

The page loads only `css/styles.min.css` and `js/main.min.js`, so the minified files are the ones that matter in production.

To preview, serve `build/` as the web root (for example `python3 -m http.server 4000 --directory build`). Opening `build/index.html` from the filesystem breaks most images, because the markup mixes relative paths (`img/logo-small.png`) with root-absolute ones (`/img/...`).

## Sass

`src/sass/styles.scss` is the only entry point. It imports Compass, then `_variables`, `_reset`, and the page partials in order.

- The Sass depends on Compass and cannot be compiled with plain Dart Sass as written: it uses `@import 'compass'` and the Compass mixins `flexbox(...)`, `flex(...)`, and `background-image(linear-gradient(...))`.
- Colors, font stacks, and breakpoints live in `partials/_variables.scss`. Responsive rules use the `breakpoint($name)` mixin (min-width, mobile first) with the names `sub-tablet`, `tablet`, `sub-desktop`, and `desktop`.
- `partials/_icons.scss` is the full generated IcoMoon class list; the page uses only a few `icon-*` classes.
- `@font-face` URLs are written relative to the compiled CSS (`font/...`), so they resolve to `build/css/font/`, not to `src/font/`.

## Fonts and assets

- Headline fonts (Fairview Regular and Small Caps) and the IcoMoon icon font are self-hosted in `build/css/font/`. The body serif (`adelle`) comes from Adobe Typekit, loaded non-blocking via `rel="preload"` with a `<noscript>` fallback.
- `src/img/` and `src/font/` are git-ignored design sources (EPS, PSD, OTF). The images the site serves are the tracked copies in `build/img/`, so add or replace site images there.
- Raster logos ship as `name.png` plus `name@2x.png` and are referenced with `srcset`.

## Deployment-related files

- `build/.htaccess` is Apache config: caching, gzip, an HTTP to HTTPS redirect hardcoded to `stuartsantos.com`, and extensionless-URL rewriting. `build/other/.htaccess` is the same file with the redirect pointed at `test.stuartsantos.com`.
- `build/php/email.php` is a legacy contact-form mail handler. Nothing on the current page posts to it.
- `build/sitemap.xml` is an empty file.

## Not part of the site

- `archive/` is the original pre-redesign site, kept for reference.
- `webfontkit-20150331-065016/`, `tristate.sketch`, `tristate.png`, and `ucrlogo.png` are design and font-kit source material.
- `node_modules/` and `.sass-cache/` may exist locally as git-ignored leftovers from the removed tooling; nothing uses them.
