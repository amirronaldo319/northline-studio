import type { CSSProperties } from 'react'

/** Stagger steps beyond this index share the last delay, so a long list never takes seconds to appear. */
const MAX_STAGGER_STEPS = 4

/** Inline style that staggers a `.reveal` element by its position in a group. */
export function revealDelay(index: number): CSSProperties {
  return { '--reveal-step': Math.min(index, MAX_STAGGER_STEPS) } as CSSProperties
}

/** Inline style that places an `.enter` element in the hero entrance sequence (0 = first). */
export function enterStep(index: number): CSSProperties {
  return { '--i': Math.min(index, MAX_STAGGER_STEPS) } as CSSProperties
}
