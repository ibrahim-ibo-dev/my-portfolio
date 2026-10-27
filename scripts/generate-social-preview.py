"""Render the homepage's visual identity as a sharp 1200 x 630 share image.

Run from the project root after generating the aurora poster:
  python scripts/generate-social-preview.py --background path/to/poster.webp
Optionally pass --font path/to/SpaceGrotesk.woff2; otherwise use Next's local
Space Grotesk font cache. Requires fonttools, Brotli and the project's sharp.
All text is outlined, so no system-font substitution can change the output.
"""

import argparse
import base64
from io import BytesIO
from functools import lru_cache
from pathlib import Path
import subprocess

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--font", type=Path)
parser.add_argument("--background", type=Path, required=True)
args = parser.parse_args()


def find_font():
    for path in sorted((ROOT / ".next/static/media").glob("*.woff2")):
        font = TTFont(path)
        if "Space Grotesk" in (font["name"].getDebugName(1) or "") and all(
            ord(letter) in font.getBestCmap() for letter in "Ibrahim Hussein."
        ):
            return path
    raise SystemExit("Pass --font with a Space Grotesk variable font, or run a Next build first.")


font_path = args.font or find_font()


@lru_cache(maxsize=None)
def font_at(weight):
    font = TTFont(font_path)
    if "fvar" in font:
        font = instantiateVariableFont(font, {"wght": weight}, inplace=False)
    return font


def text_width(text, size, weight=400, tracking=0):
    font = font_at(weight)
    glyphs, cmap = font.getGlyphSet(), font.getBestCmap()
    scale = size / font["head"].unitsPerEm
    return sum(glyphs[cmap[ord(char)]].width * scale for char in text) + max(0, len(text) - 1) * tracking


def text_path(text, x, baseline, size, fill="#f2efed", weight=400, tracking=0, center=False):
    if center:
        x -= text_width(text, size, weight, tracking) / 2
    font = font_at(weight)
    glyphs, cmap = font.getGlyphSet(), font.getBestCmap()
    scale = size / font["head"].unitsPerEm
    paths = []
    for char in text:
        glyph = glyphs[cmap[ord(char)]]
        pen = SVGPathPen(glyphs)
        glyph.draw(TransformPen(pen, (scale, 0, 0, -scale, x, baseline)))
        paths.append(pen.getCommands())
        x += glyph.width * scale + tracking
    return f'<path fill="{fill}" d="{" ".join(paths)}"/>'


def data_uri(path, mime):
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode("ascii")


# SVG rasterizers do not all decode embedded WebP. Embed a lossless PNG.
poster = BytesIO()
Image.open(args.background).save(poster, format="PNG")
background = "data:image/png;base64," + base64.b64encode(poster.getvalue()).decode("ascii")
logo = data_uri(ROOT / "public/brand/ih-logo-light.svg", "image/svg+xml")
heading_size, tracking = 112, -8.4
first, second = "Ibrahim", " Hussein."
first_width = text_width(first, heading_size, 500, tracking)
second_width = text_width(second, heading_size, 300, tracking)
heading_left = (1200 - first_width - second_width - tracking) / 2

parts = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">',
    '<defs><linearGradient id="role" x1="270" y1="0" x2="930" y2="0" gradientUnits="userSpaceOnUse"><stop stop-color="#a1b8ec"/><stop offset=".45" stop-color="#d6adbe"/><stop offset=".74" stop-color="#e5b28b"/><stop offset="1" stop-color="#83c7c3"/></linearGradient></defs>',
    '<rect width="1200" height="630" fill="#090d18"/>',
    f'<image href="{background}" width="1200" height="630" preserveAspectRatio="xMidYMid slice"/>',
    '<rect width="1200" height="630" fill="#080d19" opacity=".10"/>',
    '<g fill="none" stroke="#bccded" stroke-opacity=".055"><circle cx="600" cy="315" r="450"/><circle cx="600" cy="315" r="585"/></g>',
    f'<image href="{logo}" x="42" y="33" width="39" height="39"/>',
    text_path("IBRAHIM HUSSEIN", 94, 48, 9.5, weight=600, tracking=.45),
    text_path("ENGINEER & DEVELOPER", 94, 62, 7.5, "#9fa6b9", tracking=1),
    text_path("Selected work", 493, 56, 11.5, "#bcc1ce"),
    text_path("About", 607, 56, 11.5, "#bcc1ce"),
    text_path("Journey", 676, 56, 11.5, "#bcc1ce"),
    text_path("Playground", 756, 56, 11.5, "#bcc1ce"),
    '<rect x="1040" y="34" width="118" height="38" rx="19" fill="none" stroke="#ffffff" stroke-opacity=".22"/>',
    text_path("Let's talk", 1058, 58, 11, "#e7dcda", weight=500),
    '<path d="M1126 58l8-8m-8 0h8v8" fill="none" stroke="#e7dcda" stroke-width="1.1"/>',
    '<circle cx="429" cy="167" r="2.5" fill="#92c9c3"/>',
    text_path("ERBIL, KURDISTAN    /    IDEAS WITHOUT BORDERS", 447, 170, 8.6, "#bac4d2", weight=500, tracking=1),
    text_path(first, heading_left, 282, heading_size, weight=500, tracking=tracking),
    text_path(second, heading_left + first_width + tracking, 282, heading_size, "#e0e2eb", weight=300, tracking=tracking),
    text_path("Computer engineer. Creative by nature.", 600, 341, 30, "url(#role)", tracking=-1.05, center=True),
    text_path("I turn complex problems into software that feels simple.", 600, 392, 14, "#bec3d2", center=True),
    text_path("Full-stack platforms, intelligent systems, and a little curiosity.", 600, 417, 14, "#bec3d2", center=True),
    '<rect x="398" y="454" width="192" height="50" rx="25" fill="#eed0af" stroke="#f6dfc3"/>',
    text_path("Explore my work", 423, 485, 12, "#191a22", weight=500),
    '<path d="M554 486l10-10m-10 0h10v10" fill="none" stroke="#191a22" stroke-width="1.1"/>',
    text_path("The person behind it", 621, 484, 12, "#d5d2d7"),
    '<path d="M777 479h12m-5-5l5 5-5 5" fill="none" stroke="#d5d2d7" stroke-width="1.1"/>',
    '<path d="M621 503h170" stroke="#ffffff" stroke-opacity=".18"/>',
    text_path("01 / SOFTWARE     02 / ARTIFICIAL INTELLIGENCE     03 / EMBEDDED SYSTEMS", 44, 594, 8, "#9daec3", tracking=.65),
    text_path("ibrahim-eng.dev", 1156 - text_width("ibrahim-eng.dev", 12, 500, .35), 594, 12, "#d7c0a9", weight=500, tracking=.35),
    '</svg>',
]

output = ROOT / "public/images/social/portfolio-2026-10.png"
output.parent.mkdir(parents=True, exist_ok=True)
node_script = """
const fs = require('node:fs');
const sharp = require('sharp');
sharp(fs.readFileSync(0), {density: 144})
  .resize(1200, 630)
  .png({compressionLevel: 9, adaptiveFiltering: true})
  .toFile(process.argv[1])
  .catch(error => { console.error(error); process.exit(1); });
"""
subprocess.run(
    ["node", "-e", node_script, str(output)], input="\n".join(parts).encode("utf-8"),
    cwd=ROOT, check=True,
)
print(f"Created {output} ({output.stat().st_size:,} bytes; 1200 x 630)")
