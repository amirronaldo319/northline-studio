import { ArrowRight, CalendarDays, Flower2, Leaf, Phone, Scissors, Shovel, Trees } from 'lucide-react'
import { GardenArt } from './art'
import type { DemoProps } from './types'

const GREEN = '#2f5d3a'
const DEEP = '#16301f'
const LEAF = '#8fb573'
const CREAM = '#f6f1e3'
const CLAY = '#c9763d'

const SERVICES = [
  { icon: Leaf, title: 'Lawn and garden care', text: 'Regular visits that keep lawns, beds, and borders tidy through the growing season.' },
  { icon: Flower2, title: 'Planting and beds', text: 'New beds, shrubs, and seasonal planting, chosen for your light and soil.' },
  { icon: Shovel, title: 'Seasonal clean-ups', text: 'Spring and fall clean-ups, from leaves and debris to bed preparation.' },
  { icon: Scissors, title: 'Hedges and pruning', text: 'Shaping and trimming that keeps hedges and trees healthy and in proportion.' },
]

const SEASONS = [
  { name: 'Spring', text: 'Clean-up, new planting, and bed preparation.' },
  { name: 'Summer', text: 'Regular care, watering advice, and tidy-ups.' },
  { name: 'Fall', text: 'Leaves, cutting back, and getting beds ready for winter.' },
]

export function LandscapingDemo({ onDemoAction }: DemoProps) {
  return (
    <div className="@container bg-white font-sans" style={{ color: DEEP }}>
      <header className="flex items-center justify-between gap-4 px-5 py-4 @3xl:px-12 @3xl:py-5">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg text-white" style={{ background: GREEN }}>
            <Trees size={16} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">Fernwood Landscaping</span>
        </div>
        <nav className="hidden items-center gap-7 text-sm font-medium opacity-75 @3xl:flex" aria-label="Demo site">
          <span>Services</span>
          <span>Through the year</span>
          <span>Areas</span>
        </nav>
        <button
          type="button"
          onClick={onDemoAction}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
          style={{ background: CLAY }}
        >
          Request a visit
        </button>
      </header>

      <section className="px-5 pt-2 pb-10 @3xl:px-12 @3xl:pb-16">
        <div className="grid items-center gap-8 rounded-[1.75rem] p-6 @3xl:grid-cols-2 @3xl:gap-10 @3xl:p-10" style={{ background: CREAM }}>
          <div>
            <span
              className="inline-block rounded-md px-3 py-1 text-xs font-semibold"
              style={{ background: '#dfe9cf', color: GREEN }}
            >
              Landscaping in North Vancouver
            </span>
            <h3 className="mt-4 font-display text-[2rem] leading-[1.05] font-bold tracking-tight @3xl:text-[3rem]">
              Yards that look cared for, all year.
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed opacity-80 @3xl:text-lg">
              Garden care, planting, and seasonal clean-ups for homes and small properties. Tell us about your yard and
              we’ll arrange a visit.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onDemoAction}
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white"
                style={{ background: GREEN }}
              >
                Request a visit <ArrowRight size={16} />
              </button>
              <span className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 font-semibold" style={{ borderColor: '#cfd9bd' }}>
                <Phone size={16} /> (604) 555-0142
              </span>
            </div>
          </div>
          <div className="relative">
            <GardenArt className="aspect-[4/3] w-full rounded-[1.25rem]" />
            <div className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold shadow-lg">
              <CalendarDays size={18} style={{ color: GREEN }} /> Spring, summer, and fall visits
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 @3xl:px-12 @3xl:py-14">
        <h4 className="font-display text-2xl font-bold tracking-tight @3xl:text-3xl">What we look after</h4>
        <div className="mt-6 grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border p-5" style={{ borderColor: '#dfe6d2' }}>
              <Icon size={22} style={{ color: GREEN }} />
              <div className="mt-3 font-semibold">{title}</div>
              <p className="mt-1 text-sm leading-relaxed opacity-75">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-10 @3xl:px-12 @3xl:py-14" style={{ background: DEEP, color: CREAM }}>
        <h4 className="font-display text-2xl font-bold tracking-tight @3xl:text-3xl">A season at a time</h4>
        <div className="mt-6 grid gap-4 @3xl:grid-cols-3">
          {SEASONS.map((season) => (
            <div key={season.name} className="rounded-2xl p-5" style={{ background: '#1f4128' }}>
              <div className="font-semibold" style={{ color: LEAF }}>{season.name}</div>
              <p className="mt-1 text-sm leading-relaxed opacity-85">{season.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-5 py-6 text-sm opacity-70 @3xl:px-12">Fernwood Landscaping · Fictional business for a design concept</footer>
    </div>
  )
}
