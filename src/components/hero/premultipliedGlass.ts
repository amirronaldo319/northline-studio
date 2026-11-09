/**
 * Keeps the glass word's canvas from showing a white box on phones.
 *
 * Refracted Text asks for a WebGL canvas with `premultipliedAlpha: false` and writes plain (not premultiplied) colour:
 * every pixel around the letters is written as a pale colour with zero alpha. A browser that composites that canvas as
 * premultiplied adds the pale colour to the page instead of ignoring it, and the whole canvas shows as a white rectangle
 * behind the word. Desktop Chrome and Linux WebKit honour the flag, so the box only shows on some phones.
 *
 * The fix is to ask for the premultiplied canvas that every browser composites the same way, and to have the GPU
 * premultiply what the shader writes (colour times alpha) as it is drawn. Letters come out the same, and a pixel with
 * zero alpha is zero in every channel, so there is nothing left to add. Only canvases inside the hero's glass layer are
 * touched; the component itself is not edited.
 */
const GLASS_SCOPE = '.hero-accent-layer'

type GetContext = (this: HTMLCanvasElement, contextId: string, options?: unknown) => unknown

interface BlendTarget {
  enable: (capability: number) => void
  blendFuncSeparate: (srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number) => void
  BLEND: number
  SRC_ALPHA: number
  ZERO: number
  ONE: number
}

function isBlendTarget(value: unknown): value is BlendTarget {
  return typeof value === 'object' && value !== null && typeof (value as BlendTarget).blendFuncSeparate === 'function'
}

/** Makes every draw write colour already multiplied by its alpha (and alpha unchanged). */
export function premultiplyOutput(gl: BlendTarget): void {
  gl.enable(gl.BLEND)
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ZERO, gl.ONE, gl.ZERO)
}

const patched = new WeakSet<object>()

/**
 * Wraps `getContext` on the given canvas prototype so a WebGL2 context requested for a canvas inside the glass layer is
 * premultiplied. Safe to call more than once; returns a function that puts the original back (used by the tests).
 */
export function installPremultipliedGlass(
  prototype: { getContext: unknown } | undefined = typeof HTMLCanvasElement === 'undefined' ? undefined : HTMLCanvasElement.prototype,
  scope: string = GLASS_SCOPE,
): () => void {
  if (!prototype || patched.has(prototype)) return () => undefined
  const original = prototype.getContext as GetContext
  const prepared = new WeakSet<object>()
  prototype.getContext = function (this: HTMLCanvasElement, contextId: string, options?: unknown) {
    if (contextId !== 'webgl2' || !this.closest(scope)) return original.call(this, contextId, options)
    const wanted = { ...(typeof options === 'object' && options !== null ? options : {}), premultipliedAlpha: true }
    const context = original.call(this, contextId, wanted)
    if (isBlendTarget(context) && !prepared.has(context)) {
      prepared.add(context)
      premultiplyOutput(context)
    }
    return context
  }
  patched.add(prototype)
  return () => {
    prototype.getContext = original
    patched.delete(prototype)
  }
}
