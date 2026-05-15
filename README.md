# Pixl Forge — Landing Hub

A static landing page that funnels visitors to your shops on Etsy, Shopify,
Facebook Marketplace, and OfferUp. Hosted free on GitHub Pages.

## What this is
A "link-in-bio on steroids" — branded, fast, free, and built to convert.
Visitors land here and click through to whichever platform you want them to buy on.

## Files


```
index.html          ← Main landing page
404.html            ← Custom not-found page
sitemap.xml         ← For SEO
robots.txt          ← For crawlers
CNAME.example       ← Rename to CNAME if using custom domain
css/styles.css      ← All styles (dark, industrial, molten orange accent)
js/main.js          ← Analytics, click tracking, UTM forwarding
assets/             ← Product photos, favicon, OG image
```


## Placeholders to replace

Search the codebase for `{{...}}` to find every placeholder. Quick checklist:

### Brand
- [x] `{{BRAND_NAME}}` — Your shop name → **Pixl Forge**
- [x] `{{BRAND_TAGLINE}}` — One-line description → not used in current design
- [ ] `{{SITE_URL}}` — e.g. https://yourname.github.io ← still needed
- [x] `{{CUSTOM_DOMAIN}}` — only if using a custom domain → N/A
- [x] `{{LOCAL_AREA}}` — e.g. "Los Angeles" for the Facebook Marketplace card → not used in current design
- [x] `{{CONTACT_EMAIL}}` — Email for inquiries → **pixlforgeprints@gmail.com**

### Analytics IDs
- [x] `{{GA_MEASUREMENT_ID}}` — Google Analytics 4 ID (looks like G-XXXXXXXXXX) → **G-64SCNVMZ07**
- [x] `{{CLARITY_ID}}` — Microsoft Clarity project ID (free heatmaps) → **wo6pchoxq4**

### Platform URLs
- [x] `{{ETSY_SHOP_URL}}` → **https://pixlforgeshop.etsy.com**
- [x] `{{SHOPIFY_SHOP_URL}}` → N/A — not used in current design
- [x] `{{FACEBOOK_MARKETPLACE_URL}}` → N/A — not used in current design
- [x] `{{OFFERUP_URL}}` → N/A — not used in current design
- [x] `{{INSTAGRAM_URL}}` → **https://www.instagram.com/pixel3dla/**
- [ ] `{{TIKTOK_URL}}` ← still needed
- [ ] `{{YOUTUBE_URL}}` ← still needed

### Featured product
- [x] `{{FEATURED_PRODUCT_NAME}}`, `{{FEATURED_PRODUCT_DESCRIPTION}}` → N/A — section redesigned into product grid
- [x] `{{FEATURED_PRODUCT_URL}}` → N/A — section redesigned
- [x] `{{FEATURED_PRICE}}`, `{{FEATURED_MATERIAL}}`, `{{FEATURED_SIZE}}`,
  `{{FEATURED_FINISH}}`, `{{FEATURED_SHIP_DAYS}}` → N/A — section redesigned

### Stats / proof
- [x] `{{ORDERS_COUNT}}`, `{{RATING}}`, `{{TURNAROUND_DAYS}}` → N/A — not in current design
- [ ] `{{REVIEW_1_QUOTE}}`, `{{REVIEW_1_NAME}}`, `{{REVIEW_1_PLATFORM}}` (×3) — replace with real reviews when available

### Gallery products (×6)
- [x] `{{PRODUCT_N_NAME}}`, `{{PRODUCT_N_PRICE}}`, `{{PRODUCT_N_URL}}` → N/A — product grid redesigned
- [ ] Replace `assets/product-N.jpg` with real images (trophy photos uploaded; others pending)

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Settings → Pages → Source: `main` branch, root folder
3. (Optional) Add custom domain: rename `CNAME.example` to `CNAME` and put your
   domain inside, then set DNS

## Analytics setup

1. Create a free Google Analytics 4 property at https://analytics.google.com
   → grab the Measurement ID (G-XXXXXXXXXX) → replace `{{GA_MEASUREMENT_ID}}`
2. Create a free Microsoft Clarity project at https://clarity.microsoft.com
   → grab the Project ID → replace `{{CLARITY_ID}}`
3. To debug events live, open the site with `?debug=1` and check the console

## Tracked events (GA4)

| Event | Fired when |
|---|---|
| `platform_click` | Visitor clicks Etsy/Shopify/Facebook/OfferUp card |
| `hero_cta_featured` | Clicks the main hero "Shop Featured Drop" button |
| `featured_buy` | Clicks the featured product Buy Now button |
| `product_click` | Clicks any product in the gallery |
| `social_click` | Clicks an Instagram/TikTok/YouTube link |
| `scroll_depth` | Scrolls past 25/50/75/100% |
| `time_on_page` | Heartbeats at 10/30/60/120/300 seconds |
| `nav_*` | Clicks any nav link |

## License

Code: MIT (do whatever). Designs/photos: your own.
