import { useEffect } from 'react'

/** If the observer has not reported anything by now, assume it is not working and show everything. */
const OBSERVER_LIVENESS_MS = 1500
/** Anything already above the fold when the page loads should never wait. */
const ABOVE_FOLD_SAFETY_MS = 2500

/**
 * Adds `is-visible` to `.reveal` elements as they enter the viewport.
 * Content must never stay hidden: without IntersectionObserver, or if it never reports, everything is revealed.
 */
export function useReveal(): void {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const revealAll = () => elements.forEach((el) => el.classList.add('is-visible'))

    if (!('IntersectionObserver' in window)) {
      revealAll()
      return
    }

    let hasReported = false
    const observer = new IntersectionObserver(
      (entries) => {
        hasReported = true
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    elements.forEach((el) => observer.observe(el))

    const livenessTimer = window.setTimeout(() => {
      if (!hasReported) revealAll()
    }, OBSERVER_LIVENESS_MS)

    const safetyTimer = window.setTimeout(() => {
      elements.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible')
      })
    }, ABOVE_FOLD_SAFETY_MS)

    return () => {
      observer.disconnect()
      window.clearTimeout(livenessTimer)
      window.clearTimeout(safetyTimer)
    }
  }, [])
}
