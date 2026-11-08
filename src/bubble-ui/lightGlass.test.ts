import { describe, expect, test } from 'vitest'
import { soapBubbleSystemDefaults } from '@/components/soap-bubble'
import { normalizeSoapBubble } from '@/components/soap-bubble/soap-bubble-renderer'
import { LIGHT_GLASS } from './lightGlass'

/** What the controls actually draw with: their own defaults, then the shared material on top. */
const effective = normalizeSoapBubble({ ...soapBubbleSystemDefaults, ...LIGHT_GLASS, environment: 'soft' })

describe('Light glass for the Bubble UI page', () => {
  test('matches the approved light preset', () => {
    expect(effective).toMatchObject({
      glass: 0.95,
      iridescence: 0.5,
      filmScale: 4.85,
      oilOpacity: 1,
      oilCoverage: 0.73,
      oilEdge: 18,
      oilEdgeFade: 2.33,
      clearCenter: 0.57,
      thickness: 480,
      drainage: 0.35,
      swirl: 0.5,
      reflectivity: 1.3,
      refraction: 0.15,
      dispersion: 1,
      bevel: 14,
    })
  })

  test('keeps the lighting and reflection settings of the configuration', () => {
    expect(effective).toMatchObject({
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
    })
  })
})
