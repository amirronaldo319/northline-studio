import type { ReactNode } from 'react'
import { useScaleToFit } from '@/hooks/useScaleToFit'

type Props = {
  designWidth: number
  designHeight: number
  children: ReactNode
  className?: string
  /** CSS aspect-ratio value. Defaults to the design size; pass a `var(...)` to switch it with a media query. */
  aspectRatio?: string
}

/**
 * Renders a fixed-size design (e.g. a 1200px desktop page) scaled down to the
 * container's width. Aspect ratio reserves space before measuring, so nothing shifts.
 * Content is inert and hidden from assistive tech — it's a picture of a page.
 */
export function ScaledFrame({ designWidth, designHeight, children, className = '', aspectRatio }: Props) {
  const { ref, scale } = useScaleToFit<HTMLDivElement>(designWidth)

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: aspectRatio ?? `${designWidth} / ${designHeight}` }}
      aria-hidden="true"
      inert
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale})`,
          visibility: scale > 0 ? 'visible' : 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  )
}
