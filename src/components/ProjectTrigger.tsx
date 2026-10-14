import { useRef } from 'react'
import { Maximize2 } from 'lucide-react'
import type { Project } from '@/content/projects'
import { ProjectShot } from './ProjectShot'
import { useProjectViewer, type ViewerView } from './projectViewerContext'

type Props = {
  project: Project
  view?: ViewerView
  isEager?: boolean
  className?: string
}

/**
 * A project screenshot that is also a real button: activating it opens the project viewer.
 * The small expand marker is always visible, so touch users can see the picture is tappable.
 */
export function ProjectTrigger({ project, view = 'desktop', isEager = false, className = '' }: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const { open } = useProjectViewer()

  // On small screens the thumbnail is the phone capture, so the larger preview should be the phone view too.
  const openView = (): ViewerView =>
    view === 'desktop' && window.matchMedia('(max-width: 639px)').matches ? 'phone' : view

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => open(project, { origin: ref.current, view: openView() })}
      aria-label={`${view === 'phone' ? 'Open phone preview' : 'Open larger preview'}: ${project.name}`}
      className={`expand-trigger relative block w-full text-left ${className}`}
    >
      <ProjectShot project={project} isEager={isEager} variant={view === 'phone' ? 'phone' : 'responsive'} />
      <span className="expand-chip" aria-hidden="true">
        <Maximize2 size={14} />
      </span>
    </button>
  )
}
