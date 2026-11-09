import { describe, expect, it } from 'vitest'
import { glassAspect } from './glassAspect'

describe('glassAspect', () => {
  it('gives a box that keeps the ink\'s own proportions', () => {
    // 6 letters: 2364 x 318 virtual canvas, ink drawn into 2304 x 278.
    const ink = { left: 0, right: 1200, ascent: 250, descent: 0 }
    const aspect = glassAspect(ink, 0, 6)
    expect(aspect).not.toBeNull()
    // The box is wider than the ink by the margins, and taller by the top and bottom margins: ink 4.8:1 -> about 4.3:1.
    expect(aspect).toBeCloseTo((2364 / 318) * ((278 / 250) / (2304 / 1200)), 6)
    const boxWidth = 1000
    const boxHeight = boxWidth / (aspect as number)
    const inkScaleX = (boxWidth * (2304 / 2364)) / 1200
    const inkScaleY = (boxHeight * (278 / 318)) / 250
    expect(inkScaleX).toBeCloseTo(inkScaleY, 6)
  })

  it('is the shape the renderer already assumes when the ink has the shape the wide display faces have', () => {
    // A word whose ink is exactly the renderer's own 2304 x 278 fill needs the unchanged 394 x 318 per letter box.
    expect(glassAspect({ left: 0, right: 2304, ascent: 278, descent: 0 }, 0, 6)).toBeCloseTo(2364 / 318, 6)
  })

  it('widens the ink and the height by the stroke the component adds', () => {
    const plain = glassAspect({ left: 10, right: 1000, ascent: 250, descent: 5 }, 0, 6) as number
    const bold = glassAspect({ left: 10, right: 1000, ascent: 250, descent: 5 }, 1, 6) as number
    expect(bold).not.toBe(plain)
    // The component clamps the stroke to 6 percent, and treats a non-number as none.
    expect(glassAspect({ left: 10, right: 1000, ascent: 250, descent: 5 }, 40, 6)).toBe(
      glassAspect({ left: 10, right: 1000, ascent: 250, descent: 5 }, 6, 6),
    )
    expect(glassAspect({ left: 10, right: 1000, ascent: 250, descent: 5 }, Number.NaN, 6)).toBe(plain)
  })

  it('returns nothing it cannot trust', () => {
    expect(glassAspect({ left: 0, right: 0, ascent: 0, descent: 0 }, 0, 6)).toBeNull()
    expect(glassAspect({ left: 5, right: 100, ascent: 0, descent: 0 }, 0, 6)).toBeNull()
    expect(glassAspect({ left: 5, right: 100, ascent: 50, descent: 0 }, 0, 0)).toBeNull()
  })
})
