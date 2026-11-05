import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useDragScroll } from '@/hooks/useDragScroll'
import { useCopy } from '@/i18n/context'
import { galleryEdges } from '@/lib/gallery'

type Props = {
  /** Names the gallery for assistive technology. */
  label: string
  /** One element per tile; each becomes a list item. */
  children: ReactNode
  /** "wide" shows two tiles across a wide screen; "compact" shows three, for portrait tiles such as phone apps. */
  size?: 'wide' | 'compact'
}

/**
 * A row of tiles that scrolls sideways and snaps, as in Apple's "Get the highlights": the next tile peeks in, and
 * glass buttons step through them. It is a native scroller, so touch, trackpad and keyboard work as usual, and a mouse
 * can drag it too; every tile stays in the page and in reading order, and nothing moves on its own.
 *
 * Restored from the portfolio as it was before the 2026-11 redesign (same structure, sizes, snapping, dots and
 * buttons), drawn as Apple draws its galleries: grey round paddles and the position dots on a small pill of glass.
 */
export function Gallery({ label, children, size = 'wide' }: Props) {
  const t = useCopy()
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ atStart: true, atEnd: false })
  const [inView, setInView] = useState<readonly number[]>([0])
  const items = Children.toArray(children)
  useDragScroll(scrollerRef)

  const measure = useCallback(() => {
    const scroller = scrollerRef.current
    if (scroller) setEdges(galleryEdges(scroller.scrollLeft, scroller.clientWidth, scroller.scrollWidth))
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    measure()
    scroller.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)

    // The tiles mostly in view (one on phones, two on wide screens) light up their position dots.
    const tiles = Array.from(scroller.children) as HTMLElement[]
    const visible = new Set<number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = tiles.indexOf(entry.target as HTMLElement)
          if (entry.isIntersecting) visible.add(index)
          else visible.delete(index)
        }
        if (visible.size > 0) setInView([...visible].sort((a, b) => a - b))
      },
      { root: scroller, threshold: 0.6 },
    )
    tiles.forEach((tile) => observer.observe(tile))
    return () => {
      scroller.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
      observer.disconnect()
    }
  }, [measure])

  /** Moves one tile towards the end (1) or the start (-1), in the page's reading direction. */
  const step = (towardsEnd: 1 | -1) => {
    const scroller = scrollerRef.current
    const tile = scroller?.firstElementChild as HTMLElement | null
    if (!scroller || !tile) return
    const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0
    const reading = getComputedStyle(scroller).direction === 'rtl' ? -1 : 1
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    scroller.scrollBy({ left: towardsEnd * reading * (tile.offsetWidth + gap), behavior: smooth ? 'smooth' : 'auto' })
  }

  return (
    <div className="gallery" data-size={size}>
      <ul ref={scrollerRef} className="gallery-track" aria-label={label} tabIndex={0}>
        {items.map((item, index) => (
          <li key={index} className="gallery-item">
            {item}
          </li>
        ))}
      </ul>
      <div className="container-page gallery-controls">
        <div className="gallery-dots" aria-hidden="true">
          {items.map((_, index) => (
            <span key={index} data-current={inView.includes(index) || undefined} />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="gallery-paddle"
            aria-label={t.common.previous}
            disabled={edges.atStart}
            onClick={() => step(-1)}
          >
            <ChevronLeft aria-hidden="true" size={20} className="rtl:-scale-x-100" />
          </button>
          <button
            type="button"
            className="gallery-paddle"
            aria-label={t.common.next}
            disabled={edges.atEnd}
            onClick={() => step(1)}
          >
            <ChevronRight aria-hidden="true" size={20} className="rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </div>
  )
}
