import { describe, expect, test } from 'vitest'
import { galleryEdges } from './gallery'

describe('gallery edges', () => {
  test('a gallery at rest is at its start', () => {
    expect(galleryEdges(0, 400, 1600)).toEqual({ atStart: true, atEnd: false })
  })

  test('scrolled to the last tile, it is at its end', () => {
    expect(galleryEdges(1200, 400, 1600)).toEqual({ atStart: false, atEnd: true })
  })

  test('right-to-left scrollers count negative positions the same way', () => {
    expect(galleryEdges(-600, 400, 1600)).toEqual({ atStart: false, atEnd: false })
    expect(galleryEdges(-1200, 400, 1600)).toEqual({ atStart: false, atEnd: true })
  })

  test('a gallery whose tiles all fit is at both ends', () => {
    expect(galleryEdges(0, 1600, 1600)).toEqual({ atStart: true, atEnd: true })
  })

  test('sub-pixel positions still count as the edge', () => {
    expect(galleryEdges(1.4, 400, 1600).atStart).toBe(true)
    expect(galleryEdges(1198.8, 400, 1600).atEnd).toBe(true)
  })
})
