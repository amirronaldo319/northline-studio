import { describe, expect, test } from 'vitest'
import { render } from './entry-server'

/**
 * The page is rendered to HTML at build time, so crawlers and visitors without JavaScript get the real content
 * and the browser can paint the headline before any script has run.
 */
describe('server render', async () => {
  const html = await render()
  /** React separates adjacent text nodes with comments; compare as a reader would see it. */
  const text = html.replace(/<!-- -->/g, '')

  test('contains the headline, every section, and the contact form', () => {
    expect(html).toContain('Vancouver’s')
    for (const id of ['work', 'package', 'process', 'about', 'faq', 'site-check', 'contact']) {
      expect(html).toContain(`id="${id}"`)
    }
    expect(html).toContain('Request a quote')
    expect(html).toContain('name="email"')
  })

  test('keeps the concept demo labelled as a concept', () => {
    expect(text).toContain('Concept demo: Tidewell Cleaning')
  })

  test('renders exactly one h1', () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1)
  })

  test('does not render the phone quote bar as visible', () => {
    expect(html).toMatch(/<div data-visible="false"[^>]*class="quote-bar/)
  })

  test('contains no inline scripts, which the Content-Security-Policy would block', () => {
    expect(html).not.toMatch(/<script[\s>]/)
  })
})
