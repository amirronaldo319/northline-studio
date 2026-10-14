import { FileText, Images, LayoutTemplate, MessageSquareText, MousePointerClick, PhoneCall, Search, Smartphone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { site } from '@/config/site'
import { revealDelay } from '@/lib/reveal'
import { PageAnatomy } from '../PageAnatomy'

const ICONS: Record<(typeof site.packageFeatures)[number]['id'], LucideIcon> = {
  layout: LayoutTemplate,
  responsive: Smartphone,
  services: FileText,
  photos: Images,
  contact: PhoneCall,
  'quote-form': MessageSquareText,
  buttons: MousePointerClick,
  basics: Search,
}

export function Included() {
  return (
    <section id="included" aria-labelledby="included-title" className="border-t border-line bg-card py-16 sm:py-20 lg:py-28">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="reveal lg:col-span-5">
            <p className="eyebrow">What’s included</p>
            <h2 id="included-title" className="h-section mt-3">
              Everything a one-page business site needs.
            </h2>
            <p className="lede mt-4">
              One focused page that explains what you do, shows your work, and makes it easy to get in touch.
            </p>
            <p className="mt-6 rounded-xl border border-dashed border-line-strong p-4 text-[0.9375rem] leading-relaxed text-ink-2">
              Need more pages, online booking, or a store? Additional pages and features can be quoted separately.
            </p>
          </div>
          <div className="reveal lg:col-span-7">
            <PageAnatomy />
          </div>
        </div>

        <ul className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {site.packageFeatures.map((feature, index) => {
            const Icon = ICONS[feature.id]
            return (
              <li key={feature.id} className="reveal border-t border-line py-6" style={revealDelay(index % 4)}>
                <span className="grid size-10 place-items-center rounded-xl border border-line bg-paper text-cobalt">
                  <Icon aria-hidden="true" size={19} />
                </span>
                <h3 className="mt-4 font-sans text-[1.0625rem] font-semibold tracking-normal">{feature.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">{feature.value}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
