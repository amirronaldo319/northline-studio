/** A pixel of slack, so sub-pixel scroll positions still count as the start or the end. */
const SLACK_PX = 2

/**
 * Whether a sideways scroller is at its start or its end. Right-to-left scrollers report negative positions, so
 * the distance from the start is the absolute value either way.
 */
export function galleryEdges(scrollLeft: number, clientWidth: number, scrollWidth: number): { atStart: boolean; atEnd: boolean } {
  const travelled = Math.abs(scrollLeft)
  return {
    atStart: travelled <= SLACK_PX,
    atEnd: travelled + clientWidth >= scrollWidth - SLACK_PX,
  }
}

/** How far a mouse has to move before a press on the gallery becomes a drag rather than a click. */
export const DRAG_THRESHOLD_PX = 6

/** How long a released drag glides on at its last speed before it settles on a tile. */
export const DRAG_GLIDE_MS = 220

/**
 * Where a released drag comes to rest: the snap position closest to where its glide would carry it. `snaps` are the
 * scroll positions at which each tile is aligned; `velocity` is the pointer's horizontal speed in px per ms. The
 * content follows the pointer, so the scroll position moves against it: a throw to the left carries the gallery on to
 * later tiles in a left-to-right page.
 */
export function dragRestingPlace(scrollLeft: number, velocity: number, snaps: readonly number[]): number {
  if (snaps.length === 0) return scrollLeft
  const projected = scrollLeft - velocity * DRAG_GLIDE_MS
  return snaps.reduce((best, snap) => (Math.abs(snap - projected) < Math.abs(best - projected) ? snap : best), snaps[0])
}
