import { ArrowRight } from 'lucide-react'
import { site } from '@/config/site'
import { CONTACT_SECTION_ID, PRIMARY_CTA_LABEL } from '@/content/navigation'
import { buttonClasses } from '../ui/button'

/** What the written quote confirms before any work begins. */
const QUOTE_CONFIRMS = ['The cost', 'The scope', 'The schedule', 'Hosting and domain arrangements', 'Any ongoing costs']

export function Package() {
  return (
    <section id="package" aria-labelledby="package-title" className="border-t border-line bg-card py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="reveal lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <p className="eyebrow">Your website package</p>
            <h2 id="package-title" className="h-section mt-3">
              One focused page, built around your business.
            </h2>
            <p className="lede mt-4">
              It answers the questions customers ask before they call: what you do, what your work looks like, and how to
              reach you.
            </p>
            <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'lg', 'nudge mt-7')}>
              {PRIMARY_CTA_LABEL}
              <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>

          <div className="reveal lg:col-span-7">
            <h3 className="sr-only">What the {site.package.name.toLowerCase()} includes</h3>
            <dl className="divide-y divide-line border-y border-line">
              {site.packageGroups.map((group) => (
                <div key={group.id} className="grid gap-3 py-6 sm:grid-cols-[9.5rem_1fr] sm:gap-8">
                  <dt className="text-sm font-semibold tracking-[0.08em] text-ink-3 uppercase">{group.title}</dt>
                  <dd>
                    <ul className="space-y-4">
                      {group.items.map((item) => (
                        <li key={item.title}>
                          <p className="font-semibold">{item.title}</p>
                          <p className="mt-0.5 text-[0.9375rem] leading-relaxed text-ink-2">{item.value}</p>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="on-dark reveal mt-12 rounded-xl bg-night p-6 text-white sm:p-8 lg:mt-16 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <h3 className="text-[1.375rem] font-semibold">A written quote comes first</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/75">
              Before any work begins, you’ll have it in writing. Extra pages or features can be quoted separately.
            </p>
          </div>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:col-span-7 lg:mt-0">
            {QUOTE_CONFIRMS.map((item) => (
              <li key={item} className="flex items-center gap-3 border-b border-night-line pb-3 text-[0.9375rem]">
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[#9fb2ff]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
