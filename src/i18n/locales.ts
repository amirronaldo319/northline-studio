import { site } from '../config/site.ts'
import type { Locale } from './types.ts'

export interface LocaleInfo {
  locale: Locale
  /** Folder below the site root, with a trailing slash. Empty for English, the default. */
  prefix: string
  htmlLang: string
  dir: 'ltr' | 'rtl'
  /** Name of the language in that language, for the switcher's accessible name. */
  label: string
  /** Short form shown on the switcher button. */
  shortLabel: string
  /** `og:locale` value. */
  ogLocale: string
}

export const LOCALES: Record<Locale, LocaleInfo> = {
  en: { locale: 'en', prefix: '', htmlLang: 'en-CA', dir: 'ltr', label: 'English', shortLabel: 'EN', ogLocale: 'en_CA' },
  fr: { locale: 'fr', prefix: 'fr/', htmlLang: 'fr-CA', dir: 'ltr', label: 'Français', shortLabel: 'FR', ogLocale: 'fr_CA' },
  fa: { locale: 'fa', prefix: 'fa/', htmlLang: 'fa', dir: 'rtl', label: 'فارسی', shortLabel: 'فارسی', ogLocale: 'fa_IR' },
  'zh-hans': {
    locale: 'zh-hans',
    prefix: 'zh/',
    htmlLang: 'zh-Hans',
    dir: 'ltr',
    label: '简体中文',
    shortLabel: '简体',
    ogLocale: 'zh_CN',
  },
  'zh-hant': {
    locale: 'zh-hant',
    prefix: 'zh-hant/',
    htmlLang: 'zh-Hant',
    dir: 'ltr',
    label: '繁體中文',
    shortLabel: '繁體',
    ogLocale: 'zh_HK',
  },
}

export const ALL_LOCALES = Object.keys(LOCALES) as Locale[]

/** English plus every translation that has been switched on, in display order. */
export function enabledLocales(): Locale[] {
  return ALL_LOCALES.filter((locale) => locale === 'en' || site.features.languages[locale])
}

export function isLocale(value: string): value is Locale {
  return (ALL_LOCALES as string[]).includes(value)
}
