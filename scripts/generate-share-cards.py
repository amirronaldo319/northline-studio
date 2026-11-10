#!/usr/bin/env python3
"""Renders the pictures shown when a link to the site is shared, into public/share/.

  home-<language>.jpg   the headline over a fan of project screens, one per language
  work-<project>.jpg    one project's name beside its desktop and phone captures

Each is 1200 x 630, drawn by scripts/share-card.html in headless Chrome and saved as a JPEG. The words come from the
site's own copy (read with Node, which runs the TypeScript files as they are), the pictures from src/assets/projects.

Usage:  npm run share-cards
Needs:  Node 22+, Playwright for Python (pip install playwright), and Chrome (set CHROME_PATH if it is not in a
        usual place).
        SHARE_CARD_FA_FONT may point at a Persian .woff2 (for example Vazirmatn) for the Persian card; without it the
        system's Persian font is used.
"""
import json
import os
import shutil
import subprocess
import sys
import urllib.parse
from pathlib import Path

from playwright.sync_api import Browser, sync_playwright

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'share'
TEMPLATE = ROOT / 'scripts' / 'share-card.html'
PROJECTS = ROOT / 'src' / 'assets' / 'projects'
DOMAIN = os.environ.get('SHARE_CARD_DOMAIN', 'sitepilotdesign.ca')
SIZE = (1200, 630)

# How many project screens the home card fans out: the first ones in the portfolio's own order.
FAN_COUNT = 7

# Type per language: Inter for Latin text; the scripts Inter does not cover use the fonts the site itself asks for.
TYPE = {
    'en': {},
    'fr': {},
    'fa': {
        'font': "'Card Script', 'Vazirmatn', 'Geeza Pro', Tahoma, sans-serif",
        'style': {'--h-size': '70px', '--h-line': '1.34', '--h-track': '0'},
    },
    'zh-hans': {
        'font': "'PingFang SC', 'Noto Sans CJK SC', 'Microsoft YaHei', sans-serif",
        'style': {'--h-size': '76px', '--h-line': '1.2', '--h-track': '0'},
    },
    'zh-hant': {
        'font': "'PingFang TC', 'Noto Sans CJK TC', 'Microsoft JhengHei', sans-serif",
        'style': {'--h-size': '76px', '--h-line': '1.2', '--h-track': '0'},
    },
}

READ_COPY = """
const { getCopy } = await import('./src/i18n/index.ts')
const { LOCALES, enabledLocales } = await import('./src/i18n/locales.ts')
const { PROJECT_DATA } = await import('./src/content/projectsData.ts')
console.log(JSON.stringify({
  locales: enabledLocales().map((locale) => {
    const copy = getCopy(locale)
    return { locale, lang: LOCALES[locale].htmlLang, dir: LOCALES[locale].dir, headline: copy.hero.headline }
  }),
  projects: PROJECT_DATA.map((project) => ({ id: project.id, name: project.name })),
}))
"""


def find_chrome() -> str:
    candidates = [
        os.environ.get('CHROME_PATH'),
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        shutil.which('google-chrome'),
        shutil.which('chromium'),
        shutil.which('chromium-browser'),
    ]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return candidate
    sys.exit('Chrome was not found. Set CHROME_PATH to its executable.')


def read_copy() -> dict:
    result = subprocess.run(
        ['node', '--experimental-strip-types', '--no-warnings', '--input-type=module', '-e', READ_COPY],
        cwd=ROOT, check=True, capture_output=True, text=True,
    )
    return json.loads(result.stdout)


def render(browser: Browser, card: dict, target: Path) -> None:
    page = browser.new_page(viewport={'width': SIZE[0], 'height': SIZE[1]}, device_scale_factor=1)
    page.goto(f'{TEMPLATE.as_uri()}#{urllib.parse.quote(json.dumps(card, ensure_ascii=False))}')
    # The template marks itself ready once its fonts are in and the headline has been fitted.
    page.wait_for_selector('body[data-ready="true"]')
    page.wait_for_function('[...document.images].every((image) => image.complete && image.naturalWidth > 0)')
    page.screenshot(path=str(target), type='jpeg', quality=86)
    page.close()
    print(f'{target.relative_to(ROOT)}  {target.stat().st_size // 1024} KB')


def main() -> None:
    copy = read_copy()
    OUT.mkdir(parents=True, exist_ok=True)
    fa_font = os.environ.get('SHARE_CARD_FA_FONT')
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=find_chrome(), args=['--allow-file-access-from-files'])
        render_all(browser, copy, fa_font)
        browser.close()


def render_all(browser: Browser, copy: dict, fa_font: str | None) -> None:
    for entry in copy['locales']:
        card = {
            'kind': 'home', 'lang': entry['lang'], 'dir': entry['dir'], 'headline': entry['headline'],
            'screens': [(PROJECTS / 'fan' / f"{project['id']}.webp").as_uri() for project in copy['projects'][:FAN_COUNT]],
            **TYPE.get(entry['locale'], {}),
        }
        if entry['locale'] == 'fa' and fa_font:
            card['fontFile'] = Path(fa_font).resolve().as_uri()
        render(browser, card, OUT / f"home-{entry['locale']}.jpg")

    for project in copy['projects']:
        card = {
            'kind': 'project', 'lang': 'en', 'dir': 'ltr', 'domain': DOMAIN, 'headline': [project['name']],
            'desktop': (PROJECTS / f"{project['id']}-desktop.webp").as_uri(),
            'phone': (PROJECTS / f"{project['id']}-mobile.webp").as_uri(),
        }
        render(browser, card, OUT / f"work-{project['id']}.jpg")


if __name__ == '__main__':
    main()
