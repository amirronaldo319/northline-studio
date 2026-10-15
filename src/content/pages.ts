import { getCopy } from '../i18n/index.ts'
import { LOCALES, enabledLocales } from '../i18n/locales.ts'
import type { Locale } from '../i18n/types.ts'
import type { FaqItem } from './faq.ts'
import { PROJECT_DATA } from './projectsData.ts'

/**
 * Identifies one page of the site in one language. Every page exists in every enabled language under the same
 * path, so a page's twin in another language is the same reference with a different `locale`.
 */
export type PageRef =
  | { kind: 'home'; locale: Locale }
  | { kind: 'trade'; locale: Locale; slug: string }
  | { kind: 'case'; locale: Locale; id: string }
  | { kind: 'guide'; locale: Locale; slug: string }

export interface PageMeta {
  ref: PageRef
  locale: Locale
  /** Path below the site root, including the language folder, with a trailing slash. Empty for English home. */
  path: string
  /** Path below the language folder: the same in every language. */
  relativePath: string
  title: string
  description: string
  /** Questions to publish as FAQPage data for this page. */
  faq: readonly FaqItem[]
  lang: string
  dir: 'ltr' | 'rtl'
}

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

export function pageMeta(ref: PageRef): PageMeta {
  const copy = getCopy(ref.locale)
  const info = LOCALES[ref.locale]
  const base = {
    ref,
    locale: ref.locale,
    path: pagePath(ref),
    relativePath: relativePath(ref),
    lang: info.htmlLang,
    dir: info.dir,
  }
  const home: PageMeta = { ...base, ref: { kind: 'home', locale: ref.locale }, path: info.prefix, relativePath: '', title: copy.meta.homeTitle, description: copy.meta.homeDescription, faq: copy.faq.items }

  switch (ref.kind) {
    case 'trade': {
      const trade = copy.trades.find((candidate) => candidate.slug === ref.slug)
      return trade ? { ...base, title: trade.title, description: trade.description, faq: trade.faq } : home
    }
    case 'guide': {
      const guide = copy.guides.find((candidate) => candidate.slug === ref.slug)
      return guide ? { ...base, title: guide.title, description: guide.description, faq: [] } : home
    }
    case 'case': {
      const project = PROJECT_DATA.find((candidate) => candidate.id === ref.id)
      if (!project) return home
      return {
        ...base,
        title: copy.meta.caseTitle(project.name, project.status === 'live'),
        description: copy.projects[project.id]?.summary ?? project.summary,
        faq: [],
      }
    }
    default:
      return home
  }
}

/** Every page the build produces, English first. A language that is switched off has no pages. */
export function allPages(): PageMeta[] {
  const refs: PageRef[] = []
  for (const locale of enabledLocales()) {
    const copy = getCopy(locale)
    refs.push({ kind: 'home', locale })
    for (const trade of copy.trades) refs.push({ kind: 'trade', locale, slug: trade.slug })
    for (const project of PROJECT_DATA) refs.push({ kind: 'case', locale, id: project.id })
    for (const guide of copy.guides) refs.push({ kind: 'guide', locale, slug: guide.slug })
  }
  return refs.map(pageMeta)
}

/** Works out which page a URL path shows, given the site's base path. Unknown paths show the English home page. */
export function pageFromPath(pathname: string, base: string): PageRef {
  const normalisedBase = base.endsWith('/') ? base : `${base}/`
  const withoutBase = pathname.startsWith(normalisedBase) ? pathname.slice(normalisedBase.length) : pathname.replace(/^\//, '')
  const path = withoutBase.replace(/index\.html$/, '').replace(/\/+$/, '')
  const match = allPages().find((page) => page.path.replace(/\/$/, '') === path)
  return match ? match.ref : { kind: 'home', locale: 'en' }
}
