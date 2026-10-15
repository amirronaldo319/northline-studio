import { renderToString } from 'react-dom/server'
import App from './App'
import { allPages, type PageMeta, type PageRef } from './content/pages'
import { applyPageHead } from './lib/pageHead'

export { applyPageHead }

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
