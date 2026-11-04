import { Mail } from 'lucide-react'
import { formEndpoint } from '@/config/env'
import { mailtoHref, site } from '@/config/site'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { CopyEmailButton } from '../CopyEmailButton'
import { InquiryForm } from '../contact/InquiryForm'
import { Words } from '../Words'

/**
 * Contact in Apple's order: a centered headline, the form straight after it (on a phone it used to sit below a
 * screen and a half of text), then what happens next, the email address, and how details are used.
 */
export function Contact() {
  const t = useCopy()

  return (
    <section id={CONTACT_SECTION_ID} aria-labelledby="contact-title" className="section-pad bg-card">
      <div className="container-page">
        <div className="section-intro reveal">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 id="contact-title" className="h-section word-reveal mt-3">
            <Words text={t.contact.heading} twoTone />
          </h2>
          <p className="lede mt-5">{t.contact.lede}</p>
        </div>

        <div className="reveal mx-auto mt-10 max-w-[46rem] sm:mt-14">
          <InquiryForm />
        </div>

        <div className="reveal mx-auto mt-14 max-w-[62rem] sm:mt-20">
          <h3 className="text-center text-[1.1875rem] font-semibold">{t.contact.nextTitle}</h3>
          <ol className="mt-6 grid gap-5 sm:grid-cols-3 sm:gap-8">
            {t.contact.nextSteps.map((step, index) => (
              <li key={step} className="flex gap-4 sm:flex-col sm:items-center sm:gap-3 sm:text-center">
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-cobalt text-[0.9375rem] font-semibold text-white"
                >
                  {index + 1}
                </span>
                <span className="pt-1.5 text-[1rem] leading-relaxed text-ink-2 sm:pt-0">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="reveal mx-auto mt-14 max-w-[46rem] border-t border-ink/10 pt-8 text-center">
          <p className="text-[0.9375rem] text-ink-3">{t.contact.preferEmail}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <a
              href={mailtoHref}
              dir="ltr"
              className="inline-flex items-center gap-2 text-lg font-semibold [overflow-wrap:anywhere] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-cobalt"
            >
              <Mail aria-hidden="true" size={18} className="shrink-0 text-cobalt" />
              {site.contact.email}
            </a>
            <CopyEmailButton />
          </div>

          <div id="privacy" className="anchor-target mx-auto mt-8 max-w-[38rem]">
            <h3 className="text-sm font-semibold">{t.contact.privacyTitle}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-3">
              {formEndpoint ? t.contact.privacyForm : t.contact.privacyMailto} {t.contact.privacyDelete}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
