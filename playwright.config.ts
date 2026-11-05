import { defineConfig, devices } from '@playwright/test'

/**
 * Browser tests against the built, prerendered site (`dist`), served by `vite preview`.
 * Build first with a form endpoint so the form posts instead of opening an email app:
 *   VITE_FORM_ENDPOINT=https://formspree.io/f/e2e-test npm run build && npm run test:e2e
 * The form service is always mocked in these tests; nothing is ever sent.
 * Uses the installed Google Chrome (preinstalled on GitHub's Ubuntu runners), so no browser download is needed.
 */
export default defineConfig({
  testDir: 'e2e',
  testMatch: '*.e2e.ts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://localhost:4173', trace: 'retain-on-failure' },
  webServer: {
    command: 'npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    { name: 'phone', use: { ...devices['Pixel 7'], channel: 'chrome' } },
  ],
})
