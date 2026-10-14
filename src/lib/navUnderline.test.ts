import { describe, expect, test } from 'vitest'
import { underlineFor, underlineTarget } from './navUnderline'

describe('underlineFor', () => {
  test('spans the link text, inside its padding', () => {
    expect(underlineFor({ left: 40, width: 100 }, 14)).toEqual({ x: 54, width: 72 })
  })

  test('never returns a negative width', () => {
    expect(underlineFor({ left: 0, width: 10 }, 14).width).toBe(0)
  })
})

describe('underlineTarget', () => {
  test('sits under the active section by default', () => {
    expect(underlineTarget({ hovered: null, focused: null, active: 2 })).toBe(2)
  })

  test('hover takes over, then the active section is restored', () => {
    expect(underlineTarget({ hovered: 4, focused: null, active: 1 })).toBe(4)
    expect(underlineTarget({ hovered: null, focused: null, active: 1 })).toBe(1)
  })

  test('keyboard focus highlights its link when nothing is hovered', () => {
    expect(underlineTarget({ hovered: null, focused: 3, active: 0 })).toBe(3)
  })

  test('shows nothing when no section is active and nothing is hovered', () => {
    expect(underlineTarget({ hovered: null, focused: null, active: null })).toBeNull()
  })
})
