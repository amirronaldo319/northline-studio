import type { gsap as Gsap } from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'
import type { SplitText as SplitTextType } from 'gsap/SplitText'
import { hasFinePointer } from './gate'

export type MotionTools = {
  gsap: typeof Gsap
  ScrollTrigger: typeof ScrollTriggerType
  SplitText: typeof SplitTextType
}

/** Project pictures are drawn slightly larger than their frame so they can drift without showing an edge. */
const PARALLAX_SCALE = 1.1
const PARALLAX_TRAVEL_PERCENT = 4.5
/** Largest tilt of the hero preview, in degrees. Small on purpose: it should feel like depth, not a gimmick. */
const TILT_MAX_DEG = 4
/** Words in scrubbed paragraphs start this faint and settle to full strength as they are read. */
const SCRUB_TEXT_START_OPACITY = 0.28

const all = <T extends Element = HTMLElement>(selector: string) => Array.from(document.querySelectorAll<T>(selector))

/**
 * Scroll- and pointer-linked effects. Each one is opt-in through a data attribute in the markup, so a page
 * without the attribute is untouched, and none targets an element that the CSS reveals already animate.
 *
 * - `[data-parallax]`       a picture drifts a few percent inside its frame as the frame crosses the screen
 * - `[data-hero-copy]`      the hero text drifts up and softens as the page leaves the first screen
 * - `[data-tilt]`           the hero preview leans toward the pointer (mouse only)
 * - `[data-pointer-glow]`   a soft light trails the pointer across the hero (mouse only)
 * - `[data-scrub-text]`     a paragraph's words brighten one by one as it scrolls through the screen
 * - `[data-stagger]`        the children of a group rise in one after another
 * - `[data-curtain]`        a dark panel grows to full size as it arrives (a wrapper, so the panel's own reveal is untouched)
 * - `[data-step-pulse]`     a numbered badge pops once when its step comes into view
 *
 * Only transforms and opacity are animated. Returns a function that undoes everything.
 */
export function initScrollEffects({ gsap, ScrollTrigger, SplitText }: MotionTools): () => void {
  const undo: Array<() => void> = []

  const context = gsap.context(() => {
    parallax(gsap)
    heroDrift(gsap)
    scrubText(gsap, SplitText, undo)
    stagger(gsap)
    curtain(gsap)
    stepPulse(gsap)
    if (hasFinePointer()) {
      tilt(gsap, undo)
      pointerGlow(gsap, undo)
    }
  })

  return () => {
    undo.forEach((fn) => fn())
    context.revert()
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }
}

function parallax(gsap: typeof Gsap) {
  for (const image of all('[data-parallax]')) {
    const frame = image.closest<HTMLElement>('.shot') ?? image.parentElement
    if (!frame) continue
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
  }
}

function heroDrift(gsap: typeof Gsap) {
  for (const copy of all('[data-hero-copy]')) {
    const hero = copy.closest('section') ?? copy
    gsap.to(copy, {
      yPercent: -9,
      opacity: 0.35,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    })
  }
}

/** Words fade up one by one, tied to scroll position. The text stays real text, read in order by assistive tech. */
function scrubText(gsap: typeof Gsap, SplitText: typeof SplitTextType, undo: Array<() => void>) {
  for (const paragraph of all('[data-scrub-text]')) {
    // `aria: 'none'` leaves the markup readable as it was: the words are plain inline spans in the same order.
    const split = SplitText.create(paragraph, { type: 'words', aria: 'none' })
    undo.push(() => split.revert())
    gsap.fromTo(
      split.words,
      { opacity: SCRUB_TEXT_START_OPACITY },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.12,
        scrollTrigger: { trigger: paragraph, start: 'top 88%', end: 'bottom 58%', scrub: true },
      },
    )
  }
}

function stagger(gsap: typeof Gsap) {
  for (const group of all('[data-stagger]')) {
    gsap.from(Array.from(group.children), {
      y: 56,
      rotationX: -6,
      transformPerspective: 900,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.14,
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    })
  }
}

function curtain(gsap: typeof Gsap) {
  for (const panel of all('[data-curtain]')) {
    gsap.fromTo(
      panel,
      { scale: 0.94, transformOrigin: '50% 0%' },
      {
        scale: 1,
        ease: 'none',
        clearProps: 'transform',
        scrollTrigger: { trigger: panel, start: 'top 98%', end: 'top 60%', scrub: true },
      },
    )
  }
}

function stepPulse(gsap: typeof Gsap) {
  for (const badge of all('[data-step-pulse]')) {
    gsap.fromTo(
      badge,
      { scale: 1 },
      {
        scale: 1.22,
        duration: 0.32,
        yoyo: true,
        repeat: 1,
        ease: 'back.out(2.4)',
        clearProps: 'transform',
        immediateRender: false,
        scrollTrigger: { trigger: badge, start: 'top 72%', once: true },
      },
    )
  }
}

/** The hero preview leans toward the pointer, easing back when it leaves. */
function tilt(gsap: typeof Gsap, undo: Array<() => void>) {
  for (const card of all('[data-tilt]')) {
    const area = card.parentElement
    if (!area) continue
    gsap.set(card, { transformPerspective: 1000, transformOrigin: '50% 50%' })
    const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.7, ease: 'power3.out' })
    const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.7, ease: 'power3.out' })

    const onMove = (event: PointerEvent) => {
      const box = card.getBoundingClientRect()
      const x = (event.clientX - box.left) / box.width - 0.5
      const y = (event.clientY - box.top) / box.height - 0.5
      rotateY(Math.max(-0.5, Math.min(0.5, x)) * 2 * TILT_MAX_DEG)
      rotateX(Math.max(-0.5, Math.min(0.5, y)) * -2 * TILT_MAX_DEG)
    }
    const onLeave = () => {
      rotateX(0)
      rotateY(0)
    }
    area.addEventListener('pointermove', onMove)
    area.addEventListener('pointerleave', onLeave)
    undo.push(() => {
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
    })
  }
}

/** A soft cobalt light that trails the pointer across the hero and fades out when the pointer leaves it. */
function pointerGlow(gsap: typeof Gsap, undo: Array<() => void>) {
  for (const glow of all('[data-pointer-glow]')) {
    const hero = glow.closest('section')
    if (!hero) continue
    const moveX = gsap.quickTo(glow, 'x', { duration: 0.9, ease: 'power3.out' })
    const moveY = gsap.quickTo(glow, 'y', { duration: 0.9, ease: 'power3.out' })
    const onMove = (event: PointerEvent) => {
      const box = hero.getBoundingClientRect()
      moveX(event.clientX - box.left)
      moveY(event.clientY - box.top)
      gsap.to(glow, { opacity: 1, duration: 0.5, overwrite: 'auto' })
    }
    const onLeave = () => gsap.to(glow, { opacity: 0, duration: 0.6 })
    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    undo.push(() => {
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
    })
  }
}
