import { useEffect, useRef, useState } from 'react'

/** If the observer never reports, show the content anyway. */
const FAILSAFE_MS = 2500

/**
 * Returns a ref and a flag that turns true once the element has entered the viewport, and stays true.
 * Used for one-time presentations that must never be left hidden if observation fails.
 */
export function useInViewOnce<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null)
  // Without IntersectionObserver there is nothing to wait for, so start in the final state.
  const [hasEntered, setHasEntered] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || hasEntered) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    const failsafe = window.setTimeout(() => setHasEntered(true), FAILSAFE_MS)

    return () => {
      observer.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [threshold, hasEntered])

  return { ref, hasEntered }
}
