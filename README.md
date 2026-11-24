# United Cooling & Refrigeration website

The one-page website for United Cooling and Refrigeration, Inc. (Roselle, NJ), intended for `unitedcoolingandrefrig.com`.

It is a plain static site: HTML, one stylesheet, one small script, images, and fonts. There is nothing to install or build. The `site/` folder is the website.

## Uploading the site

1. **Back up the current site.** Download everything in the web root (usually `public_html`) before changing anything.
2. **Remove the old site's files** from the web root: `index.html`, `home.html`, `credentials.html`, `careers.html`, `testimonials.html`, `UCRcss.css`, and the old `UCR-Logo` images. Leave anything that is not part of the old site (for example `.well-known`, `cgi-bin`, or mail folders).
3. **Upload everything inside `site/`** into the web root, so that `index.html` sits at the top level. Upload the contents of the folder, not the folder itself.
4. **Include the hidden `.htaccess` file.** Turn on "show hidden files" in the FTP program or file manager. If the server already has an `.htaccess` with lines added by the hosting company, add this file's contents to it instead of replacing it.

To make a zip of the site to send to someone:

```bash
cd site && zip -r ../ucr-site.zip . -x "*.DS_Store"
```

### After uploading, check that

- `https://unitedcoolingandrefrig.com/` loads with the red-to-blue header and the logo.
- Headings use the tall condensed font and body text uses a serif font.
- The map at the bottom of the page appears.
- The phone and email links in the header work.
- `http://` redirects to `https://`.
- The old address `/careers.html` redirects to the Careers section.
- A made-up address such as `/abc` shows the "Page Not Found" page.

If the whole site shows a "500 Internal Server Error" right after upload, the host does not accept something in `.htaccess`. Remove that file to get the site working, then add its sections back one at a time.

## Confirm with the owner before launch

- **Benefits text.** The second and third cards under "Our Benefits" ("Turnkey Design & Installation" and "24/7/365 Repair Service") are drafts written from the previous site's content. They are marked with a `DRAFT COPY` comment in `site/index.html`.
- **Careers section.** The technician opening and the fax number (908-241-0202) were carried over from the previous site. Remove the section, and its link in the navigation, if the position is filled.
- **Contact email.** The page uses `info@unitedcoolingandrefrig.com`. The previous site listed `manny@unitedcooling.co` and `john@unitedcooling.co`. Make sure the `info@` mailbox exists and is read.
- **Testimonials.** Two typos in the quoted text were corrected: "has always been outstanding" and "I fully recommend".
- **Web address.** The page names `https://unitedcoolingandrefrig.com/` (without `www`) as its official address. To use `www` instead, change it in `site/index.html`, `site/sitemap.xml`, and `site/robots.txt`.

## Outside accounts the site relies on

These were set up under Stuart Santos's personal accounts. The site keeps working if they go away, with the effects noted.

| What | Where it is used | If it stops working |
| --- | --- | --- |
| Adobe Fonts kit `xoj2bcj` | Body text font (Adelle) | Text falls back to Georgia |
| Google Maps Embed API key | The map under "Our Location" | The map area shows an error |
| Google Search Console tag | `google-site-verification` line in `index.html` | Only affects Search Console access |

## Making changes

- Text and page structure: `site/index.html`
- Colors, fonts, and layout: `site/css/styles.css` (colors are listed at the top)
- Images: `site/img/`. Logos that come as PNG have a second `@2x` file at double size for sharp screens.

Text edits appear as soon as the file is uploaded. Returning visitors may keep an older copy of the stylesheet for up to a week.

To preview on your own computer:

```bash
python3 -m http.server 4000 --directory site
```

Then open `http://localhost:4000`.

## What is in this repository

| Folder | Contents |
| --- | --- |
| `site/` | The website. This is the only folder that gets uploaded. |
| `archive/` | The previous multi-page site, kept for reference. |
| `design/` | Design sources: the Sketch file, logo art, and the original web font kit. |
