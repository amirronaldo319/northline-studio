import { ArrowRight, MapPin } from 'lucide-react'
import { site } from '@/config/site'
import { CONTACT_SECTION_ID, PRIMARY_CTA_LABEL } from '@/content/navigation'
import { HeroMockup } from '../HeroMockup'
import { riseDelay } from '@/lib/reveal'
import { buttonClasses } from '../ui/button'

const HIGHLIGHTS = ['Mobile-friendly design', 'Service sections', 'Quote-request form']

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Quiet grid texture behind the mockup */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] opacity-60 lg:block"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 60% 45%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 60% 45%, black 20%, transparent 70%)',
        }}
      />

      <div className="container-page relative grid items-center gap-12 pt-8 pb-16 sm:pt-12 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-5">
          <p className="rise mb-5 inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 text-[0.8125rem] font-medium text-ink-2">
            <MapPin aria-hidden="true" size={14} className="text-cobalt" />
            Web design for {site.serviceArea.label}
          </p>

          <h1
            id="hero-title"
            className="text-[clamp(2.15rem,1.4rem+3.3vw,3.65rem)] font-[680] leading-[1.04] tracking-[-0.03em]"
          >
            Make your business look as good online as it does in person.
          </h1>

          <p className="lede mt-5 max-w-[34rem]">
            I build modern, mobile-friendly websites for local businesses in {site.serviceArea.label}: professional
            one-page sites that explain what you do, show your work, and make it easy to request a quote.
          </p>

          <div className="rise mt-8 flex flex-col gap-3 min-[420px]:flex-row" style={riseDelay(60)}>
            <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'lg', 'nudge')}>
              {PRIMARY_CTA_LABEL}
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a href="#examples" className={buttonClasses('secondary', 'lg')}>
              See Website Examples
            </a>
          </div>

          <ul className="rise mt-7 flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink-2" style={riseDelay(140)} aria-label="Included in every website">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-cobalt" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rise lg:col-span-7 lg:pl-4" style={riseDelay(100)}>
          <HeroMockup />
        </div>
      </div>
    </section>
  )
}
