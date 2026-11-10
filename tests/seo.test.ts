import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import { APPLE_CHECK, seoPlugin, withFontPreload } from '../vite-seo-plugin.ts'
import { FAQ } from '../src/content/faq.ts'
import { allPages } from '../src/content/pageMeta.ts'
import { ALL_LOCALES, LOCALES } from '../src/i18n/locales.ts'

type TagList = Array<{ tag: string; attrs?: Record<string, string>; children?: string }>

function tagsFor(siteUrl: string): TagList {
  const plugin = seoPlugin({
    siteUrl,
    businessName: 'SitePilot',
    email: 'heyamir319@gmail.com',
    description: 'desc',
    areaServed: ['Vancouver'],
    ogImagePath: '/share/home-en.jpg',
    logoPath: '/apple-touch-icon.png',
    priceRange: 'CA$299–CA$599',
    faq: FAQ,
  })
  const hook = plugin.transformIndexHtml as () => TagList
  return hook()
}

describe('structured data', () => {
  test('publishes every FAQ answer as FAQPage data, with or without a site URL', () => {
    for (const url of ['', 'https://example.ca']) {
      const scripts = tagsFor(url).filter((t) => t.attrs?.type === 'application/ld+json')
      const faq = scripts.map((s) => JSON.parse(s.children ?? '{}')).find((d) => d['@type'] === 'FAQPage')
      expect(faq.mainEntity).toHaveLength(FAQ.length)
      expect(faq.mainEntity[0].acceptedAnswer.text).toBe(FAQ[0].answer)
    }
  })

  test('the business data names its prices, and with a site URL its address, picture and logo', () => {
    const business = (url: string) =>
      tagsFor(url)
        .filter((t) => t.attrs?.type === 'application/ld+json')
        .map((s) => JSON.parse(s.children ?? '{}'))
        .find((d) => d['@type'] === 'ProfessionalService')
    expect(business('').priceRange).toBe('CA$299–CA$599')
    expect(business('').url).toBeUndefined()
    expect(business('https://example.ca')).toMatchObject({
      '@id': 'https://example.ca/#business',
      url: 'https://example.ca/',
      image: 'https://example.ca/share/home-en.jpg',
      logo: 'https://example.ca/apple-touch-icon.png',
    })
  })

  test('declares the site name as WebSite data once the site URL is known', () => {
    const sites = (url: string) =>
      tagsFor(url)
        .filter((t) => t.attrs?.type === 'application/ld+json')
        .map((s) => JSON.parse(s.children ?? '{}'))
        .filter((d) => d['@type'] === 'WebSite')
    expect(sites('')).toHaveLength(0)
    expect(sites('https://example.ca')).toEqual([{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'SitePilot', url: 'https://example.ca/' }])
  })

  test('only adds canonical and social image URLs once the site URL is known', () => {
    const without = tagsFor('').filter((t) => t.attrs?.rel === 'canonical' || t.attrs?.property === 'og:image')
    const withUrl = tagsFor('https://example.ca').filter((t) => t.attrs?.rel === 'canonical' || t.attrs?.property === 'og:image')
    expect(without).toHaveLength(0)
    expect(withUrl).toHaveLength(2)
  })
})

describe('share cards', () => {
  const root = path.resolve(import.meta.dirname, '..')

  test('every page names a share card that exists in public/share, as a 1200 × 630 JPEG', () => {
    const cards = new Set(allPages().map((page) => page.shareImage))
    // One per language, one per project.
    expect(cards.size).toBeGreaterThan(5)
    for (const card of cards) {
      const file = path.join(root, 'public', card)
      expect(existsSync(file), card).toBe(true)
      const bytes = readFileSync(file)
      // JPEG: the size is in the first start-of-frame segment (marker FFC0 or FFC2), as height then width.
      let at = 2
      while (at < bytes.length && !(bytes[at] === 0xff && (bytes[at + 1] === 0xc0 || bytes[at + 1] === 0xc2))) {
        at += 2 + bytes.readUInt16BE(at + 2)
      }
      expect([bytes.readUInt16BE(at + 7), bytes.readUInt16BE(at + 5)], card).toEqual([1200, 630])
      // Small enough for every messaging app's preview fetcher.
      expect(bytes.length, card).toBeLessThan(300_000)
    }
  })
})

describe('the page for an address that does not exist', () => {
  const page = readFileSync(path.resolve(import.meta.dirname, '..', 'public', '404.html'), 'utf8')

  test('is kept out of search results and offers the home page and the work', () => {
    expect(page).toContain('<meta name="robots" content="noindex" />')
    expect(page).toMatch(/<a id="home" class="btn" href="\/">/)
    expect(page).toMatch(/<a id="work" class="link" href="\/work\/">/)
  })

  test('answers in the language of the missing page, for every language folder the site has', () => {
    for (const locale of ALL_LOCALES) {
      const info = LOCALES[locale]
      if (info.prefix === '') continue
      const folder = info.prefix.replace(/\/$/, '')
      const entry = new RegExp(`(?:'${folder}'|\\b${folder}): \\{ lang: '${info.htmlLang}'${info.dir === 'rtl' ? ", dir: 'rtl'" : ''},`)
      expect(page, folder).toMatch(entry)
    }
  })
})

describe('font preload', () => {
  const page = readFileSync(path.resolve(import.meta.dirname, '..', 'index.html'), 'utf8')

  test('the head script still has the Apple check the preload is attached to', () => {
    expect(page).toContain(APPLE_CHECK)
  })

  test('the download starts from the other branch of that check, so Apple devices never fetch the font', () => {
    const out = withFontPreload(page, '/assets/inter-latin-opsz-normal-abc123.woff2')
    const script = /<script>([\s\S]*?)<\/script>/.exec(out)![1]
    expect(script).toMatch(/classList\.add\('apple'\)\s+else \{ var font = document\.createElement\('link'\)/)
    expect(script).toContain(`font.href = "/assets/inter-latin-opsz-normal-abc123.woff2"`)
    expect(script).toContain("font.crossOrigin = 'anonymous'")
    // No plain preload link, which every device would follow.
    expect(out).not.toMatch(/<link[^>]+rel="preload"[^>]+as="font"/)
    // The script still parses.
    expect(() => new Function(script)).not.toThrow()
  })

  test('a page without the check is left alone', () => {
    expect(withFontPreload('<html><head></head></html>', '/a.woff2')).toBe('<html><head></head></html>')
  })
})
