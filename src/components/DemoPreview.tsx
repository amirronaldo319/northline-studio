import { Suspense, type CSSProperties } from 'react'
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

  // The frame's shape comes from CSS (see `.demo-frame`), so the page reserves the right space before any
  // script has run, on phones and on desktops alike.
  const shape = {
    '--demo-ar-narrow': `${NARROW_WIDTH} / ${example.previewHeight.narrow}`,
    '--demo-ar-wide': `${WIDE_WIDTH} / ${example.previewHeight.wide}`,
  } as CSSProperties

  return (
    <div className="demo-frame" style={shape}>
    <ScaledFrame designWidth={width} designHeight={height} aspectRatio="var(--demo-ar)">
      {isEager ? (
        content
      ) : (
        <LazyMount className="h-full w-full" fallback={placeholder}>
          {content}
        </LazyMount>
      )}
    </ScaledFrame>
    </div>
  )
}
