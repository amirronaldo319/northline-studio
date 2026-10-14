import { lazy, type ComponentType } from 'react'
import type { DemoProps } from '@/components/demos/types'

// Each demo is its own chunk, fetched only when an example scrolls near or is opened.
const LandscapeDemo = lazy(() => import('@/components/demos/LandscapeDemo').then((m) => ({ default: m.LandscapeDemo })))
const CleaningDemo = lazy(() => import('@/components/demos/CleaningDemo').then((m) => ({ default: m.CleaningDemo })))
const DetailingDemo = lazy(() => import('@/components/demos/DetailingDemo').then((m) => ({ default: m.DetailingDemo })))

export interface ExampleSite {
  id: string
  /** Fictional business name. */
  name: string
  /** Short business type, shown beside the "Concept demo" label. */
  businessType: string
  /** One sentence on the customer need the design serves. Describes intent, never a result. */
  intent: string
  /** How the design approaches that need. */
  approach: string
  /** The action the design makes easy, as it appears on the demo's own button. */
  action: string
  /**
   * Preview crop in design pixels (widths are fixed in DemoPreview): where the picture ends, so it
   * stops at the end of the demo's hero instead of slicing through the next section.
   */
  previewHeight: { wide: number; narrow: number }
  Demo: ComponentType<DemoProps>
}

/** Id of the example shown in the hero. The examples section leads with the others so visitors see range sooner. */
export const HERO_EXAMPLE_ID = 'landscaping'

/** Concept demos for fictional businesses. Always labelled as concepts on the page. */
export const EXAMPLES: readonly ExampleSite[] = [
  {
    id: 'landscaping',
    name: 'Rootline Landscapes',
    businessType: 'Landscaping',
    intent: 'Designed to help homeowners compare services and request a landscaping estimate.',
    approach:
      'A full-width hero sets the tone, services are listed in plain language, and a recent-work gallery lets finished projects carry the page.',
    action: 'Request an estimate',
    previewHeight: { wide: 563, narrow: 420 },
    Demo: LandscapeDemo,
  },
  {
    id: 'cleaning',
    name: 'Tidewell Cleaning',
    businessType: 'Home cleaning',
    intent: 'Designed to help busy households see what’s covered and ask for a cleaning quote.',
    approach: 'Bright and friendly, with services laid out as a short list and a quote form that stays within reach.',
    action: 'Request a quote',
    previewHeight: { wide: 623, narrow: 520 },
    Demo: CleaningDemo,
  },
  {
    id: 'detailing',
    name: 'Northgloss Detailing',
    businessType: 'Auto detailing',
    intent: 'Designed to help car owners compare packages and request a booking.',
    approach: 'A dark, high-contrast layout with one sharp accent colour and packages that are easy to compare.',
    action: 'Request a booking',
    previewHeight: { wide: 623, narrow: 520 },
    Demo: DetailingDemo,
  },
]

export const HERO_EXAMPLE: ExampleSite = EXAMPLES.find((example) => example.id === HERO_EXAMPLE_ID) ?? EXAMPLES[0]

/** Examples shown first in the portfolio, so the hero example is not repeated at full size. */
export const LEAD_EXAMPLES: readonly ExampleSite[] = EXAMPLES.filter((example) => example.id !== HERO_EXAMPLE.id)
