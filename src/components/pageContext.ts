import { createContext, useContext } from 'react'
import { BASE_PATH } from '@/lib/paths'

export interface PageContextValue {
  /** True on the long home page, where section links are plain `#anchors`. */
  isHome: boolean
}

export const PageContext = createContext<PageContextValue>({ isHome: true })

/** Link to a section of the home page: a plain `#anchor` on the home page, a full path from any other page. */
export function useHomeAnchor(): (id: string) => string {
  const { isHome } = useContext(PageContext)
  return (id) => (isHome ? `#${id}` : `${BASE_PATH}#${id}`)
}

/** Link to the top of the home page. */
export function useHomeTop(): string {
  const { isHome } = useContext(PageContext)
  return isHome ? '#top' : BASE_PATH
}
