import k604Desktop from '@/assets/projects/604kars-desktop.webp'
import k604Mobile from '@/assets/projects/604kars-mobile.webp'
import ganjinehDesktop from '@/assets/projects/ganjineh-ofogh-desktop.webp'
import ganjinehMobile from '@/assets/projects/ganjineh-ofogh-mobile.webp'
import farshDesktop from '@/assets/projects/farsh-aquatics-desktop.webp'
import farshMobile from '@/assets/projects/farsh-aquatics-mobile.webp'
import mendDesktop from '@/assets/projects/mend-desktop.webp'
import mendMobile from '@/assets/projects/mend-mobile.webp'
import { PROJECT_DATA, type ProjectData, type ProjectStatus } from './projectsData'

export type { ProjectStatus }

export interface ProjectImage {
  src: string
  width: number
  height: number
}

export interface Project extends ProjectData {
  desktop: ProjectImage
  mobile: ProjectImage
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: 'Live website',
  concept: 'Concept project',
}

/** Captures of each public site (see src/assets/projects/SOURCES.md). */
const IMAGES: Record<string, Pick<Project, 'desktop' | 'mobile'>> = {
  'farsh-aquatics': {
    desktop: { src: farshDesktop, width: 1200, height: 778 },
    mobile: { src: farshMobile, width: 780, height: 1520 },
  },
  '604kars': {
    desktop: { src: k604Desktop, width: 1200, height: 778 },
    mobile: { src: k604Mobile, width: 780, height: 1520 },
  },
  'ganjineh-ofogh': {
    desktop: { src: ganjinehDesktop, width: 1200, height: 778 },
    mobile: { src: ganjinehMobile, width: 780, height: 1520 },
  },
  mend: {
    desktop: { src: mendDesktop, width: 1200, height: 778 },
    mobile: { src: mendMobile, width: 780, height: 1520 },
  },
}

export const PROJECTS: readonly Project[] = PROJECT_DATA.map((data) => {
  const images = IMAGES[data.id]
  if (!images) throw new Error(`No screenshots for project: ${data.id}`)
  return { ...data, ...images }
})

function requireProject(id: string): Project {
  const project = PROJECTS.find((candidate) => candidate.id === id)
  if (!project) throw new Error(`Unknown project: ${id}`)
  return project
}

/** The live website shown in the hero: a one-page local service site, which is the core offer. */
export const SECONDARY_PROJECT: Project = requireProject('farsh-aquatics')

/** The live website shown large at the top of the portfolio, in a different style from the hero. */
export const FEATURED_PROJECT: Project = requireProject('604kars')

/** The concept project shown beside the concept demo. */
export const CONCEPT_PROJECT: Project = requireProject('ganjineh-ofogh')

/** A product landing page, shown with the other concept work. */
export const MEND_PROJECT: Project = requireProject('mend')
