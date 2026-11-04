import { Plus } from 'lucide-react'
import { mailtoHref, site } from '@/config/site'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import type { FaqItem } from '@/content/faq'
import { useCopy } from '@/i18n/context'
import { Words } from '../Words'

type Props = {
  items?: readonly FaqItem[]
  heading?: string
  label?: string
}

export function Faq({ items, heading, label }: Props) {
  const t = useCopy()
  const entries = items ?? t.faq.items

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-pad bg-paper pb-0">
      <div className="container-page">
        <div className="section-intro reveal">
          <p className="eyebrow">{label ?? t.faq.eyebrow}</p>
          <h2 id="faq-title" className="h-section word-reveal mt-3">
            <Words text={heading ?? t.faq.heading} twoTone />
          </h2>
          <p className="lede mt-5">
            {t.faq.moreLead}
            <a href={`#${CONTACT_SECTION_ID}`} className="font-medium text-cobalt underline underline-offset-4">
              {t.faq.askInForm}
            </a>
            {t.faq.orEmail}
            <a href={mailtoHref} dir="ltr" className="font-medium whitespace-nowrap text-cobalt underline underline-offset-4">
              {site.contact.email}
            </a>
            {t.faq.moreEnd}
          </p>
        </div>

        <div className="reveal mx-auto mt-14 max-w-[52rem] border-b border-ink/10 lg:mt-16">
          {entries.map((item) => (
            <details key={item.question} className="faq-item group border-t border-ink/10">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-6 text-start font-display text-[1.1875rem] font-semibold tracking-[-0.02em] transition-colors hover:text-cobalt sm:text-[1.375rem]">
                {item.question}
                <span
                  aria-hidden="true"
                  className="faq-icon grid size-9 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-ink-2 transition-transform duration-300 group-hover:text-cobalt"
                >
                  <Plus size={16} />
                </span>
              </summary>
              <p className="max-w-[44rem] pb-7 text-[1.0625rem] leading-relaxed text-ink-2">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
