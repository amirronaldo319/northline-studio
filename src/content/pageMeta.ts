import { getCopy } from '../i18n/index.ts'
import { LOCALES } from '../i18n/locales.ts'
import type { Locale } from '../i18n/types.ts'
import type { FaqItem } from './faq.ts'
import { knownPages, pagePath, relativePath, type PageRef } from './pages.ts'
import { PROJECT_DATA } from './projectsData.ts'

/**
 * Page titles, descriptions and FAQ data. This needs every language's words, so it is used by the build, the
 * prerender, and tests only: the browser bundle never imports it (it loads just the one language a page needs).
 */
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
  return knownPages().map(pageMeta)
}
