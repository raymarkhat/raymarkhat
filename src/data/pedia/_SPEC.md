# Raymark Caps — Pedia article spec (read carefully, then write only your assigned JSON files)

You are writing knowledge-base ("Pedia") articles for **raymarkhat.com**, the website of
**Heze Raymark International Trade Co., Ltd** — a factory-direct baseball cap supplier in Heze,
Shandong, China that sells to U.S. small businesses (shops, promo distributors, team dealers,
screen printers, boutique brands) and to larger consumer brands / creators.

## Hard facts (never contradict these, never invent different numbers)

| Fact | Value |
|---|---|
| Legal name | Heze Raymark International Trade Co., Ltd |
| Brand | Raymark (site wordmark: RAYMARK) |
| Location | Heze, Shandong, China |
| Phone / WhatsApp | +86 159 5435 8307 |
| Email | info@pmbanner.com |
| Site currency | USD, prices shown per piece |
| MOQ (custom) | 50 pcs per style/colorway |
| MOQ (stock colorway) | 25 pcs |
| Sample | 1–2 pcs, 5–7 days, sample fee refunded on bulk orders over 500 pcs |
| Bulk lead time | 12–18 days after artwork approval (peak season 18–25 days) |
| Decoration methods | flat embroidery, 3D puff embroidery, chenille patch, woven patch, leather patch, screen print, sublimation, laser-engraved leather |
| Embroidery | up to 12 thread colors; typical front logo 6–9 cm wide, 4,000–9,000 stitches |
| Sizes | adjustable one-size (56–60 cm / 7–7 1/2), fitted S–XL, youth |
| Shipping to U.S. | express 5–8 days, air 8–12 days, sea 30–40 days; DDP door delivery available |
| Payments | T/T, Alibaba Trade Assurance, PayPal for samples; **no card payment on the website** — every order starts with a quote |
| Online tools | free digital proof/mockup, artwork kept confidential |

Site pages you may link to (use relative URLs, always with trailing slash):
- `/` — home
- `/shop/` — all caps
- `/custom-baseball-caps/` — custom program
- `/team-caps/` — pro-team colorway caps
- `/caps/<slug>/` — a product page (see product slugs below)
- `/pedia/` — knowledge base index
- `/contact/` — contact page
- `/cart/` — cart / quote request

Product slugs (for contextual links): `signature-6-panel-cap`, `classic-dad-hat`, `flat-brim-snapback`,
`camp-5-panel-cap`, `trucker-mesh-cap`, `leather-patch-cap`, `corduroy-cap`, `rope-cap`,
`washed-vintage-cap`, `performance-golf-cap`, `gridiron-snapback`, `turf-trucker`, `pro-fit-fitted-cap`,
`huddle-dad-hat`, `saturday-rope-cap`, `end-zone-camo-cap`.

## Output format — one JSON file per article

Path: `raymark-caps/src/data/pedia/<slug>.json` (exact slug given in your assignment).
UTF-8, no BOM, **valid JSON**, 2-space indent. No HTML anywhere. No markdown headings inside blocks.

```json
{
  "slug": "kebab-case-slug",
  "title": "SEO page title, 45-58 chars, keyword first",
  "h1": "On-page headline (can be longer / more human than title)",
  "description": "Meta description, 140-158 chars, with a reason to click",
  "category": "Sizing & Fit | Ordering | Decoration | Construction | Materials | Logistics | Care",
  "updated": "2026-11-23",
  "readMinutes": 6,
  "tldr": ["3 to 5 one-sentence direct answers with a concrete number, price, or range"],
  "intro": "1 short paragraph (2-3 sentences). Answer the search intent immediately.",
  "keyFacts": [{"label": "Typical MOQ", "value": "50 pcs"}, {"label": "Sample lead time", "value": "5-7 days"}],
  "sections": [
    {
      "h2": "Section heading as a real question or a sharp claim",
      "blocks": [
        {"type": "p", "text": "Paragraph. Supports **bold**, *italic* and [link text](/shop/)."},
        {"type": "h3", "text": "Sub-heading"},
        {"type": "ul", "items": ["Bullet one", "Bullet two"]},
        {"type": "steps", "items": [{"title": "Send artwork", "text": "One or two sentences."}]},
        {"type": "table", "head": ["Column A", "Column B"], "rows": [["a1", "b1"]], "caption": "Optional caption"},
        {"type": "callout", "tone": "tip|note|warn", "title": "Short label", "text": "One to three sentences."}
      ]
    }
  ],
  "faqs": [{"q": "Question?", "a": "Direct 1-3 sentence answer."}],
  "related": ["slug-a", "slug-b"]
}
```

Rules for the body:
- 6–8 `sections`, 700–1000 words of body text total. At least one `table` and one `callout` per article.
- Write **answer-first**: the first sentence of each section answers the heading, then explain.
- Use concrete numbers, ranges, and trade-offs (cost per 1,000 stitches, cm measurements, days, USD).
- At least 3 `faqs` (not duplicating the tldr verbatim).
- `related` = 2-3 slugs from the product pages or other pedia slugs.
- U.S. English spelling, plain professional tone, second person ("you"). No hype words like
  "revolutionary", "game-changing". No emoji. No exclamation marks.
- **Never fabricate**: no invented statistics, customer counts, case studies, awards, certifications,
  tariff percentages, or reviews. No claims about other companies' products. If a number is an
  industry rule of thumb, phrase it as one ("a common rule of thumb is…").
- Mention Raymark naturally 1–2 times per article (e.g. "Raymark's MOQ is 50 pcs per colorway"),
  never in a hard-sell way, and only where the fact table above supports it.
- Do not use the words "NFL", "Super Bowl", "New Era", "59FIFTY", or any team/nike/etc. trademark in
  article copy. "Pro-team colorways" is the approved phrase.
