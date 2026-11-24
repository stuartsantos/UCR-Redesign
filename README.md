# United Cooling & Refrigeration website

The one-page website for United Cooling and Refrigeration, Inc. (Roselle, NJ), intended for `unitedcoolingandrefrig.com`.

It is a plain static site: HTML, one stylesheet, one small script, images, and fonts. There is nothing to install or build. The `site/` folder is the website.

## Uploading the site

1. **Check that secure browsing works.** Open `https://unitedcoolingandrefrig.com/` on the current site. It should load without a certificate warning. If it shows one, turn on the host's free SSL certificate before uploading, because the new site sends every visitor to the `https://` address.
2. **Back up the current site.** Download everything in the web root (usually `public_html`) before changing anything.
3. **Remove the old site's files** from the web root: `index.html`, `home.html`, `credentials.html`, `careers.html`, `testimonials.html`, `UCRcss.css`, and the old `UCR-Logo` images. Leave anything that is not part of the old site (for example `.well-known`, `cgi-bin`, or mail folders).
4. **Upload everything inside `site/`** into the web root, so that `index.html` sits at the top level. Upload the contents of the folder, not the folder itself. The site is meant for the web root: in a subfolder the home page still works, but the "Page not found" page and the redirects from old addresses do not.
5. **Include the hidden `.htaccess` file.** Turn on "show hidden files" in the FTP program or file manager. If the server already has an `.htaccess` with lines added by the hosting company, add this file's contents to it instead of replacing it.

To make a zip of the site to send to someone:

```bash
cd site && zip -r ../ucr-site.zip . -x "*.DS_Store"
```

### After uploading, check that

- `https://unitedcoolingandrefrig.com/` loads with a white bar holding the blue UCR logo, then a solid blue area with the headline "24-Hour Commercial HVAC/R Service".
- The phone number in the white card is red, and the customer names are listed beside it (below it on a phone).
- The headline is in a bold, narrow typeface. If it looks like plain Arial, the `fonts` folder did not upload.
- The map at the bottom of the page appears.
- The phone and email links work.
- On a phone, a red "Call" bar appears at the bottom of the screen after scrolling past the first call button.
- `http://` redirects to `https://`.
- The old address `/careers.html` redirects to the Careers section.
- A made-up address such as `/abc` shows the "Page not found" page.

If the whole site shows a "500 Internal Server Error" right after upload, the host does not accept something in `.htaccess`. Remove that file to get the site working, then add its sections back one at a time.

If visitors get a "connection is not private" or certificate error, the host has no working SSL certificate. Delete the first block under "Redirects" in `.htaccess` (the five lines that send `http://` to `https://`) until SSL is turned on.

## Confirm with the owner before launch

- **Customer names.** Ten customers are listed at the top of the page. Confirm each is a current customer and is named the way that company is known today.
- **Services text.** "24/7/365 Repair Service" and "Turnkey Design & Installation" are drafts written from the previous site's content, and the sentence in the white card above the phone number reuses the first of them. All three places are marked with a `DRAFT COPY` comment in `site/index.html`.
- **Careers section.** The technician opening and the fax number (908-241-0202) were carried over from the previous site. Remove the section, and its links in the top bar and footer, if the position is filled.
- **Contact email.** The page uses `info@unitedcoolingandrefrig.com`. The previous site listed `manny@unitedcooling.co` and `john@unitedcooling.co`. Make sure the `info@` mailbox exists and is read.
- **Testimonials.** Two typos in the quoted text were corrected: "has always been outstanding" and "I fully recommend". Confirm the people and company names are still how they should appear.
- **Web address.** The page names `https://unitedcoolingandrefrig.com/` (without `www`) as its official address. To use `www` instead, change it in `site/index.html`, `site/sitemap.xml`, and `site/robots.txt`.

## Outside accounts the site relies on

Only one, and the site works without it: the `google-site-verification` line in `index.html` links the site to Stuart Santos's Google Search Console account. If that account goes away, nothing on the page changes.

The map under "Our Location" is Google Maps' standard "Embed a map" code, which needs no account or API key. To move the pin or change the map, find the business on Google Maps, choose Share, then "Embed a map", and paste the new `src` address into the `<iframe class="map">` line in `site/index.html`.

The fonts are stored in `site/fonts/` and need no outside service. Both are free to use and redistribute under the SIL Open Font License; the license files sit beside them and should stay there.

## Making changes

- Text and page structure: `site/index.html`
- Colors, fonts, and layout: `site/css/styles.css` (the colors are listed at the top)
- Images: `site/img/`

Text edits appear as soon as the file is uploaded. Returning visitors may keep an older copy of the stylesheet or script for up to a week, and of an image for up to a month. To make a replaced image show up right away, give the new file a new name and change the name in `index.html`.

One rule holds the design together: red is used only for the phone number and the call buttons.

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
