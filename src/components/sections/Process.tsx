import { useCopy } from '@/i18n/context'
import { revealDelay } from '@/lib/reveal'
import { Words } from '../Words'

/** Three steps across, each led by its number: one line of title and a short explanation. */
export function Process() {
  const t = useCopy()

  return (
    <section id="process" aria-labelledby="process-title" className="section-pad">
      <div className="container-page">
        <div className="section-intro reveal">
          <p className="eyebrow">{t.process.eyebrow}</p>
          <h2 id="process-title" className="h-section mt-3">
            <Words text={t.process.heading} />
          </h2>
        </div>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-16 lg:gap-12">
          {t.process.steps.map((step, index) => (
            <li key={step.title} className="step reveal" style={revealDelay(index)}>
              <span aria-hidden="true" className="step-number">
                {index + 1}
              </span>
              <h3 className="mt-5 text-[1.3125rem] leading-snug font-semibold tracking-[-0.012em]">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
