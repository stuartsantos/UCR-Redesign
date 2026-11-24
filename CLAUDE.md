# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page static marketing site for United Cooling and Refrigeration (UCR), the owner's father's HVAC/R business in Roselle, NJ. It is handed to non-developers who upload it to shared hosting for `unitedcoolingandrefrig.com`, so it must stay simple: no build step, no dependencies, readable files.

## No build, lint, or test commands

`site/` is the deployable site and the only source of truth. Edit the files in it directly. There is no `package.json`, bundler, minifier, or test suite, and none should be added unless asked. The old Grunt/Compass/Sass pipeline was removed on purpose.

To preview, serve `site/` as the web root:

```bash
python3 -m http.server 4000 --directory site
```

`.claude/launch.json` defines the same server as the `site` preview configuration. This server ignores `.htaccess`. To exercise the redirect and header rules, run macOS's built-in Apache (`/usr/sbin/httpd -f <temp conf>`) against a copy of `site/` outside `~/Documents`, because the system `httpd` is not allowed to read that folder.

## How the site fits together

- `site/index.html` is the whole site. Sections are `<section class="band">` blocks whose `<h2>` carries the `id` that the `.links` navigation points to. Adding or removing a section means updating that navigation, and `site/.htaccess` if an old-URL redirect targets it.
- `site/css/styles.css` is plain CSS, mobile first. Colors and font stacks are custom properties in `:root`. All `min-width` rules are grouped near the end under four breakpoints: 590, 730, 850, and 981px.
- `site/js/main.js` only sets the footer year and toggles the back-to-top button.
- Icons in the Benefits cards are inline SVG. The two gears share one path through `<use href="#gear-shape">`. The paths came from an icon font, which is why each has a `matrix(1 0 0 -1 0 960)` flip.
- `index.html` uses relative asset paths so the site also works from a subfolder. `404.html` uses root-absolute paths because the server can return it for any URL.

## Things that are easy to break

- **The domain is written out in several places.** The canonical link, Open Graph tags, and JSON-LD in `index.html`, plus `sitemap.xml` and `robots.txt`, all use `https://unitedcoolingandrefrig.com/`. Change them together.
- **Contact details are repeated.** Address, phone, email, and fax appear in the header, the Careers section, the footer, `404.html`, and the JSON-LD block.
- **`.htaccess` runs on a host nobody here can test.** Keep every block inside `<IfModule>`, avoid `Options` directives, and do not block dot-paths: `/.well-known/` must stay reachable for SSL certificate renewal. Do not add an `index.html` to `/` redirect, since it loops with the directory index.
- **Fonts.** Headline fonts (Fairview Regular and Small Caps) are self-hosted in `site/fonts/` and preloaded in `index.html`. The body font (Adelle) loads from an Adobe Fonts kit using a non-blocking `rel="preload"` swap with a `<noscript>` fallback.
- **Images.** Raster logos ship as `name.png` plus `name@2x.png` and are referenced with `srcset`. Every `<img>` has `width` and `height` so the page does not shift while loading.
- **Generated images.** `favicon.ico`, `apple-touch-icon.png`, `img/icon-192.png`, and `img/social-card.jpg` were composed with Pillow from `img/logo-large.png` on the header's red-to-blue gradient. The social card also uses the Fairview OTF files in `design/source-fonts/`, which are git-ignored and may not exist on a fresh clone.

## Content status

Some copy is unconfirmed by the business owner: the second and third Benefits cards (marked `DRAFT COPY` in the HTML) and the Careers section. `README.md` lists what to confirm. Keep that list current when changing copy.

## Not part of the site

- `archive/` is the previous multi-page site, which may still be the one live on the domain.
- `design/` holds design sources. `design/source-img/` and `design/source-fonts/` are git-ignored local originals.
- `README.md` is the handoff document for the people uploading the site. Write it for non-developers.
