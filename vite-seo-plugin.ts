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
  /** Square logo below the site root, for the business data. */
  logoPath?: string
  /** The published package prices, lowest to highest (for example "CA$299–CA$599"). */
  priceRange?: string
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
    transformIndexHtml(_html, ctx) {
      // Only the sales site's own page carries its business data. Other entry pages (the Bubble UI study) do not.
      if (ctx && ctx.path !== '/index.html') return []
      const tags: HtmlTagDescriptor[] = []

      const structuredData: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: options.businessName,
        description: options.description,
        email: options.email,
        areaServed: options.areaServed.map((name) => ({ '@type': 'Country', name })),
      }

      if (options.priceRange) structuredData.priceRange = options.priceRange

      if (hasUrl) {
        structuredData['@id'] = `${siteUrl}/#business`
        structuredData.url = `${siteUrl}/`
        structuredData.image = `${siteUrl}${options.ogImagePath}`
        if (options.logoPath) structuredData.logo = `${siteUrl}${options.logoPath}`
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

      // The site's name for search results. Search engines read it from the home page at the root of the domain; the
      // prerender removes it from every other page (see pageHead.ts).
      if (hasUrl) {
        tags.push({
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: options.businessName,
            url: `${siteUrl}/`,
          }),
          injectTo: 'head',
        })
      }

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

/** The line in index.html's head script that marks Apple devices, which set the page in their own San Francisco. */
export const APPLE_CHECK = "if (/Mac|iPhone|iPad|iPod/.test(navigator.platform)) document.documentElement.classList.add('apple')"

/** Starts the download of a font file from script, exactly as a `<link rel="preload" as="font">` in the page would. */
export function preloadFontStatement(href: string): string {
  return `else { var font = document.createElement('link'); font.rel = 'preload'; font.as = 'font'; font.type = 'font/woff2'; font.crossOrigin = 'anonymous'; font.href = ${JSON.stringify(href)}; document.head.appendChild(font) }`
}

/** Adds the font preload to the head script, as the other branch of its Apple check. Unchanged if there is no check. */
export function withFontPreload(html: string, href: string): string {
  return html.includes(APPLE_CHECK) ? html.replace(APPLE_CHECK, `${APPLE_CHECK}\n      ${preloadFontStatement(href)}`) : html
}

/**
 * Everywhere but on Apple devices the page is set in Inter, a file the browser otherwise only discovers once the
 * stylesheet has arrived and been applied. This starts that download with the page, so the first text is already in
 * Inter instead of swapping to it. Apple devices never use the file, so a plain `<link rel="preload">` would make
 * every iPhone download a font for nothing; the preload is added from the head script's platform check instead.
 * (The content security policy is built from the finished page, so the changed script is covered: see
 * vite-security-plugin.ts.) Only runs in a build: in dev the font URL is not a hashed file.
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
      handler(html, ctx) {
        if (!ctx.bundle) return html
        const font = Object.keys(ctx.bundle).find((file) => /inter-latin-opsz-normal-[\w-]+\.woff2$/.test(file))
        return font ? withFontPreload(html, `${base}${font}`) : html
      },
    },
  }
}
