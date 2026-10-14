import { Mail } from 'lucide-react'
import { formEndpoint } from '@/config/env'
import { mailtoHref, site } from '@/config/site'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { CopyEmailButton } from '../CopyEmailButton'
import { InquiryForm } from '../contact/InquiryForm'
import { Words } from '../Words'

const NEXT_STEPS = [
  'You send a message, with as much or as little as you like.',
  'I read it and reply by email to talk through what you need.',
  'If it’s a fit, I send a written quote. Nothing starts until you approve it.',
] as const

export function Contact() {
  return (
    <section id={CONTACT_SECTION_ID} aria-labelledby="contact-title" className="border-t border-line bg-paper-2 py-12 sm:py-20 lg:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow">Get started</p>
          <h2 id="contact-title" className="h-section word-reveal mt-3">
            <Words text="Request a quote." />
          </h2>
          <p className="lede mt-4">
            Tell me about your business and what you need. I’ll reply to talk through the scope and next steps.
          </p>

          <h3 className="mt-6 text-sm font-semibold">What happens next</h3>
          <ol className="mt-2 space-y-2 text-[0.9375rem] leading-relaxed text-ink-2">
            {NEXT_STEPS.map((step, index) => (
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

          <p className="mt-8 text-sm text-ink-3">Prefer email?</p>
          <a
            href={mailtoHref}
            className="mt-1 inline-flex items-center gap-2 text-lg font-semibold [overflow-wrap:anywhere] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-cobalt"
          >
            <Mail aria-hidden="true" size={18} className="shrink-0 text-cobalt" />
            {site.contact.email}
          </a>
          <div className="mt-3">
            <CopyEmailButton />
          </div>

          <div id="privacy" className="anchor-target mt-8 border-t border-line-strong pt-5">
            <h3 className="text-sm font-semibold">How your details are used</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-3">
              {formEndpoint
                ? 'What you send goes to me through a third-party form service and is used only to reply about your website.'
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
