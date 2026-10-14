import k604Desktop from '@/assets/projects/604kars-desktop.webp'
import k604Mobile from '@/assets/projects/604kars-mobile.webp'
import ganjinehDesktop from '@/assets/projects/ganjineh-ofogh-desktop.webp'
import ganjinehMobile from '@/assets/projects/ganjineh-ofogh-mobile.webp'
import farshDesktop from '@/assets/projects/farsh-aquatics-desktop.webp'
import farshMobile from '@/assets/projects/farsh-aquatics-mobile.webp'

/**
 * Real projects shown in the portfolio. Every statement here must be traceable to the project itself
 * (its live site, README, or commit history). Never add outcomes, metrics, or client claims.
 */
export type ProjectStatus = 'live' | 'concept'

export interface ProjectImage {
  src: string
  width: number
  height: number
}

export interface Project {
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
  liveUrl: string
  desktop: ProjectImage
  mobile: ProjectImage
  /** One description covering both captures, since they share an <img>. */
  alt: string
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: 'Live website',
  concept: 'Concept project',
}

export const PROJECTS: readonly Project[] = [
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
    desktop: { src: farshDesktop, width: 1200, height: 778 },
    mobile: { src: farshMobile, width: 780, height: 1520 },
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
    liveUrl: 'https://604kars.com/',
    desktop: { src: k604Desktop, width: 1200, height: 778 },
    mobile: { src: k604Mobile, width: 780, height: 1520 },
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
    desktop: { src: ganjinehDesktop, width: 1200, height: 778 },
    mobile: { src: ganjinehMobile, width: 780, height: 1520 },
    alt: 'The Ganjineh Ofogh home page: the tower name in English and Persian beside an illustrated render of the building.',
  },
]

function requireProject(id: string): Project {
  const project = PROJECTS.find((candidate) => candidate.id === id)
  if (!project) throw new Error(`Unknown project: ${id}`)
  return project
}

/** The live website shown in the hero: a one-page local service site, which is the core offer. */
export const HERO_PROJECT: Project = requireProject('farsh-aquatics')

/** The live website shown large at the top of the portfolio, in a different style from the hero. */
export const FEATURED_PROJECT: Project = requireProject('604kars')

/** The concept project shown beside the concept demo. */
export const CONCEPT_PROJECT: Project = requireProject('ganjineh-ofogh')
