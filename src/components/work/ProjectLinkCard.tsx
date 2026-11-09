import type { Project } from '@/content/projects'
import { useCopy, useLocalHref } from '@/i18n/context'
import { statusLabel } from '@/i18n/projectStatus'

/**
 * A project as a small tile that opens its page: the desktop capture across the top, then its label, name and what it
 * is, as Apple ends a page with a row of related products. The whole tile is one link, so the picture is decorative.
 */
export function ProjectLinkCard({ project }: { project: Project }) {
  const t = useCopy()
  const localHref = useLocalHref()
  return (
    <a href={localHref(`work/${project.id}/`)} className="card card-link group block h-full">
      <span className="card-shot block aspect-[1200/778] overflow-hidden bg-paper-2">
        <img
          src={project.desktop.src}
          width={project.desktop.width}
          height={project.desktop.height}
          alt=""
          loading="lazy"
          decoding="async"
          className="related-shot h-full w-full object-cover object-top"
        />
      </span>
      <span className="project-card-body block">
        <span className="block text-footnote font-semibold text-accent">{statusLabel(t.work, project.status)}</span>
        <span className="mt-2 block text-lead font-semibold">
          <bdi>{project.name}</bdi>
        </span>
        <span className="mt-1 block text-footnote text-ink-2">{t.projects[project.id].type}</span>
      </span>
    </a>
  )
}
