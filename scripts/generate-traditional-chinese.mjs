import fs from 'node:fs'
// Regenerates src/i18n/zhHant.ts from src/i18n/zhHans.ts.
// Usage: npm i --no-save opencc-js && node scripts/generate-traditional-chinese.mjs
import * as OpenCC from 'opencc-js'
const converter = OpenCC.Converter({ from: 'cn', to: 'tw' })
const src = fs.readFileSync(new URL('../src/i18n/zhHans.ts', import.meta.url), 'utf8')
// Convert only the part of the file that is Chinese text: every line is converted, ASCII is unaffected.
let out = converter(src)
out = out
  .replace("export const zhHans: Copy", "export const zhHant: Copy")
  .replace("locale: 'zh-hans'", "locale: 'zh-hant'")
  .replace(/\/\*\*[\s\S]*?\*\/\n/, `/**
 * Traditional Chinese. GENERATED from zhHans.ts by an automatic Simplified-to-Traditional conversion (standard Traditional characters).
 * DRAFT: not yet reviewed by a native speaker. Edit zhHans.ts and regenerate rather than editing this file by hand,
 * unless a reviewer asks for a wording change that only applies to Traditional readers.
 */
`)
// Known phrase-level slips of the character converter, corrected here so a regeneration keeps them fixed.
const FIXES = [
  ['標明瞭', '標明了'],
  ['寫明瞭', '寫明了'],
  ['信息併發送', '信息並發送'],
  ['併發送', '並發送'],
]
for (const [from, to] of FIXES) out = out.split(from).join(to)
fs.writeFileSync(new URL('../src/i18n/zhHant.ts', import.meta.url), out)
console.log('written', out.length)
