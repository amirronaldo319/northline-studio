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

describe('motion engine startup', () => {
  /** A minimal browser that records which event listeners are attached. */
  function stubEngineBrowser(reduced: boolean) {
    const listeners = new Map<string, Set<unknown>>()
    const add = (type: string, fn: unknown) => listeners.set(type, (listeners.get(type) ?? new Set()).add(fn))
    const remove = (type: string, fn: unknown) => listeners.get(type)?.delete(fn)
    vi.stubGlobal('window', {
      matchMedia: () => ({ matches: reduced, addEventListener: add.bind(null, 'media'), removeEventListener: remove.bind(null, 'media') }),
      addEventListener: add,
      removeEventListener: remove,
      setTimeout: () => 1,
      clearTimeout: () => {},
    })
    vi.stubGlobal('document', { readyState: 'loading', addEventListener: (type: string, fn: unknown) => add(`doc-${type}`, fn), removeEventListener: (type: string, fn: unknown) => remove(`doc-${type}`, fn) })
    const count = (type: string) => listeners.get(type)?.size ?? 0
    return { count }
  }

  test('waits for the visitor to scroll or the page to settle, and removes its listeners when stopped', async () => {
    const { count } = stubEngineBrowser(false)
    const { startMotionEngine } = await import('./engine')
    const stop = startMotionEngine()
    const types = ['wheel', 'touchstart', 'scroll', 'keydown', 'load', 'media', 'doc-click']
    for (const type of types) expect(count(type), type).toBe(1)
    stop()
    for (const type of types) expect(count(type), type).toBe(0)
    expect(() => stop()).not.toThrow()
  })

  test('under reduced motion it still stops cleanly and never starts the engine', async () => {
    const { count } = stubEngineBrowser(true)
    const { startMotionEngine } = await import('./engine')
    const stop = startMotionEngine()
    expect(count('media')).toBe(1)
    expect(count('doc-click')).toBe(0)
    stop()
    expect(count('media')).toBe(0)
  })
})
