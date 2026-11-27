# -*- coding: utf-8 -*-
"""Brand raster assets: favicon PNGs, app icons, Open Graph cards. No external deps beyond Pillow."""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src", "assets", "brand")
os.makedirs(OUT, exist_ok=True)

INK = (18, 24, 29)
PAPER = (247, 242, 230)
CREAM = (251, 248, 241)
RED = (180, 38, 44)
LINE = (222, 212, 192)
GOLD = (185, 138, 46)

FONT_DIR = "C:/Windows/Fonts"


def font(name, size):
    for candidate in (name, "ariblk.ttf", "arialbd.ttf", "seguisb.ttf", "arial.ttf"):
        path = os.path.join(FONT_DIR, candidate)
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


DISPLAY = "ariblk.ttf"
BOLD = "arialbd.ttf"
REG = "arial.ttf"


def draw_tracked(draw, xy, text, f, fill, tracking=0):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill)
        x += draw.textlength(ch, font=f) + tracking
    return x


def wrap(draw, text, f, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=f) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


# ---------------------------------------------------------------- favicon
def cap_glyph(size, bg=INK, fg=PAPER, brim=RED):
    s = size * 4
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, s - 1, s - 1], radius=int(s * 0.22), fill=bg)
    # crown
    cx, cy = s // 2, int(s * 0.30)
    d.pieslice([cx - int(s * 0.22), cy - int(s * 0.22), cx + int(s * 0.22), cy + int(s * 0.22)], 180, 360, fill=fg)
    d.rectangle([cx - int(s * 0.22), cy, cx + int(s * 0.22), int(s * 0.62)], fill=fg)
    # brim
    d.rounded_rectangle(
        [int(s * 0.14), int(s * 0.60), int(s * 0.86), int(s * 0.71)], radius=int(s * 0.05), fill=brim
    )
    # button
    d.ellipse(
        [cx - int(s * 0.035), int(s * 0.055) - int(s * 0.035), cx + int(s * 0.035), int(s * 0.055) + int(s * 0.035)],
        fill=brim,
    )
    return img.resize((size, size), Image.LANCZOS)


for px, name in ((32, "favicon-32.png"), (180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")):
    cap_glyph(px).save(os.path.join(OUT, name))
    print("wrote", name)


# ------------------------------------------------------------- OG cards
def og(path, kicker, lines, sub, accent=RED):
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)

    # grid texture
    for x in range(0, W, 48):
        d.line([(x, 0), (x, H)], fill=(238, 231, 216), width=1)
    for y in range(0, H, 48):
        d.line([(0, y), (W, y)], fill=(238, 231, 216), width=1)

    # ink band bottom
    d.rectangle([0, H - 92, W, H], fill=INK)

    # brand
    d.rounded_rectangle([72, 64, 96, 88], radius=6, fill=INK)
    d.pieslice([76, 68, 92, 84], 180, 360, fill=PAPER)
    d.rectangle([76, 76, 92, 84], fill=PAPER)
    d.rounded_rectangle([70, 82, 98, 88], radius=3, fill=accent)
    draw_tracked(d, (112, 62), "RAYMARK", font(DISPLAY, 30), INK, tracking=3)

    # kicker
    d.rectangle([72, 132, 104, 136], fill=accent)
    d.text((118, 122), kicker.upper(), font=font(BOLD, 22), fill=(108, 108, 98))

    # headline
    y = 186
    for line in lines:
        d.text((70, y), line, font=font(DISPLAY, 84), fill=INK)
        y += 92

    # sub
    y += 10
    f_sub = font(REG, 27)
    for line in wrap(d, sub, f_sub, 760)[:3]:
        d.text((72, y), line, font=f_sub, fill=(74, 74, 66))
        y += 38

    # sticker
    sx, sy, r = 1000, 210, 118
    d.ellipse([sx - r, sy - r, sx + r, sy + r], fill=accent, outline=INK, width=4)
    f1, f2 = font(DISPLAY, 58), font(BOLD, 18)
    t1, t2 = "50", "PCS MOQ"
    d.text((sx - d.textlength(t1, font=f1) / 2, sy - 46), t1, font=f1, fill=CREAM)
    d.text((sx - d.textlength(t2, font=f2) / 2, sy + 22), t2, font=f2, fill=CREAM)

    # footer text
    d.text((72, H - 66), "RAYMARKHAT.COM", font=font(BOLD, 20), fill=(222, 215, 198))
    d.text((W - 72 - d.textlength("CUSTOM CAPS · FACTORY DIRECT", font=font(BOLD, 20)), H - 66),
           "CUSTOM CAPS · FACTORY DIRECT", font=font(BOLD, 20), fill=(222, 215, 198))
    img.save(os.path.join(OUT, path), optimize=True)
    print("wrote", path)


og("og-default.png", "Custom cap works · Heze, Shandong",
   ["Caps that", "carry your mark."],
   "Custom baseball caps and pro-colorway caps, factory-direct to the U.S. from 50 pieces.")
og("og-shop.png", "The catalog",
   ["16 styles.", "Prices in the open."],
   "6-panel, dad hat, snapback, trucker, rope, corduroy, leather patch and pro colorways.")
og("og-pedia.png", "Cap pedia",
   ["Buy headwear", "like a pro."],
   "Sizing charts, MOQ math, thread counts, freight and care — written by the people who make the caps.")
og("og-contact.png", "Quote in 24 hours",
   ["Send a logo.", "Get a price."],
   "MOQ 50 pcs. Free digital proof. WhatsApp +86 159 5435 8307 or info@raymarkhat.com.")
print("done")
