import { useCopy } from '@/i18n/context'
import { Words } from '../Words'

/** A short, personal introduction: who builds the site, and four plain facts about working together on a grey tile. */
export function About() {
  const t = useCopy()

  return (
    <section id="about" aria-labelledby="about-title" className="section-pad">
      <div className="container-page grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-6">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 id="about-title" className="h-section mt-3">
            <Words text={t.about.heading} />
          </h2>
          <p className="lede mt-6 max-w-[34rem]">{t.about.paragraphs[0]}</p>
        </div>

        <div className="reveal lg:col-span-6 lg:pt-3">
          <dl className="facts facts-card tile-paper">
            {t.about.glance.map((row) => (
              <div key={row.label} className="facts-row">
                <dt className="text-[0.9375rem] text-ink-3">{row.label}</dt>
                <dd className="text-[1.0625rem] font-medium text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
