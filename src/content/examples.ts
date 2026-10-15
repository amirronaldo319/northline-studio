import type { ComponentType } from 'react'
import { CleaningDemo } from '@/components/demos/CleaningDemo'
import { LandscapingDemo } from '@/components/demos/LandscapingDemo'
import type { DemoProps } from '@/components/demos/types'

// The demo is imported directly (not lazily): it is the hero picture, and a lazy boundary would make React
// add inline scripts to the prerendered HTML, which the page's Content-Security-Policy does not allow.

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

/** Concept demos for fictional businesses. Always labelled as concepts on the page. */
export const EXAMPLES: readonly ExampleSite[] = [
  {
    id: 'cleaning',
    name: 'Tidewell Cleaning',
    businessType: 'Home cleaning',
    intent: 'Designed to help busy households see what’s covered and ask for a cleaning quote.',
    approach: 'Bright and friendly, with services laid out as a short list and a quote form that stays within reach.',
    action: 'Request a quote',
    previewHeight: { wide: 623, narrow: 440 },
    Demo: CleaningDemo,
  },
  {
    id: 'landscaping',
    name: 'Fernwood Landscaping',
    businessType: 'Landscaping',
    intent: 'Designed to help homeowners see what is looked after through the seasons and ask for a visit.',
    approach: 'Calm and earthy, with services laid out plainly and the year broken into seasons.',
    action: 'Request a visit',
    previewHeight: { wide: 640, narrow: 470 },
    Demo: LandscapingDemo,
  },
]

/** The concept demo shown in the hero. */
export const HERO_EXAMPLE: ExampleSite = EXAMPLES.find((example) => example.id === 'cleaning') ?? EXAMPLES[0]
