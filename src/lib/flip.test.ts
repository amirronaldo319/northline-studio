import { describe, expect, test } from 'vitest'
import { canShareElement, flipCss, flipTransform, isInViewport } from './flip'

const thumb = { left: 100, top: 400, width: 600, height: 389 }
const viewer = { left: 20, top: 60, width: 1200, height: 778 }

describe('flipTransform', () => {
  test('places the viewer image exactly over the thumbnail', () => {
    const t = flipTransform(thumb, viewer)
    // Top-left corner of the scaled viewer lands on the thumbnail's top-left corner.
    expect(viewer.left + t.x).toBe(thumb.left)
    expect(viewer.top + t.y).toBe(thumb.top)
    expect(viewer.width * t.scale).toBeCloseTo(thumb.width)
    expect(viewer.height * t.scale).toBeCloseTo(thumb.height, 0)
  })

  test('is the identity when the boxes already match', () => {
    expect(flipTransform(viewer, viewer)).toEqual({ x: 0, y: 0, scale: 1 })
  })

  test('formats a CSS transform', () => {
    expect(flipCss({ x: 10, y: -20, scale: 0.5 })).toBe('translate(10px, -20px) scale(0.5)')
  })
})

describe('canShareElement', () => {
  test('accepts boxes with the same aspect ratio', () => {
    expect(canShareElement(thumb, viewer)).toBe(true)
  })

  test('rejects a cropped thumbnail that would stretch into the full image', () => {
    const phoneCrop = { left: 20, top: 200, width: 350, height: 395 } // 390 / 440 crop
    const phoneFull = { left: 100, top: 40, width: 390, height: 760 }
    expect(canShareElement(phoneCrop, phoneFull)).toBe(false)
  })

  test('rejects missing or collapsed boxes', () => {
    expect(canShareElement(null, viewer)).toBe(false)
    expect(canShareElement(thumb, undefined)).toBe(false)
    expect(canShareElement({ left: 0, top: 0, width: 0, height: 0 }, viewer)).toBe(false)
  })
})

describe('isInViewport', () => {
  const viewport = { width: 1000, height: 800 }
  test('is true for a box on screen', () => expect(isInViewport(thumb, viewport)).toBe(true))
  test('is false for a box scrolled far below', () =>
    expect(isInViewport({ ...thumb, top: 2400 }, viewport)).toBe(false))
  test('is true for a box partly visible', () => expect(isInViewport({ ...thumb, top: -300 }, viewport)).toBe(true))
})
