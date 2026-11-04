import { ChevronRight } from 'lucide-react'
import { useCopy, useLocalHref } from '@/i18n/context'
import { revealDelay } from '@/lib/reveal'
import { Words } from '../Words'

/** Who the site is for. Each tile goes to a short page written for that kind of business. */
export function Audience() {
  const t = useCopy()
  const localHref = useLocalHref()

  return (
    <section id="trades" aria-labelledby="trades-title" className="section-pad bg-paper">
      <div className="container-page">
        <div className="section-intro reveal">
          <p className="eyebrow">{t.audience.eyebrow}</p>
          <h2 id="trades-title" className="h-section word-reveal mt-3">
            <Words text={t.audience.heading} />
          </h2>
          <p className="lede mt-5">{t.audience.lede}</p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {t.trades.map((trade, index) => (
            <li key={trade.slug} className="reveal" style={revealDelay(index)}>
              <a href={localHref(`${trade.slug}/`)} className="tile tile-link group flex h-full min-h-[7rem] flex-col justify-between sm:min-h-[9.5rem]">
                <span className="text-[1.375rem] leading-tight font-semibold tracking-[-0.02em]">
                  {trade.name.charAt(0).toUpperCase() + trade.name.slice(1)}
                </span>
                <span className="mt-6 inline-flex items-center gap-0.5 text-[0.9375rem] font-medium text-cobalt">
                  {t.audience.readPage}
                  <span className="sr-only">{t.audience.forName(trade.name)}</span>
                  <ChevronRight aria-hidden="true" size={17} className="card-arrow rtl:-scale-x-100" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="reveal mt-10 text-center text-[0.9375rem] text-ink-2">
          {t.audience.guidesLead}{' '}
          {t.guides.map((guide, index) => (
            <span key={guide.slug}>
              {index > 0 && ' · '}
              <a href={localHref(`guides/${guide.slug}/`)} className="font-medium text-cobalt hover:underline">
                {guide.headline.replace(/[.。]$/, '')}
              </a>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
