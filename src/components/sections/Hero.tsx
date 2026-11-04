import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Button, Glass } from 'glisse'
import { offers } from '@/content/offers'
import { HERO_EXAMPLE } from '@/content/examples'
import { useCopy } from '@/i18n/context'
import { enterStep } from '@/lib/reveal'
import { DemoPreview } from '../DemoPreview'
import { HeroBackdrop } from '../HeroBackdrop'
import Magnet from '../reactbits/Magnet'
import { Words } from '../Words'
import { useExampleDialog } from '../exampleDialogContext'
import { buttonClasses } from '../ui/button'

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
    <section aria-labelledby="hero-title" className="relative isolate pt-8 pb-12 sm:pt-12 lg:pt-16 lg:pb-24">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-blue" />
        <div className="hero-orb hero-orb-sand" />
        <HeroBackdrop />
        <div className="hero-pointer-glow" data-pointer-glow="" />
      </div>
      <div className="container-page grid items-center gap-9 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div data-hero-copy="">
          {/* Entrance sequence: headline, copy, buttons, note, then the project picture (see `.enter`). */}
          <h1
            id="hero-title"
            className="word-enter text-[clamp(2.15rem,1.55rem+2.7vw,3.5rem)] font-[680] leading-[1.05] tracking-[-0.03em]"
          >
            <Words text={t.hero.headline} marked={t.hero.markedWords} />
          </h1>
          <p className="lede enter mt-5 max-w-[30rem]" style={enterStep(2)}>
            {offers[t.locale].intro}
          </p>

          <div className="enter mt-7 flex flex-col gap-3 min-[420px]:flex-row" style={enterStep(3)}>
            {/* React Bits "Magnet": the button leans toward a nearby pointer. Full width on the smallest screens. */}
            <Magnet padding={70} magnetStrength={5} maxOffset={10} wrapperClassName="max-[419px]:!block" innerClassName="max-[419px]:*:w-full">
              <a href="#package" className={buttonClasses('primary', 'lg', 'nudge')}>
                {offers[t.locale].compare}
                <ArrowRight aria-hidden="true" size={18} className="rtl:-scale-x-100" />
              </a>
            </Magnet>
            {/* The secondary link sits on clear glass over the hero's grid and colour, beside the solid primary. */}
            <Glass className="glass-capsule glass-lift glass-frost glass-cta">
              <a href="#work" className="glass-cta-link">
                {t.common.seeMyWork}
              </a>
            </Glass>
          </div>

          <ul className="enter mt-6 flex flex-col gap-2 text-sm text-ink-2" style={enterStep(4)}>
            {t.hero.facts.map((fact) => (
              <li key={fact} className="inline-flex items-center gap-2">
                <Check aria-hidden="true" size={15} className="shrink-0 text-cobalt" />
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <figure className="enter" style={enterStep(4)}>
          <div className="relative" data-tilt="">
            <div className="hero-figure relative overflow-hidden rounded-lg border border-line-strong/60 bg-white shadow-device">
              <DemoPreview example={HERO_EXAMPLE} isEager />
              {/* Mouse-only convenience; the labelled glass button below is the accessible control. */}
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => open(HERO_EXAMPLE)}
                className="absolute inset-0 cursor-pointer rounded-lg"
              />
              {/* From 640px a glass control floats over the preview itself, so the demo shows through it. */}
              <div className="hero-peek hidden sm:block">{viewButton}</div>
            </div>
          </div>
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm text-ink-3">
            <span>{t.hero.conceptCaption(HERO_EXAMPLE.name, example.businessType)}</span>
            {/* Phones show the small preview's own buttons, so the control sits under it instead of over it. */}
            <div className="sm:hidden">{viewButton}</div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
