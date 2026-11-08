import type { RefractedTextProps } from '@/components/refracted-text'

/**
 * Refracted Text on one word of the headline, on the page's light ground. It is the approved study configuration with
 * four deliberate changes: the light theme, no lift-in (the word is in place from its first frame, so it is never
 * half-drawn while the visitor reads it), a calmer beam, and no cursor steering (it must read the same on touch).
 */
export const HERO_ACCENT = {
  theme: 'light',
  topColor: 'auto',
  bottomColor: 'auto',
  beamColor: 'auto',
  spectrumWarmColor: 'auto',
  spectrumMiddleColor: 'auto',
  spectrumCoolColor: 'auto',
  reveal: false,
  animateBeam: true,
  openingDuration: 6.9,
  duration: 13.2,
  intensity: 0.9,
  dispersion: 1,
  colorIntensity: 0.85,
  beamPosition: 0.5,
  fixedBeam: false,
  cursorMovesBeam: false,
  fontSize: '0.62em',
  fontFamily: "'ReactDrops Square Display', 'Arial Black', sans-serif",
  fontWeight: 900,
  letterSpacing: 'normal',
  extraBold: 2.25,
  fontHeight: 80,
  cornerRounding: 1,
} satisfies Omit<RefractedTextProps, 'text'>
