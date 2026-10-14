import { Mail } from 'lucide-react'
import { mailtoHref, site } from '@/config/site'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { InquiryForm } from '../contact/InquiryForm'

const NEXT_STEPS = [
  'I read your details and reply by email.',
  'We talk through what the site needs.',
  'You get a quote that confirms the scope before anything starts.',
]

export function Contact() {
  return (
    <section id={CONTACT_SECTION_ID} aria-labelledby="contact-title" className="relative overflow-hidden bg-paper-2 py-16 sm:py-20 lg:py-28">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow">Get started</p>
          <h2 id="contact-title" className="h-section mt-3">
            Tell me about your business.
          </h2>
          <p className="lede mt-4">
            Share a few details about what you need, and I’ll reply to discuss the scope and next steps.
          </p>

          <ol className="mt-8 space-y-3">
            {NEXT_STEPS.map((step, index) => (
              <li key={step} className="flex gap-3 text-[0.9375rem] text-ink-2">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink text-xs font-semibold text-white">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-2xl border border-line bg-card p-5">
            <p className="text-sm font-medium text-ink-3">Prefer email?</p>
            <a
              href={mailtoHref}
              className="mt-1 inline-flex items-center gap-2 text-lg font-semibold [overflow-wrap:anywhere] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-cobalt"
            >
              <Mail aria-hidden="true" size={18} className="shrink-0 text-cobalt" />
              {site.contact.email}
            </a>
          </div>
        </div>

        <div className="reveal lg:col-span-7">
          <InquiryForm />
        </div>
      </div>
    </section>
  )
}
