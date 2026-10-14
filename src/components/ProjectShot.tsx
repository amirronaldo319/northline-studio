import type { Project } from '@/content/projects'

type Props = {
  project: Project
  /** Load immediately and at high priority. Use for the hero image only. */
  isEager?: boolean
}

/**
 * A real screenshot of a project. Phones get the phone capture, larger screens the desktop capture.
 * The frame reserves its space from the aspect ratio, so nothing shifts as the image loads.
 */
export function ProjectShot({ project, isEager = false }: Props) {
  const { desktop, mobile, alt } = project

  return (
    <div className="aspect-[390/440] w-full bg-paper-2 sm:aspect-[1200/778]">
      <picture>
        <source media="(min-width: 640px)" srcSet={desktop.src} width={desktop.width} height={desktop.height} />
        <img
          src={mobile.src}
          width={mobile.width}
          height={mobile.height}
          alt={alt}
          loading={isEager ? 'eager' : 'lazy'}
          fetchPriority={isEager ? 'high' : 'auto'}
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </picture>
    </div>
  )
}
