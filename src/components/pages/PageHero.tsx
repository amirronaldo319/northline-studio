import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
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
  const t = useCopy()

  return (
    <section aria-labelledby="page-title" className="relative isolate pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-light" />
      </div>
      <div className="container-page">
        <Breadcrumb items={crumbs} />
        {/* Centred, as the home page and Apple's product pages open. */}
        <div className="mx-auto mt-10 max-w-[56rem] text-center sm:mt-14">
          <p className="eyebrow enter" style={enterStep(1)}>
            {eyebrow}
          </p>
          <h1
            id="page-title"
            className="word-enter mx-auto mt-3 max-w-[18ch] text-[clamp(2.5rem,1.5rem+4.2vw,4.75rem)] font-bold leading-[1.03] tracking-[-0.042em] sm:max-w-4xl"
          >
            <Words text={headline} />
          </h1>
          <p className="lede enter mx-auto mt-6 max-w-[40rem]" style={enterStep(2)}>
            {intro}
          </p>
          <div
            className="enter mt-9 flex flex-col items-stretch justify-center gap-3 min-[420px]:flex-row min-[420px]:items-center"
            style={enterStep(3)}
          >
            <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'lg', 'nudge')}>
              {t.common.requestQuote}
              <ArrowRight aria-hidden="true" size={18} className="rtl:-scale-x-100" />
            </a>
            {secondary ??
              (showWorkLink && (
                <a href={homeAnchor('work')} className={buttonClasses('secondary', 'lg')}>
                  {t.common.seeMyWork}
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
