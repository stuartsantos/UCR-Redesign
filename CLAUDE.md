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

## Design rules

The design is called "The Steady Line": flat, calm, blue-dominant, left-aligned. Keep to these when changing anything visual.

- **Red means call.** `--red` is only for the phone number and the call buttons. Never use it for headings, links, or decoration, and never put red on blue (the contrast is too low).
- **Flat surfaces.** No gradients, box shadows, text shadows, or tinted transparent bands. Sections alternate white, `--sheet`, and solid `--blue`.
- **No illustrations or clever metaphors.** The owner rejected an abstract hero graphic as unreadable. Prefer real content (customer names, the phone number) over drawings, and plain static text over scripted effects.
- **Type.** Archivo for everything, using its width axis: `font-stretch: 68%` to `85%` on headings, normal width for text. Chivo Mono only for the phone number and the equipment tags.

## How the site fits together

- `site/index.html` is the whole site: a white top bar (`<header>`), then inside `<main>` the blue hero (headline, call card, customer names) followed by `<section class="band">` blocks. The top bar and footer navigation link to section `id`s, and `site/.htaccess` redirects the old site's pages to `#certifications`, `#careers`, and `#testimonials`, so keep those `id`s.
- `site/css/styles.css` is plain CSS, mobile first. Colors and font stacks are custom properties in `:root`. All `min-width` rules are grouped near the end under three breakpoints: 35rem, 48rem, and 62rem.
- `site/js/main.js` sets the footer year and controls the phone call bar. The page must keep working without it.
- **The call number has two forms.** `.call-number` is a red button below 35rem and large red text above it. `.call-bar` is a fixed bar shown only below 48rem; an inline script in `<head>` adds the `js` class so the bar starts hidden and `main.js` reveals it once the hero call card scrolls out of view. If `main.js` fails to load, its `onerror` removes the class so the bar is always shown.
- `index.html` uses relative asset paths, so the home page also works from a subfolder. `404.html` uses root-absolute paths because the server can return it for any URL, and the `ErrorDocument` and old-URL redirects in `.htaccess` also assume the web root.

## Things that are easy to break

- **The domain is written out in several places.** The canonical link, Open Graph tags, and JSON-LD in `index.html`, plus `sitemap.xml` and `robots.txt`, all use `https://unitedcoolingandrefrig.com/`. Change them together.
- **The phone number is repeated.** It appears in the top bar, the hero call card, the Location section, the footer, the call bar, `404.html`, and the JSON-LD block. Address, email, and fax are repeated too.
- **`.htaccess` runs on a host nobody here can test.** Keep every block inside `<IfModule>`, avoid `Options` directives, and do not block dot-paths: `/.well-known/` must stay reachable for SSL certificate renewal. Do not add an `index.html` to `/` redirect, since it loops with the directory index.
- **Fonts are self-hosted** variable fonts in `site/fonts/` (`archivo.woff2`, `chivo-mono.woff2`), preloaded in `index.html`. They are under the SIL Open Font License; keep the two `LICENSE-*.txt` files beside them.
- **Images.** Every `<img>` has `width` and `height` so the page does not shift while loading. The only tracked full-size logo is the white PNG `design/logo-white.png` (800x326); `site/img/logo-blue.png` and `logo-white.png` are recolored, resized copies of it. Vector originals (`49652_UCRNewLogoVector.eps` and `.psd`) are in the git-ignored `design/source-img/` and may not exist on a fresh clone.
- **Generated images.** `favicon.ico`, `apple-touch-icon.png`, `img/icon-192.png`, `img/social-card.jpg`, `img/logo-blue.png`, and the recolored `img/tri-state*.png` dot map were made with Pillow. The social card is set in the fonts from `site/fonts/` (Pillow can read the `.woff2` files and set their variation axes).

## Content status

Some content is unconfirmed by the business owner: the customer names in the hero, two of the three service descriptions (marked `DRAFT COPY` in the HTML), and the Careers section. `README.md` lists what to confirm. Keep that list current when changing copy.

## Not part of the site

- `archive/` is the previous multi-page site, which may still be the one live on the domain.
- `design/` holds design sources. `design/source-img/` and `design/source-fonts/` are git-ignored local originals (the UCR logo vector files, the old client logo files, and the Fairview fonts the previous design used).
- `README.md` is the handoff document for the people uploading the site. Write it for non-developers.
