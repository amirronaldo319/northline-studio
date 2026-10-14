import type { ReactNode } from 'react'

/** Small label that names a part of the wireframe. */
function Tag({ n, children }: { n: number; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-cobalt px-2 py-0.5 text-[0.6875rem] font-semibold text-white">
      <span className="grid size-3.5 place-items-center rounded-full bg-white/20 text-[0.625rem]">{n}</span>
      {children}
    </span>
  )
}

const bar = 'rounded-full bg-line-strong/70'

/**
 * Wireframe of a one-page business site with each included part labelled.
 * Purely illustrative, so it is hidden from assistive tech; the list beside it carries the same information.
 */
export function PageAnatomy() {
  return (
    <figure aria-hidden="true" className="mx-auto w-full max-w-[34rem]">
      <div className="overflow-hidden rounded-2xl border border-line-strong/80 bg-white shadow-lift">
        <div className="flex items-center gap-1.5 border-b border-line bg-[#f3efe7] px-3 py-2.5">
          <span className="size-2 rounded-full bg-[#ddd3c2]" />
          <span className="size-2 rounded-full bg-[#ddd3c2]" />
          <span className="size-2 rounded-full bg-[#ddd3c2]" />
          <span className="ml-3 h-4 flex-1 rounded-md bg-white/80" />
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          {/* Header with contact buttons */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="size-6 rounded-md bg-ink/80" />
              <span className={`${bar} h-2 w-14`} />
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden h-2 w-8 rounded-full bg-line-strong/70 sm:block" />
              <Tag n={1}>Contact buttons</Tag>
            </div>
          </div>

          {/* Hero */}
          <div className="grid grid-cols-5 gap-4 rounded-xl bg-paper p-4">
            <div className="col-span-3 space-y-2.5">
              <Tag n={2}>Custom layout</Tag>
              <span className="block h-3 w-11/12 rounded-full bg-ink/80" />
              <span className="block h-3 w-8/12 rounded-full bg-ink/80" />
              <span className={`${bar} block h-2 w-10/12`} />
              <span className="mt-1 block h-7 w-24 rounded-full bg-cobalt" />
            </div>
            <div className="col-span-2 grid place-items-center rounded-lg bg-cobalt-soft">
              <span className="size-8 rounded-full bg-cobalt/25" />
            </div>
          </div>

          {/* Services */}
          <div>
            <Tag n={3}>Services information</Tag>
            <div className="mt-2.5 grid grid-cols-3 gap-2.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-1.5 rounded-lg border border-line p-2.5">
                  <span className="block size-4 rounded bg-cobalt-soft" />
                  <span className={`${bar} block h-1.5 w-10/12`} />
                  <span className={`${bar} block h-1.5 w-7/12`} />
                </div>
              ))}
            </div>
          </div>

          {/* Photos */}
          <div>
            <Tag n={4}>Your photos</Tag>
            <div className="mt-2.5 grid grid-cols-4 gap-2">
              {['bg-[#cfd8c4]', 'bg-[#dccfb6]', 'bg-[#c4cfd8]', 'bg-[#d8c4c4]'].map((tone) => (
                <span key={tone} className={`aspect-[4/3] rounded-md ${tone}`} />
              ))}
            </div>
          </div>

          {/* Quote form + contact details */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 space-y-2 rounded-xl border border-line p-3">
              <Tag n={5}>Quote-request form</Tag>
              <span className="block h-5 rounded-md bg-paper" />
              <span className="block h-5 rounded-md bg-paper" />
              <span className="block h-9 rounded-md bg-paper" />
              <span className="block h-6 w-20 rounded-full bg-cobalt" />
            </div>
            <div className="col-span-2 space-y-2 rounded-xl bg-night p-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 text-[0.6875rem] font-semibold text-ink">
                <span className="grid size-3.5 place-items-center rounded-full bg-ink/10 text-[0.625rem]">6</span>
                Contact details
              </span>
              <span className="block h-1.5 w-10/12 rounded-full bg-white/50" />
              <span className="block h-1.5 w-8/12 rounded-full bg-white/50" />
              <span className="block h-1.5 w-9/12 rounded-full bg-white/50" />
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-ink-3">The parts of a one-page site, all included.</figcaption>
    </figure>
  )
}
