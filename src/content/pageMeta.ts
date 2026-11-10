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
  /**
   * The way down to this page from its language's home page, as the breadcrumb at the foot of the page shows it
   * (see pageCrumbs.ts). Only steps that are pages of their own, so each has an address. Empty on a home page.
   */
  crumbs: readonly PageCrumb[]
  /** The picture a shared link shows, below the site root (rendered by scripts/generate-share-cards.py). */
  shareImage: string
  /** What the business does, in this page's language, for the business data every page carries. */
  businessDescription: string
}

export interface PageCrumb {
  name: string
  /** Path below the site root, with a trailing slash. Empty for the English home page. */
  path: string
}

/** Headlines end with a full stop on the page; a breadcrumb is a label, so it goes without. */
const asLabel = (headline: string) => headline.replace(/[.。]$/u, '')

export function pageMeta(ref: PageRef): PageMeta {
  const copy = getCopy(ref.locale)
  const info = LOCALES[ref.locale]
  const path = pagePath(ref)
  const base = {
    ref,
    locale: ref.locale,
    path,
    relativePath: relativePath(ref),
    lang: info.htmlLang,
    dir: info.dir,
    shareImage: `share/home-${ref.locale}.jpg`,
    businessDescription: copy.meta.homeDescription,
  }
  const homeCrumb: PageCrumb = { name: copy.common.home, path: info.prefix }
  const home: PageMeta = { ...base, ref: { kind: 'home', locale: ref.locale }, path: info.prefix, relativePath: '', title: copy.meta.homeTitle, description: copy.meta.homeDescription, faq: copy.faq.items, crumbs: [] }

  switch (ref.kind) {
    case 'trade': {
      const trade = copy.trades.find((candidate) => candidate.slug === ref.slug)
      if (!trade) return home
      return { ...base, title: trade.title, description: trade.description, faq: trade.faq, crumbs: [homeCrumb, { name: copy.tradePage.crumb(trade.name), path }] }
    }
    case 'guide': {
      const guide = copy.guides.find((candidate) => candidate.slug === ref.slug)
      if (!guide) return home
      // "Guides" is a label in the visible trail, not a page, so the published trail goes straight to the guide.
      return { ...base, title: guide.title, description: guide.description, faq: [], crumbs: [homeCrumb, { name: asLabel(guide.headline), path }] }
    }
    case 'work':
      return { ...base, title: copy.meta.workTitle, description: copy.meta.workDescription, faq: [], crumbs: [homeCrumb, { name: copy.common.work, path }] }
    case 'case': {
      const project = PROJECT_DATA.find((candidate) => candidate.id === ref.id)
      if (!project) return home
      return {
        ...base,
        title: copy.meta.caseTitle(project.name, project.status),
        description: copy.projects[project.id]?.summary ?? project.summary,
        faq: [],
        crumbs: [homeCrumb, { name: copy.common.work, path: pagePath({ kind: 'work', locale: ref.locale }) }, { name: project.name, path }],
        // A project page shows the project itself: its name beside its desktop and phone captures.
        shareImage: `share/work-${project.id}.jpg`,
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
