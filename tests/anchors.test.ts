import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const root = path.resolve(import.meta.dirname, '..')
const read = (file: string) => readFileSync(path.join(root, file), 'utf8')

describe('anchors from earlier versions of the page', () => {
  const packageSection = read('src/components/sections/Package.tsx')

  test('keeps "#pricing" and "#included" so previously shared links land on the package section', () => {
    expect(packageSection).toMatch(/LEGACY_ANCHORS = \['pricing', 'included'\]/)
  })

  test('the current package anchor is still present', () => {
    expect(packageSection).toContain('id="package"')
  })

  test('the navigation does not point at a section that no longer exists', () => {
    const nav = read('src/content/navigation.ts')
    const ids = [...nav.matchAll(/id: '([a-z-]+)'/g)].map((m) => m[1])
    const sources = [
      'src/components/sections/Examples.tsx',
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
