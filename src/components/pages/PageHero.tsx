import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
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
  /** Replaces the default "See the work" link beside the main action. */
  secondary?: ReactNode
  showWorkLink?: boolean
  /** Leaves out the quote button, for pages whose job is to show the work. */
  showQuote?: boolean
}

/** The top of every inner page: breadcrumb, label, headline, intro, one blue action and one text link. */
export function PageHero({ crumbs, eyebrow, headline, intro, secondary, showWorkLink = true, showQuote = true }: Props) {
  const homeAnchor = useHomeAnchor()
  const t = useCopy()
  const link =
    secondary ??
    (showWorkLink && (
      <a href={homeAnchor('work')} className="text-link text-[1.0625rem]">
        {t.hero.seeWork}
        <ChevronRight aria-hidden="true" size={18} className="rtl:-scale-x-100" />
      </a>
    ))

  return (
    <section aria-labelledby="page-title" className="page-hero">
      <div className="container-page">
        <Breadcrumb items={crumbs} />
        <div className="mx-auto mt-10 max-w-[52rem] text-center sm:mt-14">
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
            <div className="enter mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4" style={enterStep(2)}>
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
