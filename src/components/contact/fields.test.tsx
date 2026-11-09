import { describe, expect, test } from 'vitest'
import { render } from '@/entry-server'

describe('form fields in Apple’s manner', () => {
  test('each label is a real label inside the field box, and empty fields can be told from filled ones', async () => {
    const html = await render({ kind: 'home', locale: 'en' })
    for (const id of ['inquiry-name', 'inquiry-email', 'inquiry-message']) {
      expect(html).toMatch(new RegExp(`<div class="field-float"><label for="${id}" class="field-label">`))
      expect(html).toMatch(new RegExp(`id="${id}"[^>]*placeholder=" "`))
    }
    // The website field keeps its example, shown once the label has risen out of the way.
    expect(html).toMatch(/id="inquiry-website"[^>]*placeholder="yourbusiness\.ca"/)
    // No resize grip on the message box.
    expect(html).toMatch(/<textarea[^>]*class="field field-textarea resize-none"/)
  })
})
