import { site } from '@/config/site'

const PRINCIPLES = [
  { title: 'Clear communication', text: 'Plain answers, and you’ll know what’s happening at each step.' },
  { title: 'Straightforward scope', text: 'What’s included is agreed in writing before work begins.' },
  { title: 'Attention to design', text: 'Spacing, type, and photos handled with care, on every screen size.' },
  { title: 'Easy for your customers', text: 'Every decision aims to help people find information and get in touch.' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-y border-line bg-paper-2 py-16 sm:py-20 lg:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        {/* Typographic portrait in place of a photo */}
        <div className="reveal lg:col-span-5">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-cobalt p-8 text-white sm:p-10">
            <div aria-hidden="true" className="absolute -right-10 -bottom-16 font-display text-[16rem] leading-none font-bold text-white/10 select-none">
              {site.brand.monogram}
            </div>
            <p className="relative font-display text-[clamp(2.75rem,2rem+3vw,4rem)] leading-none font-bold tracking-[-0.03em]">
              Hi, I’m {site.brand.owner}.
            </p>
            <p className="relative mt-5 max-w-xs text-white/85">Independent web designer for local businesses.</p>
            <p className="relative mt-10 inline-flex rounded-full border border-white/30 px-3 py-1 text-sm font-medium">
              {site.serviceArea.label}, BC
            </p>
          </div>
        </div>

        <div className="reveal lg:col-span-7">
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="h-section mt-3">
            One person, from first message to launch.
          </h2>
          <p className="lede mt-4">
            I create practical, modern websites for local businesses in {site.serviceArea.label}. When you work with me,
            you deal directly with the person designing and building your site.
          </p>

          <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {PRINCIPLES.map((item) => (
              <div key={item.title} className="border-l-2 border-cobalt pl-4">
                <dt className="font-semibold">{item.title}</dt>
                <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
