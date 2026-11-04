import { ArrowRight, FileText, LayoutTemplate, MessageSquareText, Rocket, type LucideIcon } from 'lucide-react'
import { offers, PACKAGE_EVENT } from '@/content/offers'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { LegacyAnchors } from '../LegacyAnchors'
import { Words } from '../Words'
import { buttonClasses } from '../ui/button'

/** Section ids from earlier versions of the page. Links shared with these still land on this section. */
const LEGACY_IDS = ['pricing', 'included'] as const

/** One icon per package group, in the same order as the copy. */
const GROUP_ICONS: readonly LucideIcon[] = [LayoutTemplate, FileText, MessageSquareText, Rocket]

/** The two packages, compared row by row, then optional care and how quotes work. */
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

        {/*
          The two packages compared as Apple compares models: the plans side by side at every width, then one row per
          topic, each answered in both columns, so the difference reads straight across. It is a table to assistive
          technology (explicit roles survive the grid layout).
        */}
        <div role="table" aria-label={offer.compare} className="compare tile reveal mt-14 lg:mt-20">
          <div role="rowgroup">
            <div role="row" className="compare-row compare-head">
              <span role="columnheader" className="sr-only lg:not-sr-only lg:pt-1.5 lg:text-[1.0625rem] lg:font-semibold lg:text-ink-3">
                {t.package.included}
              </span>
              {offer.plans.map((plan) => (
                <div key={plan.name} role="columnheader" className="compare-plan">
                  <h3 className="text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)] font-semibold">{plan.name}</h3>
                  <p className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <bdi className="font-display text-[clamp(1.625rem,0.9rem+3.6vw,3.5rem)] leading-none font-bold tracking-[-0.04em]">
                      {plan.price}
                    </bdi>
                    <span className="text-[0.875rem] text-ink-3">{offer.once}</span>
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-snug text-ink-2 sm:text-[1.0625rem]">{plan.summary}</p>
                  <a
                    href={`#${CONTACT_SECTION_ID}`}
                    className={buttonClasses('primary', 'md', 'max-w-full !whitespace-normal text-center max-[399px]:px-3.5 max-[399px]:text-[0.875rem]')}
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent(PACKAGE_EVENT, { detail: `${offer.choose} ${plan.name} (${plan.price})` }))
                    }
                  >
                    {offer.choose} {plan.name}
                    <ArrowRight aria-hidden="true" size={17} className="hidden shrink-0 sm:block rtl:-scale-x-100" />
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div role="rowgroup">
            {t.package.groups.map((group, index) => {
              const Icon = GROUP_ICONS[index]
              return (
                <div key={group} role="row" className="compare-row">
                  <div role="rowheader" className="compare-topic">
                    <span aria-hidden="true" className="pkg-icon grid size-9 place-items-center rounded-xl bg-cobalt-soft text-cobalt">
                      <Icon size={18} />
                    </span>
                    {group}
                  </div>
                  {offer.plans.map((plan) => (
                    <div key={plan.name} role="cell" className="compare-cell">
                      {plan.items[index]}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
        <p className="reveal mx-auto mt-6 max-w-4xl text-center text-sm leading-relaxed text-ink-3">{offer.note}</p>

        <aside className="tile reveal mt-10" aria-labelledby="care-title">
          <h3 id="care-title" className="text-[1.375rem] font-semibold">{offer.careTitle}</h3>
          <p className="mt-3 max-w-4xl text-[1.0625rem] leading-relaxed text-ink-2">{offer.care}</p>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-ink-3">{offer.exclusions}</p>
        </aside>

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
