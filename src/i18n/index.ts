import { fr } from './fr.ts'
import { en } from './en.ts'
import { fa } from './fa.ts'
import type { Copy, Locale } from './types.ts'
import { zhHans } from './zhHans.ts'
import { zhHant } from './zhHant.ts'

export type { Copy, Locale } from './types.ts'

const DICTIONARIES: Record<Locale, Copy> = { en, fr, fa, 'zh-hans': zhHans, 'zh-hant': zhHant }

export function getCopy(locale: Locale): Copy {
  return DICTIONARIES[locale]
}
