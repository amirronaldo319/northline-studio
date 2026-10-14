import { ArrowRight } from 'lucide-react'
import { site } from '@/config/site'
import { CONTACT_SECTION_ID, PRIMARY_CTA_LABEL } from '@/content/navigation'
import { LegacyAnchors } from '../LegacyAnchors'
import { buttonClasses } from '../ui/button'

/** Section ids from earlier versions of the page. Links shared with these still land on this section. */
const LEGACY_IDS = ['pricing', 'included'] as const

export function Package() {
  return (
    <section id="package" aria-labelledby="package-title" className="relative border-t border-line bg-card py-12 sm:py-20 lg:py-24">
      <LegacyAnchors ids={LEGACY_IDS} />

      <div className="container-page">
        <div className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Your website package</p>
            <h2 id="package-title" className="h-section mt-3">
              One focused page, built around your business.
            </h2>
            <p className="lede mt-4">
              It answers the questions customers ask before they call: what you do, what your work looks like, and how to
              reach you.
            </p>
          </div>
          <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'lg', 'nudge self-start lg:self-auto')}>
            {PRIMARY_CTA_LABEL}
            <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>

        <ul className="reveal mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {site.packageGroups.map((group) => (
            <li key={group.id} className="border-t border-ink pt-4">
              <h3 className="text-[1.1875rem] font-semibold">{group.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{group.text}</p>
            </li>
          ))}
        </ul>

        <div className="on-dark reveal mt-10 rounded-xl bg-night p-5 text-white sm:p-7 lg:mt-12">
          <p className="max-w-3xl text-[1rem] leading-relaxed">
            <strong className="font-semibold">A written quote comes first.</strong>{' '}
            <span className="text-white/80">
              Before work begins, it confirms the cost, scope, schedule, hosting and domain arrangements, and any ongoing
              costs. Anything beyond the single page, such as extra pages or features, is quoted separately.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
