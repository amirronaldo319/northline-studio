import { useCopy } from '@/i18n/context'
import { revealDelay } from '@/lib/reveal'
import { Words } from '../Words'

export function Process() {
  const t = useCopy()

  return (
    <section id="process" aria-labelledby="process-title" className="py-12 sm:py-20 lg:py-24">
      <div className="container-page">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">{t.process.eyebrow}</p>
          <h2 id="process-title" className="h-section word-reveal mt-3">
            <Words text={t.process.heading} />
          </h2>
        </div>

        <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {t.process.steps.map((step, index) => (
            <li key={step.title} className="reveal draw-line pt-4" style={revealDelay(index)}>
              <span className="step-num grid size-9 place-items-center rounded-full bg-cobalt font-display text-sm font-semibold text-white tabular-nums">
                {index + 1}
              </span>
              <h3 className="mt-2 text-[1.1875rem] font-semibold">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
