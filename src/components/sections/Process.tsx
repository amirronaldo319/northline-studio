import { useCopy } from '@/i18n/context'
import { revealDelay } from '@/lib/reveal'
import { Words } from '../Words'

/**
 * Four steps as four tiles, each led by a large number. On wide screens the title stays pinned while the steps
 * scroll past it, as Apple tells a story down the page; a line fills above them as the section goes by.
 */
export function Process() {
  const t = useCopy()

  return (
    <section id="process" aria-labelledby="process-title" className="section-pad bg-card">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal text-center lg:col-span-5 lg:text-start">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">{t.process.eyebrow}</p>
            <h2 id="process-title" className="h-section word-reveal mt-3">
              <Words text={t.process.heading} twoTone />
            </h2>
          </div>
        </div>

        <ol className="process-rail grid gap-5 pt-6 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-1">
          {t.process.steps.map((step, index) => (
            <li key={step.title} className="tile-paper reveal" style={revealDelay(index)}>
              <span data-step-pulse="" className="step-num block text-[3rem] leading-none font-bold tracking-[-0.04em] text-cobalt tabular-nums lg:text-[3.5rem]">
                {index + 1}
              </span>
              <h3 className="mt-6 text-[1.25rem] font-semibold">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
