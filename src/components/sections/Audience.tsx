import { ArrowUpRight } from 'lucide-react'
import { useCopy, useLocalHref } from '@/i18n/context'
import { revealDelay } from '@/lib/reveal'
import { Words } from '../Words'

/** Who the site is for. Each card goes to a short page written for that kind of business. */
export function Audience() {
  const t = useCopy()
  const localHref = useLocalHref()

  return (
    <section id="trades" aria-labelledby="trades-title" className="border-t border-line bg-card py-12 sm:py-20 lg:py-24">
      <div className="container-page">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">{t.audience.eyebrow}</p>
          <h2 id="trades-title" className="h-section word-reveal mt-3">
            <Words text={t.audience.heading} />
          </h2>
          <p className="lede mt-4">{t.audience.lede}</p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.trades.map((trade, index) => (
            <li key={trade.slug} className="reveal" style={revealDelay(index)}>
              <a
                href={localHref(`${trade.slug}/`)}
                className="project-card glow-card group flex h-full flex-col justify-between rounded-xl border border-line-strong/60 bg-paper p-5 transition-colors hover:border-cobalt"
              >
                <span className="text-[1.1875rem] font-semibold">
                  {trade.name.charAt(0).toUpperCase() + trade.name.slice(1)}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt">
                  {t.audience.readPage}
                  <span className="sr-only">{t.audience.forName(trade.name)}</span>
                  <ArrowUpRight aria-hidden="true" size={15} className="card-arrow" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="reveal mt-8 text-[0.9375rem] text-ink-2">
          {t.audience.guidesLead}{' '}
          {t.guides.map((guide, index) => (
            <span key={guide.slug}>
              {index > 0 && ' · '}
              <a href={localHref(`guides/${guide.slug}/`)} className="font-semibold text-cobalt underline underline-offset-4">
                {guide.headline.replace(/[.。]$/, '')}
              </a>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
