import { site } from '@/config/site'
import { Words } from '../Words'

const GLANCE = [
  { label: 'Based in', value: `${site.serviceArea.label}, ${site.serviceArea.region}` },
  { label: 'Who builds it', value: 'Me, directly. No hand-offs.' },
  { label: 'Before work starts', value: 'A written quote you approve' },
  { label: 'How we talk', value: 'By email, in plain language' },
] as const

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line bg-paper-2 py-12 sm:py-20 lg:py-24">
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="h-section word-reveal mt-3">
            <Words text="You work with me directly." />
          </h2>

          <dl className="mt-8 divide-y divide-line-strong/60 rounded-xl border border-line-strong/60 bg-card text-[0.9375rem]">
            {GLANCE.map((row) => (
              <div key={row.label} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:gap-4">
                <dt className="shrink-0 text-ink-3 sm:w-36">{row.label}</dt>
                <dd className="font-medium text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal space-y-4 text-[1.0625rem] leading-relaxed text-ink-2 lg:col-span-7">
          <p>
            I’m {site.brand.owner}. I design and build every website myself, so when you send a message you’re talking to
            the person doing the work.
          </p>
          <p>
            Recent builds include a one-page site for a Vancouver private swim-lesson business, a landing page with an
            interactive estimator for a car-hosting service, and a bilingual concept site with interactive 3D models of
            a residential tower.
          </p>
          <p>
            I focus on practical sites for local service businesses in {site.serviceArea.label}, and I keep the scope
            simple and the language plain, so you know what you’re getting and what comes next.
          </p>
        </div>
      </div>
    </section>
  )
}
