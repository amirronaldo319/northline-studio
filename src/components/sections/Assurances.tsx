import { BadgeCheck, FileText, UserRound } from 'lucide-react'
import { revealDelay } from '@/lib/reveal'

const ASSURANCES = [
  {
    icon: UserRound,
    title: 'One person, start to finish',
    text: 'You deal directly with me, from your first message to launch.',
  },
  {
    icon: FileText,
    title: 'A written quote first',
    text: 'The scope and costs are agreed in writing before any work starts.',
  },
  {
    icon: BadgeCheck,
    title: 'Nothing goes live unapproved',
    text: 'You review the site and approve it before it launches.',
  },
]

export function Assurances() {
  return (
    <section aria-label="How I work" className="border-y border-line bg-card">
      <ul className="container-page grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {ASSURANCES.map(({ icon: Icon, title, text }, index) => (
          <li key={title} className="reveal flex gap-4 py-5 sm:px-6 sm:py-7 sm:first:pl-0 sm:last:pr-0" style={revealDelay(index)}>
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cobalt-soft text-cobalt">
              <Icon aria-hidden="true" size={20} />
            </span>
            <div>
              <h2 className="font-sans text-[0.9375rem] font-semibold tracking-normal">{title}</h2>
              <p className="mt-0.5 text-sm leading-relaxed text-ink-2">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
