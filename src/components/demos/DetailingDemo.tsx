import { ArrowRight, Droplets, Gem, ShieldCheck, Wind } from 'lucide-react'
import { CarArt } from './art'
import { DemoImage } from './DemoImage'
import type { DemoProps } from './types'

const BLACK = '#0c0d10'
const PANEL = '#15171c'
const SIGNAL = '#ff5a36'
const MIST = '#a9aeb8'

const PACKAGES = [
  { icon: Wind, title: 'Interior detail', text: 'Vacuum, steam, and shampoo seats and carpets. Wipe-down of every surface.' },
  { icon: Droplets, title: 'Exterior wash and seal', text: 'Hand wash, decontamination, wheels and tires, and a protective sealant.' },
  { icon: Gem, title: 'Full detail', text: 'Interior and exterior together, for a car that feels close to new.' },
  { icon: ShieldCheck, title: 'Paint protection', text: 'Paint correction and coating options, quoted after we see the car.' },
]

export function DetailingDemo({ onDemoAction }: DemoProps) {
  return (
    <div className="@container font-sans text-white" style={{ background: BLACK }}>
      <header className="flex items-center justify-between px-5 py-4 @3xl:px-12 @3xl:py-6">
        <span className="font-display text-lg font-extrabold tracking-tight italic">
          NORTH<span style={{ color: SIGNAL }}>GLOSS</span>
        </span>
        <nav className="hidden gap-8 text-sm font-medium @3xl:flex" style={{ color: MIST }} aria-label="Demo site">
          <span>Packages</span>
          <span>Process</span>
          <span>Contact</span>
        </nav>
        <button
          type="button"
          onClick={onDemoAction}
          className="rounded-full border px-4 py-2 text-sm font-semibold"
          style={{ borderColor: '#3a3d45' }}
        >
          Book now
        </button>
      </header>

      <section className="px-5 pt-6 pb-10 @3xl:px-12 @3xl:pt-10 @3xl:pb-16">
        <div className="grid items-center gap-8 @4xl:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs font-bold tracking-[0.24em] uppercase" style={{ color: SIGNAL }}>
              Auto detailing · Vancouver
            </p>
            <h3 className="mt-3 font-display text-[2.25rem] leading-[0.98] font-extrabold tracking-tight @3xl:text-[4.25rem]">
              Showroom finish. Every panel.
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed @3xl:text-lg" style={{ color: MIST }}>
              Careful interior and exterior detailing for daily drivers and weekend cars. Choose a package and tell us about
              your vehicle.
            </p>
            <button
              type="button"
              onClick={onDemoAction}
              className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold"
              style={{ background: SIGNAL, color: BLACK }}
            >
              Request a booking <ArrowRight size={18} />
            </button>
          </div>
          <div className="relative">
            <DemoImage
              id="detailing-hero"
              className="aspect-[5/3] w-full rounded-2xl"
              fallback={<CarArt className="aspect-[5/3] w-full rounded-2xl" />}
            />
            <div className="absolute right-3 bottom-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur" style={{ background: 'rgb(12 13 16 / 0.6)' }}>
              Full detail · Sedan
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 @3xl:px-12 @3xl:py-16" style={{ background: PANEL }}>
        <div className="flex items-end justify-between gap-4">
          <h4 className="font-display text-2xl font-extrabold tracking-tight @3xl:text-4xl">Packages</h4>
          <span className="text-sm" style={{ color: MIST }}>
            Pricing confirmed by vehicle size
          </span>
        </div>
        <div className="mt-6 grid gap-3 @2xl:grid-cols-2">
          {PACKAGES.map(({ icon: Icon, title, text }, index) => (
            <div
              key={title}
              className="flex gap-4 rounded-xl border p-5"
              style={{ borderColor: index === 2 ? SIGNAL : '#262931', background: BLACK }}
            >
              <Icon size={22} className="mt-0.5 shrink-0" style={{ color: SIGNAL }} />
              <div>
                <div className="text-lg font-bold">{title}</div>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: MIST }}>
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 px-5 py-10 @3xl:grid-cols-[1.2fr_1fr] @3xl:items-center @3xl:px-12 @3xl:py-14">
        <DemoImage
          id="detailing-booking"
          className="aspect-[5/3] w-full rounded-2xl"
          fallback={<CarArt angle={1} className="aspect-[5/3] w-full rounded-2xl" />}
        />
        <div>
          <h4 className="font-display text-2xl font-extrabold tracking-tight @3xl:text-3xl">Book a detail</h4>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: MIST }}>
            Tell us the make, model, and what you’d like done. We’ll confirm a time and price.
          </p>
          <button
            type="button"
            onClick={onDemoAction}
            className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold"
            style={{ background: '#ffffff', color: BLACK }}
          >
            Request a booking <ArrowRight size={18} />
          </button>
        </div>
      </section>
      <footer className="border-t px-5 py-5 text-sm @3xl:px-12" style={{ borderColor: '#22252c', color: MIST }}>
        Northgloss Detailing · Fictional business for a design concept
      </footer>
    </div>
  )
}
