"""Rebuild the ih. vector and raster assets from a Space Grotesk variable font.

Usage (from the project root):
  python public/brand/source/generate-icons.py path/to/SpaceGrotesk.woff2
Requires fonttools, Brotli, Pillow, and the project's Node sharp package.
"""

import json
from pathlib import Path
import subprocess
import sys
import zipfile

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
font = TTFont(sys.argv[1])
if "fvar" in font:
    font = instantiateVariableFont(font, {"wght": 500}, inplace=False)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
letter_spacing = -0.1 * font["head"].unitsPerEm
parts = []
all_bounds = []
x = 0
for character in "ih.":
    glyph = glyphs[cmap[ord(character)]]
    svg_pen = SVGPathPen(glyphs)
    glyph.draw(TransformPen(svg_pen, (1, 0, 0, -1, x, 0)))
    bounds_pen = BoundsPen(glyphs)
    glyph.draw(TransformPen(bounds_pen, (1, 0, 0, -1, x, 0)))
    parts.append((character, svg_pen.getCommands()))
    all_bounds.append(bounds_pen.bounds)
    x += glyph.width + letter_spacing

left = min(bounds[0] for bounds in all_bounds)
top = min(bounds[1] for bounds in all_bounds)
right = max(bounds[2] for bounds in all_bounds)
bottom = max(bounds[3] for bounds in all_bounds)
width, height = right - left, bottom - top


def mark(ink="#F2EFED"):
    return "\n".join(
        f'<path fill="{"#D4A574" if character == "." else ink}" d="{path}"/>'
        for character, path in parts
    )


def svg_document(body, viewbox, title):
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="{viewbox}" role="img" aria-labelledby="title">\n'
        f'<title id="title">{title}</title>\n{body}\n</svg>\n'
    )


padding = 24
viewbox = f"{left-padding:g} {top-padding:g} {width+padding*2:g} {height+padding*2:g}"
for variant, ink in [("light", "#F2EFED"), ("dark", "#111827")]:
    (ROOT / f"ih-logo-{variant}.svg").write_text(
        svg_document(mark(ink), viewbox, "Ibrahim Hussein — ih."), encoding="utf-8"
    )

# Preserve the same relative glyph positions; centre the visible outline optically.
scale = min(356 / width, 356 / height)
translate_x = 256 - (left + right) * scale / 2
translate_y = 256 - (top + bottom) * scale / 2
group = f'<g transform="translate({translate_x:g} {translate_y:g}) scale({scale:g})">\n{mark()}\n</g>'
app_body = '<rect width="512" height="512" rx="104" fill="#090D18"/>\n' + group
(ROOT / "ih-app.svg").write_text(svg_document(app_body, "0 0 512 512", "Ibrahim Hussein — ih."), encoding="utf-8")
apple_body = '<rect width="512" height="512" fill="#090D18"/>\n' + group
(ROOT / "ih-app-square.svg").write_text(svg_document(apple_body, "0 0 512 512", "Ibrahim Hussein — ih."), encoding="utf-8")

jobs = [
    ("ih-app.svg", "icon-512.png", 512),
    ("ih-app.svg", "icon-192.png", 192),
    ("ih-app.svg", "favicon-48.png", 48),
    ("ih-app.svg", "favicon-32.png", 32),
    ("ih-app.svg", "favicon-16.png", 16),
    ("ih-app-square.svg", "apple-touch-icon.png", 180),
    ("ih-logo-light.svg", "ih-logo-light.png", 1024),
    ("ih-logo-dark.svg", "ih-logo-dark.png", 1024),
]
script = """
const sharp = require('sharp');
const path = require('path');
const jobs = JSON.parse(process.argv[1]);
const root = process.argv[2];
Promise.all(jobs.map(([source, output, width]) =>
  sharp(path.join(root, source), {density: 300})
    .resize({width}).png().toFile(path.join(root, output))
)).catch(error => { console.error(error); process.exit(1); });
"""
subprocess.run(["node", "-e", script, json.dumps(jobs), str(ROOT)], check=True)
Image.open(ROOT / "icon-512.png").save(
    ROOT / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)]
)

files = [path for path in ROOT.iterdir() if path.is_file() and path.suffix != ".zip"]
with zipfile.ZipFile(ROOT / "ih-brand-kit.zip", "w", zipfile.ZIP_DEFLATED) as archive:
    for path in sorted(files):
        archive.write(path, arcname=path.name)
print(f"Generated {len(files)} brand files and ih-brand-kit.zip")
