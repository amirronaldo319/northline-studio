import { useContext } from 'react'
import { pagePath, withLocale } from '@/content/pages'
import { LOCALES, enabledLocales } from '@/i18n/locales'
import type { Locale } from '@/i18n/types'
import { pageHref } from '@/lib/paths'
import { LANGUAGE_STORAGE_KEY } from '@/lib/language'
import { useCopy } from '@/i18n/context'
import { PageContext } from './pageContext'

/** The accessible name must begin with the visible text ("EN"), so voice-control users can say what they see. */
function labelFor(visible: string, full: string): string {
  return full.startsWith(visible) ? full : `${visible}, ${full}`
}

type Props = {
  className?: string
  /** `dark` is for navy backgrounds. */
  tone?: 'light' | 'dark'
}

/**
 * A button for each language the site is available in. Each goes to the same page in that language, keeps the
 * visitor's place (the section in the address), and remembers the choice. Renders nothing while English is the
 * only language switched on.
 */
export function LanguageSwitcher({ className = '', tone = 'light' }: Props) {
  const { page } = useContext(PageContext)
  const t = useCopy()
  const locales = enabledLocales()
  if (locales.length < 2) return null

  const remember = (locale: Locale) => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale)
    } catch {
      /* Storage can be blocked; the switch itself still works. */
    }
  }

  return (
    <div role="group" aria-label={t.common.languageNav} className={className}>
      <ul className="flex flex-wrap items-center gap-1.5">
        {locales.map((locale) => {
          const info = LOCALES[locale]
          const isCurrent = locale === page.locale
          return (
            <li key={locale}>
              <a
                href={pageHref(pagePath(withLocale(page, locale)))}
                lang={info.htmlLang}
                hrefLang={info.htmlLang}
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={labelFor(info.shortLabel, info.label)}
                onClick={(event) => {
                  remember(locale)
                  // Keep the visitor's place: the twin page has the same section ids.
                  if (window.location.hash) event.currentTarget.hash = window.location.hash
                }}
                className={`inline-flex min-h-9 min-w-9 items-center justify-center rounded-full border px-3 text-sm font-semibold transition-colors ${
                  tone === 'dark'
                    ? isCurrent
                      ? 'border-white bg-white text-night'
                      : 'border-night-line text-white/85 hover:border-white/60 hover:text-white'
                    : isCurrent
                      ? 'border-ink bg-ink text-white'
                      : 'border-line-strong bg-card text-ink-2 hover:border-ink/40 hover:text-ink'
                }`}
              >
                {info.shortLabel}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
