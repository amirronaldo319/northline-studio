import { useEffect } from 'react'

const SAFETY_TIMEOUT_MS = 2500

/**
 * Adds `is-visible` to `.reveal` elements as they enter the viewport.
 * If IntersectionObserver is missing or something stalls, everything is revealed.
 */
export function useReveal(): void {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const revealAll = () => elements.forEach((el) => el.classList.add('is-visible'))

    if (!('IntersectionObserver' in window)) {
      revealAll()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    elements.forEach((el) => observer.observe(el))

    // Anything already above the fold when the page loads should never wait.
    const timer = window.setTimeout(() => {
      elements.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible')
      })
    }, SAFETY_TIMEOUT_MS)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [])
}
