import { useCopy } from '@/i18n/context'
import { Words } from '../Words'

export function About() {
  const t = useCopy()

  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line bg-paper-2 py-12 sm:py-20 lg:py-24">
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 id="about-title" className="h-section word-reveal mt-3">
            <Words text={t.about.heading} />
          </h2>

          <dl className="reveal stagger mt-8 divide-y divide-line-strong/60 rounded-xl border border-line-strong/60 bg-card text-[0.9375rem]">
            {t.about.glance.map((row) => (
              <div key={row.label} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:gap-4">
                <dt className="shrink-0 text-ink-3 sm:w-36">{row.label}</dt>
                <dd className="font-medium text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal space-y-4 text-[1.0625rem] leading-relaxed text-ink-2 lg:col-span-7">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
