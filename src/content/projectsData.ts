/**
 * Real projects shown in the portfolio, as plain text data. Every statement here must be traceable to the
 * project itself (its live site, README, or commit history). Never add outcomes, metrics, or client claims.
 * Images live in projects.ts, so this file can be read by the build without loading any pictures.
 */
export type ProjectStatus = 'live' | 'concept' | 'personal'

/** Where a project sits in the portfolio: websites for a business, or apps and tools. */
export type ProjectKind = 'website' | 'app'

export interface ProjectData {
  id: string
  name: string
  /**
   * "live" is a launched public website for a business. "concept" is an unpaid design for a business (a redesign
   * concept, or a site for a project that is not a paying client). "personal" is my own product or tool.
   */
  status: ProjectStatus
  kind: ProjectKind
  /** Short type line, shown beside the status label. */
  type: string
  /** One-line description used under the hero image. Starts after the project name. */
  caption: string
  /** What it is and who it is for. */
  summary: string
  /** What I did. Keep to verified scope. */
  contribution: string
  /** One or two meaningful design or build decisions. */
  decisions: readonly [string, ...string[]]
  /** Something a reader should know when looking at the capture, for example that figures are illustrative. */
  note?: string
  /** The public page. Left out only when the repository is private and nothing is published (say so in `note`). */
  liveUrl?: string
  /** One description covering both captures, since they share an <img>. */
  alt: string
}

export const PROJECT_DATA: readonly ProjectData[] = [
  {
    id: 'farsh-aquatics',
    name: 'Farsh Aquatics',
    status: 'live',
    kind: 'website',
    type: 'Private swim lessons, Vancouver and the North Shore',
    caption: 'a Vancouver swim-lesson business site I designed and built',
    summary:
      'A one-page website for a private swim-lesson and lifeguarding service, designed so families can see the two services and call, text, or email straight away.',
    contribution: 'Brand identity and one-page website: the logo, the business cards, and the site itself.',
    decisions: [
      'Call, text, and email buttons sit in the header and the first screen, so a parent can reach out from anywhere on the page.',
      'The two services, coaching and lifeguarding, each get their own section, so visitors can quickly find the one they need.',
    ],
    liveUrl: 'https://farshaquatics.ca/',
    alt: 'The Farsh Aquatics home page: a bright blue page with the logo, the business name, a short introduction, and call and email buttons.',
  },
  {
    id: '604kars',
    name: '604 Kars',
    status: 'live',
    kind: 'website',
    type: 'Turo co-hosting, Metro Vancouver',
    caption: 'a Metro Vancouver car-hosting website I designed and built',
    summary:
      'A landing page for a Metro Vancouver car-hosting service, built to explain what is handled for the owner and let them ask for an estimate.',
    contribution: 'Website design and development, including the estimate form and the mobile navigation.',
    decisions: [
      'An interactive estimator lets owners explore a monthly figure, with its assumptions written directly beneath it.',
      'The service is broken into six plain-language jobs, so an owner can see exactly what is handled.',
    ],
    note: 'The earnings estimator shows illustrative figures. The site states its assumptions directly beneath it, and the figures are not results.',
    liveUrl: 'https://604kars.com/',
    alt: 'The 604 Kars home page: a serif headline about a car earning nothing in the driveway, with buttons to get an estimate and an interactive earnings estimator.',
  },
  {
    id: 'storage4666',
    name: 'Storage4666',
    status: 'concept',
    kind: 'website',
    type: 'Redesign concept for a tire-storage service, Montréal area',
    caption: 'a bilingual redesign concept for a seasonal tire-storage service',
    summary:
      'An unofficial bilingual redesign concept for Storage4666, a seasonal tire-storage service in Montréal, Laval, and Terrebonne, with plans and a guide to choosing one.',
    contribution:
      'Design and development of the concept, including the plan guide, the four-step request, and the French and English versions.',
    decisions: [
      'The concept is built around what the business actually does, seasonal tire storage, with a guide that recommends a plan from the published limits.',
      'French is the default, with a matching English version, and the hero is a drawn storage rack labelled as an illustration, not a photo of the warehouse.',
    ],
    note: 'This is an unofficial concept, not Storage4666’s website, shown with the business’s permission. It sends nothing: the request form is a demo.',
    liveUrl: 'https://amirronaldo319.github.io/storage4666-concept/',
    alt: 'The Storage4666 concept home page in French: a large headline about storing your tires for the season, two buttons, and an illustration of tires on a storage rack.',
  },
  {
    id: 'maid-new',
    name: 'Maid New',
    status: 'concept',
    kind: 'website',
    type: 'Redesign concept for a Red Deer cleaning company',
    caption: 'a redesign concept for a Red Deer cleaning company',
    summary:
      'An unofficial redesign concept for Maid New, a Red Deer cleaning company for homes, offices, and Airbnbs, with clear starting prices and a guided quote form.',
    contribution:
      'Design and development of the concept, including the guided quote form, the before-and-after slider, and the light and dark themes.',
    decisions: [
      'One guided quote form opens from anywhere on the page and adapts its questions to the service picked.',
      'Starting prices, travel fees, hours, and cancellation terms come from the current site and are laid out in plain sight.',
    ],
    note: 'This is an unofficial concept, not Maid New’s website, shown with the business’s permission. It sends nothing. Its photos are licensed stock, and the “before” side of each comparison is a simulated effect, as the concept says.',
    liveUrl: 'https://amirronaldo319.github.io/maid-new-redesign-demo/',
    alt: 'The Maid New concept home page: the serif headline “A Cleaner Home. A Little More Peace of Mind.”, a quote button, and a photo of a tidy living room with a review card.',
  },
  {
    id: 'ganjineh-ofogh',
    name: 'Ganjineh Ofogh',
    status: 'concept',
    kind: 'website',
    type: 'Bilingual residential tower site',
    caption: 'a bilingual website for a residential tower',
    summary:
      'A Persian and English website for a residential tower, with interactive 3D models of the building and its four apartments.',
    contribution:
      'Design and development of the whole site, including the bilingual pages and the interactive 3D viewers.',
    decisions: [
      'Persian is the default, with a matching English version of every page and a language switch that keeps your place.',
      'The 3D viewers let a visitor explore the tower and each apartment before asking for information.',
    ],
    liveUrl: 'https://amirronaldo319.github.io/ganjineh-ofogh/en/',
    alt: 'The Ganjineh Ofogh home page: the tower name in English and Persian beside an illustrated render of the building.',
  },
  {
    id: 'mend',
    name: 'Mend',
    status: 'personal',
    kind: 'website',
    type: 'Product landing page, in development',
    caption: 'a landing page for an app idea in development',
    summary:
      'A landing page for Mend, a self-guided tool still in development for parents and caregivers of children roughly 2–12, with illustrative preview screens and a waitlist.',
    contribution: 'Design and development of the landing page, including the preview screens and the waitlist form.',
    decisions: [
      'The page opens on one quiet moment and one action: joining the waitlist.',
      'The preview screens show the idea in three steps (pause, reflect, reconnect) and are labelled as illustrative mock-ups, not a finished app.',
    ],
    note: 'Mend is not released. The preview screens on the page are illustrative mock-ups, as the page itself says.',
    liveUrl: 'https://amirronaldo319.github.io/mend-website/',
    alt: 'The Mend home page: a dark page with the headline “You yelled.” and a line about the quiet that follows, above a waitlist email field.',
  },
  {
    id: 'octaiq',
    name: 'OctaIQ',
    status: 'personal',
    kind: 'app',
    type: 'UFC forecast web app',
    caption: 'a UFC forecast web app with a public track record',
    summary:
      'A web app that forecasts upcoming UFC fights, with a likely range for every pick, and saves each forecast before the event so it can be graded in public afterwards.',
    contribution:
      'Design and development of the whole app: the forecast model and its testing, the event, fighter, and track-record pages, and the phone layout.',
    decisions: [
      'Every pick is saved before the event in a public, versioned archive and graded once results appear, so anyone can check the record.',
      'The app is open about its limits: on past fights, betting prices were more accurate than the model, so it presents forecasts as context, not as a betting edge.',
    ],
    note: 'The public site is a snapshot with no live betting prices. Its forecasts are estimates, not advice to bet.',
    liveUrl: 'https://amirronaldo319.github.io/octaiq/',
    alt: 'The OctaIQ event page: the headline “Bonfim vs. Brady”, the venue and start times, a countdown, and the card’s biggest lean and closest call.',
  },
  {
    id: 'shamsi-calendar',
    name: 'Shamsi Calendar',
    status: 'personal',
    kind: 'app',
    type: 'Persian calendar app for the phone',
    caption: 'an installable Persian calendar that works offline',
    summary:
      'An installable Persian (Solar Hijri) calendar for the phone, in Persian and English, with countdowns to Nowruz and Yalda and no network requests after the first visit.',
    contribution:
      'Design and development of the app, including the Persian and English versions, offline support, and the tests for the calendar rule.',
    decisions: [
      'The calendar rule is checked against an independent astronomical reference for every supported year, so dates do not depend on the browser.',
      'It installs to the Home Screen and works offline, with no account and no tracking.',
    ],
    liveUrl: 'https://amirronaldo319.github.io/shamsi-calendar/',
    alt: 'The Shamsi Calendar Today screen in Persian: today’s date as a large number, the full Persian date with the Gregorian date beneath, and countdowns to Yalda and Nowruz.',
  },
  {
    id: 'mend-app',
    name: 'Mend app',
    status: 'personal',
    kind: 'app',
    type: 'Parenting app prototype, in development',
    caption: 'an app prototype for hard parenting moments',
    summary:
      'A working prototype of the Mend app: practical help for hard parenting moments and ways to reconnect, with no account and nothing leaving the device.',
    contribution:
      'Design and development of the app prototype, including quick help for hard moments, a private check-in, and offline use.',
    decisions: [
      'Home opens on moments a parent might be in right now, such as “I just yelled”, each one tap from help.',
      'A Pause button stays in the corner for the hardest moments, and the app keeps working without a connection.',
    ],
    note: 'Mend is in development and not released. Its wording has not yet been professionally reviewed, as the app itself says.',
    liveUrl: 'https://amirronaldo319.github.io/mend-prototype/',
    alt: 'The Mend app Home screen: a dark page headed “A little space for you.”, three quick-help cards including “I just yelled”, and a private check-in.',
  },
  {
    id: 'jarvis',
    name: 'Jarvis',
    status: 'personal',
    kind: 'app',
    type: 'Personal AI assistant interface',
    caption: 'an interface for a personal AI assistant',
    summary:
      'The interface and first working part of a personal AI assistant: streaming chat with Ask, Plan, and Act modes, local tasks, a dashboard, and an activity log, in three themes.',
    contribution:
      'Design and development of the interface and the chat, including the approval step for actions and the command palette.',
    decisions: [
      'In Act mode the assistant can only propose an action; nothing runs until you approve it, once, within 15 minutes.',
      'Each suggestion on the start screen says plainly whether it works yet, such as “Needs Gmail, not connected”.',
    ],
    note: 'The public page shows the interface only. Chat needs the owner’s own API key, and connections such as Gmail and Calendar are not built yet.',
    liveUrl: 'https://amirronaldo319.github.io/jarvis-agent/',
    alt: 'The Jarvis chat screen: a dark interface with a sidebar, the greeting “At your service, sir.”, six suggested requests, and a message box with Ask, Plan, and Act modes.',
  },
  {
    id: 'stayin',
    name: 'STAYIN',
    status: 'personal',
    kind: 'app',
    type: 'iPhone app research prototype',
    caption: 'a private iPhone app prototype, in research',
    summary:
      'A research prototype of a private iPhone app for adults who want to stop or reduce sports betting, with goal setup and offline support for urges, all without an account.',
    contribution:
      'Design and development of the native SwiftUI app, its design system and contrast checks, and a browser preview of the design.',
    decisions: [
      'Support for an urge is the main button on Home, and a quiet Pause bar stays on every other screen.',
      'There is no account, server, or analytics: everything stays on the phone, and the Privacy screen lets you delete it.',
    ],
    note: 'STAYIN is a research prototype: not clinically reviewed, not tested with real users, and not on the App Store. The capture is its browser preview. The repository is private, so there is no public link.',
    alt: 'The STAYIN Home screen: the headline “Come back to what matters.”, a prompt to add a personal reason, a button for when you are thinking about betting, and a link to edit your goal.',
  },
  {
    id: 'motion-kit',
    name: 'Motion Kit',
    status: 'personal',
    kind: 'app',
    type: 'React starter kit for motion and animation',
    caption: 'a React starter kit for motion and animation',
    summary:
      'A React and TypeScript starter with four motion libraries installed and working together (GSAP, React Bits, Lenis, and Vanta), and a demo page that shows every piece.',
    contribution: 'Setup and integration of the libraries, the reusable motion components, and the demo page.',
    decisions: [
      'Smooth scrolling is synced with the scroll animations, so the two never pull against each other.',
      'The heavy 3D backgrounds, 14 effects in all, load only when one is used.',
    ],
    note: 'Motion Kit is a developer tool rather than a website for a business. The repository is private, so there is no public link.',
    alt: 'The Motion Kit demo page: a dark animated network background behind the headline “Motion, ready to ship.”, two buttons, and a row of background-effect choices.',
  },
]
