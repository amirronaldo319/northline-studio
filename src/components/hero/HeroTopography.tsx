import { Component, useEffect, useMemo, useRef, useState, type ComponentType, type CSSProperties, type ReactNode } from 'react'
import type { TopographicFlowProps } from '@/components/topographic-flow'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { createFrameWatch, HERO_FRAME_WATCH } from './frameWatch'
import { heroRenderScale, heroTopographySettings } from './heroTopography'

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
 * the visitor prefers reduced motion. If it cannot load or draw, or the device cannot keep it near 20 frames a second
 * for a few seconds in a row, it is removed and the still map comes back. It is decoration: hidden from assistive
 * technology and never the target of a tap or click.
 */
export function HeroTopography() {
  const phone = useMediaQuery('(max-width: 719px)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const highDensity = useMediaQuery('(min-resolution: 1.5dppx)')
  const [Flow, setFlow] = useState<Flow | null>(null)
  const [failed, setFailed] = useState(false)
  const [tooSlow, setTooSlow] = useState(false)
  const root = useRef<HTMLDivElement>(null)

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

  const renderScale = heroRenderScale(highDensity)
  const settings = useMemo(() => heroTopographySettings(phone, renderScale), [phone, renderScale])
  const live = Flow !== null && !failed && !tooSlow

  // Watch the page's frame rate while the animation is running and on screen; retire it if the device cannot keep up.
  useEffect(() => {
    const element = root.current
    if (!live || reducedMotion || !element) return
    const watch = createFrameWatch(HERO_FRAME_WATCH, () => setTooSlow(true))
    let handle = 0
    let onscreen = true
    const loop = (now: number) => {
      watch.frame(now)
      handle = window.requestAnimationFrame(loop)
    }
    const sync = () => {
      const run = onscreen && !document.hidden
      if (run && !handle) {
        watch.reset()
        handle = window.requestAnimationFrame(loop)
      } else if (!run && handle) {
        window.cancelAnimationFrame(handle)
        handle = 0
      }
    }
    const observer =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(([entry]) => {
            onscreen = entry.isIntersecting
            sync()
          })
    observer?.observe(element)
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => {
      observer?.disconnect()
      document.removeEventListener('visibilitychange', sync)
      window.cancelAnimationFrame(handle)
    }
  }, [live, reducedMotion])

  return (
    <div
      ref={root}
      className="hero-topo"
      style={live ? ({ '--hero-topo-render': renderScale } as CSSProperties) : undefined}
      aria-hidden="true"
      data-live={live || undefined}
      data-fallback={tooSlow ? 'slow' : failed ? 'error' : undefined}
    >
      <div className="hero-topo-still" />
      {live && Flow && (
        <FlowBoundary onFail={() => setFailed(true)}>
          <Flow {...settings} paused={reducedMotion} animateEntrance={!reducedMotion} />
        </FlowBoundary>
      )}
    </div>
  )
}
