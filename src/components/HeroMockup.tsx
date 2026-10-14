import { ArrowRight, Bath, ChefHat, Hammer, Lock, Menu, Phone } from 'lucide-react'
import { KitchenArt } from './demos/art'
import { ScaledFrame } from './ui/ScaledFrame'

/** Sample business shown in the hero. Fictional — labelled "Sample design" on screen. */
const SAMPLE = {
  name: 'Kestrel',
  suffix: 'Renovations',
  headline: 'Kitchens and bathrooms, renovated with care.',
  intro: 'Renovations for homes across the North Shore. Clear quotes, tidy job sites, and careful finishing.',
  services: [
    { icon: ChefHat, title: 'Kitchens', text: 'Layouts, cabinetry, counters, and lighting.' },
    { icon: Bath, title: 'Bathrooms', text: 'Showers, tile, vanities, and fixtures.' },
    { icon: Hammer, title: 'Basements', text: 'Suites, rec rooms, and storage.' },
  ],
}

const GREEN = '#1f3a32'
const BRASS = '#c9a86a'
const CREAM = '#f6f1e7'

function KestrelLogo({ size = 'md' }: { size?: 'md' | 'sm' }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="grid place-items-center rounded-md font-display font-bold text-white"
        style={{ background: GREEN, width: size === 'md' ? 30 : 26, height: size === 'md' ? 30 : 26, fontSize: 15 }}
      >
        K
      </div>
      <div className="font-display leading-none" style={{ color: GREEN }}>
        <div className="font-bold" style={{ fontSize: size === 'md' ? 17 : 15 }}>
          {SAMPLE.name}
        </div>
        <div className="text-[10px] font-medium tracking-[0.14em] uppercase opacity-70">{SAMPLE.suffix}</div>
      </div>
    </div>
  )
}

function DesktopSample() {
  return (
    <div className="h-full w-full font-sans" style={{ background: CREAM, color: '#1d2421' }}>
      <div className="flex items-center justify-between px-12 py-5">
        <KestrelLogo />
        <div className="flex items-center gap-8 text-[14px] font-medium opacity-80">
          <span>Services</span>
          <span>Projects</span>
          <span>About</span>
          <span>Contact</span>
        </div>
        <div className="rounded-full px-5 py-2.5 text-[14px] font-semibold text-white" style={{ background: GREEN }}>
          Request a quote
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1.05fr] items-center gap-12 px-12 pt-8">
        <div>
          <div className="mb-4 text-[12px] font-semibold tracking-[0.16em] uppercase" style={{ color: '#8a6d3b' }}>
            North Vancouver renovations
          </div>
          <div className="font-display text-[50px] leading-[1.03] font-bold tracking-tight" style={{ color: GREEN }}>
            {SAMPLE.headline}
          </div>
          <p className="mt-5 max-w-[420px] text-[17px] leading-relaxed opacity-75">{SAMPLE.intro}</p>
          <div className="mt-7 flex items-center gap-3">
            <div
              className="flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold text-white"
              style={{ background: GREEN }}
            >
              Request a quote <ArrowRight size={16} />
            </div>
            <div
              className="rounded-full border px-6 py-3.5 text-[15px] font-semibold"
              style={{ borderColor: '#cbbfa8', color: GREEN }}
            >
              See our work
            </div>
          </div>
        </div>
        <div className="relative">
          <KitchenArt className="h-[340px] w-full rounded-2xl" />
          <div
            className="absolute -bottom-5 -left-5 rounded-xl px-4 py-3 text-[13px] font-semibold shadow-lg"
            style={{ background: '#fff', color: GREEN }}
          >
            Kitchen refresh · Lynn Valley
          </div>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-3 gap-5 px-12">
        {SAMPLE.services.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl border bg-white/70 p-5" style={{ borderColor: '#e5dccb' }}>
            <div className="mb-3 grid size-9 place-items-center rounded-lg" style={{ background: '#e9efe9', color: GREEN }}>
              <Icon size={18} />
            </div>
            <div className="font-display text-[18px] font-bold" style={{ color: GREEN }}>
              {title}
            </div>
            <div className="mt-1 text-[14px] opacity-70">{text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PhoneSample() {
  return (
    <div className="h-full w-full font-sans" style={{ background: CREAM, color: '#1d2421' }}>
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <KestrelLogo size="sm" />
        <div className="grid size-9 place-items-center rounded-full border" style={{ borderColor: '#d8ccb6', color: GREEN }}>
          <Menu size={16} />
        </div>
      </div>
      <div className="px-5">
        <KitchenArt className="h-[170px] w-full rounded-xl" />
        <div className="mt-5 font-display text-[27px] leading-[1.06] font-bold tracking-tight" style={{ color: GREEN }}>
          {SAMPLE.headline}
        </div>
        <p className="mt-3 text-[14px] leading-relaxed opacity-75">{SAMPLE.intro}</p>
        <div
          className="mt-5 flex items-center justify-center gap-2 rounded-full py-3.5 text-[15px] font-semibold text-white"
          style={{ background: GREEN }}
        >
          Request a quote <ArrowRight size={15} />
        </div>
        <div
          className="mt-2.5 flex items-center justify-center gap-2 rounded-full border py-3 text-[14px] font-semibold"
          style={{ borderColor: '#cbbfa8', color: GREEN }}
        >
          <Phone size={14} /> Call (604) 555-0142
        </div>
        <div className="mt-6 space-y-2">
          {SAMPLE.services.map(({ icon: Icon, title }) => (
            <div key={title} className="flex items-center gap-3 rounded-lg bg-white/80 px-3 py-2.5">
              <Icon size={16} style={{ color: BRASS }} />
              <span className="text-[14px] font-semibold" style={{ color: GREEN }}>
                {title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function HeroMockup() {
  return (
    <figure className="relative mx-auto w-full max-w-[44rem] pb-[14%] lg:max-w-none" aria-label="Sample website design shown on a laptop and a phone">
      {/* Desktop browser */}
      <div className="mr-[9%] overflow-hidden rounded-[14px] border border-line-strong/80 bg-white shadow-device sm:mr-[14%]">
        <div className="flex items-center gap-3 border-b border-line bg-[#f3efe7] px-3.5 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#e0d6c6]" />
            <span className="size-2.5 rounded-full bg-[#e0d6c6]" />
            <span className="size-2.5 rounded-full bg-[#e0d6c6]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md bg-white/80 px-3 py-1 text-[11px] font-medium text-ink-3">
            <Lock aria-hidden="true" size={10} />
            <span className="truncate">kestrelrenovations.example</span>
          </div>
          <div className="w-10" aria-hidden="true" />
        </div>
        <ScaledFrame designWidth={1120} designHeight={720}>
          <DesktopSample />
        </ScaledFrame>
      </div>

      {/* Phone */}
      <div className="absolute right-0 bottom-0 w-[31%] max-w-[15rem] rounded-[2rem] bg-[#16181d] p-[2.2%] shadow-device sm:w-[29%]">
        <div className="relative overflow-hidden rounded-[1.65rem] bg-white">
          <div className="absolute top-2 left-1/2 z-10 h-[4.5%] w-[34%] -translate-x-1/2 rounded-full bg-[#16181d]" aria-hidden="true" />
          <ScaledFrame designWidth={340} designHeight={700}>
            <PhoneSample />
          </ScaledFrame>
        </div>
      </div>

      <figcaption className="absolute -top-3 left-3 rounded-full border border-line bg-card/95 px-3 py-1 text-xs font-semibold text-ink-2 shadow-soft backdrop-blur sm:left-4">
        Sample design
      </figcaption>
    </figure>
  )
}
