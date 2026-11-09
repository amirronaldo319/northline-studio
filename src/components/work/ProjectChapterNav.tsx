import { PROJECTS } from '@/content/projects'
import { NAV_IMAGES } from '@/content/projectNav'
import { useCopy, useLocalHref } from '@/i18n/context'

/**
 * A row of every project, as Apple opens a product page with a row of its models: a small picture over each name,
 * each a link to that project's page. On a narrow screen the row scrolls sideways inside itself, never the page.
 */
export function ProjectChapterNav() {
  const t = useCopy()
  const localHref = useLocalHref()

  return (
    <nav aria-label={t.work.fanLabel} className="chapter-nav">
      <ul className="chapter-nav-list">
        {PROJECTS.map((project) => (
          <li key={project.id}>
            <a href={localHref(`work/${project.id}/`)} className="chapter-nav-link">
              <img
                src={NAV_IMAGES[project.id]}
                width={56}
                height={70}
                alt=""
                loading="eager"
                decoding="async"
                className="chapter-nav-icon"
              />
              <span className="chapter-nav-label">
                <bdi>{project.name}</bdi>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
