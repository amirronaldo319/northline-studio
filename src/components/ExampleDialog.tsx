import { Suspense, useEffect, useRef, useState } from 'react'
import { Info, Monitor, Smartphone, X } from 'lucide-react'
import { Button, Glass, SegmentedControl, Slider } from 'glisse'
import type { ExampleSite } from '@/content/examples'
import { useCopy } from '@/i18n/context'

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
/** The phone preview's width range: from the narrowest phones in use to the largest. */
const PHONE_MIN_PX = 320
const PHONE_MAX_PX = 430

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
  const [phoneWidth, setPhoneWidth] = useState(PHONE_WIDTH_PX)

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
    setPhoneWidth(PHONE_WIDTH_PX)

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
              <p className="text-[0.875rem] font-semibold text-accent">{t.dialogs.conceptDemo}</p>
              <h2 id="example-dialog-title" className="mt-0.5 text-lg font-semibold sm:text-xl">
                {example.name}
              </h2>
              <p className="mt-0.5 text-sm text-ink-3">
                {t.dialogs.fictional(t.examples[example.id].businessType)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {/* Desktop or phone preview: a Glisse segmented control (a radio group). Phones show the phone layout already. */}
              <div className="hidden sm:block">
                <SegmentedControl
                  aria-label={t.dialogs.previewSize}
                  className="glass-segmented"
                  items={(['desktop', 'phone'] as const).map((id) => {
                    const Icon = DEVICE_ICONS[id]
                    return {
                      value: id,
                      label: (
                        <span className="inline-flex items-center gap-1.5">
                          <Icon aria-hidden="true" size={15} />
                          {id === 'desktop' ? t.dialogs.desktop : t.dialogs.phone}
                        </span>
                      ),
                    }
                  })}
                  value={device}
                  onValueChange={(next) => setDevice(next === 'phone' ? 'phone' : 'desktop')}
                />
              </div>
              <Button
                data-autofocus
                onClick={requestClose}
                className="glass-icon-button"
                icon={<X aria-hidden="true" />}
                aria-label={t.dialogs.closeExample}
              />
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
              device === 'phone' ? 'bg-paper-2 px-4 pb-6' : ''
            }`}
          >
            {device === 'phone' && (
              // Floats over the phone as it scrolls: try the layout at any phone width.
              <div className="phone-width-bar">
                <Glass className="glass-capsule glass-lift phone-width-capsule">
                  <label htmlFor="phone-width" className="text-sm font-semibold whitespace-nowrap text-ink">
                    {t.dialogs.previewWidth}
                  </label>
                  <Slider
                    id="phone-width"
                    className="phone-width-slider"
                    min={PHONE_MIN_PX}
                    max={PHONE_MAX_PX}
                    step={1}
                    value={phoneWidth}
                    onValueChange={setPhoneWidth}
                    aria-valuetext={`${phoneWidth} px`}
                  />
                  <span aria-hidden="true" className="w-14 text-end text-sm font-semibold tabular-nums text-ink-2" dir="ltr">
                    {phoneWidth} px
                  </span>
                </Glass>
              </div>
            )}
            <div
              className={
                device === 'phone'
                  ? 'mx-auto overflow-hidden rounded-[2rem] border-[10px] border-[#16181d] bg-white shadow-device'
                  : ''
              }
              style={device === 'phone' ? { width: phoneWidth, maxWidth: '100%' } : undefined}
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
            <Button variant="filled" onClick={requestQuote} className="glass-btn shrink-0">
              {t.dialogs.requestForMyBusiness}
            </Button>
          </div>
        </div>
      )}
    </dialog>
  )
}
