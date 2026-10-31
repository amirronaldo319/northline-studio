import type { gsap as Gsap } from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'
import { initScrollEffects } from './effects'
import { hasFinePointer, prefersReducedMotion } from './gate'

type Stop = () => void

/**
 * Starts the motion engine: GSAP with ScrollTrigger for scroll-linked effects, plus Lenis smooth scrolling
 * for mouse users. Everything is loaded on demand, so the first paint never waits for it.
 *
 * Reduced motion: nothing starts, the page scrolls natively and every effect stays off.
 * Touch screens: GSAP effects run, but scrolling stays native (Lenis is for pointer devices).
 * One scroll controller only: Lenis drives ScrollTrigger through `lenis.on('scroll')` and the GSAP ticker.
 */
export function startMotionEngine(): Stop {
  let stopped = false
  let teardown: Stop | null = null

  const start = async () => {
    if (prefersReducedMotion()) return

    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
    if (stopped) return
    gsap.registerPlugin(ScrollTrigger)

    const stops: Stop[] = []
    if (hasFinePointer()) stops.push(await startSmoothScroll(gsap, ScrollTrigger))
    if (stopped) {
      stops.forEach((stop) => stop())
      return
    }
    stops.push(initScrollEffects(gsap, ScrollTrigger))

    // Images and fonts change layout after first paint; measure again so triggers land correctly.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    void document.fonts?.ready.then(refresh)

    teardown = () => {
      window.removeEventListener('load', refresh)
      stops.reverse().forEach((stop) => stop())
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

  start().catch(() => {
    /* The page works without the engine; a failed download just leaves native scrolling and CSS motion. */
  })

  return () => {
    stopped = true
    media.removeEventListener('change', onMotionPreference)
    teardown?.()
    teardown = null
  }
}

async function startSmoothScroll(gsap: typeof Gsap, ScrollTrigger: typeof ScrollTriggerType): Promise<Stop> {
  const { default: LenisCtor } = await import('lenis')
  const lenis: Lenis = new LenisCtor({ autoRaf: false, anchors: false })

  const onScroll = () => ScrollTrigger.update()
  lenis.on('scroll', onScroll)
  const tick = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  /**
   * In-page links glide to their section instead of jumping, and keep working as normal links to other pages.
   * Lenis already honours the section's CSS `scroll-margin-top`, so no offset is added here.
   */
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]')
    if (!link || link.target || link.hasAttribute('download')) return
    const url = new URL(link.href, window.location.href)
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
    if (!target) return

    event.preventDefault()
    history.pushState(null, '', url.hash)
    const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0
    const focusTarget = () => {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
    lenis.scrollTo(target, {
      duration: 1.1,
      onComplete: () => {
        // Sections above can finish loading while the page glides, moving the destination. Correct once.
        if (Math.abs(target.getBoundingClientRect().top - margin) > 2) lenis.scrollTo(target, { duration: 0.35, onComplete: focusTarget })
        else focusTarget()
      },
    })
  }
  document.addEventListener('click', onClick)

  return () => {
    document.removeEventListener('click', onClick)
    gsap.ticker.remove(tick)
    lenis.off('scroll', onScroll)
    lenis.destroy()
  }
}
