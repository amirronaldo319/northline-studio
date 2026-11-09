/**
 * The width-to-height shape the glass word's box must have for its letters to come out undistorted.
 *
 * Refracted Text draws the word into a virtual canvas that is 394 units wide per letter and 318 tall, then stretches
 * the ink to fill 30 units in from the sides and 20 in from the top and bottom. Its own lettering is wide enough
 * that the stretch is slight. A narrower face, such as the system font used by the rest of the headline, would be
 * pulled out sideways and look falsely extended. The fix is to give the box the shape the stretch assumes, so
 * the letters keep the proportions the font drew them in. These are the renderer's own numbers
 * (`refracted-renderer.ts`, in the mask drawing code); keep them in step.
 */
const UNITS_PER_LETTER = 394
const CANVAS_HEIGHT = 318
const INK_MARGIN_X = 60
const INK_HEIGHT = 278

export interface GlassInk {
  /** Distance the ink reaches left of, and right of, the text origin. */
  left: number
  right: number
  /** The taller of the capital height and the run's own height above the baseline, and the run's depth below it. */
  ascent: number
  descent: number
}

/** `extraBold` is the component's stroke thickening, as a percentage of the ink height (the component caps it at 6). */
export function glassAspect(ink: GlassInk, extraBold: number, letters: number): number | null {
  const stroke = ((ink.ascent + ink.descent) * (Number.isFinite(extraBold) ? Math.max(0, Math.min(6, extraBold)) : 0)) / 100
  const width = ink.left + ink.right + stroke * 2
  const height = ink.ascent + ink.descent + stroke * 2
  const virtualWidth = letters * UNITS_PER_LETTER
  if (!(width > 0) || !(height > 0) || !(letters >= 1) || virtualWidth <= INK_MARGIN_X) return null
  const scaleX = (virtualWidth - INK_MARGIN_X) / width
  const scaleY = INK_HEIGHT / height
  const aspect = (virtualWidth / CANVAS_HEIGHT) * (scaleY / scaleX)
  return Number.isFinite(aspect) && aspect > 0 ? aspect : null
}

export interface GlassTypography {
  fontFamily: string
  fontWeight: number | string
  letterSpacing: string
  extraBold: number
}

/** Measures the word the way the renderer does (342px type, kerning on) and returns its undistorted box shape. */
export function measureGlassAspect(text: string, type: GlassTypography): number | null {
  if (typeof document === 'undefined') return null
  const context = document.createElement('canvas').getContext('2d')
  if (!context) return null
  context.font = `${type.fontWeight} 342px ${type.fontFamily}`
  context.fontKerning = 'normal'
  context.letterSpacing = type.letterSpacing
  const run = context.measureText(text)
  const capital = context.measureText('H').actualBoundingBoxAscent
  return glassAspect(
    {
      left: run.actualBoundingBoxLeft,
      right: run.actualBoundingBoxRight,
      ascent: Math.max(capital, run.actualBoundingBoxAscent),
      descent: Math.max(0, run.actualBoundingBoxDescent),
    },
    type.extraBold,
    Array.from(text).length,
  )
}
