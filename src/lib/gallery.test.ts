import { describe, expect, test } from 'vitest'
import { dragRestingPlace, galleryEdges } from './gallery'

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

describe('where a mouse drag comes to rest', () => {
  const snaps = [0, 400, 800, 1200]

  test('a slow release settles on the nearest tile', () => {
    expect(dragRestingPlace(380, 0, snaps)).toBe(400)
    expect(dragRestingPlace(150, 0, snaps)).toBe(0)
  })

  test('a quick throw to the left carries on to the next tile', () => {
    // Pointer moving left at 1px/ms: the content glides on towards higher scroll positions.
    expect(dragRestingPlace(450, -1, snaps)).toBe(800)
  })

  test('a quick throw to the right goes back a tile', () => {
    expect(dragRestingPlace(750, 1, snaps)).toBe(400)
  })

  test('right-to-left galleries use the same rule on negative positions', () => {
    expect(dragRestingPlace(-450, 1, [0, -400, -800])).toBe(-800)
  })

  test('with no tiles it stays where it is', () => {
    expect(dragRestingPlace(120, 2, [])).toBe(120)
  })
})
