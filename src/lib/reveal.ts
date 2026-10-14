import type { CSSProperties } from 'react'

const STAGGER_MS = 70

/** Inline style that staggers a `.reveal` element by its position in a list. */
export function revealDelay(index: number): CSSProperties {
  return { '--reveal-delay': `${index * STAGGER_MS}ms` } as CSSProperties
}
