import { Mail } from 'lucide-react'
import { formEndpoint } from '@/config/env'
import { mailtoHref, site } from '@/config/site'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { InquiryForm } from '../contact/InquiryForm'

export function Contact() {
  return (
    <section id={CONTACT_SECTION_ID} aria-labelledby="contact-title" className="border-t border-line bg-paper-2 py-12 sm:py-20 lg:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow">Get started</p>
          <h2 id="contact-title" className="h-section mt-3">
            Request a quote.
          </h2>
          <p className="lede mt-4">
            Tell me about your business and what you need. I’ll reply to talk through the scope and next steps.
          </p>

          <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-2">
            <strong className="font-semibold text-ink">What happens next:</strong> I read your message and reply by email.
            If it’s a fit, I send a written quote. Nothing starts until you approve it.
          </p>

          <p className="mt-8 text-sm text-ink-3">Prefer email?</p>
          <a
            href={mailtoHref}
            className="mt-1 inline-flex items-center gap-2 text-lg font-semibold [overflow-wrap:anywhere] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-cobalt"
          >
            <Mail aria-hidden="true" size={18} className="shrink-0 text-cobalt" />
            {site.contact.email}
          </a>

          <div id="privacy" className="anchor-target mt-8 border-t border-line-strong pt-5">
            <h3 className="text-sm font-semibold">How your details are used</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-3">
              {formEndpoint
                ? 'What you send goes to me through a form service and is used only to reply about your website.'
                : 'The form opens your own email app, and nothing is stored on this site. What you send is used only to reply about your website.'}{' '}
              To have your details deleted, email me.
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
