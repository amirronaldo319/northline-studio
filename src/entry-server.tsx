import { renderToString } from 'react-dom/server'
import App from './App'

/**
 * Renders the page to an HTML string. Used at build time (scripts/prerender.mjs) and by tests.
 *
 * Nothing on the page suspends, so a plain string render is complete. (Streaming renderers add inline
 * scripts to the markup, which the page's Content-Security-Policy does not allow.)
 */
export async function render(): Promise<string> {
  return renderToString(<App />)
}
