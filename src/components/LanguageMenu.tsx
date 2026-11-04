import { useContext } from 'react'
import { Check, Globe } from 'lucide-react'
import { Menu, type MenuItem } from 'glisse'
import { pagePath, withLocale } from '@/content/pages'
import { useCopy } from '@/i18n/context'
import { LOCALES, enabledLocales } from '@/i18n/locales'
import type { Locale } from '@/i18n/types'
import { LANGUAGE_STORAGE_KEY } from '@/lib/language'
import { pageHref } from '@/lib/paths'
import { PageContext } from './pageContext'

/**
 * The header's language choice as one glass menu button, so the floating bar stays compact at every desktop
 * width. Choosing a language does what the language links do: goes to the same page in that language, keeps the
 * section in the address, and remembers the choice. The footer and the phone menu keep the plain links, so the
 * languages stay reachable without JavaScript and to crawlers.
 */
export function LanguageMenu({ className = '' }: { className?: string }) {
  const { page } = useContext(PageContext)
  const t = useCopy()
  const locales = enabledLocales()
  if (locales.length < 2) return null

  const go = (locale: Locale) => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale)
    } catch {
      /* Storage can be blocked; the switch itself still works. */
    }
    window.location.assign(`${pageHref(pagePath(withLocale(page, locale)))}${window.location.hash}`)
  }

  const items: MenuItem[] = locales.map((locale) => {
    const info = LOCALES[locale]
    const isCurrent = locale === page.locale
    return {
      label: (
        <>
          <span lang={info.htmlLang}>{info.label}</span>
          {isCurrent && <span className="sr-only"> ({t.common.currentLanguage})</span>}
        </>
      ),
      // A tick marks the language being shown; the others keep an empty slot so the labels line up.
      icon: isCurrent ? <Check aria-hidden="true" /> : <span aria-hidden="true" className="inline-block size-4" />,
      onSelect: isCurrent ? undefined : () => go(locale),
    }
  })

  return (
    <Menu
      aria-label={t.common.languageNav}
      icon={<Globe aria-hidden="true" />}
      align={LOCALES[page.locale].dir === 'rtl' ? 'start' : 'end'}
      className={`glass-lang-menu ${className}`}
      items={items}
    />
  )
}
