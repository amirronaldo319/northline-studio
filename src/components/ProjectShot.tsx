import type { Project } from '@/content/projects'
import { sizedShots } from '@/content/projectShots'
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
  /** How wide the picture is drawn, so the browser loads the capture that fits: no larger than needed, sharp on dense screens. */
  sizes?: string
}

/** How wide a desktop capture is drawn when the caller does not say. */
const DESKTOP_SIZES = '(min-width: 1216px) 1152px, 92vw'
/** Phone frames are drawn 130 to 250px wide across the site; most are about 200px. */
const PHONE_SIZES = '210px'

/**
 * A real screenshot of a project. The frame reserves its space from the aspect ratio, so nothing
 * shifts as the image loads. Safe to place inside a button: it contains only phrasing content.
 *
 * Each slot offers the browser more than one size (see content/projectShots.ts): a phone frame the half-size phone
 * capture or the full one; a desktop slot the 600, 1200 and, where there is one, 2400px capture; and a card on a small
 * screen the top of the phone capture, which is all it shows.
 */
export function ProjectShot({ project, isEager = false, variant = 'responsive', sizes }: Props) {
  const { desktop, desktop2x, mobile } = project
  const { desktopSmall, mobileSmall, mobileCard } = sizedShots(project.id)
  const alt = useCopy().projects[project.id].alt
  const loading = isEager ? 'eager' : 'lazy'
  const fetchPriority = isEager ? 'high' : 'auto'

  if (variant === 'phone') {
    return (
      <span className="shot block aspect-[390/760] w-full bg-paper-2">
        <img
          src={mobile.src}
          srcSet={`${mobileSmall.src} ${mobileSmall.width}w, ${mobile.src} ${mobile.width}w`}
          sizes={sizes ?? PHONE_SIZES}
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

  const desktopSet = [desktopSmall, desktop, ...(desktop2x ? [desktop2x] : [])]
    .map((image) => `${image.src} ${image.width}w`)
    .join(', ')

  return (
    <span className="shot block aspect-[390/440] w-full bg-paper-2 sm:aspect-[1200/778]">
      <picture>
        <source
          media="(min-width: 640px)"
          srcSet={desktopSet}
          sizes={sizes ?? DESKTOP_SIZES}
          width={desktop.width}
          height={desktop.height}
        />
        <img
          src={mobileCard.src}
          width={mobileCard.width}
          height={mobileCard.height}
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
