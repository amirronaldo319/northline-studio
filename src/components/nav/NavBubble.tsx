import { useEffect, useRef, useState } from 'react'
import { SoapBubbleMaterial, SoapBubbleSurface, type SoapBubbleRenderer } from '@/components/soap-bubble'
import { LIGHT_GLASS } from '@/lib/lightGlass'
import { NAV_BUBBLE } from './navBubble'

/** How long the film keeps drifting after the bubble lands on a link, before it rests. */
const REST_AFTER_MS = 2400

/**
 * The Bubble UI material that fills the marker under the active link. The marker is positioned and slid by CSS; this
 * only draws the bubble in it. While the marker is sliding, the film is redrawn every frame so that it stays matched to
 * where the marker is; it drifts a little longer, then rests.
 *
 * Resting matters: an unpaused bubble redraws 30 times a second for as long as the page is open, and each redraw copies
 * its WebGL buffer into the marker's canvas. Measured while reading a section with the bar on screen, that was about a
 * third of the main thread on a mid-range desktop. Once the film has settled the surface is paused (the component still
 * answers the pointer while paused), and it wakes when the active link changes.
 */
export default function NavBubble({ index, reducedMotion }: { index: number; reducedMotion: boolean }) {
  const renderer = useRef<SoapBubbleRenderer | null>(null)
  // The link the film has come to rest on; any other active link means it is awake.
  const [restedOn, setRestedOn] = useState<number | null>(null)

  useEffect(() => {
    let frame = 0
    const until = performance.now() + 700
    const step = () => {
      renderer.current?.invalidate()
      frame = performance.now() < until ? window.requestAnimationFrame(step) : 0
    }
    frame = window.requestAnimationFrame(step)
    const rest = window.setTimeout(() => setRestedOn(index), REST_AFTER_MS)
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(rest)
    }
  }, [index])

  const resting = restedOn === index

  return (
    <SoapBubbleMaterial {...LIGHT_GLASS}>
      <SoapBubbleSurface
        {...NAV_BUBBLE}
        paused={reducedMotion || resting}
        wobble={reducedMotion ? 0 : NAV_BUBBLE.wobble}
        rendererRef={renderer}
        className="nav-bubble"
        aria-hidden="true"
      />
    </SoapBubbleMaterial>
  )
}
