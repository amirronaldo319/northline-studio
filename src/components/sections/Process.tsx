import { revealDelay } from '@/lib/reveal'

const STEPS = [
  {
    title: 'Tell me about your business.',
    text: 'Share what you do, who you serve, and what you want the website to help with.',
  },
  {
    title: 'Share your content.',
    text: 'Provide your services, photos, contact details, and existing branding if you have it.',
  },
  {
    title: 'Review your website.',
    text: 'Check the design and content before the final version is approved.',
  },
  {
    title: 'Approve and arrange launch.',
    text: 'Confirm the final website and its launch arrangements.',
  },
]

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="py-16 sm:py-20 lg:py-28">
      <div className="container-page">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 id="process-title" className="h-section mt-3">
            Four straightforward steps.
          </h2>
          <p className="lede mt-4">You’ll know what’s happening at each stage, and nothing goes live until you’ve approved it.</p>
        </div>

        <ol className="relative mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span
            aria-hidden="true"
            className="absolute top-5 right-[12%] left-5 hidden h-px bg-gradient-to-r from-cobalt/50 via-line-strong to-line lg:block"
          />
          {STEPS.map((step, index) => (
            <li key={step.title} className="reveal relative flex gap-4 lg:block" style={revealDelay(index)}>
              <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-line-strong bg-paper font-display font-semibold text-ink ring-8 ring-paper">
                {index + 1}
              </span>
              <div className="lg:mt-6 lg:pr-4">
                <h3 className="text-[1.1875rem] font-semibold">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
