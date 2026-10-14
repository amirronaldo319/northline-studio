import type { HtmlTagDescriptor, Plugin } from 'vite'

interface SeoOptions {
  siteUrl: string
  businessName: string
  email: string
  description: string
  areaServed: readonly string[]
  ogImagePath: string
}

/**
 * Adds URL-dependent metadata only when the final domain is known,
 * and emits robots.txt / sitemap.xml at build time.
 */
export function seoPlugin(options: SeoOptions): Plugin {
  const { siteUrl } = options
  const hasUrl = siteUrl.length > 0

  return {
    name: 'amir-seo',
    transformIndexHtml() {
      const tags: HtmlTagDescriptor[] = []

      const structuredData: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: options.businessName,
        description: options.description,
        email: options.email,
        areaServed: options.areaServed.map((name) => ({ '@type': 'City', name })),
      }

      if (hasUrl) {
        structuredData.url = `${siteUrl}/`
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: `${siteUrl}${options.ogImagePath}` }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: `${siteUrl}${options.ogImagePath}` }, injectTo: 'head' },
        )
      }

      tags.push({
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(structuredData),
        injectTo: 'head',
      })

      return tags
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /']
      if (hasUrl) robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` })

      if (hasUrl) {
        const sitemap = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          `  <url><loc>${siteUrl}/</loc></url>`,
          '</urlset>',
          '',
        ].join('\n')
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      }
    },
  }
}
