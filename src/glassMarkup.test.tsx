import { describe, expect, test } from 'vitest'
import { render } from './entry-server'

/** The prerendered HTML (what crawlers and visitors without JavaScript get) keeps working glass controls. */
describe('glass markup without JavaScript', async () => {
  const html = await render({ kind: 'home', locale: 'en' })

  test('the glass tab bar is real navigation: plain links to Work, Pricing and About', () => {
    expect(html).toMatch(/role="navigation"[^>]*aria-label="Main"|aria-label="Main"[^>]*role="navigation"/)
    for (const id of ['work', 'package', 'about']) expect(html).toMatch(new RegExp(`<a href="#${id}" class="lg-tab"`))
  })

  test('the whole bar is one capsule of glass, not a row of separate capsules', () => {
    expect(html.match(/class="nav-shell liquid-glass-navigation"/g)).toHaveLength(1)
    expect(html).not.toContain('glass-brand')
  })

  test('the menu button is a real button that says what it does and what it controls', () => {
    expect(html).toMatch(/<button type="button" class="liquid-glass-button[^"]*nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"/)
  })

  test('the contact form sits in one large glass panel, with real inputs, labels and autocomplete', () => {
    expect(html).toMatch(/class="contact-panel liquid-glass-strong[^"]*"[^]*?class="form-well liquid-glass-subtle"/)
    expect(html).toMatch(/<label for="inquiry-name"/)
    expect(html).toMatch(/<input[^>]*autoComplete="name"[^>]*class="field liquid-glass-input"|<input[^>]*class="field liquid-glass-input"[^>]*autoComplete="name"/i)
    expect(html).not.toMatch(/class="lg-glass lg-input/)
  })

  test('the glass shapes behind the hero, the work, the pricing and the contact panel are decoration only', () => {
    const sets = [...html.matchAll(/<div class="glass-shapes ([a-z]+)-shapes"([^>]*)>/g)]
    expect(sets.map((match) => match[1])).toEqual(['hero', 'cards', 'pricing', 'contact'])
    for (const match of sets) expect(match[2]).toContain('aria-hidden="true"')
  })

  test('both plans head their columns on glass, and neither carries a label such as "most popular"', () => {
    expect(html.match(/role="columnheader" class="compare-plan plan-card liquid-glass-(subtle|strong)/g)).toHaveLength(2)
    expect(html).not.toMatch(/most popular|recommended|best value/i)
  })

  test('the portfolio shows 604 Kars, Farsh Aquatics and Ganjineh Ofogh, each linked to its page', () => {
    for (const id of ['604kars', 'farsh-aquatics', 'ganjineh-ofogh']) expect(html).toContain(`href="/work/${id}/"`)
  })

  test('the websites and the apps are two swipeable galleries, each a labelled, focusable list', () => {
    const tracks = [...html.matchAll(/<ul class="gallery-track" aria-label="([^"]+)" tabindex="0">/g)].map((match) => match[1])
    expect(tracks).toEqual(['Websites', 'Apps and tools'])
  })

  test('every website after the featured one, both design demos and every app are cards in the galleries', () => {
    const galleries = html.slice(html.indexOf('class="gallery"'), html.indexOf('id="package"'))
    for (const id of ['farsh-aquatics', 'storage4666', 'maid-new', 'ganjineh-ofogh', 'mend', 'octaiq', 'shamsi-calendar', 'mend-app', 'jarvis', 'stayin', 'motion-kit']) {
      expect(galleries, id).toContain(`id="project-${id}-title"`)
    }
    for (const id of ['cleaning', 'landscaping']) expect(galleries, id).toContain(`id="example-${id}-title"`)
  })

  test('each gallery has labelled previous and next buttons, and starts with previous disabled', () => {
    const buttons = [...html.matchAll(/<button type="button" class="liquid-glass-button glass-btn-secondary glass-btn-icon gallery-button" aria-label="(Previous|Next)"( disabled="")?/g)]
    expect(buttons.map((match) => `${match[1]}${match[2] ? ' (disabled)' : ''}`)).toEqual(['Previous (disabled)', 'Next', 'Previous (disabled)', 'Next'])
  })

  test('the gallery position dots are decoration; the buttons and the list carry the meaning', () => {
    expect(html.match(/<div class="gallery-dots" aria-hidden="true">/g)).toHaveLength(2)
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
