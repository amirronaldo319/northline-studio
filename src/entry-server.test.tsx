import { describe, expect, test } from 'vitest'
import { render } from './entry-server'

/**
 * The page is rendered to HTML at build time, so crawlers and visitors without JavaScript get the real content
 * and the browser can paint the headline before any script has run.
 */
describe('server render', async () => {
  const html = await render({ kind: 'home', locale: 'en' })
  /** React separates adjacent text nodes with comments; compare as a reader would see it. */
  const text = html.replace(/<!-- -->/g, '')

  test('contains the headline, every section, and the contact form', () => {
    expect(html).toContain('Canada')
    for (const id of ['work', 'package', 'process', 'about', 'faq', 'contact', 'site-check']) {
      expect(html).toContain(`id="${id}"`)
    }
    expect(html).toContain('Request a quote')
    expect(html).toContain('name="email"')
  })

  test('leads with the new headline and the starting price', () => {
    expect(text).toContain('Your business.')
    expect(text).toContain('Beautifully online.')
    expect(text).toContain('One-page packages from CA$299.')
  })

  test('keeps the design demos, labelled as demos, on the work page', async () => {
    const work = (await render({ kind: 'work', locale: 'en' })).replace(/<!-- -->/g, '')
    expect(work).toContain('Tidewell Cleaning')
    expect(work).toContain('Concept demo')
    expect(work).toContain('id="apps-title"')
  })

  test('renders exactly one h1', () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1)
  })

  test('does not render the phone quote bar as visible', () => {
    expect(html).toMatch(/class="quote-bar" data-visible="false"/)
  })

  test('contains no inline scripts, which the Content-Security-Policy would block', () => {
    expect(html).not.toMatch(/<script[\s>]/)
  })
})

describe('every page renders as a complete document', async () => {
  const { listPages } = await import('./entry-server')

  test.each(listPages().map((meta) => [meta.path || 'home', meta] as const))('%s', async (_name, meta) => {
    const html = await render(meta.ref)
    expect(html.match(/<h1[\s>]/g), 'one h1').toHaveLength(1)
    expect(html).not.toMatch(/<script[\s>]/)
    expect(html).toContain('id="contact"')
  })
})

