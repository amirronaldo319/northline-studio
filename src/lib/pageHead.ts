import type { PageMeta } from '../content/pageMeta.ts'
import { LOCALES } from '../i18n/locales.ts'

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

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
    out = setMeta(out, 'property', 'og:image', `${options.siteUrl}/og-canada.png`)
    out = setMeta(out, 'name', 'twitter:image', `${options.siteUrl}/og-canada.png`)
  }

  out = setMeta(out, 'property', 'og:image:alt', meta.title)

  // Pages below the home page publish their place in the site, so search results can show the trail.
  if (options.siteUrl && meta.relativePath !== '') {
    const homeUrl = `${options.siteUrl}/${LOCALES[meta.locale].prefix}`
    const crumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: LOCALES[meta.locale].label, item: homeUrl },
        { '@type': 'ListItem', position: 2, name: meta.title, item: `${options.siteUrl}/${meta.path}` },
      ],
    }
    out = out.replace('</head>', `<script type="application/ld+json">${JSON.stringify(crumbs)}</script></head>`)
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
