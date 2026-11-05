import { expect, test, type Page } from '@playwright/test'

/** A harmless message some browsers log when a view transition is interrupted; it is not a site error. */
const BENIGN = /Transition was aborted/

function collectErrors(page: Page): string[] {
  const errors: string[] = []
  page.on('pageerror', (error) => {
    if (!BENIGN.test(error.message)) errors.push(error.message)
  })
  page.on('console', (message) => {
    if (message.type() === 'error' && !BENIGN.test(message.text())) errors.push(message.text())
  })
  return errors
}

const LOCALES = [
  { path: '/', lang: 'en-CA', dir: 'ltr' },
  { path: '/fr/', lang: 'fr-CA', dir: 'ltr' },
  { path: '/fa/', lang: 'fa', dir: 'rtl' },
  { path: '/zh/', lang: 'zh-Hans', dir: 'ltr' },
  { path: '/zh-hant/', lang: 'zh-Hant', dir: 'ltr' },
]

for (const { path, lang, dir } of LOCALES) {
  test(`${path} loads in ${lang} with no errors`, async ({ page }) => {
    const errors = collectErrors(page)
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    await expect(page.locator('html')).toHaveAttribute('dir', dir)
    await expect(page.locator('h1').first()).toBeVisible()
    await page.waitForLoadState('networkidle')
    expect(errors).toEqual([])
  })
}

test.describe('contact form', () => {
  test.skip(({ isMobile }) => isMobile, 'Covered once, on desktop')

  async function fillForm(page: Page) {
    await page.goto('/#contact')
    await page.getByLabel('Name', { exact: true }).fill('Test Person')
    await page.getByLabel('Email', { exact: true }).fill('test@example.com')
    await page.getByLabel('Tell me about your business').fill('Browser test. Never sent anywhere.')
  }

  test('sends the request to the form service and confirms it', async ({ page }) => {
    let payload: Record<string, string> | null = null
    await page.route('**/formspree.io/**', async (route) => {
      payload = route.request().postDataJSON()
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
    })

    await fillForm(page)
    await page.locator('#contact form').getByRole('button', { name: 'Request a quote' }).click()

    await expect(page.locator('#contact').getByRole('status').filter({ hasText: 'Your request was sent' })).toContainText('Thanks, Test.')
    expect(payload).toMatchObject({
      name: 'Test Person',
      email: 'test@example.com',
      message: 'Browser test. Never sent anywhere.',
      _replyto: 'test@example.com',
      _gotcha: '',
    })
  })

  test('shows an error when the form service fails', async ({ page }) => {
    await page.route('**/formspree.io/**', (route) => route.fulfill({ status: 500, body: '{}' }))

    await fillForm(page)
    await page.locator('#contact form').getByRole('button', { name: 'Request a quote' }).click()

    await expect(page.getByRole('alert')).toContainText('couldn’t be sent')
  })
})

test('project carousel moves to the next project', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Arrow buttons are a desktop control; phones swipe')
  await page.goto('/')
  const gallery = page.locator('#work .gallery').first()
  const track = gallery.locator('.gallery-track')
  await gallery.scrollIntoViewIfNeeded()

  const before = await track.evaluate((el) => el.scrollLeft)
  await gallery.getByRole('button', { name: 'Next' }).click()
  await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(before + 50)
})

test('phone menu opens, and Escape closes it', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'The menu button only shows on small screens')
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Open menu' })
  await toggle.click()

  const menu = page.getByRole('navigation', { name: 'Mobile' })
  await expect(menu).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')

  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
})
