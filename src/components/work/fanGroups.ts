import { APP_PROJECTS, PROJECTS, WEBSITE_PROJECTS, type Project } from '@/content/projects'
import type { Copy } from '@/i18n/types'

export type FanGroup = { key: string; label: string; projects: readonly Project[] }

/** Below this width one fan of every project leaves each card too thin a strip to tap. */
export const FAN_SPLIT_QUERY = '(max-width: 639px)'

/**
 * Which fans to draw. A wide screen gets one fan of every project. On a phone twelve overlapping cards leave strips
 * about 21px wide, under the 24px a finger needs (WCAG 2.2 target size), so the projects are dealt into two fans of
 * six, websites then apps and tools, each strip about twice as wide. Every project is still there.
 */
export function fanGroups(narrow: boolean, t: Copy): FanGroup[] {
  if (!narrow) return [{ key: 'all', label: t.work.fanLabel, projects: PROJECTS }]
  return [
    { key: 'websites', label: `${t.work.fanLabel} · ${t.work.sitesLabel}`, projects: WEBSITE_PROJECTS },
    { key: 'apps', label: `${t.work.fanLabel} · ${t.work.appsHeading.replace(/[.。]$/u, '')}`, projects: APP_PROJECTS },
  ]
}
