import { Breadcrumb } from './Breadcrumb'
import { usePageCrumbs } from './pageCrumbs'

/**
 * The trail at the foot of an inner page, as Apple places it: just above the footer's hairline, where a reader who
 * has reached the end looks for the way back up. The home page has none.
 */
export function FooterCrumbs() {
  const crumbs = usePageCrumbs()
  if (!crumbs) return null
  return (
    <div className="footer-crumbs">
      <Breadcrumb items={crumbs} />
    </div>
  )
}
