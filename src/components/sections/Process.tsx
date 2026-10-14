import { revealDelay } from '@/lib/reveal'

const STEPS = [
  {
    title: 'Tell me about your business.',
    text: 'Share what you do, who you serve, and what you want the website to help with.',
  },
  {
    title: 'Share your content.',
    text: 'Send your services, photos, contact details, and any branding you already have.',
  },
  {
    title: 'Review your website.',
    text: 'Look over the design and content before the final version is approved.',
  },
  {
    title: 'Approve and arrange launch.',
    text: 'Confirm the final website and how it will go live.',
  },
]

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="py-12 sm:py-20 lg:py-24">
      <div className="container-page">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Process</p>
          <h2 id="process-title" className="h-section mt-3">
            How we’ll work together.
          </h2>
        </div>

        <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="reveal draw-line pt-4" style={revealDelay(index)}>
              <span className="font-display text-sm font-semibold text-ink-3 tabular-nums">0{index + 1}</span>
              <h3 className="mt-2 text-[1.1875rem] font-semibold">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
