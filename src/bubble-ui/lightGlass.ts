import type { SoapBubbleMaterialProps } from '@/components/soap-bubble'

/**
 * "Light glass": the approved material for light pages (the site is light-only, `data-theme="light"`).
 *
 * Only what differs from the component's own defaults is listed. The rest of the approved light preset (glass 0.95,
 * film scale 4.85, oil opacity 1, oil edge 18, thickness 480, drainage 0.35, swirl 0.5, reflectivity 1.3,
 * refraction 0.15, dispersion 1, bevel 14) is what the controls already default to, so it is not repeated here.
 * Any value set directly on a control still wins over this shared material.
 */
export const LIGHT_GLASS = {
  iridescence: 0.5,
  oilCoverage: 0.73,
  oilEdgeFade: 2.33,
  clearCenter: 0.57,
  windowLength: 1.3,
  windowMargin: 0.85,
  windowBend: 0.75,
  windowSize: 0.75,
  windowWidth: 0.8,
  windowGradient: 0.96,
  windowHead: 0.7,
  windowTail: 0.6,
  glintSize: 1.65,
  glintIntensity: 0,
  glintDistance: -0.45,
  glintHeight: 0.65,
  windowIntensity: 0.85,
  windowTwin: false,
  bottomShadeColor: '#ffffff',
} satisfies SoapBubbleMaterialProps
