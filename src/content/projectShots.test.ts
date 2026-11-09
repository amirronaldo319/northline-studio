import { describe, expect, test } from 'vitest'
import { PROJECTS } from './projects'
import { sizedShots } from './projectShots'

describe('right-sized captures', () => {
  test('every project has a small desktop capture, a small phone capture and a card crop, each its own file', () => {
    const all = PROJECTS.flatMap((project) => Object.values(sizedShots(project.id)).map((image) => image.src))
    expect(all).toHaveLength(PROJECTS.length * 3)
    expect(new Set(all).size).toBe(all.length)
    for (const src of all) expect(src).toMatch(/\.webp$/)
  })

  test('a missing capture is reported by name', () => {
    expect(() => sizedShots('no-such-project')).toThrow(/no-such-project-desktop-600\.webp/)
  })
})
