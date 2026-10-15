import { createContext, useContext } from 'react'
import { BASE_PATH } from '@/lib/paths'
import { LOCALES } from './locales.ts'
import type { Copy } from './types.ts'

/**
 * The dictionary for the page being shown, provided once at the top of the app.
 * There is deliberately no default: a default would pull the English dictionary into every page, including
 * pages in other languages that never show it.
 */
export const CopyContext = createContext<Copy | null>(null)

export function useCopy(): Copy {
  const copy = useContext(CopyContext)
  if (!copy) throw new Error('useCopy must be used inside <CopyContext.Provider>')
  return copy
}

/** Builds a URL for a page in the language being shown. Pass the path below the language folder ("" is home). */
export function useLocalHref(): (relativePath: string) => string {
  const { locale } = useCopy()
  return (relativePath) => `${BASE_PATH}${LOCALES[locale].prefix}${relativePath}`
}
