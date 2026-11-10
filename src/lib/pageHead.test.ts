import { describe, expect, test } from 'vitest'
import { allPages, pageMeta } from '../content/pageMeta'
import { TRADES } from '../content/trades'
import { applyPageHead } from './pageHead'

const TEMPLATE = `<!doctype html><html lang="en-CA"><head><title>Home title</title>
<meta
  name="description"
  content="Home description"
/>
<meta property="og:title" content="Home title" />
<meta property="og:description" content="Home description" />
<link rel="canonical" href="https://example.ca/" />
<meta property="og:url" content="https://example.ca/" />
<script type="application/ld+json">{"@context":"https://schema.org","@type":"ProfessionalService","name":"X"}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}</script>
</head><body><div id="root"></div></body></html>`.replace('<meta\n  name="description"\n  content="Home description"\n/>', '<meta name="description" content="Home description" />')

describe('applyPageHead', () => {
  const meta = pageMeta({ kind: 'trade', locale: 'en', slug: TRADES[0].slug })
  const out = applyPageHead(TEMPLATE, meta, { siteUrl: 'https://example.ca' })

  test('sets the title, description, and social tags for the page', () => {
    expect(out).toContain(`<title>${meta.title}</title>`)
    expect(out).toContain(`name="description" content="${meta.description}"`)
    expect(out).toContain(`property="og:title" content="${meta.title}"`)
  })

  test('points the canonical link and og:url at the page', () => {
    expect(out).toContain(`href="https://example.ca/${meta.path}"`)
    expect(out).toContain(`property="og:url" content="https://example.ca/${meta.path}"`)
  })

  test('replaces the FAQ data with this page’s questions and keeps the business data', () => {
    expect(out).toContain('"@type":"ProfessionalService"')
    expect(out).toContain(TRADES[0].faq[0].question)
    expect((out.match(/"@type":"FAQPage"/g) ?? []).length).toBe(1)
  })

  test('drops FAQ data for pages with no questions', () => {
    const guide = pageMeta({ kind: 'guide', locale: 'en', slug: 'what-a-local-business-website-needs' })
    expect(applyPageHead(TEMPLATE, guide, { siteUrl: '' })).not.toContain('FAQPage')
  })

  test('escapes characters that are special in HTML', () => {
    const tricky = { ...meta, title: 'A & B "quoted" <tag>' }
    expect(applyPageHead(TEMPLATE, tricky, { siteUrl: '' })).toContain('A &amp; B &quot;quoted&quot; &lt;tag&gt;')
  })

  test('marks right-to-left pages', () => {
    const rtl = { ...meta, lang: 'fa', dir: 'rtl' as const, locale: 'fa' as const }
    expect(applyPageHead(TEMPLATE, rtl, { siteUrl: '' })).toContain('<html lang="fa" dir="rtl">')
  })

  test('adds language alternates when there are several versions, and none otherwise', () => {
    const home = pageMeta({ kind: 'home', locale: 'en' })
    const withAlternates = applyPageHead(TEMPLATE, home, {
      siteUrl: 'https://example.ca',
      alternates: [
        { hreflang: 'en-CA', path: '' },
        { hreflang: 'zh-Hans', path: 'zh/' },
        { hreflang: 'x-default', path: '' },
      ],
    })
    expect(withAlternates).toContain('<link rel="alternate" hreflang="zh-Hans" href="https://example.ca/zh/">')
    expect(withAlternates).toContain('hreflang="x-default" href="https://example.ca/"')
    const none = applyPageHead(TEMPLATE, home, { siteUrl: 'https://example.ca', alternates: [] })
    expect(none).not.toContain('hreflang')
  })

  test('each language has its own share card, and a project page shows that project', () => {
    const page = `${TEMPLATE.replace('</head>', '<meta property="og:image" content="https://example.ca/share/home-en.jpg"><meta name="twitter:image" content="https://example.ca/share/home-en.jpg"></head>')}`
    const share = (ref: Parameters<typeof pageMeta>[0]) => {
      const out = applyPageHead(page, pageMeta(ref), { siteUrl: 'https://example.ca' })
      const og = /property="og:image" content="([^"]*)"/.exec(out)?.[1]
      const twitter = /name="twitter:image" content="([^"]*)"/.exec(out)?.[1]
      expect(twitter).toBe(og)
      return og
    }
    expect(share({ kind: 'home', locale: 'en' })).toBe('https://example.ca/share/home-en.jpg')
    expect(share({ kind: 'home', locale: 'fa' })).toBe('https://example.ca/share/home-fa.jpg')
    expect(share({ kind: 'trade', locale: 'zh-hant', slug: TRADES[0].slug })).toBe('https://example.ca/share/home-zh-hant.jpg')
    expect(share({ kind: 'work', locale: 'fr' })).toBe('https://example.ca/share/home-fr.jpg')
    // The project's own card, whatever the language of the page.
    expect(share({ kind: 'case', locale: 'fa', id: '604kars' })).toBe('https://example.ca/share/work-604kars.jpg')
  })

  const crumbsOf = (html: string) => {
    const json = /<script type="application\/ld\+json">(\{"@context":"https:\/\/schema\.org","@type":"BreadcrumbList".*?)<\/script>/.exec(html)?.[1]
    return json ? (JSON.parse(json).itemListElement as { position: number; name: string; item: string }[]) : null
  }

  test('adds breadcrumb data below the home page only, and only with a site URL', () => {
    const trade = pageMeta({ kind: 'trade', locale: 'en', slug: TRADES[0].slug })
    const withCrumbs = applyPageHead(TEMPLATE, trade, { siteUrl: 'https://example.ca' })
    expect(withCrumbs).toContain('"@type":"BreadcrumbList"')
    expect(withCrumbs).toContain(`"item":"https://example.ca/${trade.path}"`)
    expect(applyPageHead(TEMPLATE, trade, { siteUrl: '' })).not.toContain('BreadcrumbList')
    const home = applyPageHead(TEMPLATE, pageMeta({ kind: 'home', locale: 'en' }), { siteUrl: 'https://example.ca' })
    expect(home).not.toContain('BreadcrumbList')
  })

  test('the published trail is the one the page shows: Home, Work for a project, then the page by its short name', () => {
    const project = applyPageHead(TEMPLATE, pageMeta({ kind: 'case', locale: 'en', id: '604kars' }), { siteUrl: 'https://example.ca' })
    expect(crumbsOf(project)).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://example.ca/' },
      { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://example.ca/work/' },
      { '@type': 'ListItem', position: 3, name: '604 Kars', item: 'https://example.ca/work/604kars/' },
    ])
    // In another language the trail stays inside that language, in its words.
    const persian = crumbsOf(applyPageHead(TEMPLATE, pageMeta({ kind: 'case', locale: 'fa', id: '604kars' }), { siteUrl: 'https://example.ca' }))!
    expect(persian.map((crumb) => crumb.item)).toEqual(['https://example.ca/fa/', 'https://example.ca/fa/work/', 'https://example.ca/fa/work/604kars/'])
    expect(persian[0].name).not.toBe('Home')
  })

  test('every trail on the site starts at a home page, ends at the page itself, and names real pages only', () => {
    const paths = new Set(allPages().map((page) => page.path))
    for (const page of allPages()) {
      if (page.relativePath === '') {
        expect(page.crumbs).toEqual([])
        continue
      }
      expect(page.crumbs.length).toBeGreaterThan(1)
      expect(page.crumbs.at(-1)?.path).toBe(page.path)
      for (const crumb of page.crumbs) {
        expect(paths.has(crumb.path), `${page.path} → ${crumb.path}`).toBe(true)
        expect(crumb.name).not.toMatch(/\||SitePilot|[.。]$/u)
      }
    }
  })

  test('the business data is described in the page’s language, and the site name is declared on the root page only', () => {
    const template = TEMPLATE.replace(
      '<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage"',
      '<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","name":"X","url":"https://example.ca/"}</script><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage"',
    )
    const english = applyPageHead(template, pageMeta({ kind: 'home', locale: 'en' }), { siteUrl: 'https://example.ca' })
    const french = applyPageHead(template, pageMeta({ kind: 'home', locale: 'fr' }), { siteUrl: 'https://example.ca' })
    const business = (html: string) =>
      JSON.parse(/<script type="application\/ld\+json">(\{"@context":"https:\/\/schema\.org","@type":"ProfessionalService".*?)<\/script>/.exec(html)![1])
    expect(business(english)).toEqual({ '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'X', description: pageMeta({ kind: 'home', locale: 'en' }).description })
    expect(business(french).description).toBe(pageMeta({ kind: 'home', locale: 'fr' }).description)
    expect(english).toContain('"@type":"WebSite"')
    expect(french).not.toContain('"@type":"WebSite"')
    expect(applyPageHead(template, pageMeta({ kind: 'work', locale: 'en' }), { siteUrl: 'https://example.ca' })).not.toContain('"@type":"WebSite"')
  })
})
