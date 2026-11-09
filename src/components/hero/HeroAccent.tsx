import { Component, useEffect, useLayoutEffect, useRef, useState, type ComponentType, type CSSProperties, type ReactNode } from 'react'
import type { RefractedTextProps } from '@/components/refracted-text'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { measureGlassAspect } from './glassAspect'
import { HERO_ACCENT, HERO_ACCENT_TYPE } from './heroAccent'
import { installPremultipliedGlass } from './premultipliedGlass'

type Glass = ComponentType<RefractedTextProps>

/** If the glass cannot draw, the word keeps its plain letters and nothing else on the page is affected. */
class GlassBoundary extends Component<{ onFail: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onFail()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

/**
 * Resolves once the page's fonts are in and the glass has had time to draw its first frame. It waits for the fonts
 * the page is already using rather than asking for the glass's family by name: asking would download Inter on Apple
 * devices too, where the word is drawn in San Francisco and Inter is never used.
 */
function firstFrame(signal: { cancelled: boolean }): Promise<void> {
  const face = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve()
  return face
    .catch(() => undefined)
    .then(
      () =>
        new Promise<void>((resolve) => {
          let frames = 0
          const step = () => {
            if (signal.cancelled || ++frames >= 4) resolve()
            else window.requestAnimationFrame(step)
          }
          window.requestAnimationFrame(step)
        }),
    )
}

/**
 * One word of the headline, shown through Refracted Text.
 *
 * The word is real text in the heading from the first byte, so the heading reads the same before the effect loads,
 * while it loads, with reduced motion, and if WebGL is unavailable: the plain letters stay and the glass is simply
 * never shown. When the glass has drawn its first frame, it fades in over the plain letters, which then go clear (they
 * keep their place, so nothing moves). The glass is a picture: the component marks itself as an image named after its
 * text, which would read the word twice inside the heading, so that role is removed and only the real text is announced.
 * The glass never takes a tap or a click, so the word behaves exactly like the rest of the headline and nothing about
 * it depends on hovering.
 */
export function HeroAccent({ text }: { text: string }) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [Glass, setGlass] = useState<Glass | null>(null)
  const [aspect, setAspect] = useState<number | null>(null)
  const [fontFamily, setFontFamily] = useState<string>(HERO_ACCENT_TYPE.fontFamily)
  const [state, setState] = useState<'plain' | 'glass' | 'failed'>('plain')
  const layer = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (typeof document === 'undefined') return
    let cancelled = false
    const load = () => {
      installPremultipliedGlass()
      // Measure in the font the page actually shows: on devices that download Inter, wait until it has arrived.
      Promise.all([import('@/components/refracted-text'), document.fonts ? document.fonts.ready : null])
        .then(([module]) => {
          if (cancelled) return
          // The box takes the shape the font's own proportions need, before the glass draws into it (see glassAspect.ts).
          // The word is drawn in the headline's own family: San Francisco on Apple devices, Inter elsewhere.
          const family =
            getComputedStyle(document.documentElement).getPropertyValue('--font-display').trim() || HERO_ACCENT_TYPE.fontFamily
          setFontFamily(family)
          setAspect(measureGlassAspect(text.toUpperCase(), { ...HERO_ACCENT_TYPE, fontFamily: family }))
          setGlass(() => module.RefractedText)
        })
        .catch(() => {
          if (!cancelled) setState('failed')
        })
    }
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(load, { timeout: 1200 })
      return () => {
        cancelled = true
        window.cancelIdleCallback(handle)
      }
    }
    const timer = window.setTimeout(load, 300)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [text])

  // The component labels itself as an image named after its text. The plain text beside it already says the word.
  useLayoutEffect(() => {
    const host = layer.current?.firstElementChild
    host?.removeAttribute('role')
    host?.removeAttribute('aria-label')
  }, [Glass])

  useEffect(() => {
    if (!Glass) return
    const host = layer.current
    if (!host) return
    const signal = { cancelled: false }
    // Without WebGL the component draws its own plain fallback text; that means "keep the plain word".
    const watch = new MutationObserver(() => {
      if (host.querySelector('.refracted-text__fallback')) setState('failed')
    })
    watch.observe(host, { childList: true, subtree: true })
    void firstFrame(signal).then(() => {
      if (signal.cancelled) return
      setState((current) => (current === 'failed' || host.querySelector('.refracted-text__fallback') ? 'failed' : 'glass'))
    })
    return () => {
      signal.cancelled = true
      watch.disconnect()
    }
  }, [Glass, text])

  return (
    <span className="hero-accent" data-state={state} style={{ '--accent-letters': Array.from(text).length, '--accent-aspect': aspect ?? undefined } as CSSProperties}>
      <span className="hero-accent-text">{text}</span>
      {Glass && state !== 'failed' && (
        <span className="hero-accent-layer" ref={layer}>
          <GlassBoundary onFail={() => setState('failed')}>
            <Glass {...HERO_ACCENT} fontFamily={fontFamily} text={text.toUpperCase()} paused={reducedMotion} />
          </GlassBoundary>
        </span>
      )}
    </span>
  )
}
