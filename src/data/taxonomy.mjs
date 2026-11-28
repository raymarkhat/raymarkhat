// Category tree: 7 top-level categories, 28 sub-categories.
// kind: "catalog" (lists products of this category) | "program" (custom service page) | "league" (colourway page)

export const parents = [
  {
    slug: 'baseball-caps',
    name: 'Baseball Caps',
    nameZh: '棒球帽',
    title: 'Baseball Caps — Custom 6-Panel, Dad Hat & Snapback',
    description:
      'Custom baseball caps from 10 pcs: classic 6-panel, unstructured dad hats, fitted caps, snapbacks and trucker mesh. 12-colour embroidery, free digital proof, DDP to the U.S.',
    h1: 'Baseball caps, five ways.',
    short: 'Classic 6-panel, dad hat, fitted, snapback and trucker mesh.',
    intro: [
      'Every cap program starts with the crown. Whether you need a structured six-panel for a corporate store, a soft dad hat for a DTC brand, a fitted cap for a team dealer or a foam trucker for a promo catalog, the shape decides how your logo reads before anyone reads it.',
      'All five styles run from 10 pcs per colourway, take up to 12 embroidery colours on the front, and ship 12–18 days after you approve the proof.',
    ],
    children: ['classic-baseball-cap', 'dad-hats', 'fitted-caps', 'snapback-caps', 'trucker-caps'],
  },
  {
    slug: 'sports-outdoor-caps',
    name: 'Sports & Outdoor Caps',
    nameZh: '运动户外帽',
    title: 'Sports & Outdoor Caps — Golf, Visor & Running',
    description:
      'Performance golf caps, open-top golf visors and lightweight running caps for clubs, tournaments and athletic brands. MOQ 10 pcs, moisture-wicking fabrics, laser perforation.',
    h1: 'Built for the course and the trail.',
    short: 'Golf caps, open-top visors and running caps on technical fabrics.',
    intro: [
      'Golf, tennis and running headwear is bought by clubs, pro shops, event organisers and athletic brands — and it is judged on two things: does it stay comfortable for four hours, and does the logo still look right after ten washes.',
      'We build these on technical fabrics with laser-perforated panels, wicking sweatbands and low-profile crowns, and we keep the decoration small so it does not fight the technical look.',
    ],
    children: ['golf-caps', 'golf-visors', 'running-caps'],
  },
  {
    slug: 'bucket-hats',
    name: 'Bucket Hats',
    nameZh: '渔夫帽',
    title: 'Bucket Hats — Cotton, Nylon, Mesh & Wide Brim',
    description:
      'Custom bucket hats from 10 pcs: cotton twill, waterproof nylon, mesh fishing buckets and UPF 50+ wide brim sun hats. Embroidered or patched, DDP shipping to the U.S.',
    h1: 'Bucket hats, four ways to wear the sun.',
    short: 'Cotton, waterproof nylon, mesh and wide brim sun buckets.',
    intro: [
      'The bucket hat moved from fishing tackle box to streetwear staple in about five years, and it is now the second most requested shape we make after the six-panel. The demand splits cleanly by fabric: cotton for retail, nylon for outdoor, mesh for fishing and resort, wide brim for sun protection.',
      'Every bucket on this page is cut and sewn in the same workshop as our caps, so a mixed order can ship in one carton with one freight cost.',
    ],
    children: ['cotton-bucket-hats', 'nylon-bucket-hats', 'mesh-bucket-hats', 'wide-brim-bucket-hats'],
  },
  {
    slug: 'fashion-hats',
    name: 'Fashion Hats',
    nameZh: '时尚礼帽',
    title: 'Fashion Hats — Berets & Cowboy Hats, Custom Made',
    description:
      'Custom wool berets and felt or straw cowboy hats for fashion labels, boutiques and western retailers. Cut-and-sew construction, leather trim options, MOQ 10 pcs.',
    h1: 'Two silhouettes that never really left.',
    short: 'Wool berets and felt or straw western hats, cut and blocked.',
    intro: [
      'Berets and cowboy hats are cut-and-sew or blocked shapes, not cap bodies — they need different patterns, different lining and a slower line speed. That is also why they hold a higher price and why few factories will run them at low volume.',
      'We run both from 10 pcs per colourway, with wool blends, leather trim, grosgrain bands and badge detailing available on the same order as your caps.',
    ],
    children: ['berets', 'cowboy-hats'],
  },
  {
    slug: 'kids-hats',
    name: 'Kids Hats',
    nameZh: '童帽',
    title: 'Kids Hats — Toddler Caps, Bucket Hats & Baby Sun Hats',
    description:
      'Custom kids caps, toddler bucket hats and UPF 50+ baby sun hats from 10 pcs. Soft brims, chin straps, adjustable bands and child-safe trims.',
    h1: 'Small heads, same standards.',
    short: 'Toddler caps, kids buckets and UPF 50+ baby sun hats.',
    intro: [
      'Kids headwear fails for boring reasons: the band is too big, the brim is too stiff, or the chin strap cannot release. We size these on 44–56 cm bands, use soft brims for baby shapes and specify breakaway or hook-and-loop straps.',
      'Parents buy twice, so a kids program that fits properly turns into a repeat order every spring.',
    ],
    children: ['kids-baseball-caps', 'kids-bucket-hats', 'baby-sun-hats'],
  },
  {
    slug: 'brand-section',
    name: 'Brand Section',
    nameZh: '品牌专区',
    title: 'Brand Section — Pro League Colorway Caps',
    description:
      'Stock two-tone caps in pro football, basketball, baseball and hockey palettes. Blank or with your own logo, 25 pcs minimum. Not licensed merchandise — no team marks supplied.',
    h1: 'League palettes, your mark.',
    short: 'Two-tone league palettes on stock bodies — your mark only.',
    intro: [
      'This section exists because buyers keep asking for "the team look" without a licence. What we supply is the colour story: two-tone crowns, contrast visors, metallic accents and bold puff embroidery on stock cap bodies, ready for your own logo.',
      'Nothing here is licensed, endorsed or affiliated with any league or team. We do not apply team names, team logos or league marks, and we cannot reproduce them on request.',
    ],
    children: ['nfl-colorways', 'nba-colorways', 'mlb-colorways', 'nhl-colorways'],
  },
  {
    slug: 'custom-hat',
    name: 'Custom Hat',
    nameZh: '定制帽子',
    title: 'Custom Hat Program — Your Logo on Any Shape',
    description:
      'Custom hat manufacturing from 10 pcs: baseball caps, dad hats, trucker caps, bucket hats, golf caps and kids hats. Free digital proof, 12-colour embroidery, 12–18 day bulk.',
    h1: 'One program, every shape.',
    short: 'Seven custom programs from 10 pcs, on any shape we run.',
    intro: [
      'Custom work is the same process whatever the shape: send artwork, approve a priced proof, then sample or go straight to bulk. What changes is the pattern, the decoration method and the lead time on cut-and-sew shapes.',
      'Pick the shape below and you will see the price tiers, decoration options and the factory lead time for that construction.',
    ],
    children: [
      'custom-baseball-caps',
      'custom-dad-hats',
      'custom-trucker-caps',
      'custom-bucket-hats',
      'custom-golf-caps',
      'custom-kids-hats',
      'custom-other-hats',
    ],
  },
];

export const children = [
  /* ---------------------------------------------------------- baseball caps */
  {
    slug: 'classic-baseball-cap',
    parent: 'baseball-caps',
    name: 'Classic Baseball Cap',
    nameZh: '经典弯檐棒球帽',
    kind: 'catalog',
    title: 'Classic Baseball Caps — Custom 6-Panel, 10 Pcs Min',
    description:
      'Structured and unstructured classic baseball caps with a curved visor, from 10 pcs. Cotton twill, leather patch and 5-panel options, 12-colour embroidery, free proof.',
    h1: 'Classic baseball caps.',
    intro: [
      'The classic cap is a six-panel crown with a curved visor — the shape 80% of buyers picture when they say "baseball cap". Structured versions hold a flat front panel for detail-heavy logos; unstructured versions sit lower and softer.',
      'If you are unsure which to pick, start structured: it survives embroidery, patches and screen print in one run and photographs flat for e-commerce.',
    ],
    faqs: [
      {
        q: 'Structured or unstructured for a first order?',
        a: 'Structured, unless the design is a long thin wordmark. A structured front panel keeps letterforms straight and takes 3D puff without distortion.',
      },
      {
        q: 'What is the minimum for a custom classic cap?',
        a: '10 pcs per colourway, mixable across sizes. One front logo in up to 12 thread colours is included in the price.',
      },
    ],
  },
  {
    slug: 'dad-hats',
    parent: 'baseball-caps',
    name: 'Dad Hat / Unstructured Cap',
    nameZh: '软顶老爹帽',
    kind: 'catalog',
    title: 'Dad Hats & Unstructured Caps — Custom, 10 Pcs Min',
    description:
      'Custom dad hats and unstructured caps in washed cotton, corduroy and canvas from 10 pcs. Low profile, soft crown, metal buckle. The cheapest logo cap that still looks retail.',
    h1: 'Dad hats and unstructured caps.',
    intro: [
      'A dad hat is a low-profile, unstructured cap with a soft crown and an adjustable back. No buckram, no stiff front panel — which means it folds into a bag and reads as everyday wear rather than corporate giveaway.',
      'It is the cheapest shape we make and the one that suits long wordmarks, thin script and small tonal embroidery best.',
    ],
    faqs: [
      { q: 'Will a dad hat hold a large logo?', a: 'Up to about 9 cm wide. Beyond that the mark starts to wrap around the soft crown and the outer letters distort.' },
      { q: 'Can dad hats be washed?', a: 'Hand wash cold and air dry. The unstructured crown keeps its shape; a machine wash will soften it further and fade the embroidery.' },
    ],
  },
  {
    slug: 'fitted-caps',
    parent: 'baseball-caps',
    name: 'Fitted Cap',
    nameZh: '全封定型帽',
    kind: 'catalog',
    title: 'Fitted Caps — Custom, Half Sizes 6 7/8 to 7 5/8',
    description:
      'Custom fitted baseball caps with no adjuster, in half sizes from 6 7/8 to 7 5/8. Acrylic-wool blend, flat or curved visor, 3D puff embroidery. MOQ 10 pcs.',
    h1: 'Fitted caps, true to size.',
    intro: [
      'A fitted cap has no strap, no snap and no take-up — the band is sewn to size, which is why it sits closer and looks sharper than an adjustable cap. It also means you have to commit to a size run.',
      'For most orders a balanced six-size run covers adult heads; we quote per size so you can weight the curve toward 7 1/4 and 7 3/8, which is where U.S. volume sits.',
    ],
    faqs: [
      { q: 'Do I have to order every size?', a: 'No. Under 100 pcs we usually split across 6–8 sizes. Send your size curve and we quote it line by line.' },
      { q: 'How does fitted sizing compare to adjustable?', a: 'A 7 1/4 fitted is about 57.8 cm — roughly the middle setting of a 56–60 cm adjustable cap. Most people who wear an adjustable cap mid-snap take a 7 1/4 or 7 3/8.' },
    ],
  },
  {
    slug: 'snapback-caps',
    parent: 'baseball-caps',
    name: 'Snapback Cap',
    nameZh: '平檐按扣帽',
    kind: 'catalog',
    title: 'Snapback Caps — Flat Brim, Custom, 10 Pcs Min',
    description:
      'Custom flat-brim snapbacks with a high structured crown and 7-position plastic snap. Streetwear, skate and music merch shapes from 10 pcs, 3D puff embroidery available.',
    h1: 'Snapbacks and flat brims.',
    intro: [
      'The snapback is a high, structured, flat-brim cap with a plastic adjuster. It reads as streetwear rather than corporate, which makes it the right shape for drops, collabs and anything sold next to apparel.',
      'The taller crown gives you roughly 10 cm of flat front panel — enough for stacked wordmarks, oversized patches and heavy 3D puff.',
    ],
    faqs: [
      { q: 'Flat brim or curved?', a: 'Flat is the stock build. We can curve it before packing at no cost — many retail buyers ask for a slight curve.' },
      { q: 'Is a snapback hot in summer?', a: 'Acrylic-wool blends are warmer than cotton twill. For July events, ask for the cotton version of the same crown.' },
    ],
  },
  {
    slug: 'trucker-caps',
    parent: 'baseball-caps',
    name: 'Trucker Cap / Mesh Cap',
    nameZh: '卡车网帽',
    kind: 'catalog',
    title: 'Trucker Caps & Mesh Caps — Custom, 10 Pcs Min',
    description:
      'Custom foam-front trucker caps and mesh-back caps from 10 pcs. The cheapest way to carry a large logo, and the coolest cap for outdoor work and summer events.',
    h1: 'Truckers and mesh caps.',
    intro: [
      'A trucker cap is a foam or structured front panel with mesh sides and back. The flat foam face accepts a 12 cm logo with no curvature problems, and the mesh moves air — which is why it dominates farm supply, landscaping, construction and fishing.',
      'Screen print on foam is our lowest-cost decoration, so truckers usually land several dollars below an embroidered six-panel.',
    ],
    faqs: [
      { q: 'Why does a trucker cost more to ship?', a: 'Foam fronts do not compress like cotton. A 100-pc carton runs about 0.18 cbm against 0.13 for twill, which raises the freight share per piece.' },
      { q: 'Can mesh caps be embroidered?', a: 'The front panel can, but keep the mark under about 8 cm wide — large embroidery pulls on foam.' },
    ],
  },

  /* ------------------------------------------------------- sports & outdoor */
  {
    slug: 'golf-caps',
    parent: 'sports-outdoor-caps',
    name: 'Golf Cap',
    nameZh: '高尔夫帽',
    kind: 'catalog',
    title: 'Custom Golf Caps — Performance & Piqué, 10 Pcs Min',
    description:
      'Custom golf caps in performance poly and cotton piqué from 10 pcs. Laser-perforated panels, moisture-wicking bands, low-profile crowns for club and tournament branding.',
    h1: 'Golf caps that survive four hours.',
    intro: [
      'Golf caps are bought by clubs, pro shops, charity tournaments and apparel brands, usually in small runs with a hard date attached. The technical requirements matter more than the shape: wicking band, perforated panels, a crown that does not collapse when wet.',
      'We build both a technical poly version and a cotton piqué club version, and we keep the logo small so it does not fight the panels.',
    ],
    faqs: [
      { q: 'Can you hit a tournament date?', a: 'For 50–200 pcs, yes if artwork is approved 3–4 weeks out. Bulk is 12–18 days plus 5–12 days transit on air.' },
      { q: 'Do you offer full-colour sublimation?', a: 'Yes, from 100 pcs, but it is quoted per design. Screen or embroidered marks are cheaper below that.' },
    ],
  },
  {
    slug: 'golf-visors',
    parent: 'sports-outdoor-caps',
    name: 'Golf Visor',
    nameZh: '高尔夫空顶帽',
    kind: 'catalog',
    title: 'Custom Golf Visors — Open Top, 10 Pcs Min',
    description:
      'Custom open-top golf visors with wide bands and moisture-wicking sweatbands, from 10 pcs. Packable knit and performance builds for clubs, tennis and running events.',
    h1: 'Open-top visors.',
    intro: [
      'A visor removes the crown and keeps the visor, which makes it the coolest option on a hot course and the easiest to pack. The band does all the work: it has to sit without pressure and hold a logo without stretching out.',
      'We run a structured performance band and a soft knit band; the knit version packs flat into a golf bag pocket.',
    ],
    faqs: [
      { q: 'Will the band stretch out?', a: 'The performance band has an elastic back panel and holds shape. The knit version relaxes about half a size after a season, which is normal for knit.' },
      { q: 'Can a visor be embroidered?', a: 'Yes, on the front band, typically 6–8 cm wide. Keep detail simple — the band is narrow and curves.' },
    ],
  },
  {
    slug: 'running-caps',
    parent: 'sports-outdoor-caps',
    name: 'Tennis / Running Cap',
    nameZh: '跑步网球帽',
    kind: 'catalog',
    title: 'Custom Running & Tennis Caps — Lightweight, 10 Pcs Min',
    description:
      'Featherweight running caps and short-visor tennis caps from 10 pcs. Micro poly, reflective trim options, packable crowns for run clubs, races and tennis programmes.',
    h1: 'Running and tennis caps.',
    intro: [
      'Running caps are judged on weight and ventilation, tennis caps on a shorter visor that does not block the ball. Both need a band that does not chafe and a crown that survives being stuffed in a bag.',
      'Our running build is a 90 gsm micro poly with a soft brim; the tennis build is a light cotton blend five-panel with a 5.5 cm visor.',
    ],
    faqs: [
      { q: 'Can you add reflective trim?', a: 'Yes, reflective piping or a reflective back tab from 100 pcs. It is a safety feature race organisers ask for.' },
      { q: 'Are these machine washable?', a: 'The poly running cap is, on cold and air-dried. The cotton tennis cap should be hand washed.' },
    ],
  },

  /* ------------------------------------------------------------ bucket hats */
  {
    slug: 'cotton-bucket-hats',
    parent: 'bucket-hats',
    name: 'Cotton Bucket Hat',
    nameZh: '棉布渔夫帽',
    kind: 'catalog',
    title: 'Custom Cotton Bucket Hats — Twill & Canvas, 10 Pcs Min',
    description:
      'Custom cotton bucket hats in twill and washed canvas from 10 pcs. 6.5 cm brim, packable crown, embroidered or patched. The retail-standard bucket shape.',
    h1: 'Cotton bucket hats.',
    intro: [
      'Cotton is the default bucket fabric because it takes embroidery cleanly, dyes to soft retail colours and softens with wear instead of cracking. A 6.5 cm brim is the commercial middle: enough shade to be useful, short enough to stay wearable.',
      'Twill is the clean, retail look; washed canvas is heavier and reads more workwear.',
    ],
    faqs: [
      { q: 'Does a cotton bucket hold its shape?', a: 'The brim does, because it is interfaced. The crown is soft and will pack flat — that is expected, not a defect.' },
      { q: 'Can I embroider the brim?', a: 'Yes, but keep it to a small mark under 4 cm. The brim curves and thick embroidery puckers the edge.' },
    ],
  },
  {
    slug: 'nylon-bucket-hats',
    parent: 'bucket-hats',
    name: 'Nylon / Waterproof Bucket Hat',
    nameZh: '防水尼龙渔夫帽',
    kind: 'catalog',
    title: 'Custom Nylon & Waterproof Bucket Hats — 10 Pcs Min',
    description:
      'Custom nylon bucket hats and seam-sealed waterproof buckets from 10 pcs. Quick-dry, packable, PU-coated options for fishing, outdoor and travel brands.',
    h1: 'Nylon and waterproof buckets.',
    intro: [
      'Nylon buckets are bought for three reasons: they pack into a pocket, they dry fast, and they can be made genuinely waterproof with a PU coating and taped seams.',
      'The standard nylon build handles rain and spray; the seam-sealed build is a 3000 mm rated shell for fishing and marine use.',
    ],
    faqs: [
      { q: 'Is "waterproof" real or marketing?', a: 'On the seam-sealed build it is a 3000 mm PU coating with taped seams. On the standard nylon build it is water-resistant only — spray beads, sustained rain soaks through.' },
      { q: 'Can nylon be embroidered?', a: 'Yes, with a backing stabiliser. Thin nylon needs it, otherwise the stitching puckers the panel.' },
    ],
  },
  {
    slug: 'mesh-bucket-hats',
    parent: 'bucket-hats',
    name: 'Mesh Bucket Hat',
    nameZh: '网眼渔夫帽',
    kind: 'catalog',
    title: 'Custom Mesh Bucket Hats — Fishing & Resort, 10 Pcs Min',
    description:
      'Custom mesh bucket hats with solid front panels and breathable mesh bodies, from 10 pcs. Built for fishing, resort and summer event programs.',
    h1: 'Mesh bucket hats.',
    intro: [
      'A mesh bucket keeps the shade of a brim and adds airflow through the crown. Solid front panel for the logo, mesh sides and back for the heat — the same logic as a trucker cap, in a bucket shape.',
      'It is the shape fishing brands, marinas and resort shops reorder every summer.',
    ],
    faqs: [
      { q: 'Does the mesh block sun?', a: 'No — mesh is for airflow, not UV protection. For sun protection choose the wide brim UPF build instead.' },
      { q: 'Can the mesh be a contrast colour?', a: 'Yes, contrast mesh starts at 100 pcs per colourway.' },
    ],
  },
  {
    slug: 'wide-brim-bucket-hats',
    parent: 'bucket-hats',
    name: 'Wide Brim Bucket Hat',
    nameZh: '宽檐渔夫帽防晒款',
    kind: 'catalog',
    title: 'Custom Wide Brim Bucket Hats — UPF 50+, 10 Pcs Min',
    description:
      'Custom wide brim bucket hats with 9–10 cm brims, neck cords and UPF 50+ fabrics. Sun protection for outdoor, safari, fishing and kids programs, from 10 pcs.',
    h1: 'Wide brim, real sun cover.',
    intro: [
      'A wide brim bucket is a sun-protection product first and a fashion item second. Brim width is the spec that matters: 9–10 cm covers ears and neck, 6.5 cm does not.',
      'We build these with UPF-rated fabric, a neck cord and a packable brim so they survive being folded into a daypack.',
    ],
    faqs: [
      { q: 'Is UPF 50+ certified?', a: 'The fabric is lab-rated UPF 50+ and we can supply the test report with the order. It is a fabric rating, not a guarantee for the whole garment.' },
      { q: 'Can these be made for kids?', a: 'Yes — the kids size runs 50–54 cm with a shorter 7 cm brim and a breakaway cord.' },
    ],
  },

  /* ----------------------------------------------------------- fashion hats */
  {
    slug: 'berets',
    parent: 'fashion-hats',
    name: 'Beret',
    nameZh: '贝雷帽',
    kind: 'catalog',
    title: 'Custom Berets — Wool Blend & Leather Trim, 10 Pcs Min',
    description:
      'Custom wool blend berets with leather bands and badge points, from 10 pcs. Classic 28 cm disc, blocked and lined, for fashion labels and uniform programs.',
    h1: 'Berets.',
    intro: [
      'A beret is a blocked wool disc with a band and a small stem — simple to describe, hard to make well. The difference between a good one and a bad one is the blocking and the band tension.',
      'We run a 60% wool blend for retail and a felt version with a leather band for labels that want a cleaner edge.',
    ],
    faqs: [
      { q: 'Will a wool beret shrink?', a: 'Wool felt can felt and shrink with hot water and agitation. Cold hand wash, reshape wet, dry flat.' },
      { q: 'Can a beret carry a metal badge?', a: 'Yes, a badge point or pin backing is standard on the leather-trim build, from 10 pcs.' },
    ],
  },
  {
    slug: 'cowboy-hats',
    parent: 'fashion-hats',
    name: 'Cowboy Hat',
    nameZh: '牛仔帽',
    kind: 'catalog',
    title: 'Custom Cowboy Hats — Felt & Straw, 10 Pcs Min',
    description:
      'Custom felt and straw cowboy hats with cattleman creases, leather bands and chin straps, from 10 pcs. Western retail, rodeo and event programs.',
    h1: 'Western hats.',
    intro: [
      'Cowboy hats are blocked shapes with a creased crown and a wide, shaped brim. Felt holds a crease and takes a leather band; straw is lighter and ventilated for summer.',
      'Both run from 10 pcs, with band, lining and chin strap configurable per colourway.',
    ],
    faqs: [
      { q: 'Felt or straw?', a: 'Felt for year-round and formal, straw for summer and heat. Straw is roughly 20% cheaper per piece.' },
      { q: 'Can you shape a custom brim?', a: 'Standard profiles are cattleman and brick. Custom brim shaping needs a pattern and starts at 200 pcs.' },
    ],
  },

  /* -------------------------------------------------------------- kids hats */
  {
    slug: 'kids-baseball-caps',
    parent: 'kids-hats',
    name: 'Kids Baseball Cap',
    nameZh: '儿童棒球帽',
    kind: 'catalog',
    title: 'Custom Kids Baseball Caps — 52–55 cm, 10 Pcs Min',
    description:
      'Custom kids baseball caps and toddler truckers from 10 pcs. 50–55 cm bands, soft crowns, adjustable straps and child-safe trims for schools, teams and kids brands.',
    h1: 'Kids baseball caps.',
    intro: [
      'A kids cap is not a scaled-down adult cap: the crown ratio, band height and strap all change. Get the band right and the cap stays on; get it wrong and it ends up in a drawer.',
      'We size on 50–55 cm bands with a soft crown and an adjustable strap, and we specify plastic adjusters that will not pinch.',
    ],
    faqs: [
      { q: 'What age does 52–55 cm fit?', a: 'Roughly 3–8 years. Toddler 48–51 cm covers about 1–3 years; youth 55–57 cm covers 8–12.' },
      { q: 'Are the materials child-safe?', a: 'Trims are nickel-free and the adjusters are plastic. We can supply a material declaration with the order.' },
    ],
  },
  {
    slug: 'kids-bucket-hats',
    parent: 'kids-hats',
    name: 'Kids Bucket Hat',
    nameZh: '儿童渔夫帽',
    kind: 'catalog',
    title: 'Custom Kids Bucket Hats — Reversible Options, 10 Pcs Min',
    description:
      'Custom kids bucket hats in cotton and reversible prints, from 10 pcs. 50–54 cm bands, 5.5 cm brims, neck cords and packable crowns for kids brands and camps.',
    h1: 'Kids bucket hats.',
    intro: [
      'The kids bucket is the summer camp and beach staple. Two builds sell: a plain cotton version for embroidery, and a reversible print version that gives two looks for one price.',
      'Both use a 5.5 cm brim — short enough that it does not flop into the eyes, wide enough to shade them.',
    ],
    faqs: [
      { q: 'Can a reversible bucket take embroidery?', a: 'Only through both layers, which shows on the reverse side. Print or patch is the better option for reversible builds.' },
      { q: 'Is there a neck cord?', a: 'Yes, standard on kids sizes, with a breakaway clip on request.' },
    ],
  },
  {
    slug: 'baby-sun-hats',
    parent: 'kids-hats',
    name: 'Baby Sun Hat',
    nameZh: '宝宝防晒帽',
    kind: 'catalog',
    title: 'Custom Baby Sun Hats — UPF 50+, 44–48 cm, 10 Pcs Min',
    description:
      'Custom baby sun hats with UPF 50+ fabric, soft wide brims and tie or hook-and-loop chin straps. 42–48 cm bands for infant and toddler programs, from 10 pcs.',
    h1: 'Baby sun hats.',
    intro: [
      'Baby sun hats are a safety product. The brim has to be soft enough to bend when a baby rolls over, the strap has to hold without pressing on the neck, and the fabric has to be rated.',
      'We build on 42–48 cm bands with a soft interfaced brim and a UPF 50+ shell, with either a tie strap or hook-and-loop.',
    ],
    faqs: [
      { q: 'Is the chin strap safe for infants?', a: 'Use a hook-and-loop or breakaway strap for infants so it releases under load. Tie straps are for toddlers under supervision.' },
      { q: 'Does UPF wash out?', a: 'UPF from the fabric structure and dye does not wash out the way a coating does. It degrades slowly with abrasion, not with laundering.' },
    ],
  },

  /* ----------------------------------------------------------- brand section */
  {
    slug: 'nfl-colorways',
    parent: 'brand-section',
    name: 'NFL Hats',
    nameZh: '橄榄球配色',
    kind: 'league',
    title: 'NFL Hats — Blank Colorway Caps, 25 Pcs',
    description:
      'Two-tone caps in pro football palettes: navy and silver, forest and white, black and gold. Blank or with your own logo, 25 pcs minimum. Not licensed merchandise.',
    h1: 'NFL hats.',
    intro: [
      'Navy and silver. Forest and white. Black and gold. These are the palettes that read as Sunday football before anyone can read a logo, and they sell at game-day tables, campus stores and team dealers.',
      'We supply the colour story on stock cap bodies. We do not supply team names, team logos or league marks, and we are not affiliated with or licensed by any league or team.',
    ],
    faqs: [
      { q: 'Do these caps come with team logos?', a: 'No. They ship blank or with your own mark. Team names and logos are trademarks of their owners and we do not reproduce them.' },
      { q: 'Why is the minimum 25 pcs here?', a: 'Because the bodies are stock colourways — already cut and dyed — so we only run your embroidery, not a full cutting setup.' },
    ],
  },
  {
    slug: 'nba-colorways',
    parent: 'brand-section',
    name: 'NBA Hats',
    nameZh: '篮球配色',
    kind: 'league',
    title: 'NBA Hats — Blank Colorway Caps, 25 Pcs',
    description:
      'Two-tone caps in pro basketball palettes: royal and white, purple and gold, black and red. Blank or your own logo, 25 pcs. Not licensed merchandise.',
    h1: 'NBA hats.',
    intro: [
      'Basketball palettes are louder than football ones — more royal, more purple, more contrast. The caps that sell are the ones with a bright crown and a clean white or black visor.',
      'Stock bodies, your mark, 25 pcs minimum. No team names, no team logos, no league marks.',
    ],
    faqs: [
      { q: 'Can I match an exact team colour?', a: 'Send Pantone references and we match against our fabric and thread charts. Exact licensed colour matching is not guaranteed.' },
      { q: 'Do you make youth sizes in these?', a: 'Yes, 52–55 cm bands on the same colourway, 25 pcs per size run.' },
    ],
  },
  {
    slug: 'mlb-colorways',
    parent: 'brand-section',
    name: 'MLB Hats',
    nameZh: '棒球配色',
    kind: 'league',
    title: 'MLB Hats — Fitted & Trucker Colorways, 25 Pcs',
    description:
      'Fitted and trucker caps in pro baseball palettes: navy and red, royal and white, cream and green. Blank or your logo, 25 pcs. Not licensed merchandise.',
    h1: 'MLB hats.',
    intro: [
      'Baseball palettes are the most traditional of the four: navy with red, royal with white, cream with forest. They suit fitted crowns and truckers better than high snapbacks.',
      'Stock colourways, blank or decorated with your mark only.',
    ],
    faqs: [
      { q: 'Are these real team caps?', a: 'No. They are blank stock colourways inspired by classic baseball palettes. We are not affiliated with any league or team.' },
      { q: 'Do fitted colourways need a size run?', a: 'Yes — fitted builds are quoted per size, typically six sizes for 100 pcs.' },
    ],
  },
  {
    slug: 'nhl-colorways',
    parent: 'brand-section',
    name: 'NHL Hats',
    nameZh: '冰球配色',
    kind: 'league',
    title: 'NHL Hats — Fitted & Trucker Colorways, 25 Pcs',
    description:
      'Fitted and trucker caps in pro hockey palettes: red and navy, black and gold, teal and white. Blank or your logo, 25 pcs. Not licensed merchandise.',
    h1: 'NHL hats.',
    intro: [
      'Hockey palettes run darker and colder than the other three — deep reds, blacks, teals and a lot of metallic gold. They look best on a low-contrast fitted crown.',
      'Stock colourways with your mark only. No league or team marks are supplied.',
    ],
    faqs: [
      { q: 'Can you do a winter-weight version?', a: 'Yes, a brushed poly or wool blend body is available on the trucker and fitted builds from 100 pcs.' },
      { q: 'Are these licensed?', a: 'No. Nothing in this section is licensed, endorsed or affiliated with any league or team.' },
    ],
  },

  /* ------------------------------------------------------------ custom hat */
  {
    slug: 'custom-baseball-caps',
    parent: 'custom-hat',
    name: 'Custom Baseball Caps',
    nameZh: '定制棒球帽',
    kind: 'program',
    title: 'Custom Baseball Caps — 10 Pcs, 12-Colour Embroidery',
    description:
      'Custom baseball caps from 10 pcs: 6-panel, 5-panel, leather patch and premium twill. Free digital proof, 12-colour embroidery, 12–18 day bulk, DDP to the U.S.',
    h1: 'Custom baseball caps.',
    intro: [
      'The standard custom baseball cap program: pick a crown, pick a fabric, send a logo. One front logo in up to 12 thread colours is included, and a digital proof comes back before you pay anything.',
      'Most first orders here are 10–10 pcs — enough to test a colourway in a store or at an event without a container commitment.',
    ],
    faqs: [
      { q: 'What do I need to send?', a: 'A vector logo (AI, EPS, PDF, SVG) or a clean 300 dpi PNG, plus quantity, colourway and the date you need the caps in hand.' },
      { q: 'How long does it take?', a: 'Proof in 24 hours, sample in 5 days, bulk in 12–18 days after approval, then 5–12 days transit.' },
    ],
  },
  {
    slug: 'custom-dad-hats',
    parent: 'custom-hat',
    name: 'Custom Dad Hats',
    nameZh: '定制老爹帽',
    kind: 'program',
    title: 'Custom Dad Hats — Unstructured, 10 Pcs Min',
    description:
      'Custom dad hats and unstructured caps from 10 pcs. Washed cotton, corduroy and canvas, soft crown, metal buckle. Cheap per piece, retail-looking result.',
    h1: 'Custom dad hats.',
    intro: [
      'Custom dad hats are the lowest-cost way into a branded cap that still looks like retail. Unstructured crown, soft twill, metal buckle — no buckram to distort a wordmark.',
      'Best for thin letterforms and small tonal marks rather than wide badges.',
    ],
    faqs: [
      { q: 'Can I put a big logo on a dad hat?', a: 'Up to about 9 cm. Wider marks wrap around the crown curve and the ends distort.' },
      { q: 'What is the price at 500 pcs?', a: 'Roughly 22% below the 10-pc price, because the cutting and embroidery setup is amortised over more pieces.' },
    ],
  },
  {
    slug: 'custom-trucker-caps',
    parent: 'custom-hat',
    name: 'Custom Trucker / Mesh Caps',
    nameZh: '定制卡车网帽',
    kind: 'program',
    title: 'Custom Trucker Caps — Foam Front, Screen Print, 10 Pcs',
    description:
      'Custom trucker caps and mesh caps from 10 pcs. Foam or structured front, screen print or embroidery, 12 cm logo area, cheapest large-logo cap we make.',
    h1: 'Custom trucker caps.',
    intro: [
      'The trucker is the cheapest way to carry a big logo: a flat foam front takes a 12 cm screen print with no curvature problems, and the mesh back keeps it wearable in heat.',
      'This is the shape for farm supply, construction, landscaping, fishing and event giveaways.',
    ],
    faqs: [
      { q: 'Screen print or embroidery?', a: 'Screen print is cheaper and holds large flat artwork. Embroidery looks better for smaller marks and survives more washes.' },
      { q: 'Can I get a two-tone mesh?', a: 'Yes, contrast mesh and piping from 100 pcs per colourway.' },
    ],
  },
  {
    slug: 'custom-bucket-hats',
    parent: 'custom-hat',
    name: 'Custom Bucket Hats',
    nameZh: '定制渔夫帽',
    kind: 'program',
    title: 'Custom Bucket Hats — Cotton, Nylon, Mesh & Wide Brim',
    description:
      'Custom bucket hats from 10 pcs in cotton twill, waterproof nylon, mesh and wide brim UPF builds. Embroidered or patched, with neck cords and packable brims.',
    h1: 'Custom bucket hats.',
    intro: [
      'Bucket hats are the fastest-growing shape we make. The build choice is really a fabric choice: cotton for retail, nylon for outdoor, mesh for fishing, wide brim for sun protection.',
      'All four take a front embroidered mark, and all four can be packed in the same carton as your caps.',
    ],
    faqs: [
      { q: 'What brim width should I order?', a: '6.5 cm is the commercial default. Go to 9–10 cm only if the product is sun protection rather than fashion.' },
      { q: 'Can I mix bucket styles in one order?', a: 'Yes, but the 10-pc minimum applies per style and colourway, so a mixed order means 50 of each.' },
    ],
  },
  {
    slug: 'custom-golf-caps',
    parent: 'custom-hat',
    name: 'Custom Golf Caps',
    nameZh: '定制高尔夫运动帽',
    kind: 'program',
    title: 'Custom Golf Caps & Visors — Performance, 10 Pcs',
    description:
      'Custom golf caps and visors from 10 pcs. Performance poly or cotton piqué, laser-perforated panels, wicking bands, small embroidered marks for clubs and tournaments.',
    h1: 'Custom golf caps.',
    intro: [
      'Golf orders are small, dated and usually embroidered on the left front or the side rather than the centre — club crests sit small and precise.',
      'We can run caps and visors in the same colourway so a pro shop gets a matching set from one freight cost.',
    ],
    faqs: [
      { q: 'Can you print a full-colour club crest?', a: 'Below 100 pcs, embroidered or woven patch is more economical. Sublimation is quoted per design and starts at 100 pcs.' },
      { q: 'Do golf caps need a specific sweatband?', a: 'A moisture-wicking band is standard on the performance build. Cotton piqué uses a cotton band, which is what club buyers expect.' },
    ],
  },
  {
    slug: 'custom-kids-hats',
    parent: 'custom-hat',
    name: 'Custom Kids Hats',
    nameZh: '定制儿童帽',
    kind: 'program',
    title: 'Custom Kids Hats — 44–56 cm Bands, 10 Pcs Min',
    description:
      'Custom kids caps, toddler bucket hats and baby sun hats from 10 pcs. 44–56 cm bands, soft brims, breakaway straps and child-safe nickel-free trims.',
    h1: 'Custom kids hats.',
    intro: [
      'Kids headwear is sized, not shrunk. A 52–55 cm band with a soft crown fits a 3–8 year old; 44–48 cm covers infant to toddler sun hats.',
      'We specify nickel-free trims and plastic adjusters, and can supply a material declaration for your own compliance file.',
    ],
    faqs: [
      { q: 'What sizes should I stock?', a: 'Toddler 48–51 cm, kids 52–55 cm, youth 55–57 cm. Most school and camp programs order kids plus youth.' },
      { q: 'Is there a minimum per size?', a: 'No — the 10-pc minimum is per colourway, and sizes can be mixed inside it.' },
    ],
  },
  {
    slug: 'custom-other-hats',
    parent: 'custom-hat',
    name: 'Custom Other Hats',
    nameZh: '其他定制帽型',
    kind: 'program',
    title: 'Custom Other Hats — Berets, Cowboy Hats, Visors & More',
    description:
      'Custom berets, cowboy hats, visors, beanies and special shapes from 10 pcs. Cut-and-sew and blocked constructions, leather trim and badge options.',
    h1: 'Other shapes we run.',
    intro: [
      'Not every program fits a cap. Berets, western hats, visors and blocked shapes all run through the same quoting process, with longer lead times because they are cut-and-sew or blocked rather than assembled from a cap body.',
      'Send the shape and a reference photo — if we do not run it, we will say so rather than quote and substitute.',
    ],
    faqs: [
      { q: 'Can you copy a sample I send you?', a: 'Yes for construction and fit. We will not reproduce another brand’s logo or a patented design feature.' },
      { q: 'What is the lead time on blocked shapes?', a: '20–28 days for berets and western hats, against 12–18 days for caps.' },
    ],
  },
];

export const parentBySlug = Object.fromEntries(parents.map((p) => [p.slug, p]));
export const childBySlug = Object.fromEntries(children.map((c) => [c.slug, c]));

/** shapes a custom program page should list */
export const programShapes = {
  'custom-baseball-caps': ['baseball'],
  'custom-dad-hats': ['baseball'],
  'custom-trucker-caps': ['baseball'],
  'custom-bucket-hats': ['bucket'],
  'custom-golf-caps': ['baseball', 'visor'],
  'custom-kids-hats': ['baseball', 'bucket'],
  'custom-other-hats': ['beret', 'cowboy', 'visor'],
};
