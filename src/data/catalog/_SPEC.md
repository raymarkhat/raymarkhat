# Raymark 货品数据规范（子代理必读）

你要为一个**美国 B 端帽子供应商**写商品数据。输出是 JSON 数组，一个文件一个组。

## 硬性规则

1. **英文，美式拼写**，专业克制。禁止 emoji、感叹号、hype 词（revolutionary / game-changing / best-in-the-world）。
2. **禁止**任何球队名、联盟名、球队 Logo、球员名、Nike/New Era/59FIFTY 等商标。只写"colorway / palette"。
3. **禁止编造**：不写客户数、获奖、认证、"we supply Walmart"这类无法验证的话。价格、MOQ、工期必须符合下表。
4. `price` = **该 SKU 在 MOQ 档位的单价（USD/件）**，其余档位由程序自动推算（×0.95 / ×0.86 / ×0.78）。
5. `moq`：常规 50；stock colorway（品牌专区）25。
6. 每款必须能通过 `JSON.parse`，UTF-8 无 BOM，2 空格缩进。

## 字段结构（严格照抄字段名）

```json
{
  "slug": "kebab-case-unique",
  "name": "Product Name",
  "eyebrow": "CUSTOM · BUCKET",
  "cat": "cotton-bucket-hats",
  "shape": "bucket",
  "tagline": "One sentence, 60-90 chars, concrete.",
  "blurb": "Card line, 70-95 chars, benefit-led.",
  "price": 8.4,
  "moq": 50,
  "badges": [],
  "intro": ["Para 1, 45-70 words.", "Para 2, 45-70 words."],
  "features": [
    { "title": "3-5 words", "text": "One sentence, concrete spec or benefit." }
  ],
  "specs": [
    ["Crown", "6-panel, mid-profile, structured"],
    ["Fabric", "100% cotton twill, 260 gsm"],
    ["Visor", "Curved, 7 cm deep"],
    ["Closure", "Metal slide buckle"],
    ["Sweatband", "Cotton twill"],
    ["Sizes", "One size (56-60 cm)"],
    ["Decoration", "Flat embroidery, woven patch"],
    ["Carton", "100 pcs per carton, 0.14 cbm"]
  ],
  "decoration": ["Flat embroidery", "Woven patch"],
  "colors": [{ "name": "Navy / Cream", "hex": "#1B2A44" }],
  "sizes": ["One size (56-60 cm)"],
  "art": {
    "shape": "bucket",
    "crown": "#1B2A44",
    "brim": "#14203A",
    "accent": "#EFE4CC",
    "stitch": "#EFE4CC",
    "mark": "HARBOR",
    "markScale": 1,
    "bg": "#EAE3D4"
  },
  "faqs": [{ "q": "Question?", "a": "Direct 1-2 sentence answer." }],
  "related": ["some-existing-slug", "another-slug"]
}
```

数量要求：`features` 3-4 条，`specs` 7-8 行，`colors` 3-4 个，`faqs` 2-3 条，`related` 2-3 个（必须来自"可用 slug 清单"）。

## 视觉参数（art）怎么填

`art` 决定程序生成的商品插画配色，填错会很难看。规则：

- `crown` 主体色，中等明度（不要纯白/纯黑，用 #EFE9DC / #15171B 这类）
- `brim` 帽檐：同色系压暗 10-15%，或做双色对比（如深藏青配银色 #B9C0C9）
- `accent` 刺绣线色，与 crown 对比要强（深底用米白 #EFE4CC，浅底用墨绿 #22301F）
- `stitch` 缝线色，浅色帽用深线、深色帽用浅线
- `bg` 背景色：**很浅、低饱和**的同类色，当作摄影棚背景（如 #EAE3D4 / #E4E8DE / #EFE2CE）
- `mark` 2-8 个大写字母/单词，是绣在前片的 logo（如 "HARBOR"、"CLUB 7"、"RALLY"）
- 可选开关（按需加，不写就是默认）：
  - `"fivePanel": true` 五片帽（无中缝）
  - `"mesh": "#E0D5BE"` 后片网眼（卡车帽）
  - `"rope": "#F2EDE3"` 前檐绳饰
  - `"patch": "#8B5E34"` 皮质前贴
  - `"camo": true` 迷彩印花
  - `"cord": true` 灯芯绒纹理
  - `"perf": true` 激光冲孔（运动帽）
  - `"puff": true` 3D 立体绣（视觉更粗）
- `shape` 必须是：`baseball` / `bucket` / `visor` / `beret` / `cowboy`

**参考配色（可直接复用/微调）**

| 风格 | crown | brim | accent | stitch | bg |
|---|---|---|---|---|---|
| Navy/Cream | #1B2A44 | #14203A | #EFE4CC | #EFE4CC | #EAE3D4 |
| Sage | #A8B5A2 | #8F9C89 | #22301F | #DCE3D6 | #E4E8DE |
| Tan | #D9A05B | #C08A45 | #3A2A18 | #F0DFC4 | #EFE2CE |
| Black/Red | #15171B | #B3202A | #F4EFE2 | #F4EFE2 | #E6DED0 |
| Rust | #8C4A3F | #7A3F35 | #F2E8D5 | #D9B9A8 | #EBDCCC |
| Forest | #26493A | #1C3A2E | #F4F2EA | #DDE3DA | #E1E5DE |
| Stone | #C9C2B2 | #B5AE9C | #2A2A26 | #EFE9DC | #E9E5DA |
| Royal | #21409A | #F4F0E6 | #F4F0E6 | #C9D3E8 | #E4E6EC |

## 价格带（USD，MOQ 档）

| 品类 | 价格区间 |
|---|---|
| 经典 6 片 / 老爹帽 | 6.2 – 8.6 |
| 全封定型 / 平檐 | 8.9 – 12.5 |
| 卡车网帽 | 6.5 – 9.6 |
| 高尔夫 / 运动 | 7.5 – 10.5 |
| 空顶帽（visor） | 5.8 – 8.2 |
| 渔夫帽（棉/尼龙/网眼/宽檐） | 7.2 – 11.5 |
| 贝雷帽 / 牛仔帽 | 9.5 – 16.0 |
| 童帽 / 宝宝帽 | 4.9 – 7.8 |
| 品牌专区 stock colorway | 8.5 – 12.0（moq 25） |

## 可用 slug 清单（related 只能引用这些）

已存在的：signature-6-panel-cap, classic-dad-hat, flat-brim-snapback, camp-5-panel-cap,
trucker-mesh-cap, leather-patch-cap, corduroy-cap, rope-cap, washed-vintage-cap,
performance-golf-cap, gridiron-snapback, turf-trucker, pro-fit-fitted-cap, huddle-dad-hat,
saturday-rope-cap, end-zone-camo-cap

本批次新增（你负责的那些就是这些 slug，见你的任务清单）

## 写作口吻参考（照这个密度写）

> The dad hat is the cheapest cap you can put a logo on without it looking cheap. An unstructured
> crown, washed cotton twill and a low profile give it a soft, worn-in shape that photographs well.

不要写"品质卓越、款式多样、欢迎咨询"这种空话。每个卖点必须带数字、材质或具体工艺。

## 页面上会显示什么

产品卡显示：`name`、`blurb`、`From $price`、`moq pcs min`。
详情页显示：`tagline`、两段 `intro`、`features`、`specs` 表、`decoration` 标签、`colors` 色卡、`sizes`、`faqs`。

所以 `blurb` 和 `tagline` 不能重复，`blurb` 更像货架文案，`tagline` 更像一句技术说明。
