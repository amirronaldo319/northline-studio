import type { gsap as Gsap } from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'
import { initScrollEffects } from './effects'
import { hasFinePointer, prefersReducedMotion } from './gate'

type Stop = () => void
/** Scrolls to a section and leaves keyboard focus there, as a native in-page link would. */
type Glide = (target: HTMLElement) => void

/** The engine is only needed once someone scrolls, so it waits for that or for the page to settle, whichever is first. */
const SETTLE_DELAY_MS = 2500
const IDLE_TIMEOUT_MS = 1500
const FIRST_INPUT_EVENTS = ['wheel', 'touchstart', 'scroll', 'keydown'] as const

/** Calls `go` once, on the visitor's first scroll-like input or after the page has loaded and settled. */
function whenNeeded(go: () => void): { cancel: Stop; now: () => void } {
  let done = false
  let timer = 0
  let idle = 0
  const cleanup = () => {
    FIRST_INPUT_EVENTS.forEach((type) => window.removeEventListener(type, run))
    window.removeEventListener('load', onLoad)
    window.clearTimeout(timer)
    if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idle)
  }
  function run() {
    if (done) return
    done = true
    cleanup()
    go()
  }
  function onLoad() {
    timer = window.setTimeout(() => {
      if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(run, { timeout: IDLE_TIMEOUT_MS })
      else run()
    }, SETTLE_DELAY_MS)
  }
  FIRST_INPUT_EVENTS.forEach((type) => window.addEventListener(type, run, { passive: true }))
  if (document.readyState === 'complete') onLoad()
  else window.addEventListener('load', onLoad)
  return { cancel: cleanup, now: run }
}

/** The section an in-page link points at, or null when the click should be left to the browser. */
function anchorTarget(event: MouseEvent): { target: HTMLElement; hash: string } | null {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]')
  if (!link || link.target || link.hasAttribute('download')) return null
  const url = new URL(link.href, window.location.href)
  if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return null
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
  return target ? { target, hash: url.hash } : null
}

function focusSection(target: HTMLElement) {
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}

/** The browser's own smooth scroll, for touch screens (no Lenis) and as the fallback when the engine cannot load. */
const nativeGlide: Glide = (target) => {
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  focusSection(target)
}

/**
 * Starts the motion engine: GSAP with ScrollTrigger for scroll-linked effects, plus Lenis smooth scrolling
 * for mouse users. Everything is loaded on demand, so the first paint never waits for it.
 *
 * Reduced motion: nothing starts, the page scrolls natively and every effect stays off.
 * Touch screens: GSAP effects run, but scrolling stays native (Lenis is for pointer devices).
 * One scroll controller only: Lenis drives ScrollTrigger through `lenis.on('scroll')` and the GSAP ticker.
 *
 * The engine starts on the first scroll, wheel, touch or key press, or once the page has settled. A click on an
 * in-page link before that starts it straight away and the engine does the scrolling, so a link never sets off
 * the browser's own scroll only to have it interrupted halfway.
 */
export function startMotionEngine(): Stop {
  let stopped = false
  let teardown: Stop | null = null
  let glide: Glide | null = null
  let pending: HTMLElement | null = null

  const settlePending = () => {
    if (!pending) return
    const target = pending
    pending = null
    ;(glide ?? nativeGlide)(target)
  }

  const start = async () => {
    if (prefersReducedMotion()) return

    const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText'),
    ])
    if (stopped) return
    gsap.registerPlugin(ScrollTrigger, SplitText)

    const stops: Stop[] = []
    if (hasFinePointer()) {
      const smooth = await startSmoothScroll(gsap, ScrollTrigger)
      glide = smooth.glide
      stops.push(smooth.stop)
    }
    if (stopped) {
      stops.forEach((stop) => stop())
      return
    }
    stops.push(initScrollEffects({ gsap, ScrollTrigger, SplitText }))

    // Images and fonts change layout after first paint; measure again so triggers land correctly.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    void document.fonts?.ready.then(refresh)

    teardown = () => {
      window.removeEventListener('load', refresh)
      stops.reverse().forEach((stop) => stop())
      glide = null
    }
  }

  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  /** A visitor who turns reduced motion on mid-visit gets native scrolling straight away. */
  const onMotionPreference = () => {
    if (!media.matches) return
    teardown?.()
    teardown = null
  }
  media.addEventListener('change', onMotionPreference)

  /** Before the engine is ready: take over an in-page link and let the engine scroll once it is. */
  function onEarlyClick(event: MouseEvent) {
    if (prefersReducedMotion()) return
    const found = anchorTarget(event)
    if (!found) return
    event.preventDefault()
    history.pushState(null, '', found.hash)
    pending = found.target
    wait.now()
  }

  const wait = whenNeeded(() => {
    document.removeEventListener('click', onEarlyClick, true)
    start()
      .catch(() => {
        /* The page works without the engine; a failed download just leaves native scrolling and CSS motion. */
      })
      .finally(settlePending)
  })
  if (!prefersReducedMotion()) document.addEventListener('click', onEarlyClick, true)

  return () => {
    stopped = true
    wait.cancel()
    document.removeEventListener('click', onEarlyClick, true)
    media.removeEventListener('change', onMotionPreference)
    teardown?.()
    teardown = null
  }
}

async function startSmoothScroll(
  gsap: typeof Gsap,
  ScrollTrigger: typeof ScrollTriggerType,
): Promise<{ stop: Stop; glide: Glide }> {
  const { default: LenisCtor } = await import('lenis')
  const lenis: Lenis = new LenisCtor({ autoRaf: false, anchors: false })

  const onScroll = () => ScrollTrigger.update()
  lenis.on('scroll', onScroll)
  const tick = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  /**
   * Glides to a section. Lenis already honours the section's CSS `scroll-margin-top`, so no offset is added here.
   * Sections above can finish loading while the page glides, moving the destination, so it corrects once at the end.
   */
  const glide: Glide = (target) => {
    const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0
    lenis.scrollTo(target, {
      duration: 1.1,
      onComplete: () => {
        if (Math.abs(target.getBoundingClientRect().top - margin) > 2) {
          lenis.scrollTo(target, { duration: 0.35, onComplete: () => focusSection(target) })
        } else {
          focusSection(target)
        }
      },
    })
  }

  /** In-page links glide to their section instead of jumping, and keep working as normal links to other pages. */
  const onClick = (event: MouseEvent) => {
    const found = anchorTarget(event)
    if (!found) return
    event.preventDefault()
    history.pushState(null, '', found.hash)
    glide(found.target)
  }
  document.addEventListener('click', onClick)

  return {
    glide,
    stop: () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(tick)
      lenis.off('scroll', onScroll)
      lenis.destroy()
    },
  }
}
