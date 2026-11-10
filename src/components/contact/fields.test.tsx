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

  test('before its script loads the form is a working plain form, not one that drops the message into the address bar', async () => {
    const html = await render({ kind: 'home', locale: 'en' })
    const form = /<form[^>]*aria-labelledby="contact-title"[^>]*>/.exec(html)![0]
    // It posts (a form without a method sends its fields in the page's own address), and the browser checks the
    // required fields: `novalidate` is only set by the script, once it is there to do the checking itself.
    expect(form).toContain('method="post"')
    expect(form).not.toContain('novalidate')
    for (const id of ['inquiry-name', 'inquiry-email', 'inquiry-message']) {
      expect(html).toMatch(new RegExp(`<(?:input|textarea)[^>]*id="${id}"[^>]*required=""`))
    }
    expect(html).toMatch(/<input[^>]*id="inquiry-email"[^>]*type="email"/)
    // Every field has a name to be sent under; the bot trap and the subject use the form service's names.
    for (const name of ['name', 'email', 'message', 'business', 'phone', 'website']) expect(html).toContain(`name="${name}"`)
    expect(html).toMatch(/<input[^>]*id="inquiry-gotcha"[^>]*name="_gotcha"/)
    expect(html).toContain('<input type="hidden" name="_subject" value="Website inquiry"/>')
  })

  test('the skip link sits above the header, which covers its corner on a narrow screen', async () => {
    const html = await render({ kind: 'home', locale: 'en' })
    expect(html).toMatch(/<a href="#main" class="sr-only z-60 /)
  })
})
