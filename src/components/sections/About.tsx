import { useCopy } from '@/i18n/context'
import { Words } from '../Words'

export function About() {
  const t = useCopy()

  return (
    <section id="about" aria-labelledby="about-title" className="section-pad bg-card">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 id="about-title" className="h-section word-reveal mt-3">
            <Words text={t.about.heading} />
          </h2>

          <dl className="tile-paper reveal stagger mt-10 divide-y divide-ink/10 !py-2 text-[0.9375rem]">
            {t.about.glance.map((row) => (
              <div key={row.label} className="flex flex-col gap-0.5 py-3.5 sm:flex-row sm:gap-4">
                <dt className="shrink-0 text-ink-3 sm:w-36">{row.label}</dt>
                <dd className="font-medium text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal space-y-6 text-[clamp(1.1875rem,1.05rem+0.6vw,1.5rem)] leading-[1.45] tracking-[-0.016em] text-ink-2 lg:col-span-7 lg:pt-2">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph} data-scrub-text="">{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
