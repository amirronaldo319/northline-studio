import { Component, useEffect, useState, type ComponentType, type ReactNode } from 'react'
import type { TopographicFlowProps } from '@/components/topographic-flow'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { HERO_TOPOGRAPHY_DESKTOP, HERO_TOPOGRAPHY_PHONE } from './heroTopography'

type Flow = ComponentType<TopographicFlowProps>

/** If the drawing code throws, the still contours stay and nothing else on the page is affected. */
class FlowBoundary extends Component<{ onFail: () => void; children: ReactNode }, { failed: boolean }> {
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

/** Visitors who asked their browser to save data keep the still picture and download nothing more. */
function savesData(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return connection?.saveData === true
}

/**
 * The hero's background. The still contour map (CSS only) is in the first paint, so the hero never waits for it.
 * Once the page is idle the animated Topographic Flow is loaded, drawn over the still map, and the still map fades
 * out. The animation pauses itself when the hero leaves the screen or the tab is hidden, and draws one frame when
 * the visitor prefers reduced motion. If it cannot load or draw, the still map simply stays. It is decoration: hidden
 * from assistive technology and never the target of a tap or click.
 */
export function HeroTopography() {
  const phone = useMediaQuery('(max-width: 719px)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [Flow, setFlow] = useState<Flow | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (savesData()) return
    let cancelled = false
    const load = () => {
      import('@/components/topographic-flow')
        .then((module) => {
          if (!cancelled) setFlow(() => module.TopographicFlow)
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
  }, [])

  const settings = phone ? HERO_TOPOGRAPHY_PHONE : HERO_TOPOGRAPHY_DESKTOP
  const live = Flow !== null && !failed

  return (
    <div className="hero-topo" aria-hidden="true" data-live={live || undefined}>
      <div className="hero-topo-still" />
      {live && Flow && (
        <FlowBoundary onFail={() => setFailed(true)}>
          <Flow {...settings} paused={reducedMotion} animateEntrance={!reducedMotion} />
        </FlowBoundary>
      )}
    </div>
  )
}
