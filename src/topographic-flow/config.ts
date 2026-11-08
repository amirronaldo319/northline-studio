import type { TopographicFlowProps } from '@/components/topographic-flow'

/** The approved Topographic Flow configuration, exactly as supplied. */
export const TOPOGRAPHIC_FLOW = {
  animateEntrance: true,
  scale: 480,
  density: 5,
  speed: 1.5,
  distortion: 2.4,
  lineWidth: 1,
  opacity: 1,
  dashLength: 7,
  dashGap: 8,
  seed: 42,
  gradientDiffusion: 0,
  paused: false,
  hover: 0.6,
  hoverRadius: 200,
  hoverFollow: 0.16,
  hoverFade: 0.8,
  hoverEffect: 'rings',
  backgroundColor: '#ffffff',
  backgroundImage: 'none',
  gradientColors: [],
  grain: 0,
  lineColor: '#000000',
  accentColor: '#000000',
  lineStyle: 'solid',
} satisfies TopographicFlowProps
