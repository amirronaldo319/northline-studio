import { enabledLanguages, type LanguageCode } from '@/content/languages'
import { pageHref } from '@/lib/paths'

type Props = {
  /** The language of the page being shown: "en" for the site's English pages. */
  current: 'en' | LanguageCode
  /** Accessible name of this navigation. Give each switcher on a page its own, so they can be told apart. */
  label?: string
  className?: string
  /** `dark` is for navy backgrounds. */
  tone?: 'light' | 'dark'
}

/**
 * A button for each language the site is available in. Renders nothing until at least one translated page has
 * been switched on, so the English-only site shows no empty control.
 */
export function LanguageSwitcher({ current, label = 'Language', className = '', tone = 'light' }: Props) {
  const languages = enabledLanguages()
  if (languages.length === 0) return null

  const items = [
    { code: 'en' as const, label: 'English', shortLabel: 'EN', href: pageHref(''), lang: 'en-CA' },
    ...languages.map((language) => ({
      code: language.code,
      label: language.label,
      shortLabel: language.shortLabel,
      href: pageHref(language.path),
      lang: language.htmlLang,
    })),
  ]

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex flex-wrap items-center gap-1.5">
        {items.map((item) => {
          const isCurrent = item.code === current
          return (
            <li key={item.code}>
              <a
                href={item.href}
                lang={item.lang}
                hrefLang={item.lang}
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={item.label}
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
                {item.shortLabel}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
