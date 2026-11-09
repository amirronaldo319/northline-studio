import { describe, expect, test } from 'vitest'
import { render } from '@/entry-server'

const trail = (html: string) => {
  const footer = html.slice(html.indexOf('<footer'))
  const match = footer.match(/<nav aria-label="[^"]+" class="text-caption[^]*?<\/nav>/)
  return match ? match[0].replace(/<!-- -->/g, '') : null
}

describe('the breadcrumb trail', () => {
  test('sits in the footer of an inner page, not above its title', async () => {
    const html = await render({ kind: 'case', locale: 'en', id: '604kars' })
    const header = html.slice(0, html.indexOf('id="page-title"'))
    expect(header).not.toContain('aria-label="Breadcrumb"')
    const nav = trail(html)
    expect(nav).toContain('href="/#top"')
    expect(nav).toContain('href="/#work"')
    expect(nav).toMatch(/aria-current="page"[^>]*><bdi>604 Kars<\/bdi>/)
  })

  test('follows the page language', async () => {
    expect(trail(await render({ kind: 'work', locale: 'fr' }))).toContain('href="/fr/#top"')
  })

  test('the home page has none', async () => {
    expect(trail(await render({ kind: 'home', locale: 'en' }))).toBeNull()
  })
})
