// Renders the social-share cards in public/ from scripts/og-image.html using a local Chrome install:
// og-image.png (English) and og-image-<locale>.png for each translated language.
// Usage: npm run og-image   (set CHROME_PATH if Chrome is not in the default macOS location)
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const cards = [
  { locale: 'en', file: 'og-image.png' },
  { locale: 'fa', file: 'og-image-fa.png' },
  { locale: 'zh-hans', file: 'og-image-zh-hans.png' },
  { locale: 'zh-hant', file: 'og-image-zh-hant.png' },
]

for (const { locale, file } of cards) {
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--window-size=1200,630',
      `--screenshot=${path.join(root, 'public', file)}`,
      `file://${path.join(root, 'scripts/og-image.html')}?l=${locale}`,
    ],
    { stdio: 'ignore' },
  )
  console.log(`Wrote public/${file}`)
}
