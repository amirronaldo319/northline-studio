"""Makes the small pictures of each project: the fan's 4:5 cards, and the icons in the Work page's row of projects.

Run: python3 scripts/generate-fan-thumbnails.py
Reads src/assets/projects/<name>-mobile.webp (780 wide) and writes src/assets/projects/fan/<name>.webp at 360x450, twice
the card's 162px width, so the fan loads about 20 KB a card instead of the 30-150 KB captures. The top of a phone capture
is its header and first screen, which is what identifies the project. Needs Pillow. The output is committed, so the build
never runs this; re-run it after `scripts/capture-project-screenshots.mjs` changes a capture.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'projects'
OUT = ROOT / 'fan'
WIDTH, HEIGHT = 360, 450  # 4:5, the fan's default card shape

NAV = ROOT / 'nav'
NAV_WIDTH, NAV_HEIGHT = 112, 140  # the Work page's row of projects: 56x70 shown, at 2x

OUT.mkdir(exist_ok=True)
NAV.mkdir(exist_ok=True)
for source in sorted(ROOT.glob('*-mobile.webp')):
    name = source.name.removesuffix('-mobile.webp')
    with Image.open(source) as image:
        image = image.convert('RGB')
        scaled = image.resize((WIDTH, round(image.height * WIDTH / image.width)), Image.LANCZOS)
        card = scaled.crop((0, 0, WIDTH, HEIGHT))
        card.save(OUT / f'{name}.webp', 'WEBP', quality=82, method=6)
        card.resize((NAV_WIDTH, NAV_HEIGHT), Image.LANCZOS).save(NAV / f'{name}.webp', 'WEBP', quality=80, method=6)
    print(name, (OUT / f'{name}.webp').stat().st_size, 'bytes')
