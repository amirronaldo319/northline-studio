import { useCopy } from '@/i18n/context'
import { revealDelay } from '@/lib/reveal'
import { Words } from '../Words'

/** Four steps as four tiles, each led by a large number; a line fills above them as the section scrolls by. */
export function Process() {
  const t = useCopy()

  return (
    <section id="process" aria-labelledby="process-title" className="section-pad bg-card">
      <div className="container-page">
        <div className="section-intro reveal">
          <p className="eyebrow">{t.process.eyebrow}</p>
          <h2 id="process-title" className="h-section word-reveal mt-3">
            <Words text={t.process.heading} />
          </h2>
        </div>

        <ol className="process-rail mt-14 grid gap-5 pt-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {t.process.steps.map((step, index) => (
            <li key={step.title} className="tile-paper reveal" style={revealDelay(index)}>
              <span data-step-pulse="" className="step-num block text-[2.75rem] leading-none font-bold tracking-[-0.04em] text-cobalt tabular-nums">
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
