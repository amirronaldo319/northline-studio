import { LOCALES, enabledLocales } from '../i18n/locales.ts'
import type { Locale } from '../i18n/types.ts'

/** Where a visitor's chosen language is remembered, so a return visit opens in it. */
export const LANGUAGE_STORAGE_KEY = 'northline-lang'

/**
 * Decides whether to send the visitor to the same page in the language they chose earlier.
 *
 * Only an explicit earlier choice counts, only for a language that is switched on, and only when the visitor has
 * landed on the default (English) page: a link someone deliberately opened in another language is never overridden.
 * Returns the locale to go to, or null to stay.
 */
export function preferredRedirect(stored: string | null, current: Locale, enabled: readonly Locale[] = enabledLocales()): Locale | null {
  if (current !== 'en') return null
  if (!stored || stored === current) return null
  const locale = (Object.keys(LOCALES) as Locale[]).find((candidate) => candidate === stored)
  if (!locale || !enabled.includes(locale)) return null
  return locale
}
