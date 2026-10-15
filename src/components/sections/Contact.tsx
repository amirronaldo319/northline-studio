import { Mail } from 'lucide-react'
import { formEndpoint } from '@/config/env'
import { mailtoHref, site } from '@/config/site'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { CopyEmailButton } from '../CopyEmailButton'
import { InquiryForm } from '../contact/InquiryForm'
import { Words } from '../Words'

export function Contact() {
  const t = useCopy()

  return (
    <section id={CONTACT_SECTION_ID} aria-labelledby="contact-title" className="border-t border-line bg-paper-2 py-12 sm:py-20 lg:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 id="contact-title" className="h-section word-reveal mt-3">
            <Words text={t.contact.heading} />
          </h2>
          <p className="lede mt-4">{t.contact.lede}</p>

          <h3 className="mt-6 text-sm font-semibold">{t.contact.nextTitle}</h3>
          <ol className="mt-2 space-y-2 text-[0.9375rem] leading-relaxed text-ink-2">
            {t.contact.nextSteps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cobalt text-xs font-semibold text-white"
                >
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <p className="mt-8 text-sm text-ink-3">{t.contact.preferEmail}</p>
          <a
            href={mailtoHref}
            dir="ltr"
            className="mt-1 inline-flex items-center gap-2 text-lg font-semibold [overflow-wrap:anywhere] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-cobalt"
          >
            <Mail aria-hidden="true" size={18} className="shrink-0 text-cobalt" />
            {site.contact.email}
          </a>
          <div className="mt-3">
            <CopyEmailButton />
          </div>

          <div id="privacy" className="anchor-target mt-8 border-t border-line-strong pt-5">
            <h3 className="text-sm font-semibold">{t.contact.privacyTitle}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-3">
              {formEndpoint ? t.contact.privacyForm : t.contact.privacyMailto} {t.contact.privacyDelete}
            </p>
          </div>
        </div>

        <div className="reveal lg:col-span-7">
          <InquiryForm />
        </div>
      </div>
    </section>
  )
}
