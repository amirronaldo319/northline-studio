import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { HERO_PROJECT, STATUS_LABEL } from '@/content/projects'
import { CONTACT_SECTION_ID, PRIMARY_CTA_LABEL, WORK_CTA_LABEL } from '@/content/navigation'
import { ProjectShot } from '../ProjectShot'
import { SplitWords } from '../SplitWords'
import { TiltFrame } from '../ui/TiltFrame'
import { buttonClasses } from '../ui/button'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-8 pb-12 sm:pt-12 lg:pt-16 lg:pb-24">
      <div className="container-page grid items-center gap-9 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <h1 id="hero-title" className="text-[clamp(2.15rem,1.55rem+2.7vw,3.5rem)] font-[680] leading-[1.05] tracking-[-0.03em]">
            <SplitWords text="Custom websites for Vancouver’s local service businesses." />
          </h1>
          <p className="lede hero-in mt-5 max-w-[30rem]" style={{ '--d': '420ms' } as React.CSSProperties}>
            Show your work, explain your services, and make requesting a quote easy.
          </p>

          <div className="hero-in mt-7 flex flex-col gap-3 min-[420px]:flex-row" style={{ '--d': '520ms' } as React.CSSProperties}>
            <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'lg', 'nudge')}>
              {PRIMARY_CTA_LABEL}
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a href="#work" className={buttonClasses('secondary', 'lg')}>
              {WORK_CTA_LABEL}
            </a>
          </div>

          <p className="hero-in mt-5 text-sm text-ink-3" style={{ '--d': '620ms' } as React.CSSProperties}>
            Serving Vancouver and North Vancouver.
          </p>
        </div>

        <figure>
          <TiltFrame>
            <div className="tilt-surface overflow-hidden rounded-lg border border-line-strong/60 bg-white shadow-device">
              <ProjectShot project={HERO_PROJECT} isEager isHero />
            </div>
          </TiltFrame>
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-ink-3">
            <span>
              {STATUS_LABEL[HERO_PROJECT.status]}: {HERO_PROJECT.name}, {HERO_PROJECT.caption}.
            </span>
            <a
              href={HERO_PROJECT.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-1.5 font-semibold text-cobalt underline-offset-4 hover:underline"
            >
              Visit live site
              <ArrowUpRight aria-hidden="true" size={15} />
              <span className="sr-only">: {HERO_PROJECT.name} (opens in a new tab)</span>
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
