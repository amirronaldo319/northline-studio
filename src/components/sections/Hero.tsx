import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Button, Glass } from 'glisse'
import { offers } from '@/content/offers'
import { HERO_EXAMPLE } from '@/content/examples'
import { useCopy } from '@/i18n/context'
import { enterStep } from '@/lib/reveal'
import { DemoPreview } from '../DemoPreview'
import { Words } from '../Words'
import { useExampleDialog } from '../exampleDialogContext'
import { buttonClasses } from '../ui/button'

/**
 * The first screen, laid out as an Apple product page: a centred headline, one line of promise, two actions, and
 * the work itself shown large underneath. No background effects compete with it, only a soft light.
 */
export function Hero() {
  const { open } = useExampleDialog()
  const t = useCopy()
  const example = t.examples[HERO_EXAMPLE.id]

  // One control, placed over the preview on wider screens and under it on phones (only one is ever displayed).
  const viewButton = (
    <Button onClick={() => open(HERO_EXAMPLE)} className="glass-btn glass-lift glass-frost nudge-up" tint="var(--color-cobalt)">
      {t.hero.viewExample}
      <ArrowUpRight aria-hidden="true" className="card-arrow" />
      <span className="sr-only">: {HERO_EXAMPLE.name}</span>
    </Button>
  )

  return (
    <section aria-labelledby="hero-title" className="hero relative isolate pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-light" />
      </div>
      <div className="container-page">
        <div data-hero-copy="" className="mx-auto max-w-[60rem] text-center">
          {/* Entrance sequence: headline, copy, buttons, note, then the picture (see `.enter`). */}
          <h1 id="hero-title" className="hero-title word-enter">
            <Words text={t.hero.headline} marked={t.hero.markedWords} />
          </h1>
          <p className="hero-lede enter mx-auto mt-6 max-w-[38rem]" style={enterStep(2)}>
            {offers[t.locale].intro}
          </p>

          <div className="enter mt-9 flex flex-col items-stretch justify-center gap-3 min-[420px]:flex-row min-[420px]:items-center" style={enterStep(3)}>
            <a href="#package" className={buttonClasses('primary', 'lg', 'nudge')}>
              {offers[t.locale].compare}
              <ArrowRight aria-hidden="true" size={18} className="rtl:-scale-x-100" />
            </a>
            {/* The secondary link sits on clear glass, beside the solid primary. */}
            <Glass className="glass-capsule glass-lift glass-frost glass-cta">
              <a href="#work" className="glass-cta-link">
                {t.common.seeMyWork}
              </a>
            </Glass>
          </div>

          <ul className="enter mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.9375rem] text-ink-2" style={enterStep(4)}>
            {t.hero.facts.map((fact) => (
              <li key={fact} className="inline-flex items-center gap-1.5">
                <Check aria-hidden="true" size={16} className="shrink-0 text-cobalt" />
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <figure className="enter mx-auto mt-14 max-w-[68rem] sm:mt-16" style={enterStep(4)}>
          <div className="hero-figure relative overflow-hidden rounded-[1.25rem] bg-white shadow-device sm:rounded-[1.75rem]">
            <DemoPreview example={HERO_EXAMPLE} isEager />
            {/* Mouse-only convenience; the labelled glass button is the accessible control. */}
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => open(HERO_EXAMPLE)}
              className="absolute inset-0 cursor-pointer"
            />
            {/* From 640px a glass control floats over the preview itself. */}
            <div className="hero-peek hidden sm:block">{viewButton}</div>
          </div>
          <figcaption className="mt-5 flex flex-col items-center gap-3 text-center text-sm text-ink-3">
            <span>{t.hero.conceptCaption(HERO_EXAMPLE.name, example.businessType)}</span>
            {/* Phones show the small preview's own buttons, so the control sits under it instead of over it. */}
            <div className="sm:hidden">{viewButton}</div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
