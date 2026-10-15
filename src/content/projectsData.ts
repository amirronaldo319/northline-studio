/**
 * Real projects shown in the portfolio, as plain text data. Every statement here must be traceable to the
 * project itself (its live site, README, or commit history). Never add outcomes, metrics, or client claims.
 * Images live in projects.ts, so this file can be read by the build without loading any pictures.
 */
export type ProjectStatus = 'live' | 'concept'

export interface ProjectData {
  id: string
  name: string
  /** "live" is a launched public website. "concept" is a self-initiated design, never a paying client. */
  status: ProjectStatus
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
  liveUrl: string
  /** One description covering both captures, since they share an <img>. */
  alt: string
}

export const PROJECT_DATA: readonly ProjectData[] = [
  {
    id: 'farsh-aquatics',
    name: 'Farsh Aquatics',
    status: 'live',
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
    id: 'ganjineh-ofogh',
    name: 'Ganjineh Ofogh',
    status: 'concept',
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
]
