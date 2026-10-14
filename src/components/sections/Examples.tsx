import { Suspense, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { EXAMPLES, type ExampleSite } from '@/content/examples'
import { revealDelay } from '@/lib/reveal'
import { ExampleDialog } from '../ExampleDialog'
import { LazyMount } from '../LazyMount'
import { ScaledFrame } from '../ui/ScaledFrame'
import { buttonClasses } from '../ui/button'

const PREVIEW_WIDTH = 1200
const PREVIEW_HEIGHT = 780

function ExamplePreview({ example }: { example: ExampleSite }) {
  const { Demo } = example
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong/70 bg-white shadow-soft transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 group-hover:shadow-lift">
      <div className="flex items-center gap-1.5 border-b border-line bg-[#f3efe7] px-3 py-2" aria-hidden="true">
        <span className="size-2 rounded-full bg-[#ddd3c2]" />
        <span className="size-2 rounded-full bg-[#ddd3c2]" />
        <span className="size-2 rounded-full bg-[#ddd3c2]" />
      </div>
      <ScaledFrame designWidth={PREVIEW_WIDTH} designHeight={PREVIEW_HEIGHT}>
        <LazyMount className="h-full w-full" fallback={<div className="h-full w-full bg-paper-2" />}>
          <Suspense fallback={<div className="h-full w-full bg-paper-2" />}>
            <Demo />
          </Suspense>
        </LazyMount>
      </ScaledFrame>
    </div>
  )
}

type CardProps = {
  example: ExampleSite
  index: number
  isFeatured: boolean
  onOpen: (example: ExampleSite) => void
}

function ExampleCard({ example, index, isFeatured, onOpen }: CardProps) {
  const titleId = `example-${example.id}-title`

  return (
    <article
      aria-labelledby={titleId}
      className={`group reveal rounded-[1.25rem] border border-line bg-card p-4 sm:p-5 ${
        isFeatured ? 'lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-10 lg:p-6' : ''
      }`}
      style={revealDelay(index)}
    >
      <div className={isFeatured ? 'lg:order-2' : ''}>
        <ExamplePreview example={example} />
      </div>

      <div className={`mt-5 ${isFeatured ? 'lg:order-1 lg:mt-0 lg:pl-2' : ''}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-cobalt-soft px-2.5 py-0.5 text-xs font-semibold text-cobalt">Concept demo</span>
          <span className="text-sm text-ink-3">{example.industry}</span>
        </div>
        <h3 id={titleId} className={`mt-3 font-semibold ${isFeatured ? 'text-[1.75rem]' : 'text-[1.4rem]'}`}>
          {example.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-ink-2">{example.style}</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{example.approach}</p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onOpen(example)}
            className={buttonClasses('secondary', 'md')}
            aria-label={`View example: ${example.name}`}
          >
            View Example
            <ArrowUpRight aria-hidden="true" size={17} />
          </button>
          <span className="flex gap-1.5" aria-hidden="true">
            {example.swatches.map((colour) => (
              <span key={colour} className="size-4 rounded-full ring-1 ring-ink/10" style={{ background: colour }} />
            ))}
          </span>
        </div>
      </div>
    </article>
  )
}

export function Examples() {
  const [openExample, setOpenExample] = useState<ExampleSite | null>(null)

  return (
    <section id="examples" aria-labelledby="examples-title" className="py-16 sm:py-20 lg:py-28">
      <div className="container-page">
        <div className="reveal grid gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Website examples</p>
            <h2 id="examples-title" className="h-section mt-3">
              Three concept sites, three different personalities.
            </h2>
          </div>
          <p className="lede lg:col-span-5">
            These are design concepts for fictional local businesses. Each shows how a one-page site can match the feel of
            the business and lead visitors to get in touch.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-6">
          {EXAMPLES.map((example, index) => (
            <ExampleCard
              key={example.id}
              example={example}
              index={index}
              isFeatured={index === 0}
              onOpen={setOpenExample}
            />
          ))}
        </div>
      </div>

      <ExampleDialog example={openExample} onClose={() => setOpenExample(null)} />
    </section>
  )
}
