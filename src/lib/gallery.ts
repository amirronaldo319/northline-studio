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
