"""Makes the smaller pictures of each project: the fan's 4:5 cards, the icons in the Work page's row of projects, and
the right-sized versions of each capture that the cards and phone frames load (src/assets/projects/sized/).

Run: python3 scripts/generate-fan-thumbnails.py
Reads src/assets/projects/<name>-mobile.webp (780 wide) and writes src/assets/projects/fan/<name>.webp at 360x450, twice
the card's 162px width, so the fan loads about 20 KB a card instead of the 30-150 KB captures. The top of a phone capture
is its header and first screen, which is what identifies the project. Needs Pillow. The output is committed, so the build
never runs this; re-run it after `scripts/capture-project-screenshots.mjs` changes a capture.

sized/<name>-desktop-600.webp  600x389   the desktop capture for cards and tiles up to 600px wide on 1x screens
sized/<name>-mobile-390.webp   390x760   the phone capture for phone frames, which are drawn 130-250px wide
sized/<name>-mobile-card.webp  780x880   the top of the phone capture: all a card on a phone shows (390:440 crop)
Without these every slot loaded the full 1200px or 780x1520 capture, about 0.5 MB more than needed on the home page.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'projects'
OUT = ROOT / 'fan'
WIDTH, HEIGHT = 360, 450  # 4:5, the fan's default card shape

NAV = ROOT / 'nav'
NAV_WIDTH, NAV_HEIGHT = 112, 140  # the Work page's row of projects: 56x70 shown, at 2x

SIZED = ROOT / 'sized'
CARD_HEIGHT = 880  # of the 780px-wide phone capture: the 390:440 a card on a phone shows

OUT.mkdir(exist_ok=True)
NAV.mkdir(exist_ok=True)
SIZED.mkdir(exist_ok=True)
for source in sorted(ROOT.glob('*-mobile.webp')):
    name = source.name.removesuffix('-mobile.webp')
    with Image.open(source) as image:
        image = image.convert('RGB')
        scaled = image.resize((WIDTH, round(image.height * WIDTH / image.width)), Image.LANCZOS)
        card = scaled.crop((0, 0, WIDTH, HEIGHT))
        card.save(OUT / f'{name}.webp', 'WEBP', quality=82, method=6)
        card.resize((NAV_WIDTH, NAV_HEIGHT), Image.LANCZOS).save(NAV / f'{name}.webp', 'WEBP', quality=80, method=6)
        image.resize((image.width // 2, image.height // 2), Image.LANCZOS).save(
            SIZED / f'{name}-mobile-390.webp', 'WEBP', quality=80, method=6
        )
        image.crop((0, 0, image.width, CARD_HEIGHT)).save(SIZED / f'{name}-mobile-card.webp', 'WEBP', quality=80, method=6)
    with Image.open(ROOT / f'{name}-desktop.webp') as desktop:
        desktop = desktop.convert('RGB')
        desktop.resize((desktop.width // 2, desktop.height // 2), Image.LANCZOS).save(
            SIZED / f'{name}-desktop-600.webp', 'WEBP', quality=80, method=6
        )
    print(name, (OUT / f'{name}.webp').stat().st_size, 'bytes')
