import type { TopographicFlowProps } from '@/components/topographic-flow'

/**
 * Topographic Flow behind the hero, in the site's cobalt and kept faint: the contours are scenery, and the headline
 * and buttons in front stay the loudest thing on the screen. Phones get fewer, slower, finer lines, and no pointer
 * effect (there is no pointer).
 */
const SHARED = {
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  gradientColors: [],
  gradientDiffusion: 0,
  grain: 0,
  lineColor: '#0071e3',
  accentColor: '#0058b0',
  lineStyle: 'mixed',
  lineWidth: 1,
  dashLength: 7,
  dashGap: 8,
  hover: 0,
  seed: 42,
} satisfies TopographicFlowProps

export const HERO_TOPOGRAPHY_DESKTOP = {
  ...SHARED,
  scale: 420,
  density: 4,
  speed: 0.55,
  distortion: 1.8,
  opacity: 0.4,
} satisfies TopographicFlowProps

export const HERO_TOPOGRAPHY_PHONE = {
  ...SHARED,
  scale: 250,
  density: 3,
  speed: 0.4,
  distortion: 1.4,
  opacity: 0.34,
} satisfies TopographicFlowProps
