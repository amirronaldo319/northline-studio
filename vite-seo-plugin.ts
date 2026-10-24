import type { HtmlTagDescriptor, Plugin } from 'vite'

interface FaqEntry {
  question: string
  answer: string
}

interface SeoOptions {
  siteUrl: string
  businessName: string
  email: string
  description: string
  areaServed: readonly string[]
  ogImagePath: string
  /** Published as FAQPage structured data, so the answers can appear in search results. */
  faq?: readonly FaqEntry[]
  /** Cloudflare Web Analytics token. Empty means no analytics script is added. */
  analyticsToken?: string
  /** Page paths below the site root ('' is the home page), listed in the sitemap. */
  paths?: readonly string[]
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
        areaServed: options.areaServed.map((name) => ({ '@type': 'Country', name })),
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

      if (options.analyticsToken) {
        tags.push({
          tag: 'script',
          attrs: {
            defer: true,
            src: 'https://static.cloudflareinsights.com/beacon.min.js',
            'data-cf-beacon': JSON.stringify({ token: options.analyticsToken }),
          },
          injectTo: 'body',
        })
      }

      tags.push({
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(structuredData),
        injectTo: 'head',
      })

      if (options.faq && options.faq.length > 0) {
        tags.push({
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: options.faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          }),
          injectTo: 'head',
        })
      }

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
          ...(options.paths ?? ['']).map((pagePath) => `  <url><loc>${siteUrl}/${pagePath}</loc></url>`),
          '</urlset>',
          '',
        ].join('\n')
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      }
    },
  }
}

/**
 * Preloads the two Latin variable fonts the first screen needs, so text does not wait for the stylesheet to
 * discover them. Only runs in a build (in dev the font URLs are not hashed files).
 */
export function fontPreloadPlugin(): Plugin {
  let base = '/'
  return {
    name: 'amir-font-preload',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        if (!ctx.bundle) return []
        return Object.keys(ctx.bundle)
          .filter((file) => /(inter|bricolage-grotesque)-latin-wght-normal-[\w-]+\.woff2$/.test(file))
          .map<HtmlTagDescriptor>((file) => ({
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: `${base}${file}` },
            injectTo: 'head',
          }))
      },
    },
  }
}
