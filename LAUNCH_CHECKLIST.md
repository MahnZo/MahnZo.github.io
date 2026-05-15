# LAUNCH CHECKLIST — Fill in before going live

Generated from `redesign-landing-hub` branch.
Replace every `{{TOKEN}}` below in `index.html`, `404.html`, `robots.txt`,
`sitemap.xml`, and `CNAME.example`.

---

## CRITICAL — Site won't work properly without these

| Token | File(s) | What to put here | Status |
|---|---|---|---|
| `{{GA_MEASUREMENT_ID}}` | `index.html` (×2) | Google Analytics 4 ID — looks like `G-XXXXXXXXXX`. Create at analytics.google.com → Admin → Create Property | ✅ Done — `G-64SCNVMZ07` |
| `{{CLARITY_ID}}` | `index.html` (×1) | Microsoft Clarity project ID — create free at clarity.microsoft.com | ✅ Done — `wo6pchoxq4` |
| `{{SITE_URL}}` | `index.html`, `robots.txt`, `sitemap.xml` | Your full URL, e.g. `https://mahns-operation.com` (no trailing slash) | ⬜ Pending |
| `{{BRAND_NAME}}` | `index.html`, `404.html`, `css/styles.css`, `js/main.js` | Your shop name, e.g. `STRATA·3D` | ✅ Done — `Pixl Forge` |
| `{{ETSY_SHOP_URL}}` | `index.html` (×3) | Full Etsy shop URL, e.g. `https://www.etsy.com/shop/YourShop` | ✅ Done — `https://pixlforgeshop.etsy.com` |
| `{{SHOPIFY_SHOP_URL}}` | `index.html` (×3) | Your Shopify store URL | N/A — section removed in redesign |
| `{{FACEBOOK_MARKETPLACE_URL}}` | `index.html` (×3) | Your Facebook Marketplace seller profile URL | N/A — section removed in redesign |
| `{{OFFERUP_URL}}` | `index.html` (×2) | Your OfferUp profile URL | N/A — section removed in redesign |
| `{{FEATURED_PRODUCT_URL}}` | `index.html` (×3) | Direct link to your featured product on Etsy or Shopify | N/A — section redesigned into product grid |
| `{{CUSTOM_DOMAIN}}` | `CNAME.example` | Your custom domain, e.g. `mahns-operation.com` — rename file to `CNAME` | ⬜ Pending (skip if using GitHub Pages subdomain) |

---

## RECOMMENDED — Visible in the UI, affects first impression

| Token | File(s) | What to put here | Status |
|---|---|---|---|
| `{{BRAND_TAGLINE}}` | `index.html` (×5) | One-line description, e.g. `Custom 3D-printed collectibles, shipped in 48 hrs` | N/A — not in current design |
| `{{FEATURED_PRODUCT_NAME}}` | `index.html` (×2) | Name of your hero product, e.g. `Dragon Keychain` | N/A — section redesigned |
| `{{FEATURED_PRODUCT_DESCRIPTION}}` | `index.html` (×1) | 1–2 sentence description of the featured product | N/A — section redesigned |
| `{{FEATURED_PRICE}}` | `index.html` (×2) | Price in USD without $, e.g. `18` | N/A — section redesigned |
| `{{FEATURED_MATERIAL}}` | `index.html` (×1) | Material, e.g. `PLA+` | N/A — section redesigned |
| `{{FEATURED_SIZE}}` | `index.html` (×1) | Dimensions, e.g. `5 cm` | N/A — section redesigned |
| `{{FEATURED_FINISH}}` | `index.html` (×1) | Finish type, e.g. `Matte` | N/A — section redesigned |
| `{{FEATURED_SHIP_DAYS}}` | `index.html` (×1) | Shipping days, e.g. `3–5` | N/A — section redesigned |
| `{{ORDERS_COUNT}}` | `index.html` (×1) | Total orders stat, e.g. `500+` | N/A — not in current design |
| `{{RATING}}` | `index.html` (×1) | Review rating, e.g. `4.9` | N/A — not in current design |
| `{{TURNAROUND_DAYS}}` | `index.html` (×1) | Print turnaround, e.g. `48` | N/A — not in current design |
| `{{LOCAL_AREA}}` | `index.html` (×1) | City/region for Facebook Marketplace card, e.g. `Los Angeles` | N/A — section removed |
| `{{CONTACT_EMAIL}}` | `index.html` (×2) | Your business email | ✅ Done — `pixlforgeprints@gmail.com` |
| `{{INSTAGRAM_URL}}` | `index.html` (×2) | Instagram profile URL | ✅ Done — `https://www.instagram.com/pixel3dla/` |
| `{{TIKTOK_URL}}` | `index.html` (×2) | TikTok profile URL | ⬜ Pending |
| `{{YOUTUBE_URL}}` | `index.html` (×1) | YouTube channel URL | ⬜ Pending |

---

## OPTIONAL — Can stay as placeholder or be removed

| Token | File(s) | Notes | Status |
|---|---|---|---|
| `{{PRODUCT_N_URL}}` | `index.html` (×1) | Gallery product URLs — each `PRODUCT_N` is a separate item (N = 1–6) | N/A — product grid redesigned |
| Review quote text | `index.html` | The three social-proof quotes are placeholders — replace with real reviews | ⬜ Pending |

---

## Non-token tasks before launch

- [x] Merge `redesign-landing-hub` → `main` after reviewing the site
- [ ] Add `assets/og-image.jpg` — social share image (1200×630 px recommended)
- [ ] Add `assets/favicon.png` and `assets/apple-touch-icon.png`
- [ ] Fill in `{{SITE_URL}}` (canonical URL, OG tags, schema.org)
- [ ] Fill in `{{TIKTOK_URL}}` and `{{YOUTUBE_URL}}` in the footer
- [ ] Replace placeholder reviews with real customer quotes
- [ ] Test on mobile before going live
- [ ] Rename `CNAME.example` → `CNAME` if using a custom domain

---

## How to fill in tokens quickly

Open `index.html` in any text editor and use Find & Replace (usually Ctrl+H or Cmd+H).
Replace each `{{TOKEN}}` with the real value. Save and commit.

Alternatively, run:

```bash
# Example: set brand name
sed -i 's/{{BRAND_NAME}}/STRATA·3D/g' index.html 404.html css/styles.css js/main.js
```
