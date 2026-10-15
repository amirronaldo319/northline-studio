import { createContext, useContext } from 'react'
import { BASE_PATH } from '@/lib/paths'
import { en } from './en.ts'
import { LOCALES } from './locales.ts'
import type { Copy } from './types.ts'

/** The dictionary for the page being shown. English until a provider says otherwise. */
export const CopyContext = createContext<Copy>(en)

export function useCopy(): Copy {
  return useContext(CopyContext)
}

/** Builds a URL for a page in the language being shown. Pass the path below the language folder ("" is home). */
export function useLocalHref(): (relativePath: string) => string {
  const { locale } = useCopy()
  return (relativePath) => `${BASE_PATH}${LOCALES[locale].prefix}${relativePath}`
}
