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
    <section id="faq" aria-labelledby="faq-title" className="section-pad bg-paper">
      <div className="container-page">
        <div className="section-intro reveal">
          <p className="eyebrow">{label ?? t.faq.eyebrow}</p>
          <h2 id="faq-title" className="h-section mt-3">
            <Words text={heading ?? t.faq.heading} />
          </h2>
          <p className="lede mt-5">
            {t.faq.moreLead}
            <a href={`#${CONTACT_SECTION_ID}`} className="text-link-inline">
              {t.faq.askInForm}
            </a>
            {t.faq.orEmail}
            <a href={mailtoHref} dir="ltr" className="text-link-inline whitespace-nowrap">
              {site.contact.email}
            </a>
            {t.faq.moreEnd}
          </p>
        </div>

        <div className="reveal mx-auto mt-12 max-w-[52rem] border-b border-line lg:mt-14">
          {entries.map((item) => (
            <details key={item.question} className="faq-item group border-t border-line">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-start text-body font-semibold transition-colors hover:text-accent sm:text-lead lg:text-title3">
                {item.question}
                <Plus aria-hidden="true" size={18} className="faq-icon shrink-0 text-ink-3 transition-transform duration-200 group-hover:text-accent" />
              </summary>
              <p className="max-w-[44rem] pb-6 text-body leading-relaxed text-ink-2">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
