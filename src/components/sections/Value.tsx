import { Camera, ClipboardList, MessageSquareText, PhoneCall } from 'lucide-react'
import { revealDelay } from '@/lib/reveal'

const BENEFITS = [
  {
    icon: ClipboardList,
    title: 'Customers understand your services',
    text: 'Lay out what you do, where you work, and who it’s for, so people know they’ve found the right business.',
  },
  {
    icon: Camera,
    title: 'Your work is easy to see',
    text: 'Photos of finished jobs in one tidy place, instead of scattered across old social media posts.',
  },
  {
    icon: PhoneCall,
    title: 'Contact details are easy to find',
    text: 'Your phone number, email, and service area, right where people look for them, on any device.',
  },
  {
    icon: MessageSquareText,
    title: 'Requesting a quote is simple',
    text: 'A short form lets customers tell you what they need, so you can reply when it suits you.',
  },
]

export function Value() {
  return (
    <section aria-labelledby="value-title" className="border-y border-line bg-paper-2">
      <div className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="reveal lg:col-span-4">
          <p className="eyebrow">Why it matters</p>
          <h2 id="value-title" className="h-section mt-3">
            A clear website does the explaining for you.
          </h2>
          <p className="lede mt-4">
            When someone hears about your business, they look you up. A professional site gives them the answers they
            need and an easy next step.
          </p>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-8">
          {BENEFITS.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              className="reveal flex flex-col gap-4 bg-paper p-6 sm:p-7"
              style={revealDelay(index)}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-cobalt-soft text-cobalt">
                  <Icon aria-hidden="true" size={20} />
                </span>
                <span aria-hidden="true" className="font-display text-sm font-semibold text-ink-3 tabular-nums">
                  0{index + 1}
                </span>
              </div>
              <div>
                <h3 className="text-[1.1875rem] font-semibold">{title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
