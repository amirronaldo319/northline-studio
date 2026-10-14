import { site } from '@/config/site'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line bg-paper-2 py-12 sm:py-20 lg:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
        {/* Typographic composition in place of a portrait */}
        <div className="reveal lg:col-span-4">
          <div className="relative overflow-hidden rounded-xl bg-cobalt px-7 py-9 text-white sm:px-8 sm:py-10">
            <span
              aria-hidden="true"
              className="absolute -right-6 -bottom-14 font-display text-[14rem] leading-none font-bold text-white/10 select-none"
            >
              {site.brand.monogram}
            </span>
            <p className="relative font-display text-[clamp(2.5rem,2rem+2.2vw,3.5rem)] leading-none font-bold tracking-[-0.03em]">
              {site.brand.owner}
            </p>
            <p className="relative mt-3 text-white/85">Web designer and developer, Northline Studio</p>
          </div>
        </div>

        <div className="reveal lg:col-span-8 lg:pl-6">
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="h-section mt-3">
            You work with me directly.
          </h2>
          <div className="mt-5 max-w-[38rem] space-y-4 text-[1.0625rem] leading-relaxed text-ink-2">
            <p>
              I’m {site.brand.owner}. I design and build every website myself, so when you send a message you’re talking to
              the person doing the work.
            </p>
            <p>
              I focus on practical sites for local service businesses in {site.serviceArea.label}, and I keep the scope
              simple and the language plain, so you know what you’re getting and what comes next.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
