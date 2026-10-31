import { useEffect, useRef } from 'react'
import type { VantaEffect } from 'vanta/src/vanta.net.js'
import { hasFinePointer, hasWebGL, prefersReducedMotion, wantsLessData } from '@/motion/gate'

/** The cobalt of the brand, as the number Vanta expects. */
const COBALT = 0x173fd0
/** Vanta and three.js are heavy and purely decorative, so the first start waits until the page has settled. */
const FIRST_START_DELAY_MS = 3500
/** After that, the browser must be idle (or this long has passed) before the effect is built. */
const IDLE_TIMEOUT_MS = 2500
/** The network is a quiet decoration, so it is drawn at about this many frames a second, not at every refresh. */
const FRAME_INTERVAL_MS = 1000 / 24
/** While the page is scrolling, and for this long after, the picture holds still so scrolling gets the whole frame budget. */
const SCROLL_REST_MS = 180
/** Below this width the hero is a single column and the effect would sit behind the text. */
const MIN_WIDTH_QUERY = '(min-width: 1024px)'

/**
 * A quiet animated network behind the hero (Vanta.js "Net"), drawn in the brand colour.
 *
 * It only runs where it helps and costs nothing elsewhere: wide screens with a mouse, WebGL available, no reduced
 * motion, no data saver. It loads after the first paint, pauses (is destroyed) when scrolled out of view,
 * and releases its WebGL context on unmount. Everywhere else the existing static atmosphere is all that shows.
 */
export function HeroBackdrop() {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return
    if (prefersReducedMotion() || !hasFinePointer() || wantsLessData() || !hasWebGL()) return
    const wide = window.matchMedia(MIN_WIDTH_QUERY)
    if (!wide.matches) return

    let effect: VantaEffect | null = null
    let loading = false
    let visible = false
    let disposed = false
    let idleHandle = 0
    let delayHandle = 0
    let hasStartedOnce = false

    const show = (on: boolean) => layer.parentElement?.toggleAttribute('data-vanta', on)

    const create = async () => {
      if (effect || loading || disposed) return
      loading = true
      try {
        const [{ default: NET }, THREE] = await Promise.all([import('vanta/src/vanta.net.js'), import('@/motion/threeLite')])
        if (disposed || !visible || effect) return
        effect = NET({
          el: layer,
          THREE,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          // Vanta draws at devicePixelRatio / scale; this keeps it at one pixel per CSS pixel, even on retina.
          scale: Math.max(1, window.devicePixelRatio || 1),
          scaleMobile: 1,
          color: COBALT,
          backgroundAlpha: 0,
          points: 7,
          maxDistance: 22,
          spacing: 19,
          showDots: true,
        })
        paceLoop(effect)
        show(true)
      } catch {
        show(false)
      } finally {
        loading = false
      }
    }

    let lastScrollAt = -Infinity
    const onScroll = () => {
      lastScrollAt = performance.now()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    /**
     * Vanta redraws on every animation frame by itself. Wrap its loop so it draws at a modest rate and not at all
     * while scrolling. Vanta's `animationLoop` is internal, so this does nothing if a future version renames it.
     */
    const paceLoop = (target: VantaEffect) => {
      const original = target.animationLoop
      if (typeof original !== 'function') return
      let lastDraw = 0
      target.animationLoop = (time: number) => {
        const restingFromScroll = performance.now() - lastScrollAt < SCROLL_REST_MS
        if (restingFromScroll || time - lastDraw < FRAME_INTERVAL_MS) {
          target.req = window.requestAnimationFrame(target.animationLoop as FrameRequestCallback)
          return target.req
        }
        lastDraw = time
        return original(time)
      }
    }

    const destroy = () => {
      effect?.destroy()
      effect = null
      show(false)
    }

    const whenIdle = () => {
      if (typeof window.requestIdleCallback === 'function') idleHandle = window.requestIdleCallback(() => void create(), { timeout: IDLE_TIMEOUT_MS })
      else idleHandle = window.setTimeout(() => void create(), 400)
    }

    const start = () => {
      window.clearTimeout(delayHandle)
      if (hasStartedOnce) {
        whenIdle()
        return
      }
      hasStartedOnce = true
      delayHandle = window.setTimeout(whenIdle, FIRST_START_DELAY_MS)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting)
        if (visible) start()
        else destroy()
      },
      { threshold: 0.05 },
    )
    observer.observe(layer)

    const onWidth = () => {
      if (!wide.matches) destroy()
      else if (visible) start()
    }
    wide.addEventListener('change', onWidth)

    return () => {
      disposed = true
      observer.disconnect()
      wide.removeEventListener('change', onWidth)
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(delayHandle)
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleHandle)
      else window.clearTimeout(idleHandle)
      destroy()
    }
  }, [])

  return <div ref={layerRef} className="hero-vanta" aria-hidden="true" />
}
