import { describe, expect, test } from 'vitest'
import { render } from './entry-server'

/** The prerendered HTML (what crawlers and visitors without JavaScript get) keeps working glass controls. */
describe('glass markup without JavaScript', async () => {
  const html = await render({ kind: 'home', locale: 'en' })

  test('the bar is real navigation: plain links to Work, Pricing and About', () => {
    expect(html).toMatch(/<nav aria-label="Main" class="site-nav-links">/)
    for (const id of ['work', 'package', 'about']) expect(html).toMatch(new RegExp(`<a href="#${id}" class="nav-link"`))
    expect(html).not.toContain('class="lg-tab-bar')
  })

  test('the bar is one strip of frosted material, as on Apple\'s product pages', () => {
    expect(html.match(/class="nav-bar liquid-glass-navigation"/g)).toHaveLength(1)
  })

  test('the menu button is a real button that says what it does and what it controls', () => {
    expect(html).toMatch(/<button type="button" class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"/)
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
    const buttons = [...html.matchAll(/<button type="button" class="gallery-paddle" aria-label="(Previous|Next)"( disabled="")?/g)]
    expect(buttons.map((match) => `${match[1]}${match[2] ? ' (disabled)' : ''}`)).toEqual(['Previous (disabled)', 'Next', 'Previous (disabled)', 'Next'])
  })

  test('the gallery position dots are decoration; the buttons and the list carry the meaning', () => {
    expect(html.match(/<div class="gallery-dots" aria-hidden="true">/g)).toHaveLength(2)
  })

  test('screenshots carry glass labels, and the hero screenshot a glass caption with a real link', () => {
    expect(html).toMatch(/class="lg-glass caption-glass[^"]*"[^]*?<a href="\/work\/farsh-aquatics\/"/)
    expect(html.match(/class="lg-glass chip-glass/g)?.length).toBeGreaterThanOrEqual(2)
  })

  test('Persian keeps a right-to-left nav it can read in order', async () => {
    const fa = await render({ kind: 'home', locale: 'fa' })
    expect(fa).not.toContain('class="lg-tab-bar')
    expect(fa).toContain('class="nav-plain"')
  })
})
