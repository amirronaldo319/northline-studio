import type { ComponentType } from 'react'
import { CleaningDemo } from '@/components/demos/CleaningDemo'
import { LandscapingDemo } from '@/components/demos/LandscapingDemo'
import type { DemoProps } from '@/components/demos/types'

// The demos are imported directly (not lazily): the first is the hero picture, and a lazy boundary would make React
// add inline scripts to the prerendered HTML, which the page's Content-Security-Policy does not allow.

/**
 * A concept demo for a fictional business. Its name is the fictional business's own (it stays as it is in every
 * language); the description of it lives in the language dictionaries (`examples` in src/i18n).
 */
export interface ExampleSite {
  id: string
  /** Fictional business name. */
  name: string
  /**
   * Preview crop in design pixels (widths are fixed in DemoPreview): where the picture ends, so it
   * stops at the end of the demo's hero instead of slicing through the next section.
   */
  previewHeight: { wide: number; narrow: number }
  Demo: ComponentType<DemoProps>
}

/** Concept demos for fictional businesses. Always labelled as concepts on the page. */
export const EXAMPLES: readonly ExampleSite[] = [
  { id: 'cleaning', name: 'Tidewell Cleaning', previewHeight: { wide: 623, narrow: 440 }, Demo: CleaningDemo },
  { id: 'landscaping', name: 'Fernwood Landscaping', previewHeight: { wide: 640, narrow: 470 }, Demo: LandscapingDemo },
]

/** The concept demo shown in the hero. */
export const HERO_EXAMPLE: ExampleSite = EXAMPLES.find((example) => example.id === 'cleaning') ?? EXAMPLES[0]
