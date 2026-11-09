import { FAN_IMAGES } from '@/content/projectFan'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useCopy, useLocalHref } from '@/i18n/context'
import { FanGallery, type FanGalleryItem } from '../fan-gallery'
import { FAN_CONFIG, FAN_CONFIG_PHONE } from './fanConfig'
import { FAN_SPLIT_QUERY, fanGroups } from './fanGroups'

/**
 * Every project as a card in the ReactDrops Fan Gallery. A card is a link to the project's page, named by the project
 * and what it is, so keyboard and screen-reader visitors get the same list as the galleries above it. One fan on a
 * wide screen; two fans of six on a phone, so every card keeps a strip wide enough to tap (see fanGroups.ts).
 */
export function ProjectFan() {
  const t = useCopy()
  const localHref = useLocalHref()
  const narrow = useMediaQuery(FAN_SPLIT_QUERY)

  // The picture order is the same in every language, so the fans are laid out left to right even on a right-to-left page.
  return (
    <div dir="ltr" className="project-fan">
      {fanGroups(narrow, t).map((group) => {
        const items: FanGalleryItem[] = group.projects.map((project) => ({
          src: FAN_IMAGES[project.id],
          alt: `${project.name} · ${t.projects[project.id].type}`,
          href: localHref(`work/${project.id}/`),
        }))
        const config = narrow ? FAN_CONFIG_PHONE : FAN_CONFIG
        return <FanGallery key={group.key} {...config} items={items} ariaLabel={group.label} />
      })}
    </div>
  )
}
