import type { ProjectImage } from './projects'

/**
 * Right-sized versions of each project's captures, so a slot loads about what it draws instead of the full capture
 * (made by scripts/generate-fan-thumbnails.py into src/assets/projects/sized/):
 *
 *   desktopSmall  600x389   cards and tiles up to 600px wide on 1x screens
 *   mobileSmall   390x760   phone frames, which are drawn 130-250px wide
 *   mobileCard    780x880   the top of the phone capture, which is all a card on a phone shows
 *
 * projectShots.test.ts checks that every project has all three.
 */
export type SizedShots = { desktopSmall: ProjectImage; mobileSmall: ProjectImage; mobileCard: ProjectImage }

const files = import.meta.glob('/src/assets/projects/sized/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const url = (name: string): string => {
  const found = files[`/src/assets/projects/sized/${name}.webp`]
  if (!found) throw new Error(`Missing sized capture: ${name}.webp (run scripts/generate-fan-thumbnails.py)`)
  return found
}

export function sizedShots(id: string): SizedShots {
  return {
    desktopSmall: { src: url(`${id}-desktop-600`), width: 600, height: 389 },
    mobileSmall: { src: url(`${id}-mobile-390`), width: 390, height: 760 },
    mobileCard: { src: url(`${id}-mobile-card`), width: 780, height: 880 },
  }
}
