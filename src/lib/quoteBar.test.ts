import { describe, expect, test } from 'vitest'
import { shouldShowQuoteBar } from './quoteBar'

const base = { scrollY: 900, viewportHeight: 700, atEnd: false }

describe('shouldShowQuoteBar', () => {
  test('stays hidden while the first screen is still showing', () => {
    expect(shouldShowQuoteBar({ ...base, scrollY: 200 })).toBe(false)
  })

  test('appears once the visitor has scrolled past the first screen', () => {
    expect(shouldShowQuoteBar(base)).toBe(true)
  })

  test('hides once the contact form or footer is on screen', () => {
    expect(shouldShowQuoteBar({ ...base, atEnd: true })).toBe(false)
  })
})
