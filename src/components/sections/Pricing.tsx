import { ArrowRight, Check } from 'lucide-react'
import { site } from '@/config/site'
import { CONTACT_SECTION_ID, PRIMARY_CTA_LABEL } from '@/content/navigation'
import { buttonClasses } from '../ui/button'

const SCOPE_SUMMARY = [
  'A custom one-page layout for your business',
  'Designed for phones, tablets, and desktops',
  'Services, photos, and contact details',
  'Quote-request form and clear contact buttons',
  'Basic page titles, descriptions, and headings',
]

const QUOTE_CONFIRMS = [
  { title: 'Price', text: 'The full cost for your site, before any work begins.' },
  { title: 'Scope', text: 'Exactly what’s on the page and any extras.' },
  { title: 'Timeline', text: 'When work starts and when you’ll review it.' },
  { title: 'Hosting and domain', text: 'Where the site lives, who owns what, and any ongoing costs.' },
]

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="on-dark bg-night py-16 text-white sm:py-20 lg:py-28">
      <div className="container-page">
        <div className="reveal max-w-2xl">
          <p className="eyebrow !text-[#9fb2ff]">Pricing</p>
          <h2 id="pricing-title" className="h-section mt-3">
            A clear written quote, before any work starts.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="on-light reveal relative overflow-hidden rounded-[1.5rem] bg-white p-6 text-ink sm:p-8 lg:col-span-7 lg:p-10">
            <div aria-hidden="true" className="absolute -top-24 -right-24 size-64 rounded-full bg-cobalt-soft" />
            <div className="relative">
              <p className="text-sm font-semibold tracking-wide text-ink-3 uppercase">The package</p>
              <h3 className="mt-2 font-display text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-tight font-bold tracking-[-0.03em]">
                {site.pricing.packageName}
              </h3>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-2">
                One focused page for your business, quoted to fit what you need.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="What the one-page website covers">
                {SCOPE_SUMMARY.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug text-ink-2">
                    <Check aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-cobalt" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'lg', 'nudge')}>
                  {PRIMARY_CTA_LABEL}
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
                <p className="text-sm text-ink-3">Additional pages and features can be quoted separately.</p>
              </div>
            </div>
          </div>

          <div className="reveal flex flex-col rounded-[1.5rem] border border-night-line bg-night-2 p-6 sm:p-8 lg:col-span-5 lg:p-10">
            <h3 className="text-[1.25rem] font-semibold">Your quote confirms the details</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/70">
              Tell me about your business and I’ll send a written quote, so you know exactly what you’re agreeing to.
            </p>
            <dl className="mt-6 divide-y divide-night-line border-y border-night-line">
              {QUOTE_CONFIRMS.map((item) => (
                <div key={item.title} className="flex flex-col gap-0.5 py-4 sm:flex-row sm:gap-4">
                  <dt className="font-semibold sm:w-40 sm:shrink-0">{item.title}</dt>
                  <dd className="text-[0.9375rem] text-white/70">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
