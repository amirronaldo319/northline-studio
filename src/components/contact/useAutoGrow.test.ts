import { afterEach, describe, expect, test, vi } from 'vitest'
import { fitToText, growsByItself, type GrowBox } from './useAutoGrow'

/** A text area as a browser would report it: at its minimum height it is 146px with borders, 144px inside them. */
function box(scrollHeight: number): GrowBox & { heights: string[] } {
  const heights: string[] = []
  return {
    heights,
    scrollHeight,
    offsetHeight: 146,
    clientHeight: 144,
    style: {
      get height() {
        return heights.at(-1) ?? ''
      },
      set height(value: string) {
        heights.push(value)
      },
    },
  }
}

afterEach(() => vi.unstubAllGlobals())

describe('message box that grows with its text', () => {
  test('the height is the text’s plus the borders, measured from the natural height', () => {
    const tall = box(300)
    fitToText(tall)
    // The height is taken away first (so a shorter text can shrink the box), then set to the text plus two 1px borders.
    expect(tall.heights).toEqual(['0px', '302px'])
  })

  test('the script steps aside where CSS field-sizing does the job', () => {
    vi.stubGlobal('CSS', { supports: (property: string, value: string) => property === 'field-sizing' && value === 'content' })
    expect(growsByItself()).toBe(true)
    vi.stubGlobal('CSS', { supports: () => false })
    expect(growsByItself()).toBe(false)
    vi.stubGlobal('CSS', undefined)
    expect(growsByItself()).toBe(false)
  })
})
