import { Suspense, useEffect, useRef, useState } from 'react'
import { Info, Monitor, Smartphone, X } from 'lucide-react'
import type { ExampleSite } from '@/content/examples'

type Props = {
  example: ExampleSite | null
  onClose: () => void
}

const NOTICE_TIMEOUT_MS = 5000
const PHONE_WIDTH_PX = 390

type Device = 'desktop' | 'phone'

const DEVICES: ReadonlyArray<{ id: Device; label: string; icon: typeof Monitor }> = [
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'phone', label: 'Phone', icon: Smartphone },
]

/**
 * Full-size preview of a concept demo in a native modal <dialog>.
 * The browser handles Escape, focus containment, and making the page behind inert.
 * Focus returns to whichever control opened it.
 */
export function ExampleDialog({ example, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const [notice, setNotice] = useState('')
  const [device, setDevice] = useState<Device>('desktop')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !example) return

    returnFocusRef.current = document.activeElement as HTMLElement | null
    if (!dialog.open) dialog.showModal()
    dialog.querySelector('.demo-scroll')?.scrollTo({ top: 0 })

    return () => {
      if (dialog.open) dialog.close()
    }
  }, [example])

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), NOTICE_TIMEOUT_MS)
    return () => window.clearTimeout(timer)
  }, [notice])

  const handleClose = () => {
    setNotice('')
    setDevice('desktop')
    onClose()
    returnFocusRef.current?.focus()
  }

  const Demo = example?.Demo

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="example-dialog-title"
      onClose={handleClose}
      onClick={(event) => {
        // A click on the backdrop lands on the <dialog> element itself.
        if (event.target === event.currentTarget) dialogRef.current?.close()
      }}
      className="demo-dialog m-auto h-[calc(100dvh-1rem)] max-h-none w-[calc(100vw-1rem)] max-w-[75rem] overflow-hidden rounded-2xl border border-line bg-paper p-0 text-ink shadow-lift sm:h-[calc(100dvh-3rem)] sm:w-[calc(100vw-3rem)]"
    >
      {example && Demo && (
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-line bg-card px-4 py-3 sm:items-center sm:px-6">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="rounded-full bg-cobalt-soft px-2.5 py-0.5 text-xs font-semibold text-cobalt">Concept demo</span>
                <h2 id="example-dialog-title" className="text-lg font-semibold sm:text-xl">
                  {example.name}
                </h2>
              </div>
              <p className="mt-1 text-sm text-ink-3">
                {example.industry} · A fictional business. Buttons and forms in this demo don’t send anything.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div role="group" aria-label="Preview size" className="hidden rounded-full border border-line-strong bg-paper p-1 sm:flex">
                {DEVICES.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={device === id}
                    onClick={() => setDevice(id)}
                    className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold transition-colors ${
                      device === id ? 'bg-ink text-white' : 'text-ink-2 hover:text-ink'
                    }`}
                  >
                    <Icon aria-hidden="true" size={15} />
                    {label}
                  </button>
                ))}
              </div>
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong bg-paper text-ink transition-colors hover:border-ink/40"
            >
              <X aria-hidden="true" size={20} />
              <span className="sr-only">Close example</span>
            </button>
            </div>
          </div>

          <div role="status" aria-live="polite" className="empty:hidden">
            {notice && (
              <p className="flex items-center gap-2 border-b border-cobalt/20 bg-cobalt-soft px-4 py-2.5 text-sm font-medium text-ink sm:px-6">
                <Info aria-hidden="true" size={16} className="shrink-0 text-cobalt" />
                {notice}
              </p>
            )}
          </div>

          <div
            className={`demo-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain ${
              device === 'phone' ? 'bg-paper-2 px-4 py-6' : ''
            }`}
          >
            <div
              className={
                device === 'phone'
                  ? 'mx-auto overflow-hidden rounded-[2rem] border-[10px] border-[#16181d] bg-white shadow-device'
                  : ''
              }
              style={device === 'phone' ? { width: PHONE_WIDTH_PX, maxWidth: '100%' } : undefined}
            >
              <Suspense fallback={<div className="grid h-64 place-items-center text-sm text-ink-3">Loading example…</div>}>
                <Demo
                  onDemoAction={() =>
                    setNotice('This is a concept demo, so nothing was sent. On a real site, this would reach the business.')
                  }
                />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
