declare module 'vanta/src/vanta.net.js' {
  export interface VantaEffect {
    destroy(): void
    resize(): void
    /** Vanta's internal per-frame function and the handle of its pending frame. Optional: not a public API. */
    animationLoop?: (time: number) => number | void
    req?: number
  }
  const NET: (options: Record<string, unknown>) => VantaEffect
  export default NET
}

declare module 'three'
