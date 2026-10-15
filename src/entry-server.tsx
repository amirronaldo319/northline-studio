import { renderToString } from 'react-dom/server'
import App from './App'
import { allPages, pageMeta, withLocale, type PageMeta, type PageRef } from './content/pages'
import { LOCALES, enabledLocales } from './i18n/locales'
import { applyPageHead, type Alternate } from './lib/pageHead'

export { applyPageHead }

/** Every page the build produces. */
export function listPages(): PageMeta[] {
  return allPages()
}

/**
 * The same page in every language that is switched on, for hreflang links. Empty while English is the only
 * language, since there is nothing to point at.
 */
export function alternatesFor(meta: PageMeta): Alternate[] {
  const locales = enabledLocales()
  if (locales.length < 2) return []
  return [
    ...locales.map((locale) => ({
      hreflang: LOCALES[locale].htmlLang,
      path: pageMeta(withLocale(meta.ref, locale)).path,
    })),
    { hreflang: 'x-default', path: pageMeta(withLocale(meta.ref, 'en')).path },
  ]
}

/**
 * Renders one page to an HTML string. Used at build time (scripts/prerender.mjs) and by tests.
 *
 * Nothing on the page suspends, so a plain string render is complete. (Streaming renderers add inline
 * scripts to the markup, which the page's Content-Security-Policy does not allow.)
 */
export async function render(page: PageRef = { kind: 'home', locale: 'en' }): Promise<string> {
  return renderToString(<App page={page} />)
}
