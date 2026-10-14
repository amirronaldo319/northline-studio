import { prerender } from 'react-dom/static'
import App from './App'

/**
 * Renders the page to an HTML string, waiting for lazily loaded parts so the markup is complete.
 * Used at build time (scripts/prerender.mjs) and by tests.
 */
export async function render(): Promise<string> {
  const { prelude } = await prerender(<App />)
  return new Response(prelude).text()
}
