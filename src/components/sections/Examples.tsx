import { ArrowUpRight } from 'lucide-react'
import { EXAMPLES, type ExampleSite } from '@/content/examples'
import { revealDelay } from '@/lib/reveal'
import { DemoPreview } from '../DemoPreview'
import { useExampleDialog } from '../exampleDialogContext'
import { buttonClasses } from '../ui/button'

type CardProps = {
  example: ExampleSite
  index: number
  isFeatured?: boolean
}

function ExampleCard({ example, index, isFeatured = false }: CardProps) {
  const { open } = useExampleDialog()
  const titleId = `example-${example.id}-title`

  return (
    <article
      aria-labelledby={titleId}
      className={`reveal ${isFeatured ? 'grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10' : ''}`}
      style={revealDelay(index)}
    >
      <div className={`group relative ${isFeatured ? 'lg:col-span-8' : ''}`}>
        <div className="overflow-hidden rounded-lg border border-line-strong/60 bg-white shadow-soft transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:shadow-lift motion-reduce:transition-none">
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

      <div className={`${isFeatured ? 'lg:col-span-4 lg:pb-1' : 'mt-5'}`}>
        <p className="text-xs font-semibold tracking-[0.08em] text-cobalt uppercase">
          Concept demo <span aria-hidden="true">·</span> {example.businessType}
        </p>
        <h3 id={titleId} className={`mt-2 font-semibold ${isFeatured ? 'text-[1.75rem] sm:text-[2rem]' : 'text-[1.375rem]'}`}>
          {example.name}
        </h3>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink">{example.intent}</p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{example.approach}</p>
        <button type="button" onClick={() => open(example)} className={buttonClasses('secondary', 'md', 'nudge mt-5')}>
          View example
          <span className="sr-only">: {example.name}</span>
          <ArrowUpRight aria-hidden="true" size={17} />
        </button>
      </div>
    </article>
  )
}

export function Examples() {
  const [featured, ...others] = EXAMPLES

  return (
    <section id="examples" aria-labelledby="examples-title" className="border-t border-line py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Website examples</p>
          <h2 id="examples-title" className="h-section mt-3">
            Concept sites that show how I work.
          </h2>
          <p className="lede mt-4">
            These are design concepts for fictional businesses, not client projects. Open one to explore it on desktop or
            phone.
          </p>
        </div>

        <div className="mt-10 lg:mt-14">
          <ExampleCard example={featured} index={0} isFeatured />
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-8 lg:mt-20 lg:gap-12">
          {others.map((example, index) => (
            <ExampleCard key={example.id} example={example} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
