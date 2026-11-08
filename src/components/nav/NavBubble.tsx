import { useEffect, useRef } from 'react'
import { SoapBubbleMaterial, SoapBubbleSurface, type SoapBubbleRenderer } from '@/components/soap-bubble'
import { LIGHT_GLASS } from '@/lib/lightGlass'
import { NAV_BUBBLE } from './navBubble'

/**
 * The Bubble UI material that fills the marker under the active link. The marker is positioned and slid by CSS; this
 * only draws the bubble in it. While the marker is sliding, the film is redrawn every frame so that it stays matched to
 * where the marker is, then it rests.
 */
export default function NavBubble({ index, reducedMotion }: { index: number; reducedMotion: boolean }) {
  const renderer = useRef<SoapBubbleRenderer | null>(null)

  useEffect(() => {
    let frame = 0
    const until = performance.now() + 700
    const step = () => {
      renderer.current?.invalidate()
      frame = performance.now() < until ? window.requestAnimationFrame(step) : 0
    }
    frame = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frame)
  }, [index])

  return (
    <SoapBubbleMaterial {...LIGHT_GLASS}>
      <SoapBubbleSurface
        {...NAV_BUBBLE}
        paused={reducedMotion}
        wobble={reducedMotion ? 0 : NAV_BUBBLE.wobble}
        rendererRef={renderer}
        className="nav-bubble"
        aria-hidden="true"
      />
    </SoapBubbleMaterial>
  )
}
