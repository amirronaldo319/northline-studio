import { FileText, Images, LayoutTemplate, MessageSquareText, MousePointerClick, PhoneCall, Search, Smartphone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { site } from '@/config/site'
import { revealDelay } from '@/lib/reveal'

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
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="reveal lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
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

        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {site.packageFeatures.map((feature, index) => {
            const Icon = ICONS[feature.id]
            return (
              <li
                key={feature.id}
                className="reveal flex gap-4 border-t border-line py-6"
                style={revealDelay(index % 2)}
              >
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-paper text-cobalt">
                  <Icon aria-hidden="true" size={18} />
                </span>
                <div>
                  <h3 className="font-sans text-[1.0625rem] font-semibold tracking-normal">{feature.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">{feature.value}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
