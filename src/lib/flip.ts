/** A rectangle in viewport pixels, as returned by getBoundingClientRect(). */
export interface Box {
  left: number
  top: number
  width: number
  height: number
}

export interface FlipTransform {
  /** Horizontal and vertical offset, in px, that places the element's top-left corner on the origin box. */
  x: number
  y: number
  /** Uniform scale that makes the element the size of the origin box. */
  scale: number
}

/** How far the two aspect ratios may differ before a shared-element transition would visibly distort. */
const MAX_ASPECT_DIFFERENCE = 0.04

const hasArea = (box: Box) => box.width > 1 && box.height > 1

/**
 * The transform that makes an element laid out at `to` appear exactly over `from`.
 * Animating from this transform to none grows (or shrinks) the element between the two boxes.
 * Use with transform-origin: top left.
 */
export function flipTransform(from: Box, to: Box): FlipTransform {
  return {
    x: from.left - to.left,
    y: from.top - to.top,
    scale: from.width / to.width,
  }
}

/**
 * Whether a shared-element transition between two boxes is safe: both have real size and the same
 * aspect ratio, so a uniform scale looks like one object moving rather than a picture stretching.
 */
export function canShareElement(from: Box | null | undefined, to: Box | null | undefined): boolean {
  if (!from || !to || !hasArea(from) || !hasArea(to)) return false
  const difference = Math.abs(from.width / from.height - to.width / to.height) / (to.width / to.height)
  return difference <= MAX_ASPECT_DIFFERENCE
}

/** Whether a box is at least partly inside the viewport, so animating back to it will be seen. */
export function isInViewport(box: Box, viewport: { width: number; height: number }): boolean {
  return box.left < viewport.width && box.left + box.width > 0 && box.top < viewport.height && box.top + box.height > 0
}

/** CSS transform string for a FlipTransform. */
export function flipCss({ x, y, scale }: FlipTransform): string {
  return `translate(${x}px, ${y}px) scale(${scale})`
}
