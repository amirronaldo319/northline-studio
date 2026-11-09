import { useContext } from 'react'
import { PROJECTS } from '@/content/projects'
import { useCopy } from '@/i18n/context'
import type { Crumb } from './Breadcrumb'
import { PageContext, useHomeAnchor } from './pageContext'

/** Where the current page sits in the site, from the home page down; null on the home page itself. */
export function usePageCrumbs(): Crumb[] | null {
  const { page } = useContext(PageContext)
  const homeAnchor = useHomeAnchor()
  const t = useCopy()
  const home: Crumb = { label: t.common.home, href: homeAnchor('top') }

  switch (page.kind) {
    case 'work':
      return [home, { label: t.common.work }]
    case 'case': {
      const project = PROJECTS.find((candidate) => candidate.id === page.id)
      return project ? [home, { label: t.common.work, href: homeAnchor('work') }, { label: project.name }] : null
    }
    case 'trade': {
      const trade = t.trades.find((candidate) => candidate.slug === page.slug)
      return trade ? [home, { label: t.tradePage.crumb(trade.name) }] : null
    }
    case 'guide': {
      const guide = t.guides.find((candidate) => candidate.slug === page.slug)
      return guide ? [home, { label: t.common.guides }, { label: guide.headline.replace(/[.。]$/, '') }] : null
    }
    default:
      return null
  }
}
