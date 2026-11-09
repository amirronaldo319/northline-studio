import { describe, expect, test } from 'vitest'
import { render } from './entry-server'

/** The prerendered HTML (what crawlers and visitors without JavaScript get) keeps working glass controls. */
describe('glass markup without JavaScript', async () => {
  const html = await render({ kind: 'home', locale: 'en' })

  test('the desktop links are real navigation: plain links to Work, Pricing and About, with the bubble marker beside them', () => {
    expect(html).toMatch(/<nav aria-label="Main" class="bubble-nav"/)
    for (const id of ['work', 'package', 'about']) expect(html).toMatch(new RegExp(`<a href="#${id}" class="bubble-nav-link"`))
    // The marker is a picture: hidden from assistive technology, and empty until the bubble is drawn in the browser.
    expect(html).toMatch(/<span class="bubble-nav-marker" aria-hidden="true"><\/span>/)
    // Before any script runs no link is marked current (nothing has been scrolled to), and the row has no bubble yet.
    expect(html).not.toMatch(/class="bubble-nav-link"[^>]*aria-current|aria-current[^>]*class="bubble-nav-link"/)
  })

  test('the navigation is one floating capsule of glass', () => {
    expect(html.match(/class="nav-capsule liquid-glass-navigation"/g)).toHaveLength(1)
  })

  test('the menu button is a real button of glass that says what it does and what it controls', () => {
    expect(html).toMatch(/<button type="button" class="nav-toggle glass-control" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"/)
  })

  test('the phone glass bar starts hidden and out of reach', () => {
    expect(html).toMatch(/<aside class="quote-bar" data-visible="false" inert="" aria-label="Request a quote"/)
  })

  test('the contact form sits in one large tile, with real inputs, labels and autocomplete', () => {
    expect(html).toMatch(/class="contact-panel tile-paper[^"]*"[^]*?class="form-well"/)
    expect(html).toMatch(/<label for="inquiry-name"/)
    expect(html).toMatch(/<input[^>]*autoComplete="name"[^>]*class="field"|<input[^>]*class="field"[^>]*autoComplete="name"/i)
    expect(html).not.toMatch(/class="lg-glass lg-input/)
  })

  test('no decorative shapes or colour washes: sections alternate white and Apple grey', () => {
    expect(html).not.toMatch(/glass-shapes|glass-orb|ambient/)
    const backgrounds = [...html.matchAll(/<section[^>]*class="([^"]*)"/g)].map((match) => (match[1].includes('bg-paper') ? 'grey' : 'white'))
    expect(backgrounds.slice(0, 7)).toEqual(['white', 'grey', 'white', 'grey', 'white', 'grey', 'white'])
  })

  test('both plans head their columns alike, and neither carries a label such as "most popular"', () => {
    expect(html.match(/role="columnheader" class="compare-plan"/g)).toHaveLength(2)
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
    const buttons = [...html.matchAll(/<button type="button" class="gallery-paddle glass-control" aria-label="(Previous|Next)"( disabled="")?/g)]
    expect(buttons.map((match) => `${match[1]}${match[2] ? ' (disabled)' : ''}`)).toEqual(['Previous (disabled)', 'Next', 'Previous (disabled)', 'Next'])
  })

  test('the gallery position dots are decoration; the buttons and the list carry the meaning', () => {
    expect(html.match(/<div class="gallery-dots" aria-hidden="true">/g)).toHaveLength(2)
  })

  test('the hero screenshot has a glass caption with a real link, and card screenshots carry nothing on top', () => {
    expect(html).toMatch(/class="lg-glass caption-glass[^"]*"[^]*?<a href="\/work\/farsh-aquatics\/"/)
    // What kind of work a card shows is the first line of its text, not a label over the picture.
    expect(html).not.toContain('chip-glass')
    expect(html).toMatch(/<p class="text-footnote font-semibold text-accent">Live website<\/p><p class="project-label mt-1">/)
  })

  test('Persian keeps a right-to-left nav it can read in order, with the same bubble row', async () => {
    const fa = await render({ kind: 'home', locale: 'fa' })
    expect(fa).toContain('class="bubble-nav"')
    expect(fa.match(/class="bubble-nav-link"/g)).toHaveLength(3)
  })
})
