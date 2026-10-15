import type { Project } from '@/content/projects'
import { useCopy } from '@/i18n/context'

type Props = {
  project: Project
  /** Load immediately and at high priority. Use for the hero image only. */
  isEager?: boolean
  /**
   * `responsive` picks the phone capture on small screens and the desktop capture on larger ones.
   * `phone` always shows the phone capture at its natural proportions.
   */
  variant?: 'responsive' | 'phone'
}

/**
 * A real screenshot of a project. The frame reserves its space from the aspect ratio, so nothing
 * shifts as the image loads. Safe to place inside a button: it contains only phrasing content.
 */
export function ProjectShot({ project, isEager = false, variant = 'responsive' }: Props) {
  const { desktop, mobile } = project
  const alt = useCopy().projects[project.id].alt
  const loading = isEager ? 'eager' : 'lazy'
  const fetchPriority = isEager ? 'high' : 'auto'

  if (variant === 'phone') {
    return (
      <span className="shot block aspect-[390/760] w-full bg-paper-2">
        <img
          src={mobile.src}
          width={mobile.width}
          height={mobile.height}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          className="shot-img h-full w-full object-cover object-top"
        />
      </span>
    )
  }

  return (
    <span className="shot block aspect-[390/440] w-full bg-paper-2 sm:aspect-[1200/778]">
      <picture>
        <source media="(min-width: 640px)" srcSet={desktop.src} width={desktop.width} height={desktop.height} />
        <img
          src={mobile.src}
          width={mobile.width}
          height={mobile.height}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          className="shot-img h-full w-full object-cover object-top"
        />
      </picture>
    </span>
  )
}
