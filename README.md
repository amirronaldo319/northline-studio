# Northline Studio

One-page marketing site for a web design business serving Vancouver and North Vancouver.
React + TypeScript + Tailwind CSS v4, built with Vite. Static output; no server required.

## Run and build

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # TypeScript
npm run lint       # oxlint
npm test           # unit tests (form validation and delivery)
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
npm run og-image   # re-render public/og-image.png (needs Google Chrome)
```

## Where to change things

| What | Where |
| --- | --- |
| Business name, logo letter, contact email, service area, package features | `src/config/site.ts` |
| Page title and description | `src/config/seo.ts` **and** the matching tags in `index.html` |
| Colours, fonts, shadows | `@theme` block at the top of `src/index.css` |
| Hero, value, process, about, and pricing copy | `src/components/sections/` |
| FAQ questions and answers | `src/content/faq.ts` |
| Navigation links | `src/content/navigation.ts` |
| Concept demo sites | `src/content/examples.ts` and `src/components/demos/` |
| Unconfirmed commercial terms (kept off the page) | `pendingTerms` in `src/config/site.ts` |

**No price is shown on the site.** Every mention is removed on purpose. To publish one later, add it to
`site.pricing` and render it in `src/components/sections/Pricing.tsx`, then update the meta description.

## Inquiry form

Set these in a `.env` file (copy `.env.example`). Both values are public, so never put a private key here.

```bash
VITE_FORM_ENDPOINT=https://formspree.io/f/your-form-id   # any service accepting a JSON POST
VITE_SITE_URL=https://your-domain.ca                     # no trailing slash
```

- **With `VITE_FORM_ENDPOINT` set:** the form posts JSON to it. The success message appears only after a 2xx
  response. On failure, the visitor's entries are kept and an email fallback is shown. A hidden honeypot field
  (`_gotcha`) is sent for spam filtering; Formspree discards those submissions.
- **Without it:** submitting opens the visitor's email app with their details prefilled to the contact email, and
  the page says plainly that nothing has been sent yet. It never claims a message was delivered.

`VITE_SITE_URL` enables the canonical URL, `og:url`, absolute `og:image`, `sitemap.xml`, and the sitemap line in
`robots.txt`. Without it these are omitted rather than guessed.

## Deploy

`npm run build` produces a static site in `dist/`. Any static host works.

- **Cloudflare Pages / Netlify / Vercel:** connect the repo, build command `npm run build`, output `dist`. Add
  `VITE_FORM_ENDPOINT` and `VITE_SITE_URL` as environment variables in the host's settings.
- **Anywhere else:** run the build locally with `.env` filled in and upload the contents of `dist/`.

## Before public launch

1. Create a form endpoint (for example a Formspree form) and set `VITE_FORM_ENDPOINT`.
2. Decide the final domain and set `VITE_SITE_URL`.
3. Replace the sample phone numbers inside the concept demos if you'd rather show none. They are fictional
   (`555` numbers) and labelled as concept demos.
4. Confirm commercial terms (turnaround, revisions, hosting, domain, payment, tax) before adding them to the copy.
5. Optional: add a real portrait of yourself to the About section, and social links in `site.social`.
