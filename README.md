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

Hero → Work → Your website package → Process → About → FAQ → Request a quote → Footer.

| Section | File |
| --- | --- |
| Hero (headline, CTAs, featured preview) | `src/components/sections/Hero.tsx` |
| Work (live sites, concept project, concept demo) | `src/components/sections/Work.tsx`; real projects in `src/content/projects.ts`, concept demos in `src/content/examples.ts` |
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

**Old links keep working.** `#pricing` and `#included` land on the package section, and `#examples` lands on the work
section. See `LegacyAnchors` and `tests/anchors.test.ts`.

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
- **Setting the endpoint on GitHub Pages:** add a repository variable named `VITE_FORM_ENDPOINT` (Settings → Secrets
  and variables → Actions → Variables). The deploy workflow passes it to the build, so no code change is needed.
- **With `VITE_FORM_ENDPOINT` set:** the form posts JSON to it and shows success only after a 2xx response. On
  failure, the visitor's entries are kept and an email fallback is shown. A hidden honeypot field (`_gotcha`) is
  sent for spam filtering; Formspree discards those submissions.
- **Without it:** submitting opens the visitor's email app with their details prefilled, and the page says plainly
  that nothing has been sent yet. It never claims a message was delivered. A "Copy my details" fallback is offered.
- **Privacy:** the "How your details are used" note beside the form changes with the delivery mode, so it stays true.

`VITE_SITE_URL` enables the canonical URL, `og:url`, the absolute `og:image`, `sitemap.xml`, and the sitemap line in
`robots.txt`. Without it these are omitted rather than guessed.

## Portfolio and imagery

Three kinds of work appear, each labelled for what it is:

- **Live websites** (Farsh Aquatics, 604 Kars): real public sites. Screenshots are captures, not mock-ups.
- **Concept project** (Ganjineh Ofogh): a self-initiated design, shown with its live preview.
- **Concept demo** (Tidewell Cleaning): a design for a fictional business, opened in an accessible preview dialog
  (Escape, focus containment, focus restoration, desktop/phone toggle) with a separate button to the real inquiry form.

**Add or refresh a real project**

1. Add it to `src/content/projects.ts`. Only state what you can trace to the project itself: no outcomes, no metrics,
   no client claims.
2. Add a target to `scripts/capture-project-screenshots.mjs` and run
   `node scripts/capture-project-screenshots.mjs <id>`. It writes optimised WebP desktop and phone captures to
   `src/assets/projects/`. Needs Google Chrome.
3. Record the source and capture date in `src/assets/projects/SOURCES.md`.

Only feature public work you built, and confirm the owner of any business shown is happy to be featured.

**Photography slots.** The concept demo uses original SVG artwork. A licensed photo can replace it with no code
changes: add `cleaning-hero.jpg` (or `.webp` / `.avif`) to `src/assets/photos/`. Update the `alt` text in
`src/content/photos.ts` and record the source in `src/assets/photos/CREDITS.md`. Only add images you have the right to
use commercially. No stock photography is bundled.

## Quality

- **CI:** `.github/workflows/ci.yml` runs typecheck, lint, tests, and build on every push and pull request.
- **Copy rules:** `tests/content-rules.test.ts` fails the build if a price, testimonial, guarantee, ranking claim, or
  generic agency phrase appears in the source.
- **Security headers:** `public/_headers` sets a strict Content-Security-Policy and related headers on Cloudflare
  Pages and Netlify. Other hosts ignore this file; set equivalent headers in their settings.
- **Motion:** CSS only, no libraries. All timings, distances, and curves are tokens at the top of `src/index.css`
  (`--motion-*`); change one there to retune the whole site. Everything sits inside
  `prefers-reduced-motion: no-preference` (enforced by `tests/motion.test.ts`), hover effects only run on devices
  that can hover, and everything is neutralised when printing.
  - Hero: headline, copy, buttons, then the project picture enter in sequence (`.enter`, `enterStep`), about 0.7 s.
  - Sections: groups fade up once as they enter view (`.reveal`); if the observer never reports, `useReveal` shows
    everything, and hash links reveal their destination immediately (`useHashScroll`).
  - Projects: cards lift 3 px, the picture zooms to 1.03 within its crop, and the action arrow moves with it. The
    featured project is unveiled by a mask (`.mask-reveal`).
  - Mobile menu and optional form fields share one disclosure pattern (`.disclosure`): always mounted, `inert`
    when closed, so they animate smoothly, keep entered values, and stay out of the tab order.
  - Dialog: a short entrance and exit; closing is timer-driven so a stalled animation can never leave an overlay.
  - Form: errors and status messages fade in, with text carrying the meaning.
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
