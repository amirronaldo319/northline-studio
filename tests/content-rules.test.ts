import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

/**
 * Guards the rules for public copy: only approved package prices, and no unverifiable claims.
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
  ['a testimonial or review claim', /\b(testimonials?|five[- ]star|5[- ]star|rated)\b/i],
  ['a guarantee', /\bguarantee[sd]?\b/i],
  ['a ranking claim', /\b(rank(s|ing)?\b.*\b(google|first|#1)|first page of google|top of google)\b/i],
  ['the retired brand name', /Amir Web Design/],
  ['generic agency filler', /elevate your|unlock your|cutting[- ]edge|seamless|digital presence|revolutioni[sz]e/i],
]

describe('public copy rules', () => {
  test('publishes only the approved Canadian dollar prices', () => {
    const prices = sources.flatMap(({ text }) => text.match(/(?:[A-Z]{2})?\$\s?\d+(?:[.,]\d+)*/g) ?? [])
    expect(new Set(prices)).toEqual(new Set(['CA$299', 'CA$599', 'CA$29']))
  })

  test('scans a meaningful set of source files', () => {
    expect(sources.length).toBeGreaterThan(20)
  })

  test.each(FORBIDDEN)('contains no %s', (_label, pattern) => {
    const hits = sources.filter(({ text }) => pattern.test(text)).map(({ file }) => file)
    expect(hits).toEqual([])
  })

  test('does not repeat the "modern, mobile-friendly" tagline', () => {
    const count = sources.reduce((sum, { text }) => sum + (text.match(/modern, mobile-friendly/gi)?.length ?? 0), 0)
    expect(count).toBeLessThanOrEqual(0)
  })

  test('uses "Request a quote" as the primary call to action', () => {
    const nav = sources.find(({ file }) => file.endsWith('content/navigation.ts'))
    expect(nav?.text).toContain("PRIMARY_CTA_LABEL = 'Request a quote'")
  })

  test('uses the configured contact email consistently', () => {
    const emails = new Set(sources.flatMap(({ text }) => text.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g) ?? []))
    expect([...emails].sort()).toEqual(['heyamir319@gmail.com', 'name@example.com'].sort())
  })
})
