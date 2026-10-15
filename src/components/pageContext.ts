import { createContext, useContext } from 'react'
import type { PageRef } from '@/content/pages'
import { useLocalHref } from '@/i18n/context'

export interface PageContextValue {
  /** True on the long home page, where section links are plain `#anchors`. */
  isHome: boolean
  /** The page being shown, so a language switch can find its twin. */
  page: PageRef
}

export const PageContext = createContext<PageContextValue>({ isHome: true, page: { kind: 'home', locale: 'en' } })

/** Link to a section of the home page: a plain `#anchor` on the home page, a full path from any other page. */
export function useHomeAnchor(): (id: string) => string {
  const { isHome } = useContext(PageContext)
  const localHref = useLocalHref()
  return (id) => (isHome ? `#${id}` : `${localHref('')}#${id}`)
}

/** Link to the top of the home page in the language being shown. */
export function useHomeTop(): string {
  const { isHome } = useContext(PageContext)
  const localHref = useLocalHref()
  return isHome ? '#top' : localHref('')
}
