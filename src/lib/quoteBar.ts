export interface QuoteBarState {
  scrollY: number
  viewportHeight: number
  /** The contact form or the footer is on screen, so the bar would only repeat what is already there. */
  atEnd: boolean
}

/** The phone quote bar appears after the first screen and gets out of the way once the form is reached. */
export function shouldShowQuoteBar({ scrollY, viewportHeight, atEnd }: QuoteBarState): boolean {
  if (atEnd) return false
  return scrollY > viewportHeight * 0.9
}
