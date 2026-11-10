import type { PageMeta } from '../content/pageMeta.ts'
import { LOCALES } from '../i18n/locales.ts'

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** JSON for a script element: "<" is written as an escape, so no text in the data can close the element. */
function safeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

const BUSINESS_SCRIPT = /<script type="application\/ld\+json">(\{"@context":"https:\/\/schema\.org","@type":"ProfessionalService"[\s\S]*?)<\/script>/
const WEBSITE_SCRIPT = /<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"WebSite"[\s\S]*?<\/script>/

/** Replaces the content="…" of the first meta tag matching the given attribute, leaving the rest alone. */
function setMeta(html: string, attr: 'name' | 'property', key: string, value: string): string {
  const pattern = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`)
  return html.replace(pattern, (_match, open: string, close: string) => `${open}${escapeHtml(value)}${close}`)
}

/**
 * Rewrites the page-specific parts of the built index.html (title, description, social tags, canonical link,
 * language, and FAQ data) so each page is a complete document for crawlers and link previews.
 */
export interface Alternate {
  /** BCP 47 language tag, or "x-default". */
  hreflang: string
  /** Path below the site root. */
  path: string
}

export function applyPageHead(
  html: string,
  meta: PageMeta,
  options: { siteUrl: string; alternates?: readonly Alternate[] },
): string {
  let out = html
  out = out.replace(/<html[^>]*>/, `<html lang="${meta.lang}"${meta.dir === 'rtl' ? ' dir="rtl"' : ''}>`)
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
  out = setMeta(out, 'name', 'description', meta.description)
  out = setMeta(out, 'property', 'og:title', meta.title)
  out = setMeta(out, 'property', 'og:description', meta.description)
  out = setMeta(out, 'property', 'og:locale', LOCALES[meta.locale].ogLocale)

  if (options.siteUrl) {
    const url = `${options.siteUrl}/${meta.path}`
    out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, (_match, open: string, close: string) => `${open}${url}${close}`)
    out = setMeta(out, 'property', 'og:url', url)
    // Each language has its own share card, and each project page shows that project.
    out = setMeta(out, 'property', 'og:image', `${options.siteUrl}/${meta.shareImage}`)
    out = setMeta(out, 'name', 'twitter:image', `${options.siteUrl}/${meta.shareImage}`)
  }

  out = setMeta(out, 'property', 'og:image:alt', meta.title)

  // The business data every page carries describes the business in the page's own language.
  out = out.replace(BUSINESS_SCRIPT, (script, json: string) => {
    try {
      const business = { ...(JSON.parse(json) as Record<string, unknown>), description: meta.businessDescription }
      return `<script type="application/ld+json">${safeJson(business)}</script>`
    } catch {
      return script
    }
  })

  // The site's name is declared once, on the page at the root of the domain, which is where search engines read it.
  if (meta.path !== '') out = out.replace(WEBSITE_SCRIPT, '')

  // Pages below the home page publish their place in the site, so search results can show the trail. It is the trail
  // the page itself shows: Home, then Work for a project, then the page.
  if (options.siteUrl && meta.crumbs.length > 1) {
    const crumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: meta.crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${options.siteUrl}/${crumb.path}`,
      })),
    }
    out = out.replace('</head>', `<script type="application/ld+json">${safeJson(crumbs)}</script></head>`)
  }

  // Language versions point at each other, so search engines show the right one to the right reader.
  if (options.siteUrl && options.alternates && options.alternates.length > 1) {
    const links = options.alternates
      .map((alt) => `<link rel="alternate" hreflang="${escapeHtml(alt.hreflang)}" href="${options.siteUrl}/${alt.path}">`)
      .join('')
    out = out.replace('</head>', `${links}</head>`)
  }

  // Each page publishes its own questions as FAQPage data.
  const faqScript = /<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage"[\s\S]*?<\/script>/
  if (meta.faq.length === 0) {
    out = out.replace(faqScript, '')
  } else {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: meta.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    }
    out = out.replace(faqScript, `<script type="application/ld+json">${JSON.stringify(data)}</script>`)
  }
  return out
}
