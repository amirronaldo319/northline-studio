import { describe, expect, test } from 'vitest'
import { render } from './entry-server'

/** The prerendered HTML (what crawlers and visitors without JavaScript get) keeps working glass controls. */
describe('glass markup without JavaScript', async () => {
  const html = await render({ kind: 'home', locale: 'en' })

  test('the glass tab bar is real navigation: plain links to Work, Pricing and About', () => {
    expect(html).toMatch(/role="navigation"[^>]*aria-label="Main"|aria-label="Main"[^>]*role="navigation"/)
    for (const id of ['work', 'package', 'about']) expect(html).toMatch(new RegExp(`<a href="#${id}" class="lg-tab"`))
  })

  test('the whole bar is one surface of glass, not a row of separate capsules', () => {
    expect(html.match(/class="lg-glass nav-glass/g)).toHaveLength(1)
    expect(html).not.toContain('glass-brand')
  })

  test('form fields stay plain and readable inside the glass card, with their names, labels and autocomplete', () => {
    expect(html).toMatch(/class="lg-glass form-glass/)
    expect(html).toMatch(/<label for="inquiry-name"/)
    expect(html).toMatch(/<input[^>]*autoComplete="name"|<input[^>]*autocomplete="name"/i)
    expect(html).not.toMatch(/class="lg-glass lg-input/)
  })

  test('screenshots carry glass labels, and the hero screenshot a glass caption with a real link', () => {
    expect(html).toMatch(/class="lg-glass caption-glass[^"]*"[^]*?<a href="\/work\/farsh-aquatics\/"/)
    expect(html.match(/class="lg-glass chip-glass/g)?.length).toBeGreaterThanOrEqual(2)
  })

  test('the phone quote bar starts hidden and out of reach', () => {
    expect(html).toMatch(/<div class="quote-bar" data-visible="false" inert=""/)
  })

  test('Persian keeps a right-to-left nav it can read in order', async () => {
    const fa = await render({ kind: 'home', locale: 'fa' })
    expect(fa).not.toContain('class="lg-tab-bar')
    expect(fa).toContain('class="nav-plain"')
  })
})
