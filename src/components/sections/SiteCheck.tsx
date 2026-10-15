import { ArrowRight } from 'lucide-react'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { SITE_CHECK_EVENT } from '@/lib/siteCheck'
import { buttonClasses } from '../ui/button'
import { Words } from '../Words'

/** For visitors who already have a site: a lighter first step than a full quote request. */
export function SiteCheck() {
  const t = useCopy()

  const start = () => {
    window.dispatchEvent(new Event(SITE_CHECK_EVENT))
    document.getElementById(CONTACT_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="site-check" aria-labelledby="site-check-title" className="py-6 sm:py-10">
      <div className="container-page">
        <div className="reveal flex flex-col gap-6 rounded-2xl border border-cobalt/15 bg-cobalt-soft/70 p-6 sm:p-9 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="max-w-2xl">
            <p className="eyebrow">{t.siteCheck.eyebrow}</p>
            <h2 id="site-check-title" className="h-section word-reveal mt-3">
              <Words text={t.siteCheck.heading} />
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2">{t.siteCheck.text}</p>
          </div>
          <button type="button" onClick={start} className={buttonClasses('primary', 'lg', 'nudge shrink-0 self-start md:self-auto')}>
            {t.siteCheck.button}
            <ArrowRight aria-hidden="true" size={18} className="rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </section>
  )
}
