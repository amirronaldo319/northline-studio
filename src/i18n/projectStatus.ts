import type { ProjectStatus } from '../content/projectsData.ts'
import type { Copy } from './types.ts'

/** The label for a project's status ("Live website", "Concept project", "Personal project"). */
export function statusLabel(work: Copy['work'], status: ProjectStatus): string {
  if (status === 'live') return work.statusLive
  if (status === 'concept') return work.statusConcept
  return work.statusPersonal
}

/** The text of a project's outbound link: a launched site is visited, anything else is previewed. */
export function linkLabel(work: Copy['work'], status: ProjectStatus): string {
  return status === 'live' ? work.visitLive : work.openLivePreview
}
