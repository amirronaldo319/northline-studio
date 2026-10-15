import { describe, expect, test } from 'vitest'
import { pageMeta } from '../content/pages'
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
})
