import { createContext, useContext } from 'react'
import type { Project } from '@/content/projects'

export type ViewerView = 'desktop' | 'phone'

export interface OpenProjectOptions {
  /** The control that was activated. The preview grows from it and focus returns to it. */
  origin: HTMLElement | null
  view?: ViewerView
}

export interface ProjectViewerApi {
  open: (project: Project, options: OpenProjectOptions) => void
}

export const ProjectViewerContext = createContext<ProjectViewerApi | null>(null)

export function useProjectViewer(): ProjectViewerApi {
  const api = useContext(ProjectViewerContext)
  if (!api) throw new Error('useProjectViewer must be used inside <ProjectViewerProvider>')
  return api
}
