import { ArrowUpRight } from 'lucide-react'
import { HERO_EXAMPLE, LEAD_EXAMPLES, type ExampleSite } from '@/content/examples'
import { revealDelay } from '@/lib/reveal'
import { DemoPreview } from '../DemoPreview'
import { useExampleDialog } from '../exampleDialogContext'
import { buttonClasses } from '../ui/button'

const frameClasses =
  'overflow-hidden rounded-lg border border-line-strong/60 bg-white shadow-soft transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:shadow-lift motion-reduce:transition-none'

function ExampleText({ example, titleId }: { example: ExampleSite; titleId: string }) {
  const { open } = useExampleDialog()

  return (
    <>
      <p className="text-xs font-semibold tracking-[0.08em] text-cobalt uppercase">
        Concept demo <span aria-hidden="true">·</span> {example.businessType}
      </p>
      <h3 id={titleId} className="mt-2 text-[1.375rem] font-semibold">
        {example.name}
      </h3>
      <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink">{example.intent}</p>
      <p className="mt-2 hidden text-[0.9375rem] leading-relaxed text-ink-2 sm:block">{example.approach}</p>
      <button type="button" onClick={() => open(example)} className={buttonClasses('secondary', 'md', 'nudge mt-4')}>
        View example
        <span className="sr-only">: {example.name}</span>
        <ArrowUpRight aria-hidden="true" size={17} />
      </button>
    </>
  )
}

/** A full-size example: large preview with its description beneath. */
function ExampleCard({ example, index }: { example: ExampleSite; index: number }) {
  const { open } = useExampleDialog()
  const titleId = `example-${example.id}-title`

  return (
    <article aria-labelledby={titleId} className="reveal" style={revealDelay(index)}>
      <div className="group relative">
        <div className={frameClasses}>
          <DemoPreview example={example} />
        </div>
        {/* Mouse-only convenience; the labelled button below is the accessible control. */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => open(example)}
          className="absolute inset-0 cursor-pointer rounded-lg"
        />
      </div>
      <div className="mt-5">
        <ExampleText example={example} titleId={titleId} />
      </div>
    </article>
  )
}

/** A compact row for the example already shown large in the hero. */
function HeroExampleRow({ example }: { example: ExampleSite }) {
  const titleId = `example-${example.id}-title`

  return (
    <article aria-labelledby={titleId} className="reveal grid items-center gap-6 border-t border-line pt-10 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-7">
        <p className="mb-3 text-sm text-ink-3">Also shown at the top of the page.</p>
        <ExampleText example={example} titleId={titleId} />
      </div>
      <div className="hidden md:col-span-5 md:block" aria-hidden="true">
        <div className={frameClasses}>
          <DemoPreview example={example} />
        </div>
      </div>
    </article>
  )
}

export function Examples() {
  return (
    <section id="examples" aria-labelledby="examples-title" className="border-t border-line py-12 sm:py-20 lg:py-24">
      <div className="container-page">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Website examples</p>
          <h2 id="examples-title" className="h-section mt-3">
            Concept sites that show how I work.
          </h2>
          <p className="lede mt-4">
            Design concepts for fictional businesses, not client projects. Open one to explore it on desktop or phone.
          </p>
        </div>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-8 lg:mt-12 lg:gap-12">
          {LEAD_EXAMPLES.map((example, index) => (
            <ExampleCard key={example.id} example={example} index={index} />
          ))}
        </div>

        <div className="mt-12 lg:mt-16">
          <HeroExampleRow example={HERO_EXAMPLE} />
        </div>
      </div>
    </section>
  )
}
