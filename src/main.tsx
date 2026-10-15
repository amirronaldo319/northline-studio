import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/bricolage-grotesque/wght.css'
import './index.css'
import App from './App'
import { pageFromPath, pagePath, withLocale } from './content/pages'
import { loadCopy } from './i18n/load'
import { LOCALES } from './i18n/locales'
import { LANGUAGE_STORAGE_KEY, preferredRedirect } from './lib/language'

// Lets CSS know scripting is available, so scroll reveals only hide content when they can run.
document.documentElement.classList.add('js')

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found')

// Each page is its own prerendered document; the path tells the browser which one it was given.
const page = pageFromPath(window.location.pathname, import.meta.env.BASE_URL)

// Language and direction follow the page (already set in the built HTML; this covers the dev server).
document.documentElement.lang = LOCALES[page.locale].htmlLang
document.documentElement.dir = LOCALES[page.locale].dir

// A visitor who chose a language earlier gets the same page in it. Only an explicit earlier choice counts.
try {
  const target = preferredRedirect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY), page.locale)
  if (target) {
    const next = `${import.meta.env.BASE_URL}${pagePath(withLocale(page, target))}${window.location.search}${window.location.hash}`
    window.location.replace(next)
  }
} catch {
  /* Storage can be blocked; the page simply stays as it is. */
}

// Only the page's own language is downloaded; it is ready before the page attaches to the prerendered HTML.
const copy = await loadCopy(page.locale)

const app = (
  <StrictMode>
    <App page={page} copy={copy} />
  </StrictMode>
)

// The production build ships the page already rendered; attach to it. In development the root is empty.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
