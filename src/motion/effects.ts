import type { gsap as Gsap } from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'

/** Project pictures are drawn slightly larger than their frame so they can drift without showing an edge. */
const PARALLAX_SCALE = 1.1
const PARALLAX_TRAVEL_PERCENT = 4.5

/**
 * Scroll-linked effects. Each one is opt-in through the markup, so a page without the attribute is untouched.
 *
 * - `[data-parallax]`: the picture drifts a few percent inside its frame as the frame crosses the screen.
 *
 * Only transforms are animated. Returns a function that undoes everything.
 */
export function initScrollEffects(gsap: typeof Gsap, ScrollTrigger: typeof ScrollTriggerType): () => void {
  const context = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((image) => {
      const frame = image.closest<HTMLElement>('.shot') ?? image.parentElement
      if (!frame) return
      gsap.set(image, { scale: PARALLAX_SCALE, transformOrigin: '50% 50%' })
      gsap.fromTo(
        image,
        { yPercent: -PARALLAX_TRAVEL_PERCENT },
        {
          yPercent: PARALLAX_TRAVEL_PERCENT,
          ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })
  })

  return () => {
    context.revert()
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }
}
