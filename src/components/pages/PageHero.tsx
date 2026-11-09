import type { ReactNode } from 'react'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { enterStep } from '@/lib/reveal'
import { useHomeAnchor } from '../pageContext'
import { buttonClasses } from '../ui/button'
import { Words } from '../Words'

type Props = {
  eyebrow: string
  headline: string
  intro: string
  /** Replaces the default "See the work" link beside the main action. */
  secondary?: ReactNode
  showWorkLink?: boolean
  /** Leaves out the quote button, for pages whose job is to show the work. */
  showQuote?: boolean
}

/** The top of every inner page: label, headline, intro, a blue button and an outline one. The trail is at the foot. */
export function PageHero({ eyebrow, headline, intro, secondary, showWorkLink = true, showQuote = true }: Props) {
  const homeAnchor = useHomeAnchor()
  const t = useCopy()
  const link =
    secondary ??
    (showWorkLink && (
      <a href={homeAnchor('work')} className={buttonClasses('secondary', 'lg')}>
        {t.hero.seeWork}
      </a>
    ))

  return (
    <section aria-labelledby="page-title" className="page-hero">
      <div className="container-page">
        <div className="mx-auto max-w-[52rem] pt-12 text-center sm:pt-16">
          <p className="hero-eyebrow enter" style={enterStep(0)}>
            {eyebrow}
          </p>
          <h1 id="page-title" className="page-title enter mx-auto mt-3" style={enterStep(0)}>
            <Words text={headline} />
          </h1>
          <p className="lede enter mx-auto mt-5 max-w-[40rem]" style={enterStep(1)}>
            {intro}
          </p>
          {(showQuote || link) && (
            <div className="hero-actions enter mt-8" style={enterStep(2)}>
              {showQuote && (
                <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'lg')}>
                  {t.common.requestQuote}
                </a>
              )}
              {link}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
