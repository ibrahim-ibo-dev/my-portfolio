"""Render AuroraBackground's initial frame for the pre-hydration fallback.

Run from the repository root with Python, NumPy and Pillow. Keep the equations
and INITIAL_TIME in sync with AuroraBackground.tsx when changing its shader.
These are code-generated backgrounds, not screenshots or external artwork.
"""

from pathlib import Path

import numpy as np
from PIL import Image


INITIAL_TIME = 5.0
OUTPUT = Path(__file__).resolve().parents[1] / "public/images/backgrounds"


def fract(value):
    return value - np.floor(value)


def mix(a, b, amount):
    return a * (1.0 - amount) + b * amount


def smoothstep(low, high, value):
    t = np.clip((value - low) / (high - low), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


def length(x, y):
    return np.sqrt(x * x + y * y)


def hash2(x, y):
    return fract(np.sin(x * np.float32(127.1) + y * np.float32(311.7)) * np.float32(43758.5453))


def noise(x, y):
    ix, iy = np.floor(x), np.floor(y)
    fx, fy = fract(x), fract(y)
    fx, fy = fx * fx * (3.0 - 2.0 * fx), fy * fy * (3.0 - 2.0 * fy)
    return mix(mix(hash2(ix, iy), hash2(ix + 1.0, iy), fx),
               mix(hash2(ix, iy + 1.0), hash2(ix + 1.0, iy + 1.0), fx), fy)


def fbm(x, y):
    value, weight = np.zeros_like(x), 0.52
    for _ in range(3):
        value += weight * noise(x, y)
        # GLSL mat2 arguments fill columns, so this matches rotation * p.
        x, y = (0.8 * x + 0.6 * y) * 2.05 + 8.2, (-0.6 * x + 0.8 * y) * 2.05 + 2.7
        weight *= 0.48
    return value


def render(width, height):
    # Image rows run top to bottom; gl_FragCoord runs bottom to top.
    u, v = np.meshgrid((np.arange(width, dtype=np.float32) + 0.5) / width,
                       1.0 - (np.arange(height, dtype=np.float32) + 0.5) / height)
    px, py = (u - 0.5) * (width / height) * 2.0, (v - 0.5) * 2.0
    time = INITIAL_TIME * 0.075
    dx, dy = time * 0.13, -time * 0.09
    wx = fbm(px * 1.15 + dx, py * 1.15 + dy)
    wy = fbm(px * 1.05 + 4.7 - dx, py * 1.05 + 1.8 - dy)
    x, y = px + (wx - 0.45) * 0.70, py + (wy - 0.45) * 0.70
    bend = np.sin(x * 1.4 + time * 0.55) * 0.46 + np.sin(x * 2.6 - time * 0.32) * 0.13
    ribbon = y + x * 0.34 + bend
    phase = ribbon * 7.6 - time * 0.58
    silk = np.maximum(0.0, np.sin(phase)) ** 2.2
    edge = np.exp(-np.abs(np.sin(phase + 0.45)) * 24.0)
    filament = np.exp(-np.abs(np.sin(phase * 1.035 + 0.60)) * 70.0)
    veil = 0.5 + 0.5 * np.sin(ribbon * 2.2 + time * 0.17)

    blue = np.array([0.075, 0.16, 0.39], dtype=np.float32)
    teal = np.array([0.04, 0.24, 0.24], dtype=np.float32)
    copper = np.array([0.32, 0.15, 0.09], dtype=np.float32)
    violet = np.array([0.17, 0.075, 0.29], dtype=np.float32)
    colour = mix(copper, blue, smoothstep(-1.0, 0.45, x)[..., None])
    colour = mix(colour, teal, smoothstep(0.05, 1.2, x - y * 0.75)[..., None])
    colour = mix(colour, violet, ((1.0 - smoothstep(-0.4, 0.9, y)) * 0.30)[..., None])
    light = 0.38 + smoothstep(0.1, 0.95, length(px * 0.7, py * 1.05)) * 0.62
    colour *= ((silk * 0.54 + edge * 0.36 + filament * 0.16) * light)[..., None]
    colour += np.array([0.014, 0.020, 0.043], dtype=np.float32)
    colour += mix(blue, violet, u[..., None]) * (veil * 0.12)[..., None]
    colour += teal * (np.exp(-length((px - 0.9) * 0.7, py + 0.4) * 2.2) * 0.13)[..., None]
    vignette = 1.0 - smoothstep(0.38, 1.1, length((u - 0.5) * 1.15, (v - 0.5) * 0.85))
    colour *= (0.80 + vignette * 0.20)[..., None]
    return Image.fromarray(np.round(np.clip(colour ** 0.92, 0.0, 1.0) * 255).astype(np.uint8))


if __name__ == "__main__":
    OUTPUT.mkdir(parents=True, exist_ok=True)
    # Cover crops horizontally at almost all viewport ratios. Keeping the same
    # full vertical field preserves ribbon geometry across responsive sizes.
    for name, width, height in [("desktop", 2880, 900), ("mobile", 1080, 1080)]:
        path = OUTPUT / f"aurora-{name}.webp"
        render(width, height).save(path, "WEBP", quality=90, method=6)
        print(f"{path.name}: {width} x {height}, {path.stat().st_size:,} bytes")
