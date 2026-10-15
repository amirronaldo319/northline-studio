import type { Copy, Locale } from './types.ts'

/**
 * Loads the dictionary for one language. Each language is its own file in the build, so a visitor downloads
 * only the language of the page they opened. (English is already part of the main bundle.)
 */
export async function loadCopy(locale: Locale): Promise<Copy> {
  switch (locale) {
    case 'fa':
      return (await import('./fa.ts')).fa
    case 'zh-hans':
      return (await import('./zhHans.ts')).zhHans
    case 'zh-hant':
      return (await import('./zhHant.ts')).zhHant
    default:
      return (await import('./en.ts')).en
  }
}
