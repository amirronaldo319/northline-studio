import { describe, expect, test } from 'vitest'
import { allPages, pageFromPath, pageMeta, pagePath, relativePath, withLocale } from './pages'
import { PROJECT_DATA } from './projectsData'
import { GUIDES } from './guides'
import { TRADES } from './trades'

describe('allPages', () => {
  const pages = allPages()

  test('lists the English home page first, then every trade, case study, and guide', () => {
    expect(pages[0].path).toBe('')
    expect(pages).toHaveLength(1 + TRADES.length + PROJECT_DATA.length + GUIDES.length)
  })

  test('every path is unique and ends with a slash (or is the English home page)', () => {
    const paths = pages.map((page) => page.path)
    expect(new Set(paths).size).toBe(paths.length)
    for (const path of paths) expect(path === '' || path.endsWith('/')).toBe(true)
  })

  test('every page has a title of at most 62 characters and a description of a sensible length', () => {
    for (const page of pages) {
      expect(page.title.length, page.title).toBeLessThanOrEqual(62)
      expect(page.description.length, page.path).toBeGreaterThan(60)
      expect(page.description.length, page.path).toBeLessThanOrEqual(175)
    }
  })

  test('translations are not built until they are switched on', () => {
    expect(pages.every((page) => page.locale === 'en')).toBe(true)
  })
})

describe('twins', () => {
  test('a page and its twin share a path below the language folder', () => {
    const ref = { kind: 'trade', locale: 'en', slug: TRADES[0].slug } as const
    const twin = withLocale(ref, 'fa')
    expect(relativePath(twin)).toBe(relativePath(ref))
    expect(pagePath(twin)).toBe(`fa/${TRADES[0].slug}/`)
    expect(pagePath(withLocale({ kind: 'home', locale: 'en' }, 'zh-hans'))).toBe('zh/')
  })
})

describe('pageFromPath', () => {
  test('finds a page under the base path', () => {
    expect(pageFromPath('/northline-studio/cleaning-companies/', '/northline-studio/')).toEqual({
      kind: 'trade',
      locale: 'en',
      slug: 'cleaning-companies',
    })
    expect(pageFromPath('/work/604kars/', '/')).toEqual({ kind: 'case', locale: 'en', id: '604kars' })
  })

  test('tolerates a missing trailing slash and index.html', () => {
    expect(pageFromPath('/guides/how-to-prepare-for-a-website-quote', '/')).toMatchObject({ kind: 'guide' })
    expect(pageFromPath('/work/604kars/index.html', '/')).toMatchObject({ kind: 'case' })
  })

  test('shows the English home page for the root and for unknown paths', () => {
    expect(pageFromPath('/', '/')).toEqual({ kind: 'home', locale: 'en' })
    expect(pageFromPath('/northline-studio/', '/northline-studio/')).toEqual({ kind: 'home', locale: 'en' })
    expect(pageFromPath('/nope/', '/')).toEqual({ kind: 'home', locale: 'en' })
  })
})

describe('pageMeta', () => {
  test('trade pages publish their own questions', () => {
    const meta = pageMeta({ kind: 'trade', locale: 'en', slug: TRADES[0].slug })
    expect(meta.faq).toEqual(TRADES[0].faq)
  })
})
