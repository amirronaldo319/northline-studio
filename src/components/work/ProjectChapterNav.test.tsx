import { describe, expect, test } from 'vitest'
import { PROJECTS } from '@/content/projects'
import { NAV_IMAGES } from '@/content/projectNav'
import { render } from '@/entry-server'

describe('the Work page’s row of projects', () => {
  test('every project has its small picture', () => {
    expect(Object.keys(NAV_IMAGES).sort()).toEqual(PROJECTS.map((project) => project.id).sort())
  })

  test('opens the Work page with one link per project, in the page language', async () => {
    const html = await render({ kind: 'work', locale: 'fr' })
    const nav = html.slice(html.indexOf('class="chapter-nav"'), html.indexOf('</nav>', html.indexOf('class="chapter-nav"')))
    expect(nav.match(/class="chapter-nav-link"/g)).toHaveLength(PROJECTS.length)
    for (const project of PROJECTS) expect(nav).toContain(`href="/fr/work/${project.id}/"`)
    // It comes before the first section of cards.
    expect(html.indexOf('class="chapter-nav"')).toBeLessThan(html.indexOf('id="sites-title"'))
  })
})
