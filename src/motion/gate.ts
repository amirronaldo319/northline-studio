/** Browser capability checks shared by every motion feature. Call these only in the browser (effects, handlers). */

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** A mouse or trackpad, as opposed to a touch screen. Smooth scrolling and pointer effects need one. */
export function hasFinePointer(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

/** The visitor has asked the browser to save data, so heavy visuals are skipped. */
export function wantsLessData(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return connection?.saveData === true
}

export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}
