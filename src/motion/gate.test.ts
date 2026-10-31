import { afterEach, describe, expect, test, vi } from 'vitest'
import { hasFinePointer, hasWebGL, prefersReducedMotion, wantsLessData } from './gate'

/** Pretends to be a browser whose media queries answer from `matches`. */
function stubBrowser(matches: Record<string, boolean>, extra: Record<string, unknown> = {}) {
  vi.stubGlobal('window', { matchMedia: (query: string) => ({ matches: matches[query] ?? false }) })
  vi.stubGlobal('navigator', { ...extra })
}

afterEach(() => vi.unstubAllGlobals())

describe('motion gates', () => {
  test('reduced motion is read from the visitor preference', () => {
    stubBrowser({ '(prefers-reduced-motion: reduce)': true })
    expect(prefersReducedMotion()).toBe(true)
    stubBrowser({})
    expect(prefersReducedMotion()).toBe(false)
  })

  test('a fine pointer needs both hover and a precise pointer', () => {
    stubBrowser({ '(hover: hover) and (pointer: fine)': true })
    expect(hasFinePointer()).toBe(true)
    stubBrowser({})
    expect(hasFinePointer()).toBe(false)
  })

  test('data saver is detected only when the browser reports it', () => {
    stubBrowser({}, { connection: { saveData: true } })
    expect(wantsLessData()).toBe(true)
    stubBrowser({}, { connection: { saveData: false } })
    expect(wantsLessData()).toBe(false)
    stubBrowser({})
    expect(wantsLessData()).toBe(false)
  })

  test('WebGL is reported missing when a context cannot be created or the canvas throws', () => {
    vi.stubGlobal('document', { createElement: () => ({ getContext: () => null }) })
    expect(hasWebGL()).toBe(false)
    vi.stubGlobal('document', {
      createElement: () => {
        throw new Error('blocked')
      },
    })
    expect(hasWebGL()).toBe(false)
    vi.stubGlobal('document', { createElement: () => ({ getContext: () => ({}) }) })
    expect(hasWebGL()).toBe(true)
  })
})

describe('motion engine under reduced motion', () => {
  test('starts nothing and returns a stop function that is safe to call twice', async () => {
    const listeners: string[] = []
    vi.stubGlobal('window', {
      matchMedia: () => ({
        matches: true,
        addEventListener: (type: string) => listeners.push(type),
        removeEventListener: () => {},
      }),
    })
    const { startMotionEngine } = await import('./engine')
    const stop = startMotionEngine()
    expect(listeners).toEqual(['change'])
    stop()
    expect(() => stop()).not.toThrow()
  })
})
