import { describe, expect, test } from 'vitest'
import { render } from './entry-server'

/** The prerendered HTML (what crawlers and visitors without JavaScript get) keeps working glass controls. */
describe('glass markup without JavaScript', async () => {
  const html = await render({ kind: 'home', locale: 'en' })

  test('the glass tab bar is real navigation: plain links to each section', () => {
    expect(html).toMatch(/role="navigation"[^>]*aria-label="Main"|aria-label="Main"[^>]*role="navigation"/)
    for (const id of ['work', 'package', 'process', 'about', 'faq']) expect(html).toMatch(new RegExp(`<a href="#${id}" class="lg-tab"`))
  })

  test('glass inputs keep their names, labels and autocomplete', () => {
    expect(html).toMatch(/<label for="inquiry-name"/)
    expect(html).toMatch(/<input[^>]*id="inquiry-name"[^>]*name="name"[^>]*autoComplete="name"|<input[^>]*autocomplete="name"/i)
    expect(html).toMatch(/class="lg-glass lg-input field-input[^"]*"/)
  })

  test('Persian keeps a right-to-left nav it can read in order', async () => {
    const fa = await render({ kind: 'home', locale: 'fa' })
    expect(fa).not.toContain('class="lg-tab-bar')
    expect(fa).toContain('nav-underline')
  })
})
