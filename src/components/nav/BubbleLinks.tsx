import { Component, useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { NAV_LINKS } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useHomeAnchor } from '../pageContext'

/** How long a picked link is held while the page glides to it, so the bubble does not bounce through other sections. */
const PICK_HOLD_MS = 1200

type Props = { active: string | null; desktopQuery: string }

/** If the bubble cannot draw, the plain marker (a pale pill) stays and nothing else on the page is affected. */
class BubbleBoundary extends Component<{ onFail: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onFail()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

/**
 * The links in the capsule on wide screens. They are ordinary labelled links in slots of one fixed width, so the row is
 * the same size whichever link is active, in every language, and works without JavaScript. A marker slides under the
 * link for the section being read: a pale pill in the first paint, and once the page is idle, Bubble UI's soap-bubble
 * material drawn in it. The marker is a picture (hidden from assistive technology, never the target of a tap); the
 * active link is also marked in the markup with aria-current, and in its colour, so nothing depends on the bubble.
 */
export function BubbleLinks({ active, desktopQuery }: Props) {
  const t = useCopy()
  const homeAnchor = useHomeAnchor()
  const wide = useMediaQuery(desktopQuery)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [picked, setPicked] = useState<string | null>(null)
  const [Bubble, setBubble] = useState<null | ((props: { index: number; reducedMotion: boolean }) => ReactNode)>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (picked === null) return
    const timer = window.setTimeout(() => setPicked(null), PICK_HOLD_MS)
    return () => window.clearTimeout(timer)
  }, [picked])

  // Phones never see this row, so they never download the bubble.
  useEffect(() => {
    if (!wide || Bubble) return
    let cancelled = false
    const load = () => {
      import('./NavBubble')
        .then((module) => {
          if (!cancelled) setBubble(() => module.default)
        })
        .catch(() => {
          if (!cancelled) setFailed(true)
        })
    }
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(load, { timeout: 1500 })
      return () => {
        cancelled = true
        window.cancelIdleCallback(handle)
      }
    }
    const timer = window.setTimeout(load, 400)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [wide, Bubble])

  const shown = picked ?? (NAV_LINKS.some((link) => link.id === active) ? active : null)
  const index = NAV_LINKS.findIndex((link) => link.id === shown)
  const live = Bubble !== null && !failed

  return (
    <nav
      aria-label={t.common.mainNav}
      className="bubble-nav"
      data-live={live || undefined}
      style={{ '--tab-index': index, '--tab-count': NAV_LINKS.length } as CSSProperties}
    >
      <ul className="bubble-nav-list">
        {NAV_LINKS.map((link) => (
          <li key={link.id}>
            <a
              href={homeAnchor(link.id)}
              aria-current={shown === link.id ? 'location' : undefined}
              className="bubble-nav-link"
              onClick={() => setPicked(link.id)}
            >
              {t.nav[link.id]}
            </a>
          </li>
        ))}
      </ul>
      <span className="bubble-nav-marker" aria-hidden="true" data-visible={index >= 0 || undefined}>
        {live && Bubble && (
          <BubbleBoundary onFail={() => setFailed(true)}>
            <Bubble index={index} reducedMotion={reducedMotion} />
          </BubbleBoundary>
        )}
      </span>
    </nav>
  )
}
