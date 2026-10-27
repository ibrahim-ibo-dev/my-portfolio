# Ibrahim Hussein — ih.

The lowercase monogram matches the portfolio navigation: Space Grotesk Medium
(weight 500), with -0.1em letter spacing. The SVG letters are saved as vector
outlines, so they look the same on every device and need no installed font.

## Files

- `ih-logo-light.svg` / `.png`: transparent cream logo with copper dot, for dark backgrounds.
- `ih-logo-dark.svg` / `.png`: transparent dark logo with copper dot, for light backgrounds.
- `ih-app.svg`: rounded dark app icon, infinitely scalable.
- `ih-app-square.svg`: full square background for platforms that apply their own mask.
- `icon-512.png`, `icon-192.png`: app and PWA icon sizes.
- `apple-touch-icon.png`: 180 × 180 full square icon for Apple devices.
- `favicon.ico`: 16, 32 and 48 pixel images in one file.
- `favicon-16.png`, `favicon-32.png`, `favicon-48.png`: separate browser icon sizes.

## Use in another website

Copy the chosen icon files into that project's public folder. Add:

```html
<link rel="icon" href="/ih-app.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
```

Use the transparent logo for a header or footer. Preserve its proportions and
leave at least the dot's diameter as clear space around it. For an app icon,
use the square icon instead of stretching the transparent logo into a square.

## Colours

- Lettering on dark backgrounds: `#F2EFED`
- Lettering on light backgrounds: `#111827`
- Copper dot: `#D4A574`
- App background: `#090D18`

The source lettering comes from Space Grotesk, designed by Florian Karsten and
distributed under the SIL Open Font License. These files contain outlined logo
artwork, not a redistributed font. The optional `source/generate-icons.py` in
the portfolio source can rebuild the files from a Space Grotesk variable font.
