import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { CONTACT_SECTION_ID, PRIMARY_CTA_LABEL, WORK_CTA_LABEL } from '@/content/navigation'
import { enterStep } from '@/lib/reveal'
import { Breadcrumb, type Crumb } from '../Breadcrumb'
import { useHomeAnchor } from '../pageContext'
import { buttonClasses } from '../ui/button'
import { Words } from '../Words'

type Props = {
  crumbs: readonly Crumb[]
  eyebrow: string
  headline: string
  intro: string
  /** Extra content under the buttons, such as a status line. */
  /** Replaces the default "See my work" button beside the main action. */
  secondary?: ReactNode
  showWorkLink?: boolean
}

/** The top of every landing page: breadcrumb, label, headline, intro, and the two standard actions. */
export function PageHero({ crumbs, eyebrow, headline, intro, secondary, showWorkLink = true }: Props) {
  const homeAnchor = useHomeAnchor()

  return (
    <section aria-labelledby="page-title" className="relative isolate pt-8 pb-12 sm:pt-12 lg:pt-14 lg:pb-16">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-blue" />
        <div className="hero-orb hero-orb-sand" />
      </div>
      <div className="container-page">
        <Breadcrumb items={crumbs} />
        <p className="eyebrow enter mt-8" style={enterStep(1)}>
          {eyebrow}
        </p>
        <h1
          id="page-title"
          className="word-enter mt-3 max-w-[18ch] text-[clamp(2.15rem,1.55rem+2.7vw,3.5rem)] font-[680] leading-[1.05] tracking-[-0.03em] sm:max-w-3xl"
        >
          <Words text={headline} />
        </h1>
        <p className="lede enter mt-5 max-w-[38rem]" style={enterStep(2)}>
          {intro}
        </p>
        <div className="enter mt-7 flex flex-col gap-3 min-[420px]:flex-row" style={enterStep(3)}>
          <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'lg', 'nudge')}>
            {PRIMARY_CTA_LABEL}
            <ArrowRight aria-hidden="true" size={18} />
          </a>
          {secondary ??
            (showWorkLink && (
              <a href={homeAnchor('work')} className={buttonClasses('secondary', 'lg')}>
                {WORK_CTA_LABEL}
              </a>
            ))}
        </div>
      </div>
    </section>
  )
}
