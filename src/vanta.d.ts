declare module 'vanta/src/vanta.net.js' {
  export interface VantaEffect {
    destroy(): void
    resize(): void
  }
  const NET: (options: Record<string, unknown>) => VantaEffect
  export default NET
}

declare module 'three'
