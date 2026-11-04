import k604Desktop from '@/assets/projects/604kars-desktop.webp'
import k604Mobile from '@/assets/projects/604kars-mobile.webp'
import ganjinehDesktop from '@/assets/projects/ganjineh-ofogh-desktop.webp'
import ganjinehMobile from '@/assets/projects/ganjineh-ofogh-mobile.webp'
import farshDesktop from '@/assets/projects/farsh-aquatics-desktop.webp'
import farshMobile from '@/assets/projects/farsh-aquatics-mobile.webp'
import mendDesktop from '@/assets/projects/mend-desktop.webp'
import mendMobile from '@/assets/projects/mend-mobile.webp'
import storageDesktop from '@/assets/projects/storage4666-desktop.webp'
import storageMobile from '@/assets/projects/storage4666-mobile.webp'
import maidNewDesktop from '@/assets/projects/maid-new-desktop.webp'
import maidNewMobile from '@/assets/projects/maid-new-mobile.webp'
import octaiqDesktop from '@/assets/projects/octaiq-desktop.webp'
import octaiqMobile from '@/assets/projects/octaiq-mobile.webp'
import shamsiDesktop from '@/assets/projects/shamsi-calendar-desktop.webp'
import shamsiMobile from '@/assets/projects/shamsi-calendar-mobile.webp'
import mendAppDesktop from '@/assets/projects/mend-app-desktop.webp'
import mendAppMobile from '@/assets/projects/mend-app-mobile.webp'
import jarvisDesktop from '@/assets/projects/jarvis-desktop.webp'
import jarvisMobile from '@/assets/projects/jarvis-mobile.webp'
import stayinDesktop from '@/assets/projects/stayin-desktop.webp'
import stayinMobile from '@/assets/projects/stayin-mobile.webp'
import motionKitDesktop from '@/assets/projects/motion-kit-desktop.webp'
import motionKitMobile from '@/assets/projects/motion-kit-mobile.webp'
import { PROJECT_DATA, type ProjectData, type ProjectKind, type ProjectStatus } from './projectsData'

export type { ProjectKind, ProjectStatus }

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
  personal: 'Personal project',
}

/** Captures of each project (see src/assets/projects/SOURCES.md). */
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
  storage4666: {
    desktop: { src: storageDesktop, width: 1200, height: 778 },
    mobile: { src: storageMobile, width: 780, height: 1520 },
  },
  'maid-new': {
    desktop: { src: maidNewDesktop, width: 1200, height: 778 },
    mobile: { src: maidNewMobile, width: 780, height: 1520 },
  },
  octaiq: {
    desktop: { src: octaiqDesktop, width: 1200, height: 778 },
    mobile: { src: octaiqMobile, width: 780, height: 1520 },
  },
  'shamsi-calendar': {
    desktop: { src: shamsiDesktop, width: 1200, height: 778 },
    mobile: { src: shamsiMobile, width: 780, height: 1520 },
  },
  'mend-app': {
    desktop: { src: mendAppDesktop, width: 1200, height: 778 },
    mobile: { src: mendAppMobile, width: 780, height: 1520 },
  },
  jarvis: {
    desktop: { src: jarvisDesktop, width: 1200, height: 778 },
    mobile: { src: jarvisMobile, width: 780, height: 1520 },
  },
  stayin: {
    desktop: { src: stayinDesktop, width: 1200, height: 778 },
    mobile: { src: stayinMobile, width: 780, height: 1520 },
  },
  'motion-kit': {
    desktop: { src: motionKitDesktop, width: 1200, height: 778 },
    mobile: { src: motionKitMobile, width: 780, height: 1520 },
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

/** A website concept, kept distinct from the live work in tests and copy. */
export const CONCEPT_PROJECT: Project = requireProject('ganjineh-ofogh')

const FEATURED_IDS = new Set([SECONDARY_PROJECT.id, FEATURED_PROJECT.id])

/** The websites shown in the portfolio gallery, in order, after the featured project. */
export const GALLERY_WEBSITES: readonly Project[] = [
  SECONDARY_PROJECT,
  ...PROJECTS.filter((project) => project.kind === 'website' && !FEATURED_IDS.has(project.id)),
]

/** Apps and tools I built for myself, shown in their own gallery. */
export const APP_PROJECTS: readonly Project[] = PROJECTS.filter((project) => project.kind === 'app')

/** Projects that are websites for a business or product, the work a trade page points to. */
export const WEBSITE_PROJECTS: readonly Project[] = PROJECTS.filter((project) => project.kind === 'website')
