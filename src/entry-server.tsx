import { renderToString } from 'react-dom/server'
import App from './App'
import { allPages, type PageMeta, type PageRef } from './content/pages'
import { enabledLanguages } from './content/languages'
import { applyPageHead, type Alternate } from './lib/pageHead'

export { applyPageHead }

/**
 * The language versions of a page, for hreflang links. Only the home page and its translations are
 * alternates of each other; every other page is English-only and gets none.
 */
export function alternatesFor(meta: PageMeta): Alternate[] {
  const languages = enabledLanguages()
  const isTranslated = meta.ref.kind === 'home' || meta.ref.kind === 'language'
  if (!isTranslated || languages.length === 0) return []
  return [
    { hreflang: 'en-CA', path: '' },
    ...languages.map((language) => ({ hreflang: language.htmlLang, path: language.path })),
    { hreflang: 'x-default', path: '' },
  ]
}

/** Every page the build produces. */
export function listPages(): PageMeta[] {
  return allPages()
}

/**
 * Renders one page to an HTML string. Used at build time (scripts/prerender.mjs) and by tests.
 *
 * Nothing on the page suspends, so a plain string render is complete. (Streaming renderers add inline
 * scripts to the markup, which the page's Content-Security-Policy does not allow.)
 */
export async function render(page: PageRef = { kind: 'home' }): Promise<string> {
  return renderToString(<App page={page} />)
}
