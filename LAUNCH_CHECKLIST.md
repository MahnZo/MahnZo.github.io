# LAUNCH CHECKLIST — Fill in before going live

Generated from `redesign-landing-hub` branch.
Replace every `{{TOKEN}}` below in `index.html`, `404.html`, `robots.txt`,
`sitemap.xml`, and `CNAME.example`.

---

## CRITICAL — Site won't work properly without these

| Token | File(s) | What to put here |
|---|---|---|
| `{{GA_MEASUREMENT_ID}}` | `index.html` (×2) | Google Analytics 4 ID — looks like `G-XXXXXXXXXX`. Create at analytics.google.com → Admin → Create Property |
| `{{CLARITY_ID}}` | `index.html` (×1) | Microsoft Clarity project ID — create free at clarity.microsoft.com |
| `{{SITE_URL}}` | `index.html`, `robots.txt`, `sitemap.xml` | Your full URL, e.g. `https://mahns-operation.com` (no trailing slash) |
| `{{BRAND_NAME}}` | `index.html`, `404.html`, `css/styles.css`, `js/main.js` | Your shop name, e.g. `STRATA·3D` |
| `{{ETSY_SHOP_URL}}` | `index.html` (×3) | Full Etsy shop URL, e.g. `https://www.etsy.com/shop/YourShop` |
| `{{SHOPIFY_SHOP_URL}}` | `index.html` (×3) | Your Shopify store URL |
| `{{FACEBOOK_MARKETPLACE_URL}}` | `index.html` (×3) | Your Facebook Marketplace seller profile URL |
| `{{OFFERUP_URL}}` | `index.html` (×2) | Your OfferUp profile URL |
| `{{FEATURED_PRODUCT_URL}}` | `index.html` (×3) | Direct link to your featured product on Etsy or Shopify |
| `{{CUSTOM_DOMAIN}}` | `CNAME.example` | Your custom domain, e.g. `mahns-operation.com` — rename file to `CNAME` |

---

## RECOMMENDED — Visible in the UI, affects first impression

| Token | File(s) | What to put here |
|---|---|---|
| `{{BRAND_TAGLINE}}` | `index.html` (×5) | One-line description, e.g. `Custom 3D-printed collectibles, shipped in 48 hrs` |
| `{{FEATURED_PRODUCT_NAME}}` | `index.html` (×2) | Name of your hero product, e.g. `Dragon Keychain` |
| `{{FEATURED_PRODUCT_DESCRIPTION}}` | `index.html` (×1) | 1–2 sentence description of the featured product |
| `{{FEATURED_PRICE}}` | `index.html` (×2) | Price in USD without $, e.g. `18` |
| `{{FEATURED_MATERIAL}}` | `index.html` (×1) | Material, e.g. `PLA+` |
| `{{FEATURED_SIZE}}` | `index.html` (×1) | Dimensions, e.g. `5 cm` |
| `{{FEATURED_FINISH}}` | `index.html` (×1) | Finish type, e.g. `Matte` |
| `{{FEATURED_SHIP_DAYS}}` | `index.html` (×1) | Shipping days, e.g. `3–5` |
| `{{ORDERS_COUNT}}` | `index.html` (×1) | Total orders stat, e.g. `500+` |
| `{{RATING}}` | `index.html` (×1) | Review rating, e.g. `4.9` |
| `{{TURNAROUND_DAYS}}` | `index.html` (×1) | Print turnaround, e.g. `48` |
| `{{LOCAL_AREA}}` | `index.html` (×1) | City/region for Facebook Marketplace card, e.g. `Los Angeles` |
| `{{CONTACT_EMAIL}}` | `index.html` (×2) | Your business email |
| `{{INSTAGRAM_URL}}` | `index.html` (×2) | Instagram profile URL |
| `{{TIKTOK_URL}}` | `index.html` (×2) | TikTok profile URL |
| `{{YOUTUBE_URL}}` | `index.html` (×1) | YouTube channel URL |

---

## OPTIONAL — Can stay as placeholder or be removed

| Token | File(s) | Notes |
|---|---|---|
| `{{PRODUCT_N_URL}}` | `index.html` (×1) | Gallery product URLs — each `PRODUCT_N` is a separate item (N = 1–6) |
| Review quote text | `index.html` | The three social-proof quotes are placeholders — replace with real reviews |

---

## Non-token tasks before launch

- [ ] Add `assets/featured-main.jpg` — hero product photo (displayed prominently on desktop)
- [ ] Add `assets/product-1.jpg` through `assets/product-6.jpg` — gallery grid images
- [ ] Add `assets/og-image.jpg` — social share image (1200×630 px recommended)
- [ ] Rename `CNAME.example` → `CNAME` after filling in `{{CUSTOM_DOMAIN}}`
- [ ] Merge `redesign-landing-hub` → `main` after reviewing the site
- [ ] Test on mobile before merging

---

## How to fill in tokens quickly

Open `index.html` in any text editor and use Find & Replace (usually Ctrl+H or Cmd+H).
Replace each `{{TOKEN}}` with the real value. Save and commit.

Alternatively, run:

```bash
# Example: set brand name
sed -i 's/{{BRAND_NAME}}/STRATA·3D/g' index.html 404.html css/styles.css js/main.js
```