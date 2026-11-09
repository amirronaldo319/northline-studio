import { describe, expect, test } from 'vitest'
import { WEBSITE_PROJECTS } from '@/content/projects'
import { TRADES } from '@/content/trades'
import { render } from '@/entry-server'

describe('project tiles on inner pages', () => {
  test('a trade page shows every website as a tile with its picture, linked to its own page on this site', async () => {
    const html = await render({ kind: 'trade', locale: 'en', slug: TRADES[0].slug })
    const proof = html.slice(html.indexOf('id="proof-title"'))
    expect(proof.match(/class="related-shot/g)).toHaveLength(WEBSITE_PROJECTS.length)
    for (const project of WEBSITE_PROJECTS) expect(proof).toContain(`href="/work/${project.id}/"`)
    // These links stay on the site, so they carry no "opens elsewhere" arrow.
    expect(proof.slice(0, proof.indexOf('</section>'))).not.toContain('card-arrow')
  })

  test('the Work page introduces its websites like its other sections', async () => {
    const html = await render({ kind: 'work', locale: 'fr' })
    expect(html).toMatch(/id="sites-title"[^>]*>Sites web\.</)
  })
})
