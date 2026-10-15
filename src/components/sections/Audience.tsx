import { ArrowUpRight } from 'lucide-react'
import { GUIDES } from '@/content/guides'
import { TRADES } from '@/content/trades'
import { pageHref } from '@/lib/paths'
import { revealDelay } from '@/lib/reveal'
import { Words } from '../Words'

/** Who the site is for. Each card goes to a short page written for that kind of business. */
export function Audience() {
  return (
    <section id="trades" aria-labelledby="trades-title" className="border-t border-line bg-card py-12 sm:py-20 lg:py-24">
      <div className="container-page">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Who I build for</p>
          <h2 id="trades-title" className="h-section word-reveal mt-3">
            <Words text="Made for local service businesses." />
          </h2>
          <p className="lede mt-4">
            If customers find you by searching, asking around, or opening a link on their phone, a clear page makes the
            next step obvious. Pick the one closest to your business.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRADES.map((trade, index) => (
            <li key={trade.slug} className="reveal" style={revealDelay(index)}>
              <a
                href={pageHref(`${trade.slug}/`)}
                className="project-card group flex h-full flex-col justify-between rounded-xl border border-line-strong/60 bg-paper p-5 transition-colors hover:border-cobalt"
              >
                <span className="text-[1.1875rem] font-semibold">
                  {trade.name.charAt(0).toUpperCase() + trade.name.slice(1)}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt">
                  Read the page
                  <span className="sr-only"> for {trade.name}</span>
                  <ArrowUpRight aria-hidden="true" size={15} className="card-arrow" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="reveal mt-8 text-[0.9375rem] text-ink-2">
          Planning a site? Two short guides:{' '}
          {GUIDES.map((guide, index) => (
            <span key={guide.slug}>
              {index > 0 && ' · '}
              <a href={pageHref(`guides/${guide.slug}/`)} className="font-semibold text-cobalt underline underline-offset-4">
                {guide.headline.replace(/\.$/, '')}
              </a>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
