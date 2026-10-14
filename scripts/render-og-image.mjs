// Renders public/og-image.png from scripts/og-image.html using a local Chrome install.
// Usage: npm run og-image   (set CHROME_PATH if Chrome is not in the default macOS location)
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

execFileSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--window-size=1200,630',
    `--screenshot=${path.join(root, 'public/og-image.png')}`,
    `file://${path.join(root, 'scripts/og-image.html')}`,
  ],
  { stdio: 'inherit' },
)
console.log('Wrote public/og-image.png')
