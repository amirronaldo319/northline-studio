import { MessageSquareText, PencilRuler, Rocket, type LucideIcon } from 'lucide-react'
import { useCopy } from '@/i18n/context'
import { revealDelay } from '@/lib/reveal'
import { Words } from '../Words'

/** One icon per step, in the same order as the copy: tell me, review the design, go live. */
const STEP_ICONS: readonly LucideIcon[] = [MessageSquareText, PencilRuler, Rocket]

/** Three steps across, each on a card of glass: its icon, its number, one line of title and a short explanation. */
export function Process() {
  const t = useCopy()

  return (
    <section id="process" aria-labelledby="process-title" className="section-pad ambient ambient-process">
      <div className="container-page">
        <div className="section-intro reveal">
          <p className="eyebrow">{t.process.eyebrow}</p>
          <h2 id="process-title" className="h-section mt-3">
            <Words text={t.process.heading} />
          </h2>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6 lg:mt-16 lg:gap-8">
          {t.process.steps.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? MessageSquareText
            return (
              <li key={step.title} className="reveal" style={revealDelay(index)}>
                <div className="step-card liquid-glass-card">
                  <div className="flex items-center justify-between">
                    <span aria-hidden="true" className="glass-icon">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <span aria-hidden="true" className="step-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[1.3125rem] leading-snug font-semibold tracking-[-0.012em]">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-2">{step.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
