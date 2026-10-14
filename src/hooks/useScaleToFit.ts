import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Scales a fixed-width design (e.g. a 1280px desktop page) down to fit its container.
 * Returns a ref for the container and the scale factor to apply.
 */
export function useScaleToFit<T extends HTMLElement>(designWidth: number) {
  const ref = useRef<T>(null)
  const [scale, setScale] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => setScale(el.clientWidth / designWidth)
    update()

    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth])

  return { ref, scale }
}
