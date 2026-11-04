import { useContext, type MouseEvent } from 'react'
import { pagePath, withLocale } from '@/content/pages'
import { LOCALES, enabledLocales } from '@/i18n/locales'
import type { Locale } from '@/i18n/types'
import { LANGUAGE_STORAGE_KEY } from '@/lib/language'
import { pageHref } from '@/lib/paths'
import { PageContext } from './pageContext'

export interface LanguageLink {
  locale: Locale
  info: (typeof LOCALES)[Locale]
  href: string
  isCurrent: boolean
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void
}

/** One link per language the site is switched on in: same page, same section, and the choice remembered. */
export function useLanguageLinks(): LanguageLink[] {
  const { page } = useContext(PageContext)
  return enabledLocales().map((locale) => ({
    locale,
    info: LOCALES[locale],
    href: pageHref(pagePath(withLocale(page, locale))),
    isCurrent: locale === page.locale,
    onClick: (event) => {
      try {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale)
      } catch {
        /* Storage can be blocked; the switch itself still works. */
      }
      // Keep the visitor's place: the twin page has the same section ids.
      if (window.location.hash) event.currentTarget.hash = window.location.hash
    },
  }))
}
