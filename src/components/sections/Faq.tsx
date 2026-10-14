import { Plus } from 'lucide-react'
import { mailtoHref, site } from '@/config/site'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { FAQ } from '@/content/faq'

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-12 sm:py-20 lg:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="reveal lg:col-span-4">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="h-section mt-3">
            Before you get in touch.
          </h2>
          <p className="mt-4 text-ink-2">
            Something else?{' '}
            <a href={`#${CONTACT_SECTION_ID}`} className="font-medium text-cobalt underline underline-offset-4">
              Ask in the form
            </a>{' '}
            or email{' '}
            <a href={mailtoHref} className="font-medium whitespace-nowrap text-cobalt underline underline-offset-4">
              {site.contact.email}
            </a>
            .
          </p>
        </div>

        <div className="reveal border-b border-line lg:col-span-8">
          {FAQ.map((item) => (
            <details key={item.question} className="faq-item group border-t border-line">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-[1.125rem] font-semibold tracking-[-0.01em] transition-colors hover:text-cobalt sm:text-[1.1875rem]">
                {item.question}
                <span
                  aria-hidden="true"
                  className="faq-icon grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-ink-2 transition-transform duration-300 group-hover:border-cobalt group-hover:text-cobalt"
                >
                  <Plus size={16} />
                </span>
              </summary>
              <p className="max-w-[42rem] pb-6 text-[0.98rem] leading-relaxed text-ink-2">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
