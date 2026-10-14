import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const root = path.resolve(import.meta.dirname, '..')
const read = (file: string) => readFileSync(path.join(root, file), 'utf8')

/** Reads the ids a section passes to <LegacyAnchors> or lists in its LEGACY_IDS constant. */
function legacyIds(source: string): string[] {
  const match = source.match(/LEGACY_IDS = \[([^\]]*)\]/)
  return match ? [...match[1].matchAll(/'([a-z-]+)'/g)].map((m) => m[1]) : []
}

describe('anchors from earlier versions of the page', () => {
  const packageSection = read('src/components/sections/Package.tsx')
  const workSection = read('src/components/sections/Work.tsx')

  test('"#pricing" and "#included" still land on the package section', () => {
    expect(legacyIds(packageSection)).toEqual(['pricing', 'included'])
    expect(packageSection).toContain('<LegacyAnchors ids={LEGACY_IDS} />')
    expect(packageSection).toContain('id="package"')
  })

  test('"#examples" still lands on the work section', () => {
    expect(legacyIds(workSection)).toEqual(['examples'])
    expect(workSection).toContain('<LegacyAnchors ids={LEGACY_IDS} />')
    expect(workSection).toContain('id="work"')
  })

  test('the navigation does not point at a section that no longer exists', () => {
    const nav = read('src/content/navigation.ts')
    const ids = [...nav.matchAll(/id: '([a-z-]+)'/g)].map((m) => m[1])
    const sources = [
      'src/components/sections/Work.tsx',
      'src/components/sections/Package.tsx',
      'src/components/sections/Process.tsx',
      'src/components/sections/About.tsx',
      'src/components/sections/Faq.tsx',
    ]
      .map(read)
      .join('\n')
    for (const id of ids) expect(sources, `section id "${id}"`).toContain(`id="${id}"`)
  })
})
