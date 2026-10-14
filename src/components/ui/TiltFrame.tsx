import { useRef, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Maximum tilt in degrees. Kept small so it reads as depth, not gimmick. */
  maxTilt?: number
}

const supportsFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches

/**
 * Tilts its content a few degrees toward the pointer. Pointer-only: touch devices and visitors who prefer
 * reduced motion get a plain frame. Uses transform only, updated at most once per animation frame.
 */
export function TiltFrame({ children, className = '', maxTilt = 3 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)

  const update = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!supportsFinePointer()) return
    const el = ref.current
    if (!el) return
    const { clientX, clientY } = event

    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const x = (clientX - rect.left) / rect.width - 0.5
      const y = (clientY - rect.top) / rect.height - 0.5
      el.style.setProperty('--tilt-x', `${(-y * maxTilt * 2).toFixed(2)}deg`)
      el.style.setProperty('--tilt-y', `${(x * maxTilt * 2).toFixed(2)}deg`)
    })
  }

  const reset = () => {
    cancelAnimationFrame(frame.current)
    const el = ref.current
    el?.style.setProperty('--tilt-x', '0deg')
    el?.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div ref={ref} onPointerMove={update} onPointerLeave={reset} className={`tilt group ${className}`}>
      {children}
    </div>
  )
}
