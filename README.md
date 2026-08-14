# DJ ANJAN — djanjan.cyberpunk.co.in

Recovered source for the DJ Anjan single-page site. Stack: **Vite 5 + Tailwind CSS 3 + PostCSS**, plain HTML/JS (no framework).

## How this was recovered

The old host was running the project's **Vite dev server** (`npm run dev`) as the public site, not a production build. Dev mode serves the untransformed project tree, so the original files were downloadable directly rather than scraped:

| Source | How it was recovered |
| --- | --- |
| `index.html` | Served directly; Vite's injected `@vite/client` script and `?t=` HMR timestamps stripped |
| `src/style.css` | `/src/style.css?raw` returned the exact pre-Tailwind source |
| `src/main.js` | Extracted from the inline sourcemap's `sourcesContent` |
| `tailwind.config.js`, `postcss.config.js`, `vite.config.js` | Same sourcemap technique |
| `package.json` | Served verbatim |
| `public/images/*` | Downloaded (13 files) |

`index.html` and `src/style.css` are **byte-identical** to the originals. `src/main.js` is identical apart from its CSS import, restored from Vite's rewritten `/src/style.css?t=…` to the normal `./style.css`.

## ⚠️ Palette discrepancy — read before changing colours

The live site and its own `tailwind.config.js` **disagreed**, and this rebuild deliberately matches the *live rendering*.

The dev server had been running long enough that it was still serving CSS compiled from an **older** palette. `tailwind.config.js` on disk had since been edited to a pure `#0d0d0d` / `#ffffff` monochrome scheme, but the server was never restarted, so that edit never reached any visitor.

`tailwind.config.js` therefore carries the **live** values, each marked with a `// live` comment and the disk value it replaced:

| Token | Live (used here) | Disk source (never shipped) |
| --- | --- | --- |
| `background`, `surface` | `#131313` | `#0d0d0d` |
| `on-surface`, `on-background` | `#e5e2e1` | `#ffffff` |
| `on-surface-variant` | `#cfc4c5` | `#a3a3a3` |
| `primary` | `#c6c6c6` | `#ffffff` |
| `surface-container-low` | `#1c1b1b` | `#121212` |
| `surface-container-lowest` | `#0e0e0e` | `#060606` |
| `surface-container-highest` | `#353534` | `#262626` |

These 9 tokens are the only theme colours the markup actually uses. To adopt the developer's newer higher-contrast look instead, swap them back to the disk values — but that is a **visible design change**, not a restoration.

The unmarked colours in `tailwind.config.js` are unused by the markup, so their disk values are kept as-is; the live compiled CSS contained no evidence of what they were.

## Running it

```bash
npm install
```

Development server (hot reload) on port 5092:

```bash
npm run dev
```

Production build into `dist/`:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Hosting

`npm run build` emits a fully static `dist/` (~4.7 MB, mostly images). Upload its **contents** to the web root — any static host works (cPanel/shared hosting, Netlify, Vercel, Cloudflare Pages, S3, nginx). No Node.js runtime, database, or server-side code is required.

Two things to get right, both of which the previous setup got wrong:

1. **Do not run `npm run dev` as the public site.** It exposes your full source (that is exactly how this project was recovered — anyone could have done the same), skips minification, and is not built to handle production traffic.
2. **Restart after editing `tailwind.config.js`.** Tailwind reads its config once at startup; a running server will keep serving the old palette, which is what caused the mismatch above.

`vite.config.js` still pins `server.port` to 5092 and allow-lists the `cyberpunk.co.in` hosts. Those are **dev-server-only** settings — harmless in a static deploy, and worth updating if the site moves to a new domain and you use `npm run dev` locally.

## Content that lives in the markup

Hardcoded in `index.html`, so edit there:

- **Phone / WhatsApp:** `+91 91489 93037` (`tel:` links, `wa.me/919148993037` — 6 links, plus the booking form handler in `src/main.js`)
- **Instagram:** `instagram.com/djanjanz` · **YouTube:** `youtube.com/@mcanjan`
- **Embedded videos:** 4 YouTube iframes (2 landscape, 2 shorts)
- **Footer:** `© 2024 DJ ANJAN` — worth updating the year
- **Fonts:** Inter + Syne + Material Symbols, loaded from Google Fonts CDN

The booking form does not submit anywhere: `src/main.js` formats the fields into a WhatsApp message and opens `wa.me`. No backend needed.

`public/images/` also contains `gallery_1.jpg` and `gallery_3.jpg`, which were on the old server but are not referenced by the current markup. They are kept in case they are wanted again.

## Verification

The rebuild was checked against the live site, both rendered at 1265px wide:

- `index.html` and `src/style.css` byte-identical; `main.js` identical modulo the import specifier
- All 9 theme colours match exactly (`rgb(19,19,19)`, `rgb(229,226,225)`, `rgb(198,198,198)`, …)
- Section heights match within 1px (nav, hero, marquee, services, gallery, booking, footer); full document height 5927px vs 5930px
- All 16 image references resolve in the production build, no 404s
- Gallery tab switching, the 3 image stacks (3 cards each), 4 video embeds, 6 WhatsApp links and the booking form all behave identically

The `fade-in-up` scroll animation could not be exercised in the automated browser (an `IntersectionObserver` does not fire in a tab that never composites), but its CSS and JS are byte-identical to the original.

`_recovered/` holds the raw downloads and extracted originals used for this comparison. It is gitignored and can be deleted once you're satisfied with the rebuild.
