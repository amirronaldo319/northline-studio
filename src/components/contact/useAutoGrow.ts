import { useEffect, type RefObject } from 'react'

/** The parts of a text area the measurement reads and writes. */
export type GrowBox = Pick<HTMLTextAreaElement, 'scrollHeight' | 'offsetHeight' | 'clientHeight'> & {
  style: { height: string }
}

/** True where the stylesheet's `field-sizing: content` already grows the box with its text. */
export function growsByItself(): boolean {
  return typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('field-sizing', 'content')
}

/**
 * Sets the box's height to its text's (plus its borders). It is measured with the height taken away, so the box can
 * shrink again and its `rows` do not count as text; the stylesheet's min-height keeps it from collapsing meanwhile.
 */
export function fitToText(box: GrowBox): void {
  box.style.height = '0px'
  const borders = box.offsetHeight - box.clientHeight
  box.style.height = `${box.scrollHeight + borders}px`
}

/**
 * Keeps a text area as tall as what is typed in it. Current browsers do this from CSS (`field-sizing: content` on
 * `.field-textarea`); Safari before 26.2 and older Firefox do not, and with the resize grip removed their box would
 * stay five lines tall and scroll. There the height is measured after each change instead. The stylesheet's
 * min-height and max-height still bound it, so a long message scrolls inside the box rather than pushing the page.
 */
export function useAutoGrow(ref: RefObject<HTMLTextAreaElement | null>, value: string): void {
  useEffect(() => {
    if (ref.current && !growsByItself()) fitToText(ref.current)
  }, [ref, value])
}
