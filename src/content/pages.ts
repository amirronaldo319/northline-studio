import { PROJECT_DATA as PROJECTS } from './projectsData.ts'
import { GUIDES, findGuide } from './guides.ts'
import { TRADES, findTrade } from './trades.ts'
import { FAQ, type FaqItem } from './faq.ts'
import { PERSIAN_PAGE } from './persian.ts'
import { site } from '../config/site.ts'

/** Identifies one page of the site. The home page is the long single page; the rest are short landing pages. */
export type PageRef =
  | { kind: 'home' }
  | { kind: 'trade'; slug: string }
  | { kind: 'case'; id: string }
  | { kind: 'guide'; slug: string }
  | { kind: 'persian' }

export interface PageMeta {
  ref: PageRef
  /** Path below the site root, with a trailing slash. Empty for the home page. */
  path: string
  title: string
  description: string
  /** Questions to publish as FAQPage data for this page. */
  faq: readonly FaqItem[]
  lang: string
  dir: 'ltr' | 'rtl'
}

const HOME_TITLE = 'Northline Studio | Custom websites for Vancouver businesses'
const HOME_DESCRIPTION =
  'Custom one-page websites for local service businesses in Vancouver and North Vancouver. See website examples and request a quote.'

function homeMeta(): PageMeta {
  return { ref: { kind: 'home' }, path: '', title: HOME_TITLE, description: HOME_DESCRIPTION, faq: FAQ, lang: 'en-CA', dir: 'ltr' }
}

export function pageMeta(ref: PageRef): PageMeta {
  switch (ref.kind) {
    case 'trade': {
      const trade = findTrade(ref.slug)
      if (!trade) return homeMeta()
      return { ref, path: `${trade.slug}/`, title: trade.title, description: trade.description, faq: trade.faq, lang: 'en-CA', dir: 'ltr' }
    }
    case 'guide': {
      const guide = findGuide(ref.slug)
      if (!guide) return homeMeta()
      return { ref, path: `guides/${guide.slug}/`, title: guide.title, description: guide.description, faq: [], lang: 'en-CA', dir: 'ltr' }
    }
    case 'case': {
      const project = PROJECTS.find((candidate) => candidate.id === ref.id)
      if (!project) return homeMeta()
      return {
        ref,
        path: `work/${project.id}/`,
        title: `${project.name}: ${project.status === 'live' ? 'a live website I built' : 'a concept project'} | Northline Studio`,
        description: project.summary,
        faq: [],
        lang: 'en-CA',
        dir: 'ltr',
      }
    }
    case 'persian':
      return {
        ref,
        path: 'fa/',
        title: PERSIAN_PAGE.title,
        description: PERSIAN_PAGE.description,
        faq: [],
        lang: 'fa',
        dir: 'rtl',
      }
    default:
      return homeMeta()
  }
}

/** Every page the build produces, home first. The Persian page is included only when switched on in the site config. */
export function allPages(): PageMeta[] {
  const refs: PageRef[] = [
    { kind: 'home' },
    ...TRADES.map((trade): PageRef => ({ kind: 'trade', slug: trade.slug })),
    ...PROJECTS.map((project): PageRef => ({ kind: 'case', id: project.id })),
    ...GUIDES.map((guide): PageRef => ({ kind: 'guide', slug: guide.slug })),
  ]
  if (site.features.persianPage) refs.push({ kind: 'persian' })
  return refs.map(pageMeta)
}

/** Works out which page a URL path shows, given the site's base path. Unknown paths show the home page. */
export function pageFromPath(pathname: string, base: string): PageRef {
  const normalisedBase = base.endsWith('/') ? base : `${base}/`
  const withoutBase = pathname.startsWith(normalisedBase) ? pathname.slice(normalisedBase.length) : pathname.replace(/^\//, '')
  const path = withoutBase.replace(/index\.html$/, '').replace(/\/+$/, '')
  const match = allPages().find((page) => page.path.replace(/\/$/, '') === path)
  return match ? match.ref : { kind: 'home' }
}
