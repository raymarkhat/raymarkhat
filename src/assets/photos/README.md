# Product photos

Drop real product photos here to replace the generated SVG illustrations.

Naming: `<product-slug>-<view>.<ext>`
  signature-6-panel-cap-front.jpg
  cotton-twill-bucket-hat-front.webp
  cotton-twill-bucket-hat-side.jpg

Views: `front` (used everywhere) · `side` · `top` · `detail`
Formats: `.webp` (best) · `.jpg` · `.png`

Rules
- A photo only replaces the view it is named for; anything missing falls back to the SVG.
- If a product has any photo, its gallery shows photo views only (no mixed photo + illustration).
- Target size: 1600 × 1200 px, under 300 KB. Cards crop to 4:3.35, so keep the hat centred with margin.

Commands
  npm run photos -- list            # every filename you need
  npm run photos -- check           # missing / oversized report
  npm run photos -- import <dir>    # match by slug, normalise names, copy here
  npm run photos -- clear           # remove all photos
