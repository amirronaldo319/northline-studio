# Northline Studio

One-page marketing site for Northline Studio, an independent web design business serving Vancouver and North
Vancouver. React + TypeScript + Tailwind CSS v4, built with Vite. Static output; no server required.

## Run and build

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # TypeScript
npm run lint       # oxlint
npm test           # form logic and public-copy rules (no price, no unverifiable claims)
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
npm run og-image   # re-render public/og-image.png (needs Google Chrome)
```

## Page structure

Hero → Examples → Your website package → Process → About → FAQ → Request a quote → Footer.

| Section | File |
| --- | --- |
| Hero (headline, CTAs, featured preview) | `src/components/sections/Hero.tsx` |
| Examples (one featured, two secondary) | `src/components/sections/Examples.tsx`, data in `src/content/examples.ts` |
| Package (deliverables and written-quote note) | `src/components/sections/Package.tsx`, items in `src/config/site.ts` |
| Process, About, FAQ | `Process.tsx`, `About.tsx`, `Faq.tsx`; FAQ text in `src/content/faq.ts` |
| Inquiry form | `src/components/sections/Contact.tsx`, `src/components/contact/InquiryForm.tsx`, logic in `src/lib/inquiry.ts` |

## Where to change things

| What | Where |
| --- | --- |
| Business name, logo letter, contact email, service area | `src/config/site.ts` |
| Package contents (grouped) | `site.packageGroups` in `src/config/site.ts` |
| Page title and description | `src/config/seo.ts` **and** the matching tags in `index.html` |
| Colours, fonts, shadows | `@theme` block at the top of `src/index.css` |
| Navigation and the primary button label | `src/content/navigation.ts` |
| Unconfirmed commercial terms (kept off the page) | `pendingTerms` in `src/config/site.ts` |

**No price is shown on the site.** To publish one, add it to `site.package`, render it in `Package.tsx`, update the
meta description, and adjust the price rule in `tests/content-rules.test.ts`.

## Inquiry form

Copy `.env.example` to `.env` and set (both values are public, so never put a private key here):

```bash
VITE_FORM_ENDPOINT=https://formspree.io/f/your-form-id   # any service accepting a JSON POST
VITE_SITE_URL=https://your-domain.ca                     # no trailing slash
```

- **Required:** name, email, and a message. Business name, business type, phone, existing website, and the kind of
  help needed sit behind an "Add more details" disclosure and are optional end to end (validation, payload, email
  text, and messages).
- **With `VITE_FORM_ENDPOINT` set:** the form posts JSON to it and shows success only after a 2xx response. On
  failure, the visitor's entries are kept and an email fallback is shown. A hidden honeypot field (`_gotcha`) is
  sent for spam filtering; Formspree discards those submissions.
- **Without it:** submitting opens the visitor's email app with their details prefilled, and the page says plainly
  that nothing has been sent yet. It never claims a message was delivered. A "Copy my details" fallback is offered.
- **Privacy:** the "How your details are used" note beside the form changes with the delivery mode, so it stays true.

`VITE_SITE_URL` enables the canonical URL, `og:url`, the absolute `og:image`, `sitemap.xml`, and the sitemap line in
`robots.txt`. Without it these are omitted rather than guessed.

## Example previews and imagery

The three examples are concept designs for fictional businesses and are labelled as such everywhere they appear. Each
opens in an accessible dialog (Escape, focus containment, focus restoration, desktop/phone toggle). A separate,
clearly labelled button in the dialog takes the visitor to the real inquiry form.

The imagery in the demos is original SVG artwork in `src/components/demos/art.tsx`. **No stock photography is
bundled**, because licensing and attribution couldn't be verified for specific files. To use real photos:

1. Choose photos you have the right to use. Unsplash and Pexels licences allow commercial use; keep a note of the
   photographer and URL.
2. Export at 2× the largest displayed size (about 1600px wide for hero images) as AVIF or WebP, with a JPEG
   fallback if needed, and place them in `src/assets/`.
3. Replace the artwork component in the demo with an `<img>` that has explicit `width`/`height`, meaningful `alt`
   text, and `loading="lazy"` below the fold. Credit the source in this README.

## Quality

- **CI:** `.github/workflows/ci.yml` runs typecheck, lint, tests, and build on every push and pull request.
- **Copy rules:** `tests/content-rules.test.ts` fails the build if a price, testimonial, guarantee, ranking claim, or
  generic agency phrase appears in the source.
- **Security headers:** `public/_headers` sets a strict Content-Security-Policy and related headers on Cloudflare
  Pages and Netlify. Other hosts ignore this file; set equivalent headers in their settings.
- **Performance:** the three demo sites are code-split and mounted only as they approach the viewport.

## Deploy

`npm run build` produces a static site in `dist/`. Any static host works.

- **Cloudflare Pages / Netlify / Vercel:** build command `npm run build`, output `dist`. Add `VITE_FORM_ENDPOINT` and
  `VITE_SITE_URL` as environment variables in the host's settings.
- **GitHub Pages:** `.github/workflows/deploy.yml` builds with `VITE_BASE=/<repo>/` and publishes on every push to
  `main`. `VITE_BASE` is only needed when the site is served from a sub-path.

## Still needed from the owner

1. A form endpoint (`VITE_FORM_ENDPOINT`) so inquiries are delivered directly.
2. The final domain (`VITE_SITE_URL`).
3. Confirmed commercial terms (price, turnaround, revisions, hosting, domain, payment, tax) before any are added to
   the copy. See `pendingTerms`.
4. Optional: a real portrait for the About section, licensed photography for the examples, a branded email
   address, and social links in `site.social`.
