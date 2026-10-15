import { describe, expect, test } from 'vitest'
import { seoPlugin } from '../vite-seo-plugin.ts'
import { FAQ } from '../src/content/faq.ts'

type TagList = Array<{ tag: string; attrs?: Record<string, string>; children?: string }>

function tagsFor(siteUrl: string): TagList {
  const plugin = seoPlugin({
    siteUrl,
    businessName: 'SitePilot',
    email: 'heyamir319@gmail.com',
    description: 'desc',
    areaServed: ['Vancouver'],
    ogImagePath: '/og-image.png',
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

  test('only adds canonical and social image URLs once the site URL is known', () => {
    const without = tagsFor('').filter((t) => t.attrs?.rel === 'canonical' || t.attrs?.property === 'og:image')
    const withUrl = tagsFor('https://example.ca').filter((t) => t.attrs?.rel === 'canonical' || t.attrs?.property === 'og:image')
    expect(without).toHaveLength(0)
    expect(withUrl).toHaveLength(2)
  })
})
