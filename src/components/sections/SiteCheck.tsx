import { ArrowRight } from 'lucide-react'
import { Button } from 'glisse'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { SITE_CHECK_EVENT } from '@/lib/siteCheck'
import { Words } from '../Words'

/** For visitors who already have a site: a lighter first step than a full quote request. */
export function SiteCheck() {
  const t = useCopy()

  const start = () => {
    window.dispatchEvent(new Event(SITE_CHECK_EVENT))
    document.getElementById(CONTACT_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="site-check" aria-labelledby="site-check-title" className="section-pad bg-paper">
      <div className="container-page">
        <div className="tile site-check-tile reveal flex flex-col items-center gap-8 !py-[clamp(2.5rem,1.5rem+4vw,5rem)] text-center">
          <div className="max-w-[44rem]">
            <p className="eyebrow">{t.siteCheck.eyebrow}</p>
            <h2 id="site-check-title" className="h-section word-reveal mt-3">
              <Words text={t.siteCheck.heading} twoTone />
            </h2>
            <p className="lede mt-5">{t.siteCheck.text}</p>
          </div>
          <Button
            variant="filled"
            onClick={start}
            className="glass-btn-lg glass-btn-wrap nudge max-w-full shrink-0 text-center"
          >
            {t.siteCheck.button}
            <ArrowRight aria-hidden="true" className="rtl:-scale-x-100" />
          </Button>
        </div>
      </div>
    </section>
  )
}
