import { Suspense, useEffect, useRef, useState } from 'react'
import { Info, Monitor, Smartphone, X } from 'lucide-react'
import type { ExampleSite } from '@/content/examples'
import { useCopy } from '@/i18n/context'
import { buttonClasses } from './ui/button'

type Props = {
  example: ExampleSite | null
  onClose: () => void
  /** Called after the dialog closes when the visitor chooses to request a quote for their own business. */
  onRequestQuote: () => void
}

const NOTICE_TIMEOUT_MS = 5000
/** Length of the exit animation. A plain timer drives the close, so a stalled animation can never trap the page. */
const EXIT_MS = 170
const PHONE_WIDTH_PX = 390

type Device = 'desktop' | 'phone'

const DEVICE_ICONS = { desktop: Monitor, phone: Smartphone } as const

/**
 * Full-size preview of a concept demo in a native modal <dialog>.
 * The browser handles Escape, focus containment, and making the page behind inert.
 * Focus returns to whichever control opened it, unless the visitor goes on to the real inquiry form.
 */
export function ExampleDialog({ example, onClose, onRequestQuote }: Props) {
  const t = useCopy()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const isRequestingQuoteRef = useRef(false)
  const exitTimerRef = useRef<number | null>(null)
  const [notice, setNotice] = useState('')
  const [device, setDevice] = useState<Device>('desktop')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !example) return

    returnFocusRef.current = document.activeElement as HTMLElement | null
    if (!dialog.open) dialog.showModal()
    dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    dialog.querySelector('.demo-scroll')?.scrollTo({ top: 0 })

    return () => {
      if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current)
      dialog.removeAttribute('data-closing')
      if (dialog.open) dialog.close()
    }
  }, [example])

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), NOTICE_TIMEOUT_MS)
    return () => window.clearTimeout(timer)
  }, [notice])

  /** Plays a short exit, then closes. Falls straight through for reduced motion or when already closing. */
  const requestClose = () => {
    const dialog = dialogRef.current
    if (!dialog || !dialog.open || exitTimerRef.current !== null) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      dialog.close()
      return
    }

    dialog.setAttribute('data-closing', '')
    exitTimerRef.current = window.setTimeout(() => {
      exitTimerRef.current = null
      dialog.close()
    }, EXIT_MS)
  }

  const handleClose = () => {
    dialogRef.current?.removeAttribute('data-closing')
    if (exitTimerRef.current !== null) {
      window.clearTimeout(exitTimerRef.current)
      exitTimerRef.current = null
    }
    setNotice('')
    setDevice('desktop')

    if (isRequestingQuoteRef.current) {
      isRequestingQuoteRef.current = false
      onRequestQuote()
      return
    }
    onClose()
    returnFocusRef.current?.focus()
  }

  const requestQuote = () => {
    isRequestingQuoteRef.current = true
    requestClose()
  }

  const Demo = example?.Demo

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="example-dialog-title"
      onClose={handleClose}
      onCancel={(event) => {
        // Escape: keep the native behaviour (focus restoration, scroll lock) but play the exit first.
        event.preventDefault()
        requestClose()
      }}
      onClick={(event) => {
        // A click on the backdrop lands on the <dialog> element itself.
        if (event.target === event.currentTarget) requestClose()
      }}
      className="demo-dialog m-auto h-[calc(100dvh-1rem)] max-h-none w-[calc(100vw-1rem)] max-w-[75rem] overflow-hidden rounded-xl border border-line bg-paper p-0 text-ink shadow-lift sm:h-[calc(100dvh-3rem)] sm:w-[calc(100vw-3rem)]"
    >
      {example && Demo && (
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-line bg-card px-4 py-3 sm:items-center sm:px-6">
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-[0.08em] text-cobalt uppercase">{t.dialogs.conceptDemo}</p>
              <h2 id="example-dialog-title" className="mt-0.5 text-lg font-semibold sm:text-xl">
                {example.name}
              </h2>
              <p className="mt-0.5 text-sm text-ink-3">
                {t.dialogs.fictional(t.examples[example.id].businessType)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div role="group" aria-label={t.dialogs.previewSize} className="hidden rounded-full border border-line-strong bg-paper p-1 sm:flex">
                {(['desktop', 'phone'] as const).map((id) => {
                  const Icon = DEVICE_ICONS[id]
                  return (
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
                    {id === 'desktop' ? t.dialogs.desktop : t.dialogs.phone}
                  </button>
                  )
                })}
              </div>
              <button
                type="button"
                data-autofocus
                onClick={requestClose}
                className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong bg-paper text-ink transition-colors hover:border-ink/40"
              >
                <X aria-hidden="true" size={20} />
                <span className="sr-only">{t.dialogs.closeExample}</span>
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
              <Suspense fallback={<div className="grid h-64 place-items-center text-sm text-ink-3">{t.dialogs.loading}</div>}>
                <Demo
                  onDemoAction={() =>
                    setNotice(t.dialogs.demoNotice)
                  }
                />
              </Suspense>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-line bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-ink-2">
              {t.dialogs.wantSite}
            </p>
            <button type="button" onClick={requestQuote} className={buttonClasses('primary', 'md', 'shrink-0')}>
              {t.dialogs.requestForMyBusiness}
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
