import { ChevronRight, Mail } from 'lucide-react'
import { formEndpoint } from '@/config/env'
import { mailtoHref, site } from '@/config/site'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { SITE_CHECK_EVENT } from '@/lib/siteCheck'
import { CopyEmailButton } from '../CopyEmailButton'
import { LegacyAnchors } from '../LegacyAnchors'
import { InquiryForm } from '../contact/InquiryForm'
import { Words } from '../Words'

/** The free site check used to have its own band; its address now lands here and prepares the form for it. */
const LEGACY_IDS = ['site-check'] as const

/**
 * Contact: one large grey tile on the white section, with white fields inside it: a short introduction on the left and
 * the form on the right. On phones the form follows the introduction straight away; the email address and the privacy
 * note come after it.
 */
export function Contact() {
  const t = useCopy()

  const startSiteCheck = () => window.dispatchEvent(new Event(SITE_CHECK_EVENT))

  return (
    <section id={CONTACT_SECTION_ID} aria-labelledby="contact-title" className="section-pad">
      <LegacyAnchors ids={LEGACY_IDS} />
      <div className="container-page">
        <div className="contact-panel tile-paper reveal">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-10">
            <div className="lg:col-span-5 lg:row-start-1">
              <p className="eyebrow">{t.contact.eyebrow}</p>
              <h2 id="contact-title" className="h-section mt-3">
                <Words text={t.contact.heading} />
              </h2>
              <p className="lede mt-5 max-w-[30rem]">{t.contact.lede}</p>
              <p className="mt-6 text-body text-ink-2">
                {t.siteCheck.eyebrow}{' '}
                <button type="button" onClick={startSiteCheck} className="text-link">
                  {t.siteCheck.button}
                  <ChevronRight aria-hidden="true" size={16} className="rtl:-scale-x-100" />
                </button>
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
              <div className="form-well">
                <InquiryForm />
              </div>
            </div>

            <div className="lg:col-span-5 lg:row-start-2">
              <p className="text-callout text-ink-3">{t.contact.preferEmail}</p>
              <a
                href={mailtoHref}
                dir="ltr"
                className="mt-1 inline-flex items-center gap-2 text-body font-semibold [overflow-wrap:anywhere] text-ink hover:text-accent"
              >
                <Mail aria-hidden="true" size={17} className="shrink-0 text-cobalt" />
                {site.contact.email}
              </a>
              <div className="mt-1">
                <CopyEmailButton />
              </div>

              <div id="privacy" className="anchor-target mt-8 max-w-[28rem]">
                <h3 className="text-footnote font-semibold">{t.contact.privacyTitle}</h3>
                <p className="mt-1 text-footnote leading-relaxed text-ink-3">
                  {formEndpoint ? t.contact.privacyForm : t.contact.privacyMailto} {t.contact.privacyDelete}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
