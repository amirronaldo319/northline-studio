import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, FileText, LayoutTemplate, MessageSquareText, Rocket, type LucideIcon } from 'lucide-react'
import { Glass } from 'glisse'
import { offers, PACKAGE_EVENT } from '@/content/offers'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { GlassShapes } from '../glass/GlassShapes'
import { LegacyAnchors } from '../LegacyAnchors'
import { Words } from '../Words'
import { buttonClasses } from '../ui/button'

/** Section ids from earlier versions of the page. Links shared with these still land on this section. */
const LEGACY_IDS = ['pricing', 'included'] as const

/** One icon per package group, in the same order as the copy. */
const GROUP_ICONS: readonly LucideIcon[] = [LayoutTemplate, FileText, MessageSquareText, Rocket]

/**
 * Pricing: the two packages compared row by row on one panel of glass, each plan heading its column on a card of glass
 * set into it (the second with a little more glass and light, and no label), the essential costs in one visible line,
 * optional care as a quieter separate card, and the full terms in a disclosure.
 */
export function Package() {
  const t = useCopy()
  const offer = offers[t.locale]
  const chartRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const [showStrip, setShowStrip] = useState(false)

  // The strip shows while the comparison is on screen but its heading row has scrolled up under the bar.
  useEffect(() => {
    const chart = chartRef.current
    const head = headRef.current
    if (!chart || !head) return
    let headGone = false
    let chartIn = false
    const update = () => setShowStrip(headGone && chartIn)
    const headWatch = new IntersectionObserver(([entry]) => {
      headGone = !entry.isIntersecting && entry.boundingClientRect.top < 0
      update()
    }, { rootMargin: '-72px 0px 0px 0px' })
    const chartWatch = new IntersectionObserver(([entry]) => {
      chartIn = entry.isIntersecting
      update()
    }, { rootMargin: '-140px 0px 0px 0px' })
    headWatch.observe(head)
    chartWatch.observe(chart)
    return () => {
      headWatch.disconnect()
      chartWatch.disconnect()
    }
  }, [])

  return (
    <section id="package" aria-labelledby="package-title" className="section-pad ambient ambient-pricing">
      <LegacyAnchors ids={LEGACY_IDS} />
      <GlassShapes set="pricing" />

      <div className="container-page">
        <div className="section-intro reveal">
          <p className="eyebrow">{t.package.eyebrow}</p>
          <h2 id="package-title" className="h-section mt-3">
            <Words text={offer.heading} />
          </h2>
          <p className="lede mt-5">{offer.intro}</p>
        </div>

        {/*
          The two packages compared as Apple compares models: the plans side by side at every width, then one row per
          topic, each answered in both columns, so the difference reads straight across. It is a table to assistive
          technology (explicit roles survive the grid layout).
        */}
        <div ref={chartRef} role="table" aria-label={offer.compare} className="compare liquid-glass reveal mt-14 lg:mt-20">
          <div role="rowgroup" ref={headRef}>
            <div role="row" className="compare-row compare-head">
              <span role="columnheader" className="sr-only lg:not-sr-only lg:pt-1.5 lg:text-[1.0625rem] lg:font-semibold lg:text-ink-3">
                {t.package.included}
              </span>
              {offer.plans.map((plan, index) => (
                <div
                  key={plan.name}
                  role="columnheader"
                  className={`compare-plan plan-card ${index === 1 ? 'liquid-glass-strong plan-card-featured' : 'liquid-glass-subtle'}`}
                >
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
                    className={buttonClasses(
                      index === 1 ? 'primary' : 'secondary',
                      'md',
                      'plan-cta max-w-full !whitespace-normal text-center max-[399px]:px-3.5 max-[399px]:text-[0.875rem]',
                    )}
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
          {/*
            On phones and tablets the plan names would scroll away while the rows are read, so a strip of Liquid Glass
            keeps them in view. It takes no space, shows only once the plans' own heading has scrolled out, and is
            hidden from screen readers, which already have the column headers.
          */}
          <div className="compare-sticky" aria-hidden="true" data-show={showStrip || undefined}>
            <Glass className="compare-sticky-glass glass-frost glass-lift">
              {offer.plans.map((plan) => (
                <span key={plan.name} className="compare-sticky-plan">
                  <span className="font-semibold text-ink">{plan.name}</span> <bdi className="text-ink-2">{plan.price}</bdi>
                </span>
              ))}
            </Glass>
          </div>
          <div role="rowgroup">
            {t.package.groups.map((group, index) => {
              const Icon = GROUP_ICONS[index]
              return (
                <div key={group} role="row" className="compare-row">
                  <div role="rowheader" className="compare-topic">
                    <span aria-hidden="true" className="pkg-icon grid size-9 place-items-center rounded-xl">
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
        <p className="reveal mx-auto mt-6 max-w-[46rem] text-center text-[0.9375rem] leading-relaxed text-ink-3">{offer.essentials}</p>

        {/* Optional care: a separate, quieter offer, not a third column. */}
        <div className="reveal mx-auto mt-14 max-w-[46rem]">
          <div className="care-card liquid-glass-subtle text-center">
            <h3 id="care-title" className="text-[1.375rem] font-semibold tracking-[-0.015em]">
              {offer.careTitle}
            </h3>
            <p className="mt-3 leading-relaxed text-ink-2">{offer.care}</p>
          </div>
        </div>

        {/* The longer terms stay one click away, for anyone who wants every detail before asking. */}
        <details className="terms reveal mx-auto mt-8 max-w-[46rem]">
          <summary className="terms-summary">
            {t.package.termsSummary}
            <ChevronDown aria-hidden="true" size={17} className="terms-chevron" />
          </summary>
          <div className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-ink-2">
            <p>{offer.terms}</p>
            <p>{offer.exclusions}</p>
          </div>
        </details>
      </div>
    </section>
  )
}
