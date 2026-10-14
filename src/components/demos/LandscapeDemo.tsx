import { ArrowUpRight, Leaf, Mountain, Shovel, Sprout } from 'lucide-react'
import { GardenArt } from './art'
import type { DemoProps } from './types'

const FOREST = '#22301f'
const STONE = '#ece6d8'
const CLAY = '#c27c2c'

const SERVICES = [
  { icon: Leaf, title: 'Garden design', text: 'Planting plans that suit coastal weather and the light your yard actually gets.' },
  { icon: Mountain, title: 'Patios and retaining walls', text: 'Stone, pavers, and walls built on proper bases so they stay level.' },
  { icon: Sprout, title: 'Planting and new sod', text: 'Healthy lawns and beds, prepared and planted the right way.' },
  { icon: Shovel, title: 'Seasonal maintenance', text: 'Spring clean-ups, pruning, and fall preparation on a set schedule.' },
]

const PROJECTS = [
  { title: 'Terraced back garden', place: 'North Vancouver', variant: 0 as const },
  { title: 'Front yard refresh', place: 'Vancouver', variant: 1 as const },
  { title: 'Stone path and planting', place: 'North Vancouver', variant: 2 as const },
]

export function LandscapeDemo({ onDemoAction }: DemoProps) {
  return (
    <div className="@container font-sans" style={{ background: STONE, color: FOREST }}>
      <section className="relative overflow-hidden">
        <GardenArt className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgb(20 28 18 / 0.15), rgb(20 28 18 / 0.72))' }} />
        <div className="relative">
          <header className="flex items-center justify-between px-5 py-4 text-white @3xl:px-12 @3xl:py-6">
            <span className="font-display text-lg font-bold tracking-[0.18em] uppercase">Rootline</span>
            <nav className="hidden gap-8 text-sm font-medium @3xl:flex" aria-label="Demo site">
              <span>Services</span>
              <span>Projects</span>
              <span>Estimates</span>
            </nav>
            <button type="button" onClick={onDemoAction} className="rounded-md bg-white px-4 py-2 text-sm font-bold" style={{ color: FOREST }}>
              Get an estimate
            </button>
          </header>
          <div className="px-5 pt-16 pb-10 text-white @3xl:px-12 @3xl:pt-28 @3xl:pb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-85">Landscaping · Vancouver and the North Shore</p>
            <h3 className="mt-3 max-w-2xl font-display text-[2.1rem] leading-[1] font-extrabold tracking-tight uppercase @3xl:text-[4rem]">
              Outdoor spaces built to last.
            </h3>
            <p className="mt-4 max-w-lg text-base opacity-90 @3xl:text-lg">
              Design, hardscaping, and planting for homeowners who want a yard they’ll use, done properly from the ground up.
            </p>
            <button
              type="button"
              onClick={onDemoAction}
              className="mt-6 inline-flex items-center gap-2 rounded-md px-6 py-3 font-bold text-white"
              style={{ background: CLAY }}
            >
              Request an estimate <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 @3xl:px-12 @3xl:py-16">
        <div className="grid gap-8 @4xl:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: CLAY }}>
              What we do
            </p>
            <h4 className="mt-2 font-display text-2xl font-extrabold tracking-tight uppercase @3xl:text-3xl">
              One crew, from plan to planting.
            </h4>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg @xl:grid-cols-2" style={{ background: '#d3cab6' }}>
            {SERVICES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="p-5" style={{ background: STONE }}>
                <Icon size={22} style={{ color: CLAY }} />
                <div className="mt-3 text-lg font-bold">{title}</div>
                <p className="mt-1 text-sm leading-relaxed opacity-75">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 @3xl:px-12 @3xl:pb-16">
        <h4 className="font-display text-2xl font-extrabold tracking-tight uppercase @3xl:text-3xl">Recent work</h4>
        <p className="mt-1 text-sm opacity-70">Project photos supplied by the business would go here.</p>
        <div className="mt-5 grid gap-4 @2xl:grid-cols-3">
          {PROJECTS.map((project) => (
            <figure key={project.title}>
              <GardenArt variant={project.variant} className="aspect-[4/3] w-full rounded-lg" />
              <figcaption className="mt-2 flex items-baseline justify-between gap-2 text-sm">
                <span className="font-bold">{project.title}</span>
                <span className="opacity-65">{project.place}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start gap-4 px-5 py-10 text-white @3xl:flex-row @3xl:items-center @3xl:justify-between @3xl:px-12" style={{ background: FOREST }}>
        <div>
          <div className="font-display text-xl font-extrabold uppercase @3xl:text-2xl">Planning a project this season?</div>
          <p className="mt-1 text-sm opacity-80">Send a few details and photos of your yard.</p>
        </div>
        <button type="button" onClick={onDemoAction} className="rounded-md px-6 py-3 font-bold" style={{ background: CLAY }}>
          Request an estimate
        </button>
      </section>
      <footer className="px-5 py-5 text-sm opacity-70 @3xl:px-12">Rootline Landscapes · Fictional business for a design concept</footer>
    </div>
  )
}
