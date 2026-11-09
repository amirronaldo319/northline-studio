import { PROJECTS } from '@/content/projects'
import { FAN_IMAGES } from '@/content/projectFan'
import { useCopy, useLocalHref } from '@/i18n/context'
import { FanGallery, type FanGalleryItem } from '../fan-gallery'
import { FAN_CONFIG } from './fanConfig'

/**
 * Every project as a card in the ReactDrops Fan Gallery. A card is a link to the project's page, named by the project
 * and what it is, so keyboard and screen-reader visitors get the same list as the galleries above it.
 */
export function ProjectFan() {
  const t = useCopy()
  const localHref = useLocalHref()
  const items: FanGalleryItem[] = PROJECTS.map((project) => ({
    src: FAN_IMAGES[project.id],
    alt: `${project.name} · ${t.projects[project.id].type}`,
    href: localHref(`work/${project.id}/`),
  }))

  // The picture order is the same in every language, so the fan is laid out left to right even on a right-to-left page.
  return (
    <div dir="ltr" className="project-fan">
      <FanGallery {...FAN_CONFIG} items={items} ariaLabel={t.work.fanLabel} />
    </div>
  )
}
