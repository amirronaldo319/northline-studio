import { ArrowUpRight, Check } from 'lucide-react'
import { PROJECT_DATA } from '@/content/projectsData'
import type { Trade } from '@/content/trades'
import { pageHref } from '@/lib/paths'
import { revealDelay } from '@/lib/reveal'
import { Contact } from '../sections/Contact'
import { Faq } from '../sections/Faq'
import { SiteCheck } from '../sections/SiteCheck'
import { Words } from '../Words'
import { PageHero } from './PageHero'
import { useHomeAnchor } from '../pageContext'

/** A landing page for one kind of business: what its customers look for, and what a page for it would hold. */
export function TradePage({ trade }: { trade: Trade }) {
  const homeAnchor = useHomeAnchor()

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: homeAnchor('top') }, { label: `Websites for ${trade.name}` }]}
        eyebrow={`Websites for ${trade.name}`}
        headline={trade.headline}
        intro={trade.intro}
      />

      <section aria-labelledby="checks-title" className="border-t border-line bg-card py-12 sm:py-20">
        <div className="container-page">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">What customers look for</p>
            <h2 id="checks-title" className="h-section word-reveal mt-3">
              <Words text={`What people check before they contact a ${trade.noun}.`} />
            </h2>
          </div>
          <ul className="reveal mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {trade.checks.map((check, index) => (
              <li key={check.title} className="draw-line pt-4" style={{ '--line-i': index % 2 } as React.CSSProperties}>
                <h3 className="text-[1.1875rem] font-semibold">{check.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{check.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="includes-title" className="py-12 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="reveal lg:col-span-5">
            <p className="eyebrow">What your page includes</p>
            <h2 id="includes-title" className="h-section word-reveal mt-3">
              <Words text="One focused page, built around your business." />
            </h2>
            <p className="lede mt-4">
              A written quote comes first, so you know the scope and the cost before any work begins.
            </p>
          </div>
          <ul className="reveal space-y-3 lg:col-span-7" style={revealDelay(1)}>
            {trade.includes.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-line-strong/60 bg-card px-4 py-3.5 text-[1rem] text-ink">
                <Check aria-hidden="true" size={18} className="mt-1 shrink-0 text-cobalt" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="proof-title" className="border-t border-line bg-paper-2 py-12 sm:py-20">
        <div className="container-page">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Recent work</p>
            <h2 id="proof-title" className="h-section word-reveal mt-3">
              <Words text="Websites I’ve designed and built." />
            </h2>
            <p className="lede mt-4">Real projects, each labelled for what it is. Open one to see how it came together.</p>
          </div>
          <ul className="reveal mt-8 grid gap-4 md:grid-cols-3">
            {PROJECT_DATA.map((project) => (
              <li key={project.id}>
                <a
                  href={pageHref(`work/${project.id}/`)}
                  className="group block h-full rounded-xl border border-line-strong/60 bg-card p-5 transition-colors hover:border-cobalt"
                >
                  <p className="text-xs font-semibold tracking-[0.08em] text-cobalt uppercase">
                    {project.status === 'live' ? 'Live website' : 'Concept project'}
                  </p>
                  <h3 className="mt-2 flex items-center gap-1.5 text-[1.125rem] font-semibold">
                    {project.name}
                    <ArrowUpRight aria-hidden="true" size={16} className="card-arrow shrink-0" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{project.type}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq
        items={trade.faq}
        heading={`Questions from ${trade.name}.`}
        label="Questions"
      />
      <SiteCheck />
      <Contact />
    </>
  )
}
