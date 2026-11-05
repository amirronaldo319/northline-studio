# SitePilot

One-page marketing site for SitePilot, an independent web design business serving businesses across Canada. React + TypeScript + Tailwind CSS v4, built with Vite. Static output; no server required.

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

Home: Hero → Selected work (one featured live site, then two swipeable galleries of cards: the other websites and
the design demos, then my own apps and tools; a link to every project) → Pricing → Process (three steps) → About → FAQ
→ Contact → Footer. Every project is on the work page (`/work/`, in each
language): websites, apps and tools, and the design demos.

| Section | File |
| --- | --- |
| Hero (headline, price line, a blue button and an outline one, a real website shown large) | `src/components/sections/Hero.tsx` |
| Selected work | `src/components/sections/Work.tsx`; projects in `src/content/projects.ts` (`HERO_PROJECT`, `FEATURED_PROJECT`, `GALLERY_WEBSITES`, `APP_PROJECTS`) |
| Swipeable galleries | `src/components/ui/Gallery.tsx` (native snap scrolling, grey paddles, position dots on a frosted pill), mouse dragging in `src/hooks/useDragScroll.ts`, edge and resting rules in `src/lib/gallery.ts`; the cards are shared with the work page (`src/components/work/ProjectCards.tsx`) |
| All projects | `src/components/pages/WorkPage.tsx`; design demos in `src/content/examples.ts` |
| Pricing (comparison, visible essentials, optional care, full terms in a disclosure) | `src/components/sections/Package.tsx`, copy in `src/content/offers.ts` |
| Process, About, FAQ | `Process.tsx`, `About.tsx`, `Faq.tsx`; FAQ text in `src/content/faq.ts` |
| Contact and inquiry form | `src/components/sections/Contact.tsx`, `src/components/contact/InquiryForm.tsx`, logic in `src/lib/inquiry.ts` |

## Where to change things

| What | Where |
| --- | --- |
| Business name, contact email, service area | `src/config/site.ts` |
| Logo | Outlines in `src/assets/brand/logoPaths.ts` (inline SVG in `BrandMark.tsx`; the wordmark follows the text colour, so one logo serves light and dark). `logo.svg` is the same artwork as a file, used for the social image. Favicon: `public/favicon.svg` |
| Package contents (grouped) | `site.packageGroups` in `src/config/site.ts` |
| Page title and description | `src/config/seo.ts` **and** the matching tags in `index.html` |
| Colours, fonts, shadows | `@theme` block at the top of `src/index.css` |
| Type, section spacing, links | `.h-section`, `.lede`, `.section-pad`, `.section-intro`, `.text-link`, `.text-link-inline`, `.chevron-link` in `src/index.css` |
| Apple look (buttons, cards, bar material, galleries) | "Apple design system" at the end of `src/index.css`; tiles (`.tile`, `.tile-paper`) in its component layer; Glisse's `--lg-*` block under "Liquid Glass (Glisse)" |
| Buttons | `buttonClasses()` in `src/components/ui/button.ts` (primary blue or secondary outline; sm, md or lg) |
| Navigation and the primary button label | `src/content/navigation.ts` |
| Unconfirmed commercial terms (kept off the page) | `pendingTerms` in `src/config/site.ts` |

**Old links keep working.** `#pricing` and `#included` land on the package section, and `#examples` lands on the work
section. See `LegacyAnchors` and `tests/anchors.test.ts`.

**No price is shown on the site.** To publish one, add it to `site.package`, render it in `Package.tsx`, update the
meta description, and adjust the price rule in `tests/content-rules.test.ts`.

## Motion

Motion is CSS only and kept small: content rises 12px and fades in over about half a second as it scrolls into view,
the hero arrives in three short steps, menus and disclosures take about 0.2s, and cross-page transitions are a quick
fade. Buttons only change colour under the pointer, as Apple's do; project cards grow a hair (1%) and their shadow
deepens, as in the Apple Store. Nothing hijacks scrolling, nothing follows the pointer, nothing moves on its own, and
everything is shown at once, still, under reduced motion (`tests/motion.test.ts`).

**Galleries.** The portfolio's sideways galleries are native scrollers that snap to each card, so a finger, a trackpad
and the arrow keys move them as the device always does, and vertical scrolling passes through to the page. A mouse
can drag them: a press becomes a drag after 6px, the row follows the pointer with snapping paused, and on release it
glides on a little in the direction of the throw and settles on the nearest card; the click at the end of a drag is
swallowed, so letting go over a screenshot or a link never opens it. The paddles step one card at a time and fade back
at the ends; nothing moves on its own. Lenis, GSAP and the Inter web font were removed in the 2026-11 redesign; the system font is used.

## Design language

Apple's own website is the reference, with SitePilot's own logo and copy:

- **Type:** the device's system font (`-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`), so
  Apple devices get SF Pro. Hero 44px on phones to 80px wide; section headings 32–56px; intro text 19–24px; body
  17px. Apple's tracking for SF Pro: -0.015em at hero size, -0.005em for section headings, -0.022em for body text
  (reset to 0 for Persian and Chinese).
- **Palette:** white and #f5f5f7 sections in turn; #1d1d1f text, #424245 and #6e6e73 for secondary text; #0071e3 for
  buttons and icons, #0066cc for links and blue labels (5.6:1 on white, 5.1:1 on grey).
- **Composition:** one idea per section; centred intros; the work shown large with no browser chrome. Tiles hold one
  idea each, a step lighter or darker than their section, with no border or shadow (`.tile`, `.tile-paper`, 28px
  corners). Project cards are the Apple Store's: white, 18px corners, a soft shadow (`.card`).
- **Buttons:** Apple's pills (`.button`): flat #0071e3 with a white label for the main action, a blue outline for
  the one beside it, and a small blue "Buy"-style button in the top bar. No gloss, sheen or movement.
- **Navigation:** Apple's product bar: 52px of frosted material across the top (`.liquid-glass-navigation`), the name
  on the left, small links, the language menu and the quote button on the right; a hairline appears once the page
  moves. On phones the links drop down in a sheet from a chevron; the quote button stays in the bar.
- **Pricing:** Starter and Standard side by side at every width, one row per topic, flat on the page as Apple
  compares models, with their buttons aligned. The essential costs are always visible, optional care is a separate
  offer, and the full terms are in a disclosure.

## Frosted material

Frosted material (Liquid Glass) is used only where Apple uses it: the top bar and its phone menu (`saturate(180%)
blur(20px)` over near-white), the gallery's position pill, and the small labels over screenshots. It turns solid for
visitors who ask for reduced transparency, plain white with a drawn edge for those who ask for more contrast, and
outlined in forced colours; `tests/glass.test.ts` checks these rules and the Apple tokens.

### Glisse

Only Glisse's documented exports are used (`tests/glass.test.ts` checks this).

| Where | Glisse component |
| --- | --- |
| The language menu in the bar | `Menu` (`LanguageMenu.tsx`) |
| Pricing strip on phones | `Glass` (frosted: `.glass-frost`) |
| Captions and labels over screenshots (hero caption, `ShotChip.tsx`) | `Glass` (refracting the picture beneath) |
| Concept-demo dialog and project viewer | `SegmentedControl`, `Slider`, `Button` |

All `--lg-*` variables are set once for the light page (`:root, [data-theme='light']`) and per surface where needed.
`<body data-theme="light">` pins the theme. Glisse's stylesheet is unlayered, so it beats Tailwind utilities on its own
elements: put breakpoint and display classes on a wrapper (a test checks this). A `view-transition-name`, `opacity`
below 1, `filter`, `mask` or `backdrop-filter` on an ancestor of glass makes that ancestor the backdrop the glass
sees.

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

Four kinds of work appear, each labelled for what it is:

- **Live websites** (Farsh Aquatics, 604 Kars): real public sites. Screenshots are captures, not mock-ups.
- **Concept projects** (Storage4666, Maid New, Ganjineh Ofogh): unpaid designs for a business, shown with their live
  previews. Storage4666 and Maid New are unofficial redesign concepts, shown with the businesses' permission.
- **Personal projects**: my own products and tools. The Mend landing page sits with the websites; OctaIQ, Shamsi
  Calendar, the Mend app, Jarvis, STAYIN, and Motion Kit get their own "Apps and tools" gallery (`kind: 'app'`).
  STAYIN and Motion Kit have private repositories, so they have no `liveUrl` and say so on the page.
- **Concept demo** (Tidewell Cleaning, shown in the hero): a design for a fictional business, opened in an accessible preview dialog
  (Escape, focus containment, focus restoration, desktop/phone toggle) with a separate button to the real inquiry form.

**Add or refresh a real project**

1. Add it to `src/content/projectsData.ts` (with `status` and `kind`), its screenshots to `src/content/projects.ts`,
   and its copy to every language in `src/i18n/` (Traditional Chinese: edit `zhHans.ts`, then
   `node scripts/generate-traditional-chinese.mjs`). Only state what you can trace to the project itself: no outcomes,
   no metrics, no client claims.
2. Add a target to `scripts/capture-project-screenshots.mjs` and run
   `node scripts/capture-project-screenshots.mjs <id>`. It writes optimised WebP desktop and phone captures to
   `src/assets/projects/`. Needs Google Chrome or Chromium (`CHROME_PATH`). For a private project, pass a local
   copy: `node scripts/capture-project-screenshots.mjs stayin=file:///path/to/index.html`.
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
- **Site check:** a band above the contact form (`SiteCheck`) prepares the inquiry for a website review: it sets
  "An update to my current website", adds a starter message without overwriting anything typed, and focuses the
  website field. `#site-check` in the URL does the same, so the link can be shared.
- **Pages:** the build produces one HTML file per page (`scripts/prerender.mjs`), all sharing one bundle.
  `src/content/pages.ts` lists them and maps a URL to a page. Content lives in plain data files:
  `trades.ts` (landing pages for each kind of business), `guides.ts` (articles), `projectsData.ts` (case studies,
  with the screenshots wired in `projects.ts`). To add a trade or guide, add an entry; the page, its title and
  description, its FAQ data, and its sitemap line follow. Keep copy free of results, rankings, and prices (the
  copy-rules test checks this).
- **Languages (every page, in every language):** each language is a full twin of the English site: the home page, the
  five trade pages, the three case studies, and the two guides, at the same paths under `fa/`, `zh/`, and
  `zh-hant/`. Words live in per-language dictionaries (`src/i18n/en.ts`, `fa.ts`, `zhHans.ts`, `zhHant.ts`, all typed
  against `src/i18n/types.ts`, so a missing key is a build error). Components read text with `useCopy()`; nothing
  on a page is hard-coded English. `zhHant.ts` is generated from `zhHans.ts`
  (`node scripts/generate-traditional-chinese.mjs`, needs `npm i --no-save opencc-js`).
  The switch works like the Ganjineh Ofogh site's: a button per language goes to the **same page** in that language,
  keeps the section in the address (`#faq`), and remembers the choice (`sitepilot-lang`); a visitor who chose another
  language and lands on the English page is sent to it (a link opened directly in another language is never
  overridden). Languages are right-to-left aware (Persian) and use system fonts that cover their script.
  **A language is built only when its switch in `site.features.languages` (`src/config/site.ts`) is `true`.**
  All three are on. The wording of Persian and Chinese is a draft that has not been reviewed by a native speaker; set
  a language's switch to `false` to remove it entirely (its pages are not built, linked, or listed in the sitemap,
  and its button disappears). `hreflang` links tie each page to its twins (needs `VITE_SITE_URL`).
  Each page loads only its own language's dictionary (`src/i18n/load.ts`); the build and tests use `getCopy`
  (`src/i18n/index.ts`), which bundles all of them, so the browser code must never import that file.
- **Analytics (optional):** set `VITE_CF_ANALYTICS_TOKEN` (a Cloudflare Web Analytics token) and the build adds the
  beacon and allows its two origins in the security policy. Empty means no analytics and no extra requests.
- **Security policy:** `vite-security-plugin.ts` builds one Content-Security-Policy and writes it two ways: a meta
  tag in `index.html` (GitHub Pages cannot send headers) and a generated `dist/_headers` for Netlify and Cloudflare.
  Only the page's own files load; the one inline script is allowed by hash, and `VITE_FORM_ENDPOINT`'s origin is added
  to `connect-src` automatically. Anything new that loads from another origin must be added there.
- **Prerendering:** `npm run build` renders the page to static HTML (`scripts/prerender.mjs`, `src/entry-server.tsx`)
  and the browser hydrates it. Crawlers, link unfurlers, and visitors without JavaScript get the real content, and
  the headline paints before any script runs. `src/entry-server.test.tsx` guards the output. Anything that reads
  `window` during render must go through `useSyncExternalStore` (see `useMediaQuery`) so the server and the
  browser agree on the first render.
- **Search and sharing:** the build adds FAQPage structured data from `src/content/faq.ts`, preloads the Latin
  Inter font (Apple devices use their own system font and never need it), and ships a branded `404.html`. Canonical, `og:url`, absolute social image, sitemap and `robots.txt`
  Sitemap line still switch on with `VITE_SITE_URL` (see the deploy section).
- **Motion:** CSS only, no libraries. All timings, distances, and curves are tokens at the top of `src/index.css`
  (`--motion-*`); change one there to retune the whole site. Everything sits inside
  `prefers-reduced-motion: no-preference` (enforced by `tests/motion.test.ts`), hover effects only run on devices
  that can hover, and everything is neutralised when printing.
  - Hero: headline, copy, buttons, then the project picture enter in sequence (`.enter`, `enterStep`), about 0.7 s.
  - Logo: the mark rises and the wordmark slides in once on load (header only, `.brand-logo[data-intro]`).
  - Hero atmosphere: one soft, still light behind the headline (`.hero-light`). Where `animation-timeline` is
    supported, the preview starts at 94% and grows to full size as the page scrolls, the way Apple brings a
    product forward. Pointer-following tilt and spotlight effects are removed and guarded by a test.
  - Buttons: flat pills (`src/components/ui/button.ts`), no shadows or light sweeps.
  - Words: the hero headline arrives word by word and draws an underline under "Vancouver’s"; section headings
    do the same as they scroll in (`Words`, `.word`). Header links arrive in turn on load.
  - Process numbers fill in and package icons pop as their group is revealed; the featured project's phone drifts
    against the desktop picture while scrolling; the "request sent" check draws itself.
  - Phones: the "Request a quote" button stays in the top bar, as Apple keeps its Buy button.
  - Sections: groups fade up once as they enter view (`.reveal`); if the observer never reports, `useReveal` shows
    everything, and hash links reveal their destination immediately (`useHashScroll`).
  - Projects: cards grow by 1% and their shadow deepens under the pointer, as in the Apple Store. The featured
    project is unveiled by a mask (`.mask-reveal`).
  - Project viewer: every real project screenshot is a button that opens a larger preview
    (`ProjectViewerProvider`). The picture grows from its thumbnail in about 300 ms (a shared-element transition
    using the Web Animations API, so it does not depend on view-transition support) and returns to wherever it
    came from. It falls back to a 240 ms fade and scale when the thumbnail is cropped differently (phones) or
    off screen, and to an instant change for reduced motion. Closing is timer-driven, so an interrupted animation
    can never leave an overlay. Escape, focus containment, focus return, and scroll lock come from the native
    `<dialog>`. "Visit live site" is a separate action, and the project label is always shown.
  - Featured project: the real desktop capture is the anchor and the real phone capture arrives beside it once
    (450 ms, 24 px, only when it enters view). Its column is reserved up front, the text never moves, and small
    screens show the single phone capture instead of two tiny ones.
  - Navigation: the link for the section being read turns grey, as Apple marks the page you are on.
  - Optional form fields use one disclosure pattern (`.disclosure`). The phone menu drops from the bar; focus moves
    into it, and it closes on Escape, a link, or a tap outside it, returning focus to the chevron.
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
