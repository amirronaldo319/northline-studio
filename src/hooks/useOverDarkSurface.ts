import { useEffect, useState } from 'react'

/**
 * Whether a horizontal line across the screen currently crosses a dark section (`data-surface="dark"`).
 * Floating glass uses it to turn dark over dark content, as Liquid Glass adapts to what is beneath it.
 * `edge` and `offset` place the line: 32px from the top is the header's middle, for example. Checked at most
 * once per frame while scrolling or resizing.
 */
export function useOverDarkSurface(edge: 'top' | 'bottom', offset: number): boolean {
  const [isOver, setIsOver] = useState(false)

  useEffect(() => {
    const surfaces = Array.from(document.querySelectorAll<HTMLElement>('[data-surface="dark"]'))
    if (surfaces.length === 0) return
    let frame = 0
    const check = () => {
      frame = 0
      const line = edge === 'top' ? offset : window.innerHeight - offset
      setIsOver(
        surfaces.some((surface) => {
          const box = surface.getBoundingClientRect()
          return box.top <= line && box.bottom >= line
        }),
      )
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [edge, offset])

  return isOver
}
