import { LOCALES, enabledLocales } from '../i18n/locales.ts'
import type { Locale } from '../i18n/types.ts'
import { GUIDES } from './guides.ts'
import { PROJECT_DATA } from './projectsData.ts'
import { TRADES } from './trades.ts'

/**
 * Identifies one page of the site in one language. Every page exists in every enabled language under the same
 * path, so a page's twin in another language is the same reference with a different `locale`.
 * Page slugs and ids are language-independent, so none of this needs any language's words.
 */
export type PageRef =
  | { kind: 'home'; locale: Locale }
  | { kind: 'trade'; locale: Locale; slug: string }
  | { kind: 'case'; locale: Locale; id: string }
  | { kind: 'guide'; locale: Locale; slug: string }

/** Path of a page below its language folder. The home page is the empty string. */
export function relativePath(ref: PageRef): string {
  switch (ref.kind) {
    case 'trade':
      return `${ref.slug}/`
    case 'guide':
      return `guides/${ref.slug}/`
    case 'case':
      return `work/${ref.id}/`
    default:
      return ''
  }
}

/** Path of a page below the site root, including its language folder. */
export function pagePath(ref: PageRef): string {
  return `${LOCALES[ref.locale].prefix}${relativePath(ref)}`
}

/** The same page in another language. */
export function withLocale(ref: PageRef, locale: Locale): PageRef {
  return { ...ref, locale }
}

/** Every page of the site, English first, in every language that is switched on. */
export function knownPages(): PageRef[] {
  const refs: PageRef[] = []
  for (const locale of enabledLocales()) {
    refs.push({ kind: 'home', locale })
    for (const trade of TRADES) refs.push({ kind: 'trade', locale, slug: trade.slug })
    for (const project of PROJECT_DATA) refs.push({ kind: 'case', locale, id: project.id })
    for (const guide of GUIDES) refs.push({ kind: 'guide', locale, slug: guide.slug })
  }
  return refs
}

/** Works out which page a URL path shows, given the site's base path. Unknown paths show the English home page. */
export function pageFromPath(pathname: string, base: string): PageRef {
  const normalisedBase = base.endsWith('/') ? base : `${base}/`
  const withoutBase = pathname.startsWith(normalisedBase) ? pathname.slice(normalisedBase.length) : pathname.replace(/^\//, '')
  const path = withoutBase.replace(/index\.html$/, '').replace(/\/+$/, '')
  const match = knownPages().find((ref) => pagePath(ref).replace(/\/$/, '') === path)
  return match ?? { kind: 'home', locale: 'en' }
}
