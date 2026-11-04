import { ArrowRight, Check, FileText, LayoutTemplate, MessageSquareText, Rocket, type LucideIcon } from 'lucide-react'
import { offers, PACKAGE_EVENT } from '@/content/offers'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { revealDelay } from '@/lib/reveal'
import { LegacyAnchors } from '../LegacyAnchors'
import { Words } from '../Words'
import { buttonClasses } from '../ui/button'

/** Section ids from earlier versions of the page. Links shared with these still land on this section. */
const LEGACY_IDS = ['pricing', 'included'] as const

/** One icon per package group, in the same order as the copy. */
const GROUP_ICONS: readonly LucideIcon[] = [LayoutTemplate, FileText, MessageSquareText, Rocket]

/** The two packages side by side, as Apple compares models: same shape, the price large, one action each. */
export function Package() {
  const t = useCopy()
  const offer = offers[t.locale]

  return (
    <section id="package" aria-labelledby="package-title" className="section-pad relative bg-paper">
      <LegacyAnchors ids={LEGACY_IDS} />

      <div className="container-page">
        <div className="section-intro reveal">
          <p className="eyebrow">{t.package.eyebrow}</p>
          <h2 id="package-title" className="h-section word-reveal mt-3">
            <Words text={offer.heading} twoTone />
          </h2>
          <p className="lede mt-5">{offer.intro}</p>
          <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'lg', 'nudge mt-8')}>
            {t.common.requestQuote}
            <ArrowRight aria-hidden="true" size={18} className="rtl:-scale-x-100" />
          </a>
        </div>

        <div className="reveal mt-14 grid gap-5 md:grid-cols-2 lg:mt-20" data-stagger="">
          {offer.plans.map((plan) => (
            <article key={plan.name} className="tile flex min-w-0 flex-col">
              <h3 className="text-[1.5rem] font-semibold">{plan.name}</h3>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <bdi className="font-display text-[clamp(2.75rem,2.2rem+2vw,3.5rem)] leading-none font-bold tracking-[-0.04em]">
                  {plan.price}
                </bdi>
                <span className="text-[0.9375rem] text-ink-3">{offer.once}</span>
              </p>
              <p className="mt-5 text-[1.0625rem] text-ink-2">{plan.summary}</p>
              <ul className="mt-6 mb-8 space-y-3 border-t border-ink/10 pt-6 text-[0.9375rem] leading-relaxed text-ink-2">
                {plan.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check aria-hidden="true" size={17} className="mt-0.5 shrink-0 text-cobalt" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={`#${CONTACT_SECTION_ID}`}
                className={buttonClasses('primary', 'lg', 'mt-auto max-w-full self-start !whitespace-normal text-center')}
                onClick={() => window.dispatchEvent(new CustomEvent(PACKAGE_EVENT, { detail: `${offer.choose} ${plan.name} (${plan.price})` }))}
              >
                {offer.choose} {plan.name}
                <ArrowRight aria-hidden="true" size={18} className="rtl:-scale-x-100" />
              </a>
            </article>
          ))}
        </div>
        <p className="reveal mx-auto mt-6 max-w-4xl text-center text-sm leading-relaxed text-ink-3">{offer.note}</p>

        <aside className="tile reveal mt-10" aria-labelledby="care-title">
          <h3 id="care-title" className="text-[1.375rem] font-semibold">{offer.careTitle}</h3>
          <p className="mt-3 max-w-4xl text-[1.0625rem] leading-relaxed text-ink-2">{offer.care}</p>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-ink-3">{offer.exclusions}</p>
        </aside>

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.package.groups.map((group, index) => {
            const Icon = GROUP_ICONS[index]
            return (
              <li key={group.title} className="tile reveal" style={revealDelay(index)}>
                <span aria-hidden="true" className="pkg-icon mb-5 grid size-11 place-items-center rounded-2xl bg-cobalt-soft text-cobalt">
                  <Icon size={22} />
                </span>
                <h3 className="text-[1.25rem] font-semibold">{group.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{group.text}</p>
              </li>
            )
          })}
        </ul>

        <div data-curtain="" className="mt-5">
          <div className="tile-dark on-dark panel-glow reveal">
            <p className="max-w-3xl text-[1.1875rem] leading-relaxed">
              <strong className="font-semibold">{t.package.quoteLead}</strong>{' '}
              <span className="text-white/80">{t.package.quoteBody}</span>
            </p>

            <dl className="mt-8 grid gap-x-8 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.package.factors.map((factor) => (
                <div key={factor.title}>
                  <dt className="text-[0.9375rem] font-semibold">{factor.title}</dt>
                  <dd className="mt-1 text-[0.9375rem] leading-relaxed text-white/72">{factor.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
