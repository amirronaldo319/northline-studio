import { useEffect, type RefObject } from 'react'
import { DRAG_THRESHOLD_PX, dragRestingPlace } from '@/lib/gallery'

/** How long to wait for a settling scroll to finish where the browser has no `scrollend` event. */
const SETTLE_FALLBACK_MS = 700

/**
 * The scroll positions at which each child of `scroller` comes to rest where the first child rests at the start. A
 * child's distance from the first child is the same at every scroll position, so this needs no padding arithmetic.
 */
function snapPositions(scroller: HTMLElement): number[] {
  const tiles = Array.from(scroller.children)
  if (tiles.length === 0) return []
  const rtl = getComputedStyle(scroller).direction === 'rtl'
  const first = tiles[0].getBoundingClientRect()
  const max = scroller.scrollWidth - scroller.clientWidth
  return tiles.map((tile) => {
    const rect = tile.getBoundingClientRect()
    return rtl ? Math.max(-max, rect.right - first.right) : Math.min(max, rect.left - first.left)
  })
}

/**
 * Lets a mouse drag a sideways scroller, as a finger does. Touch and trackpads already scroll it natively, so only a
 * mouse is handled. A press only becomes a drag once it has moved a few pixels, so plain clicks still work; once it is
 * a drag, the click at the end of it is swallowed, so letting go over a screenshot or a link never opens it. On release
 * the row glides on a little in the direction of the throw and settles on the nearest tile (at once, under reduced
 * motion). Snapping is paused while the pointer holds the row, so it follows the pointer exactly.
 */
export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scroller = ref.current
    if (!scroller) return

    let pointerId: number | null = null
    let startX = 0
    let startLeft = 0
    let lastX = 0
    let lastTime = 0
    let velocity = 0
    let isDragging = false
    let settleTimer = 0

    const endSettle = () => {
      window.clearTimeout(settleTimer)
      scroller.removeEventListener('scrollend', endSettle)
      delete scroller.dataset.settling
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return
      endSettle()
      pointerId = event.pointerId
      startX = lastX = event.clientX
      startLeft = scroller.scrollLeft
      lastTime = event.timeStamp
      velocity = 0
      isDragging = false
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return
      const moved = event.clientX - startX
      if (!isDragging) {
        if (Math.abs(moved) < DRAG_THRESHOLD_PX) return
        isDragging = true
        scroller.setPointerCapture(event.pointerId)
        scroller.dataset.dragging = ''
        window.getSelection()?.removeAllRanges()
      }
      scroller.scrollLeft = startLeft - moved
      const elapsed = event.timeStamp - lastTime
      if (elapsed > 0) velocity = (event.clientX - lastX) / elapsed
      lastX = event.clientX
      lastTime = event.timeStamp
    }

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return
      pointerId = null
      if (!isDragging) return
      isDragging = false
      if (scroller.hasPointerCapture(event.pointerId)) scroller.releasePointerCapture(event.pointerId)

      // A pause before letting go means no throw.
      if (event.timeStamp - lastTime > 80) velocity = 0
      const target = dragRestingPlace(scroller.scrollLeft, velocity, snapPositions(scroller))
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Snapping stays paused until the row has settled on the tile, so the browser never pulls it elsewhere.
      delete scroller.dataset.dragging
      scroller.dataset.settling = ''
      scroller.addEventListener('scrollend', endSettle, { once: true })
      settleTimer = window.setTimeout(endSettle, reduce ? 0 : SETTLE_FALLBACK_MS)
      scroller.scrollTo({ left: target, behavior: reduce ? 'auto' : 'smooth' })

      // The click that ends a drag lands on whatever is under the pointer; it must not open it.
      const swallow = (click: MouseEvent) => {
        click.preventDefault()
        click.stopPropagation()
      }
      scroller.addEventListener('click', swallow, { capture: true, once: true })
      window.setTimeout(() => scroller.removeEventListener('click', swallow, { capture: true }), 0)
    }

    // Screenshots and links would otherwise start the browser's own drag-and-drop.
    const onDragStart = (event: DragEvent) => event.preventDefault()

    scroller.addEventListener('pointerdown', onPointerDown)
    scroller.addEventListener('pointermove', onPointerMove)
    scroller.addEventListener('pointerup', onPointerUp)
    scroller.addEventListener('pointercancel', onPointerUp)
    scroller.addEventListener('dragstart', onDragStart)
    return () => {
      endSettle()
      scroller.removeEventListener('pointerdown', onPointerDown)
      scroller.removeEventListener('pointermove', onPointerMove)
      scroller.removeEventListener('pointerup', onPointerUp)
      scroller.removeEventListener('pointercancel', onPointerUp)
      scroller.removeEventListener('dragstart', onDragStart)
    }
  }, [ref])
}
