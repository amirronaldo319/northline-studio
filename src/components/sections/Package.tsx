import { ArrowRight, FileText, LayoutTemplate, MessageSquareText, Rocket, type LucideIcon } from 'lucide-react'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { LegacyAnchors } from '../LegacyAnchors'
import { Words } from '../Words'
import { buttonClasses } from '../ui/button'

/** Section ids from earlier versions of the page. Links shared with these still land on this section. */
const LEGACY_IDS = ['pricing', 'included'] as const

/** One icon per package group, in the same order as the copy. */
const GROUP_ICONS: readonly LucideIcon[] = [LayoutTemplate, FileText, MessageSquareText, Rocket]

export function Package() {
  const t = useCopy()

  return (
    <section id="package" aria-labelledby="package-title" className="relative border-t border-line bg-card py-12 sm:py-20 lg:py-24">
      <LegacyAnchors ids={LEGACY_IDS} />

      <div className="container-page">
        <div className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{t.package.eyebrow}</p>
            <h2 id="package-title" className="h-section word-reveal mt-3">
              <Words text={t.package.heading} />
            </h2>
            <p className="lede mt-4">{t.package.lede}</p>
          </div>
          <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'lg', 'nudge self-start lg:self-auto')}>
            {t.common.requestQuote}
            <ArrowRight aria-hidden="true" size={18} className="rtl:-scale-x-100" />
          </a>
        </div>

        <ul className="reveal mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {t.package.groups.map((group, index) => {
            const Icon = GROUP_ICONS[index]
            return (
              <li key={group.title} className="draw-line pt-4">
                <span aria-hidden="true" className="pkg-icon mb-3 grid size-10 place-items-center rounded-xl bg-cobalt-soft text-cobalt">
                  <Icon size={20} />
                </span>
                <h3 className="text-[1.1875rem] font-semibold">{group.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{group.text}</p>
              </li>
            )
          })}
        </ul>

        <div className="on-dark panel-glow reveal mt-10 rounded-xl bg-night p-5 text-white sm:p-7 lg:mt-12">
          <p className="max-w-3xl text-[1rem] leading-relaxed">
            <strong className="font-semibold">{t.package.quoteLead}</strong>{' '}
            <span className="text-white/80">{t.package.quoteBody}</span>
          </p>

          <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-night-line pt-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.package.factors.map((factor) => (
              <div key={factor.title}>
                <dt className="text-sm font-semibold">{factor.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-white/75">{factor.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
