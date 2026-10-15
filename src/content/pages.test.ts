import { describe, expect, test } from 'vitest'
import { GUIDES } from './guides'
import { allPages, pageFromPath, pageMeta } from './pages'
import { PROJECT_DATA } from './projectsData'
import { TRADES } from './trades'

describe('allPages', () => {
  const pages = allPages()

  test('lists the home page first, then every trade, case study, and guide', () => {
    expect(pages[0].path).toBe('')
    expect(pages).toHaveLength(1 + TRADES.length + PROJECT_DATA.length + GUIDES.length)
  })

  test('every path is unique and ends with a slash (or is the home page)', () => {
    const paths = pages.map((page) => page.path)
    expect(new Set(paths).size).toBe(paths.length)
    for (const path of paths) expect(path === '' || path.endsWith('/')).toBe(true)
  })

  test('every page has a title at most 62 characters and a description of a sensible length', () => {
    for (const page of pages) {
      expect(page.title.length, page.title).toBeLessThanOrEqual(62)
      expect(page.description.length, page.path).toBeGreaterThan(60)
      expect(page.description.length, page.path).toBeLessThanOrEqual(175)
    }
  })

  test('translated pages are not built until they are switched on', () => {
    expect(pages.some((page) => page.ref.kind === 'language')).toBe(false)
  })
})

describe('pageFromPath', () => {
  test('finds a page under the base path', () => {
    expect(pageFromPath('/northline-studio/cleaning-companies/', '/northline-studio/')).toEqual({
      kind: 'trade',
      slug: 'cleaning-companies',
    })
    expect(pageFromPath('/work/604kars/', '/')).toEqual({ kind: 'case', id: '604kars' })
  })

  test('tolerates a missing trailing slash and index.html', () => {
    expect(pageFromPath('/guides/how-to-prepare-for-a-website-quote', '/')).toMatchObject({ kind: 'guide' })
    expect(pageFromPath('/work/604kars/index.html', '/')).toMatchObject({ kind: 'case' })
  })

  test('shows the home page for the root and for unknown paths', () => {
    expect(pageFromPath('/', '/')).toEqual({ kind: 'home' })
    expect(pageFromPath('/northline-studio/', '/northline-studio/')).toEqual({ kind: 'home' })
    expect(pageFromPath('/nope/', '/')).toEqual({ kind: 'home' })
  })
})

describe('pageMeta', () => {
  test('trade pages publish their own questions', () => {
    const meta = pageMeta({ kind: 'trade', slug: TRADES[0].slug })
    expect(meta.faq).toEqual(TRADES[0].faq)
  })
})
