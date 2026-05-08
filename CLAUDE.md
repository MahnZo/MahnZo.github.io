# STRATA · 3D — Project Guide for Claude Code

This file tells Claude Code about this project so it can help you build faster
and more accurately. Update it as the project evolves.

-----

## What this is

A static e-commerce storefront for **STRATA · 3D**, a custom 3D-printing
service that sells keychains, figurines, decor, office accessories, and
made-to-order custom prints.

The site is hosted on **GitHub Pages** (free, static hosting).
It is **not** a web app or framework — just plain HTML, CSS, and JavaScript.

-----

## File structure

```
/
├── index.html          ← The landing page
├── styles.css          ← All styling. Design tokens at the top.
├── script.js           ← Site interactions (filters, favorites)
├── CLAUDE.md           ← This file
├── /assets/            ← (future) product photos, logos, etc.
└── /products/          ← (future) individual product detail pages
```

-----

## Tech stack & rules

- **Vanilla HTML/CSS/JS only** — no React, no build step, no npm
- **Hosted on GitHub Pages** — every commit to `main` deploys
- **Mobile-first responsive** — must work great on phones
- **No paid dependencies** — keep this free to run

If a task seems to require a framework or a backend, **stop and ask** before
introducing one. The owner wants to keep things simple and free.

-----

## Design system

All colors, fonts, and shadows are defined as CSS variables in `styles.css`
under `:root`. **Always use these tokens** instead of hardcoding values.

### Colors

- `--cream` — main page background
- `--paper` — secondary surfaces
- `--ink` — primary text
- `--ink-soft` — secondary text
- `--muted` — labels, captions
- `--accent` — burnt coral, used sparingly for emphasis
- `--moss` — green accent

### Typography

- `--display` — Fraunces (italic for emphasis on key words)
- `--body` — Bricolage Grotesque (default)
- `--mono` — JetBrains Mono (labels, prices, technical accents)

### Voice

Warm, handcrafted, slightly editorial. Not corporate. Use italic Fraunces
to highlight one or two key words per heading (see existing examples).

-----

## Brand voice

- Warm and personal, not corporate ("we'll send", "drop us a line")
- Confident but humble ("made-to-order", "hand-finished")
- Concrete over generic ("48hr print turnaround" beats "fast shipping")

-----

## Payment & trust principles

The owner believes some customers feel unsafe entering card info on a
small-business site. The "Trust" section offers **three** payment paths:

1. **Direct checkout** (Stripe / Apple Pay / Google Pay) — to be wired up
1. **Trusted apps** (Venmo, CashApp, PayPal, Zelle) — for users who prefer
   apps they already trust
1. **Etsy Shop** — for users who want marketplace buyer protection

When adding new payment features, always preserve at least one off-platform
option for trust-conscious buyers.

-----

## What's done

- [x] Landing page (hero, marquee, product grid, trust section, reviews, footer)
- [x] Product filters (by category)
- [x] Favorite toggle on product cards
- [x] Mobile responsive
- [x] Brand identity (typography, color, voice)

## What's planned

- [ ] Replace mock SVG product images with real photos in `/assets/products/`
- [ ] Individual product detail pages (`/products/[slug].html`)
- [ ] Custom-order form page (with file upload for design files)
- [ ] Real shopping cart with localStorage
- [ ] Stripe Checkout integration (test mode first)
- [ ] Add Google Analytics 4 + Microsoft Clarity scripts to `<head>`
- [ ] /about page
- [ ] /shipping and /returns policy pages

-----

## How to work on this project

### Common tasks

- **Edit styles** → `styles.css` (tokens at top, then sections in order)
- **Edit content** → `index.html`
- **Edit interactions** → `script.js`
- **Add a product** → duplicate a `.product` block in `index.html`,
  set `data-cat` to one of: `keychains`, `figures`, `decor`, `office`, `custom`

### Splitting work into parallel subagents

When asked to do multiple unrelated tasks at once, spawn parallel subagents.
Example prompt the owner might give:

> Use 3 parallel subagents:
> 
> 1. Build the /products/dragon.html detail page using the styles.css tokens
> 1. Add a custom-order form at /custom.html with file upload
> 1. Wire up the cart icon to a basic localStorage cart

Each subagent should read this CLAUDE.md first to stay consistent with the
design system and voice.

### Deploying

```bash
git add .
git commit -m "describe what changed"
git push
```

GitHub Pages auto-deploys from `main` within ~1 minute.

-----

## Things to never do

- Don't introduce a build step, framework, or npm dependency without asking
- Don't hardcode colors or font names — use CSS variables
- Don't remove the off-platform payment options from the Trust section
- Don't add real customer reviews until they exist (the current ones are
  placeholders the owner will replace)
- Don't use stock photos — wait for real product photos
