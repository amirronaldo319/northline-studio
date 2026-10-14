import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

/**
 * Guards the rules for public copy: no published price, and no unverifiable claims.
 * Scans every source file that can render text, plus the HTML shell.
 */
const root = path.resolve(import.meta.dirname, '..')

function collect(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) return collect(full)
    return /\.(tsx?|html)$/.test(name) && !name.endsWith('.test.ts') ? [full] : []
  })
}

const files = [...collect(path.join(root, 'src')), path.join(root, 'index.html')]
const sources = files.map((file) => ({ file: path.relative(root, file), text: readFileSync(file, 'utf8') }))

const FORBIDDEN: ReadonlyArray<[string, RegExp]> = [
  ['a dollar price', /\$\s?\d/],
  ['a currency code next to a price', /\b\d+\s?(CAD|USD)\b/],
  ['"starting at/from" pricing language', /\bstarting (at|from)\b/i],
  ['a testimonial or review claim', /\b(testimonials?|five[- ]star|5[- ]star|rated)\b/i],
  ['a guarantee', /\bguarantee[sd]?\b/i],
  ['a ranking claim', /\b(rank(s|ing)?\b.*\b(google|first|#1)|first page of google|top of google)\b/i],
  ['the retired brand name', /Amir Web Design/],
]

describe('public copy rules', () => {
  test('scans a meaningful set of source files', () => {
    expect(sources.length).toBeGreaterThan(20)
  })

  test.each(FORBIDDEN)('contains no %s', (_label, pattern) => {
    const hits = sources.filter(({ text }) => pattern.test(text)).map(({ file }) => file)
    expect(hits).toEqual([])
  })

  test('uses the configured contact email consistently', () => {
    const emails = new Set(sources.flatMap(({ text }) => text.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g) ?? []))
    expect([...emails].sort()).toEqual(['heyamir319@gmail.com', 'name@example.com'].sort())
  })
})
