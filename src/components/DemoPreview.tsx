import { Suspense } from 'react'
import type { ExampleSite } from '@/content/examples'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { LazyMount } from './LazyMount'
import { ScaledFrame } from './ui/ScaledFrame'

// Wide screens show the demo's desktop layout, scaled to fit.
const WIDE_WIDTH = 960
// Phones render the demo's own phone layout at roughly life size, so text stays readable.
const NARROW_WIDTH = 390

type Props = {
  example: ExampleSite
  /** Mount immediately (hero) instead of waiting until the preview nears the viewport. */
  isEager?: boolean
}

/**
 * A scaled, non-interactive picture of a concept demo. Reserves its space up front.
 * Always rendered inside a labelled control or caption by the caller.
 */
export function DemoPreview({ example, isEager = false }: Props) {
  const isWide = useMediaQuery('(min-width: 640px)')
  const width = isWide ? WIDE_WIDTH : NARROW_WIDTH
  const height = isWide ? example.previewHeight.wide : example.previewHeight.narrow
  const { Demo } = example
  const placeholder = <div className="h-full w-full bg-paper-2" />

  const content = (
    <Suspense fallback={placeholder}>
      <Demo />
    </Suspense>
  )

  return (
    <ScaledFrame designWidth={width} designHeight={height}>
      {isEager ? (
        content
      ) : (
        <LazyMount className="h-full w-full" fallback={placeholder}>
          {content}
        </LazyMount>
      )}
    </ScaledFrame>
  )
}
