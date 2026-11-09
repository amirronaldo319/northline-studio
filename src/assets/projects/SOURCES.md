# Portfolio screenshot sources

Screenshots in this folder are captures of public websites, taken with `scripts/capture-project-screenshots.mjs`.
STAYIN and Motion Kit have private repositories, so they were captured from a local copy (`id=<url>`, see the script).
Re-run `node scripts/capture-project-screenshots.mjs` after a project changes, and update the date below.

| Files | Project | Source | Captured | Viewports |
| --- | --- | --- | --- | --- |
| `604kars-desktop.webp`, `604kars-mobile.webp` | 604 Kars | https://604kars.com/ (repo: amirronaldo319/604kars, public) | 2026-10-14 | 1200×778 @1x, 390×760 @2x |
| `farsh-aquatics-desktop.webp`, `farsh-aquatics-mobile.webp` | Farsh Aquatics | https://farshaquatics.ca/ (public website; logo and card source files are in local project folders, not in a repository) | 2026-10-14 | 1200×778 @1x, 390×760 @2x |
| `ganjineh-ofogh-desktop.webp`, `ganjineh-ofogh-desktop-2x.webp`, `ganjineh-ofogh-mobile.webp` | Ganjineh Ofogh (concept project) | https://amirronaldo319.github.io/ganjineh-ofogh/en/ (repo: amirronaldo319/ganjineh-ofogh, public) | 2026-11-04 | 1200×778 @1x and @2x, 390×760 @2x |
| `mend-desktop.webp`, `mend-mobile.webp` | Mend (concept project) | https://amirronaldo319.github.io/mend-website/ (repo: amirronaldo319/mend-website, public) | 2026-10-15 | 1200×778 @1x, 390×760 @2x |
| `storage4666-desktop.webp`, `storage4666-mobile.webp` | Storage4666 (redesign concept) | https://amirronaldo319.github.io/storage4666-concept/ (repo: amirronaldo319/storage4666-concept, public) | 2026-11-04 | 1200×778 @1x, 390×760 @2x |
| `maid-new-desktop.webp`, `maid-new-mobile.webp` | Maid New (redesign concept) | https://amirronaldo319.github.io/maid-new-redesign-demo/ (repo: amirronaldo319/maid-new-redesign-demo, public) | 2026-11-04 | 1200×778 @1x, 390×760 @2x |
| `octaiq-desktop.webp`, `octaiq-mobile.webp` | OctaIQ (personal project) | https://amirronaldo319.github.io/octaiq/ (repo: amirronaldo319/octaiq, public) | 2026-11-04 | 1200×778 @1x, 390×760 @2x |
| `shamsi-calendar-desktop.webp`, `shamsi-calendar-mobile.webp` | Shamsi Calendar (personal project) | https://amirronaldo319.github.io/shamsi-calendar/ (repo: amirronaldo319/shamsi-calendar, public) | 2026-11-04 | 1200×778 @1x, 390×760 @2x |
| `mend-app-desktop.webp`, `mend-app-mobile.webp` | Mend app prototype (personal project) | https://amirronaldo319.github.io/mend-prototype/ (repo: amirronaldo319/mend-prototype, public) | 2026-11-04 | 1200×778 @1x, 390×760 @2x |
| `jarvis-desktop.webp`, `jarvis-mobile.webp` | Jarvis (personal project) | https://amirronaldo319.github.io/jarvis-agent/ (repo: amirronaldo319/jarvis-agent, public) | 2026-11-04 | 1200×778 @1x, 390×760 @2x |
| `stayin-desktop.webp`, `stayin-mobile.webp` | STAYIN (personal project) | Local copy of `STAYIN-iOS/web/index.html`, the browser preview in the private repo amirronaldo319/STAYIN (no public page) | 2026-11-04 | 1200×778 @1x, 390×760 @2x |
| `motion-kit-desktop.webp`, `motion-kit-mobile.webp` | Motion Kit (personal project) | Local production build (`npm run build && npm run preview`) of the private repo amirronaldo319/motion-kit (no public page) | 2026-11-04 | 1200×778 @1x, 390×760 @2x |

Notes
- Captured above the fold in a fully loaded state, with no consent banners, errors, or developer overlays.
- No account, customer, or private information appears in any capture.
- 604 Kars shows an illustrative earnings estimator. Its figures come from assumptions the site states beneath it
  and must not be presented as results.
- Mend is not a released product. Its page says it is in development and that its preview screens are illustrative
  mock-ups; the portfolio says the same and must not present it as a live service.
- Storage4666 and Maid New are unofficial redesign concepts for real businesses, not their live websites. Both
  captures show the concept's own "unofficial" banner, and the portfolio labels them as concepts. Maid New's concept
  note is marked as seen before capture so it does not cover the page; the Mend app's one-time offline notice is
  dismissed for the same reason.
- Maid New's capture shows one Google review quote that the concept reuses from maidnew.ca, with the reviewer's name
  as published there.
- OctaIQ shows forecasts for upcoming events as they were on the capture date. The portfolio makes no accuracy
  claims; the project's own README reports that the betting market was more accurate than the model.
- STAYIN is a research prototype: not clinically reviewed, not tested with real users, not released. The capture is
  its Home screen with progress hidden and no personal reason entered; the Support screen, which lists phone numbers
  that have not been verified, is not shown.
- Jarvis's capture is the public interface build; its chat needs the owner's own API key and is not connected there.
- Farsh Aquatics shows the business phone number and email button exactly as they appear on the public site. The
  owner's portrait and the business-card images are not used.

## Confirmations from the site owner (2026-10-14)

- Farsh Aquatics is cleared to be featured, including the public contact details visible in the capture.
- The owner designed and built both Farsh Aquatics and 604 Kars; neither was a collaboration or supplied design.
- The owner holds the rights to the Ganjineh Ofogh renders shown in its capture.

## Confirmations from the site owner (2026-11-04)

- The owner asked the businesses behind the Storage4666 and Maid New concepts, and both said the concepts may be
  shown in the portfolio. They remain unofficial concepts and are labelled that way.
- OctaIQ, Shamsi Calendar, the Mend app prototype, Jarvis, STAYIN, and Motion Kit are the owner's own projects.

Re-confirm with any third party before adding another project that is not entirely your own work.

The `fan/` folder holds 360x450 crops of the phone captures above (top of the page), made by `scripts/generate-fan-thumbnails.py` for the homepage fan.
