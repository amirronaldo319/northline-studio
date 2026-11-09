import { describe, expect, it, vi } from 'vitest'
import { installPremultipliedGlass, premultiplyOutput } from './premultipliedGlass'

function fakeGl() {
  return { BLEND: 3042, SRC_ALPHA: 770, ZERO: 0, ONE: 1, enable: vi.fn(), blendFuncSeparate: vi.fn() }
}

/** A canvas prototype whose `getContext` records what it was asked for. */
function fakePrototype(gl: ReturnType<typeof fakeGl>) {
  const calls: { id: string; options: unknown }[] = []
  const prototype = {
    getContext(this: unknown, id: string, options?: unknown) {
      calls.push({ id, options })
      return id === 'webgl2' ? gl : {}
    },
  }
  return { prototype, calls }
}

function canvas(inGlassLayer: boolean) {
  return { closest: (selector: string) => (inGlassLayer && selector === '.hero-accent-layer' ? {} : null) }
}

describe('premultiplyOutput', () => {
  it('has the GPU write colour times alpha, and alpha as it is', () => {
    const gl = fakeGl()
    premultiplyOutput(gl)
    expect(gl.enable).toHaveBeenCalledWith(gl.BLEND)
    expect(gl.blendFuncSeparate).toHaveBeenCalledWith(gl.SRC_ALPHA, gl.ZERO, gl.ONE, gl.ZERO)
  })
})

describe('installPremultipliedGlass', () => {
  it('asks for a premultiplied canvas inside the glass layer and keeps the component\'s other options', () => {
    const gl = fakeGl()
    const { prototype, calls } = fakePrototype(gl)
    installPremultipliedGlass(prototype)
    const context = prototype.getContext.call(canvas(true), 'webgl2', { alpha: true, antialias: false, premultipliedAlpha: false })
    expect(context).toBe(gl)
    expect(calls).toEqual([{ id: 'webgl2', options: { alpha: true, antialias: false, premultipliedAlpha: true } }])
    expect(gl.blendFuncSeparate).toHaveBeenCalledTimes(1)
  })

  it('sets the blend state once even if the component asks for the context again', () => {
    const gl = fakeGl()
    const { prototype } = fakePrototype(gl)
    installPremultipliedGlass(prototype)
    const target = canvas(true)
    prototype.getContext.call(target, 'webgl2', {})
    prototype.getContext.call(target, 'webgl2', {})
    expect(gl.enable).toHaveBeenCalledTimes(1)
  })

  it('leaves every other canvas and context type exactly as requested', () => {
    const gl = fakeGl()
    const { prototype, calls } = fakePrototype(gl)
    installPremultipliedGlass(prototype)
    prototype.getContext.call(canvas(false), 'webgl2', { premultipliedAlpha: false })
    prototype.getContext.call(canvas(true), '2d', { willReadFrequently: true })
    expect(calls).toEqual([
      { id: 'webgl2', options: { premultipliedAlpha: false } },
      { id: '2d', options: { willReadFrequently: true } },
    ])
    expect(gl.enable).not.toHaveBeenCalled()
  })

  it('wraps only once and can be undone', () => {
    const gl = fakeGl()
    const { prototype, calls } = fakePrototype(gl)
    const before = prototype.getContext
    const undo = installPremultipliedGlass(prototype)
    const wrapped = prototype.getContext
    installPremultipliedGlass(prototype)
    expect(prototype.getContext).toBe(wrapped)
    undo()
    expect(prototype.getContext).toBe(before)
    prototype.getContext.call(canvas(true), 'webgl2', { premultipliedAlpha: false })
    expect(calls[0].options).toEqual({ premultipliedAlpha: false })
  })

  it('does nothing where there is no canvas (server render)', () => {
    expect(() => installPremultipliedGlass(undefined)).not.toThrow()
  })
})
