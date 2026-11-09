import type { RefractedTextProps } from '@/components/refracted-text'

/** The site's cobalt, as glass: lighter at the top, deeper at the foot, so the word reads as the brand's blue, lit from above. */
export const HERO_ACCENT_TOP = '#1f78f0'
export const HERO_ACCENT_BOTTOM = '#0a3fa8'

/**
 * Refracted Text on one word of the headline, on the page's light ground. It is the study configuration with these
 * deliberate changes: the light theme; the site's cobalt for the glass, instead of the study's dark steel (which turns
 * to a heavy black word on a white page); a blue beam, not a white one (a white beam on a white page erases the
 * letters' edges where it crosses them and reads as a white border); a softer beam and fringe; the site's own system
 * font in its heaviest weight, the same face as the rest of the headline, instead of the component's wide display
 * lettering; no lift-in (the word is in place from its first frame, so it is never half-drawn while the visitor reads
 * it); and no cursor steering (it must read the same on touch).
 *
 * The system font is narrower than the component's own faces, which it would stretch to fill its box. `HeroAccent`
 * measures the word and gives the box the shape that keeps the letters undistorted (`glassAspect.ts`).
 */
export const HERO_ACCENT_TYPE = {
  /** The same stack as `--font-sans` in index.css, so the glass word and the headline are one typeface on every device. */
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
  fontWeight: 900,
  letterSpacing: '-0.015em',
  extraBold: 0.4,
} as const

export const HERO_ACCENT = {
  theme: 'light',
  topColor: HERO_ACCENT_TOP,
  bottomColor: HERO_ACCENT_BOTTOM,
  beamColor: '#5aa9ff',
  spectrumWarmColor: 'auto',
  spectrumMiddleColor: 'auto',
  spectrumCoolColor: 'auto',
  reveal: false,
  animateBeam: true,
  openingDuration: 6.9,
  duration: 13.2,
  intensity: 0.7,
  dispersion: 0.6,
  colorIntensity: 0.85,
  beamPosition: 0.5,
  fixedBeam: false,
  cursorMovesBeam: false,
  fontSize: '1em',
  ...HERO_ACCENT_TYPE,
  fontHeight: 90,
  cornerRounding: 0.6,
} satisfies Omit<RefractedTextProps, 'text'>
