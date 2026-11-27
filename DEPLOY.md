# 部署指南（Cloudflare Workers + GitHub 源码）

站点现在**只托管在 Cloudflare Workers**：

```
https://raymark.847563751-a0d.workers.dev
```

GitHub 仓库只存源码，不提供网页（GitHub Pages 已关闭，避免重复内容）。

---

## 架构

```
GitHub  raymarkhat/raymarkhat
   │  源码：src/ + build.mjs（53 个文件）
   ▼
本地构建  node build.mjs  →  dist/（266 个静态文件）
   ▼
Cloudflare Worker "raymark"（静态资源模式，wrangler deploy）
   ▼
https://raymark.847563751-a0d.workers.dev
```

构建零依赖：不需要 `npm install`，`node build.mjs` 直接出产物。

---

## 日常发布（两条命令）

```bash
node build.mjs          # 1. 生成 dist/
npx wrangler deploy     # 2. 推送（需要 Cloudflare 登录态或 API token）
```

需要环境变量：

| 变量 | 取值 |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token（`Workers Scripts: Edit`）或 OAuth access token |
| `CLOUDFLARE_ACCOUNT_ID` | `ea0d413dec1a79eda283c07aead576fc` |

`wrangler.toml` 已配置好：

```toml
name = "raymark"
compatibility_date = "2025-01-01"

[assets]
directory = "./dist"
not_found_handling = "404-page"
html_handling = "auto-trailing-slash"
```

---

## 首次配置（换电脑时）

```bash
# 1. 装 node 20+
node -v

# 2. 登录 Cloudflare（浏览器点 Allow）
npx wrangler login

# 3. 确认仓库
cd raymark-caps
node build.mjs
npx wrangler deploy
```

---

## 改内容

| 想改什么 | 改哪个文件 |
|---|---|
| 公司名 / 电话 / 邮箱 / 域名 | `src/site.config.mjs` |
| 一级 / 二级类目、类目文案 | `src/data/taxonomy.mjs` |
| 产品（价格、规格、FAQ） | `src/data/catalog/*.json` + `src/data/products.mjs` |
| 产品图片 | `src/assets/photos/`（`npm run photos -- import <文件夹>`） |
| 配色 / 字体 | `src/assets/site.css` 顶部 `:root` |
| 知识库文章 | `src/data/pedia/*.json` |

改完：`node build.mjs && npx wrangler deploy`。

---

## 域名

当前用 `*.workers.dev` 子域名。换成正式域名（如 `raymarkcaps.com`）：

1. 域名接入 Cloudflare（NS 改过去）
2. Workers & Pages → `raymark` → Settings → **Domains & Routes** → Add custom domain
3. 改 `src/site.config.mjs` 的 `url` 为新域名
4. `node build.mjs && npx wrangler deploy`

改完 canonical、sitemap、结构化数据会一起指向新域名。

---

## 常见问题

**发布后页面没变**
`workers.dev` 走 Cloudflare 缓存，CSS/JS 已带内容指纹会自动失效；HTML 强刷一次（Ctrl/Cmd+Shift+R）。

**想回滚**
Cloudflare 面板 → Workers & Pages → `raymark` → Deployments，选上一个版本 Redeploy。

**`_redirects` / `_headers` 生效吗**
在 Workers 静态资源模式下，这两个文件**不生效**（那是 Pages 的特性）。当前没有依赖它们的逻辑。

**为什么仓库里没有 dist/**
构建产物不入库，仓库只放源码（53 个文件）。要产物就跑一次 `node build.mjs`。
