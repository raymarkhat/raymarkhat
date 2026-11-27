# Raymark Caps — 官网源码

Heze Raymark International Trade Co., Ltd 的英文独立站：帽子制造商的 B2B 目录站（棒球帽 / 运动户外 / 渔夫帽 / 时尚礼帽 / 童帽 / 品牌配色 / 定制）。

- 纯静态站点，**零运行时依赖**：Node 20+ 生成 HTML，输出到 `dist/`，部署到 Cloudflare Workers（静态资源模式）。
- **52 个 SKU，7 个一级类目，28 个二级类目**，102 个页面。
- 没有支付：所有商品可加购物车，最终生成一段询盘文案，通过 WhatsApp / 邮件发出。
- 全部产品图为程序生成的 SVG（`src/lib/cap-svg.mjs`，支持 5 种帽型），无版权风险，无外链图片。
- 不依赖任何外部 CDN / 字体 / 统计脚本。

---

## 1. 类目结构

| 一级类目 | 二级类目 |
|---|---|
| **Baseball Caps** `/baseball-caps/` | Classic Baseball Cap · Dad Hat · Fitted Cap · Snapback Cap · Trucker / Mesh Cap |
| **Sports & Outdoor Caps** `/sports-outdoor-caps/` | Golf Cap · Golf Visor · Tennis / Running Cap |
| **Bucket Hats** `/bucket-hats/` | Cotton · Nylon / Waterproof · Mesh · Wide Brim |
| **Fashion Hats** `/fashion-hats/` | Beret · Cowboy Hat |
| **Kids Hats** `/kids-hats/` | Kids Baseball Cap · Kids Bucket Hat · Baby Sun Hat |
| **Brand Section** `/brand-section/` | Pro Football · Pro Basketball · Pro Baseball · Pro Hockey colorways |
| **Custom Hat** `/custom-hat/` | Custom Baseball · Dad · Trucker · Bucket · Golf · Kids · Other |

URL 规则：一级 `/父类/`，二级 `/父类/子类/`，产品 `/caps/<slug>/`。

## 2. 页面清单

| URL | 生成器 | 说明 |
|---|---|---|
| `/` | `pages/home.mjs` | 首页：主张、7 类目入口、畅销款、流程、FAQ |
| `/shop/` | `pages/shop.mjs` | 52 款全目录，按一级类目筛选 + 排序 + 价格阶梯 |
| `/<父类>/` | `pages/category.mjs` | 类目总览：子类卡片 + 该类代表产品 |
| `/<父类>/<子类>/` | 同上 | 子类页：产品网格 + 采购条款 + FAQ + 同类导航 |
| `/caps/<slug>/` | `pages/product.mjs` | 产品页：图集、阶梯价、颜色/尺码、加购、规格、FAQ |
| `/pedia/`、`/pedia/<slug>/` | `pages/pedia.mjs` | 9 篇知识库长文 |
| `/contact/`、`/cart/`、`/404.html` | `pages/misc.mjs` | 询盘表单、询盘清单、兜底页 |

SEO 产物：`sitemap.xml`（100 条 URL）、`robots.txt`、`llms.txt`、`feed.xml`、`site.webmanifest`、`_headers`、`_redirects`、`humans.txt`。

## 3. 目录

```
raymark-caps/
├─ build.mjs                 # 生成器：页面 + SVG 图 + sitemap/robots/llms.txt
├─ src/
│  ├─ site.config.mjs        # ★ 公司名、电话、邮箱、域名、导航
│  ├─ data/
│  │  ├─ taxonomy.mjs        # ★ 7 个一级 + 28 个二级类目（含每类文案与 FAQ）
│  │  ├─ products.mjs        # 16 个基础 SKU
│  │  └─ catalog/*.json      # 36 个扩展 SKU（按组拆文件，便于维护）
│  ├─ lib/
│  │  ├─ catalog.mjs         # 合并货品 + 类目索引 + 视图规则
│  │  ├─ cap-svg.mjs         # 插画生成：baseball / bucket / visor / beret / cowboy
│  │  ├─ render.mjs          # 布局、页头（含二级菜单）、产品卡、价格阶梯
│  │  ├─ seo.mjs             # 结构化数据（Product / Article / FAQ / HowTo / Collection）
│  │  └─ blocks.mjs          # 文章正文渲染
│  ├─ pages/*.mjs            # 页面模板
│  └─ assets/                # site.css、app.js、favicon.svg、brand/ 位图
├─ tools/
│  ├─ serve.mjs              # 本地预览
│  ├─ qa.mjs                 # 死链 / JSON-LD / meta 自检
│  ├─ upload-github.mjs      # 用 API 批量上传（无 100 文件限制）
│  └─ make_brand_assets.py   # favicon / OG 图（Pillow）
└─ dist/                     # 构建产物（部署这个目录）
```

## 4. 本地运行

```bash
npm run build     # 生成 dist/
npm run serve     # http://127.0.0.1:8787 预览
npm run qa        # 死链 / 结构化数据 / meta 自检
```

## 5. 常改的地方

- **公司信息 / 域名**：`src/site.config.mjs` 的 `site.url`（影响 canonical、sitemap、结构化数据）。
- **类目**：`src/data/taxonomy.mjs`。加一个二级类目 = 加一个对象 + 父类的 `children` 数组里加 slug，页面和 sitemap 会自动生成。
- **产品**：`src/data/catalog/*.json`（新增 SKU 建议放这里），或 `products.mjs`（基础 16 款）。`price` 是 MOQ 档单价，其余档位自动推算。
- **配色 / 字体**：`src/assets/site.css` 顶部 `:root`。
- **产品插画**：每个 SKU 的 `art` 字段（主色、帽檐色、绣线色、图案、logo 文字、帽型）。

## 6. SEO / GEO

- 结构化数据：Product（AggregateOffer）、BreadcrumbList、FAQPage、Article、HowTo、CollectionPage、Organization、WebSite —— 共 290+ 组。
- 每个类目页有独立文案、FAQ 与面包屑；产品页面包屑走「Home → 一级 → 二级 → 产品」。
- `llms.txt` 含类目树、产品清单、公司事实，供 AI 引擎直接引用。
- 站内链接 10,000+ 条，`npm run qa` 保证 0 死链。
- `robots.txt` 放行 GPTBot / OAI-SearchBot / ClaudeBot / PerplexityBot 等。

## 7. 合规提示（重要）

**Brand Section 不是授权商品。** 该区所有页面都带有免责声明：仅提供空白帽身与原创两色配色，不隶属、未获授权于 NFL / NBA / MLB / NHL 或任何球队，不提供任何队名、队徽、联盟标识。

若要销售正版球队周边，必须先取得授权；否则可能面临平台下架、域名投诉与商标诉讼。站内目前的做法是「配色灵感 + 客户自有 logo」，属于行业常见的灰色地带，风险由经营者承担。

## 8. 上线

站点托管在 **Cloudflare Workers**：https://raymark.847563751-a0d.workers.dev

GitHub 仓库只存源码（不启用 GitHub Pages，避免重复内容）。发布流程见 [DEPLOY.md](./DEPLOY.md)。
