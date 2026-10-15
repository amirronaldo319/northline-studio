import { describe, expect, test } from 'vitest'
import { getCopy } from './index'
import { ALL_LOCALES, LOCALES } from './locales'
import type { Copy } from './types'

/** Lists the shape of a value: object keys, array lengths, and "string" for every string or function. */
function shape(value: unknown): unknown {
  if (typeof value === 'string' || typeof value === 'function') return 'text'
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([key, v]) => !(key === 'note' && v === undefined))
        .map(([key, v]) => [key, shape(v)]),
    )
  }
  return typeof value
}

const english = getCopy('en')
const others = ALL_LOCALES.filter((locale) => locale !== 'en')

describe('dictionaries', () => {
  test.each(others)('%s has the same structure as English', (locale) => {
    const copy = getCopy(locale) as Copy
    // The two dictionaries may differ in which projects carry a note, so compare without notes.
    // Which words carry the drawn underline is a per-language choice, so it is not part of the shape.
    const comparable = (value: Copy) => ({ ...value, projects: undefined, hero: { ...value.hero, markedWords: undefined } })
    expect(shape(comparable(copy))).toEqual(shape(comparable(english)))
    expect(Object.keys(copy.projects).sort()).toEqual(Object.keys(english.projects).sort())
  })

  test.each(others)('%s has no empty text and no leftover English sentences in headings', (locale) => {
    const copy = getCopy(locale) as Copy
    const walk = (value: unknown, path: string): void => {
      if (typeof value === 'string') {
        expect(value.trim().length, path).toBeGreaterThan(0)
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => walk(item, `${path}[${index}]`))
      } else if (value && typeof value === 'object') {
        for (const [key, v] of Object.entries(value)) if (v !== undefined) walk(v, `${path}.${key}`)
      }
    }
    walk({ ...copy, trades: undefined }, locale)
    // Page headlines are written in the language, not copied from English.
    expect(copy.hero.headline).not.toBe(english.hero.headline)
    expect(copy.trades.map((trade) => trade.headline)).not.toContain(english.trades[0].headline)
  })

  test.each(others)('%s keeps the same trades, guides and FAQ count, with the same page paths', (locale) => {
    const copy = getCopy(locale) as Copy
    expect(copy.trades.map((trade) => trade.slug)).toEqual(english.trades.map((trade) => trade.slug))
    expect(copy.guides.map((guide) => guide.slug)).toEqual(english.guides.map((guide) => guide.slug))
    expect(copy.faq.items).toHaveLength(english.faq.items.length)
    for (const [index, trade] of copy.trades.entries()) {
      expect(trade.checks, trade.slug).toHaveLength(english.trades[index].checks.length)
      expect(trade.includes, trade.slug).toHaveLength(english.trades[index].includes.length)
      expect(trade.faq, trade.slug).toHaveLength(english.trades[index].faq.length)
    }
  })

  test.each(others)('%s keeps form values in English, so the owner reads the same words', (locale) => {
    const copy = getCopy(locale) as Copy
    expect(copy.form.businessTypes.map((option) => option.value)).toEqual(
      english.form.businessTypes.map((option) => option.value),
    )
    expect(copy.form.needs.map((option) => option.value)).toEqual(english.form.needs.map((option) => option.value))
  })

  test.each(others)('%s page titles stay short enough for search results', (locale) => {
    const copy = getCopy(locale) as Copy
    const titles = [copy.meta.homeTitle, ...copy.trades.map((t) => t.title), ...copy.guides.map((g) => g.title)]
    for (const title of titles) expect(title.length, title).toBeLessThanOrEqual(62)
  })

  test('the interpolated sentences keep the values they are given', () => {
    for (const locale of ALL_LOCALES) {
      const copy = getCopy(locale)
      expect(copy.form.successTitle('Sam')).toContain('Sam')
      expect(copy.form.successBody('a@b.ca')).toContain('a@b.ca')
      expect(copy.contact.copiedNote('a@b.ca')).toContain('a@b.ca')
      expect(copy.work.openLarger('604 Kars')).toContain('604 Kars')
      expect(copy.footer.copyright(2030, 'Northline Studio')).toContain('2030')
    }
  })

  test('each language has a distinct folder, direction and script', () => {
    const prefixes = ALL_LOCALES.map((locale) => LOCALES[locale].prefix)
    expect(new Set(prefixes).size).toBe(prefixes.length)
    expect(LOCALES.fa.dir).toBe('rtl')
    expect(LOCALES['zh-hans'].dir).toBe('ltr')
    expect(english.locale).toBe('en')
  })

  test('Simplified and Traditional Chinese are different texts', () => {
    expect(getCopy('zh-hans').contact.heading).not.toBe(getCopy('zh-hant').contact.heading)
    expect(getCopy('zh-hant').hero.headline).toMatch(/網站/)
    expect(getCopy('zh-hans').hero.headline).toMatch(/网站/)
  })
})
