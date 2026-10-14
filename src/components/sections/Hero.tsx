import { ArrowRight, Maximize2 } from 'lucide-react'
import { EXAMPLES } from '@/content/examples'
import { CONTACT_SECTION_ID, EXAMPLES_CTA_LABEL, PRIMARY_CTA_LABEL } from '@/content/navigation'
import { DemoPreview } from '../DemoPreview'
import { useExampleDialog } from '../exampleDialogContext'
import { buttonClasses } from '../ui/button'

const featured = EXAMPLES[0]

export function Hero() {
  const { open } = useExampleDialog()

  return (
    <section aria-labelledby="hero-title" className="pt-8 pb-14 sm:pt-12 lg:pt-16 lg:pb-24">
      <div className="container-page grid items-center gap-9 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <h1 id="hero-title" className="text-[clamp(2.15rem,1.55rem+2.7vw,3.5rem)] font-[680] leading-[1.05] tracking-[-0.03em]">
            Custom websites for Vancouver’s local service businesses.
          </h1>
          <p className="lede mt-5 max-w-[30rem]">
            Show your work, explain your services, and make requesting a quote easy.
          </p>

          <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
            <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'lg', 'nudge')}>
              {PRIMARY_CTA_LABEL}
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a href="#examples" className={buttonClasses('secondary', 'lg')}>
              {EXAMPLES_CTA_LABEL}
            </a>
          </div>

          <p className="mt-5 text-sm text-ink-3">Serving Vancouver and North Vancouver.</p>
        </div>

        <figure>
          <div className="group relative">
            <div className="overflow-hidden rounded-lg border border-line-strong/60 bg-white shadow-device transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:shadow-lift motion-reduce:transition-none">
              <DemoPreview example={featured} isEager />
            </div>
            {/* Mouse-only convenience; keyboard and screen reader users use the button in the caption. */}
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => open(featured)}
              className="absolute inset-0 cursor-pointer rounded-lg"
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-ink-3">
            <span>
              Concept demo: {featured.name}, a fictional {featured.businessType.toLowerCase()} business.
            </span>
            <button
              type="button"
              onClick={() => open(featured)}
              className="inline-flex min-h-10 items-center gap-1.5 font-semibold text-cobalt underline-offset-4 hover:underline"
            >
              <Maximize2 aria-hidden="true" size={15} />
              Open full preview
              <span className="sr-only">of {featured.name}</span>
            </button>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
