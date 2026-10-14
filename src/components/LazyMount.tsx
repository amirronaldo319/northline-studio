import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Shown until the wrapper approaches the viewport (and if IntersectionObserver is unavailable, nothing is deferred). */
  fallback?: ReactNode
  /** How far outside the viewport to start mounting, so content is ready before it scrolls in. */
  rootMargin?: string
  className?: string
}

/** Mounts children the first time the wrapper nears the viewport. Keeps below-the-fold DOM out of the initial render. */
export function LazyMount({ children, fallback = null, rootMargin = '400px 0px', className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [isNear, setIsNear] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (isNear || !el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNear(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isNear, rootMargin])

  return (
    <div ref={ref} className={className}>
      {isNear ? children : fallback}
    </div>
  )
}
