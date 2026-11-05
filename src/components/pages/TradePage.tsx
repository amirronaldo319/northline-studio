import { ArrowUpRight, Check } from 'lucide-react'
import { PROJECT_DATA } from '@/content/projectsData'
import type { Trade } from '@/content/trades'
import { useCopy, useLocalHref } from '@/i18n/context'
import { statusLabel } from '@/i18n/projectStatus'
import { revealDelay } from '@/lib/reveal'
import { Contact } from '../sections/Contact'
import { Faq } from '../sections/Faq'
import { Words } from '../Words'
import { PageHero } from './PageHero'
import { useHomeAnchor } from '../pageContext'

/** A landing page for one kind of business: what its customers look for, and what a page for it would hold. */
export function TradePage({ trade }: { trade: Trade }) {
  const homeAnchor = useHomeAnchor()
  const localHref = useLocalHref()
  const t = useCopy()

  return (
    <>
      <PageHero
        crumbs={[{ label: t.common.home, href: homeAnchor('top') }, { label: t.tradePage.crumb(trade.name) }]}
        eyebrow={t.tradePage.eyebrow(trade.name)}
        headline={trade.headline}
        intro={trade.intro}
      />

      <section aria-labelledby="checks-title" className="section-pad">
        <div className="container-page">
          <div className="section-intro reveal">
            <p className="eyebrow">{t.tradePage.customersEyebrow}</p>
            <h2 id="checks-title" className="h-section mt-3">
              <Words text={t.tradePage.checksHeading(trade.noun)} />
            </h2>
          </div>
          <ul className="reveal mt-12 grid gap-5 sm:grid-cols-2">
            {trade.checks.map((check, index) => (
              <li
                key={check.title}
                className="tile-paper"
                style={{ '--line-i': index % 2 } as React.CSSProperties}
              >
                <h3 className="text-[1.25rem] font-semibold">{check.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{check.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="includes-title" className="section-pad bg-paper">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="reveal lg:col-span-5">
            <p className="eyebrow">{t.tradePage.includesEyebrow}</p>
            <h2 id="includes-title" className="h-section mt-3">
              <Words text={t.tradePage.includesHeading} />
            </h2>
            <p className="lede mt-4">{t.tradePage.includesLede}</p>
          </div>
          <ul className="reveal stagger space-y-3 lg:col-span-7" style={revealDelay(1)}>
            {trade.includes.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl bg-card px-5 py-4 text-[1.0625rem] text-ink">
                <Check aria-hidden="true" size={18} className="mt-1 shrink-0 text-cobalt" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="proof-title" className="section-pad">
        <div className="container-page">
          <div className="section-intro reveal">
            <p className="eyebrow">{t.tradePage.recentEyebrow}</p>
            <h2 id="proof-title" className="h-section mt-3">
              <Words text={t.tradePage.recentHeading} />
            </h2>
            <p className="lede mt-5">{t.tradePage.recentLede}</p>
          </div>
          <ul className="reveal mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PROJECT_DATA.filter((project) => project.kind === 'website').map((project) => (
              <li key={project.id}>
                <a href={localHref(`work/${project.id}/`)} className="card card-link group block h-full p-6">
                  <p className="text-[0.875rem] font-semibold text-accent">
                    {statusLabel(t.work, project.status)}
                  </p>
                  <h3 className="mt-2 flex items-center gap-1.5 text-[1.125rem] font-semibold">
                    <bdi>{project.name}</bdi>
                    <ArrowUpRight aria-hidden="true" size={16} className="card-arrow shrink-0" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{t.projects[project.id].type}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq
        items={trade.faq}
        heading={t.tradePage.faqHeading(trade.name)}
        label={t.tradePage.faqLabel}
      />
      <Contact />
    </>
  )
}
