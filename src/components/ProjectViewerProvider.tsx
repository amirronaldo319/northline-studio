import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, Monitor, Smartphone, X } from 'lucide-react'
import { Button, SegmentedControl } from 'glisse'
import type { Project } from '@/content/projects'
import { useCopy } from '@/i18n/context'
import { canShareElement, flipCss, flipTransform, isInViewport } from '@/lib/flip'
import {
  ProjectViewerContext,
  type OpenProjectOptions,
  type ProjectViewerApi,
  type ViewerView,
} from './projectViewerContext'
import { buttonClasses } from './ui/button'

/** Duration of the shared-element movement. A timer, not an animation event, finishes every close. */
const EXPAND_MS = 300
const PANEL_MS = 240
const FALLBACK_MS = 240
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
/** Vertical space reserved for the title bar and caption when sizing the picture to the screen. */
const CHROME_HEIGHT = '18.5rem'

type Phase = 'closed' | 'opening' | 'open' | 'closing'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const DEVICE_ICONS = { desktop: Monitor, phone: Smartphone } as const

/**
 * Hosts the single project viewer. A project screenshot grows from its thumbnail into a larger preview
 * (a shared-element transition), and shrinks back to wherever it came from on close.
 *
 * Reliability rules: the dialog is native, so Escape, focus containment, and scroll locking come from the
 * browser. Closing is driven by a timer rather than an animation event, so an interrupted or stalled
 * animation can never leave an overlay behind.
 */
export function ProjectViewerProvider({ children }: { children: ReactNode }) {
  const t = useCopy()
  const [project, setProject] = useState<Project | null>(null)
  const [view, setView] = useState<ViewerView>('desktop')
  const [openToken, setOpenToken] = useState(0)
  /**
   * True once the picture has landed. The glass toggle over the screenshot mounts only then: it finds the
   * screenshot behind it when it mounts, which needs the dialog open and the picture in its final place.
   */
  const [isSettled, setIsSettled] = useState(false)

  const dialogRef = useRef<HTMLDialogElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const originRef = useRef<HTMLElement | null>(null)
  const phaseRef = useRef<Phase>('closed')
  const closeTimerRef = useRef<number | null>(null)
  const openTimerRef = useRef<number | null>(null)
  const animationsRef = useRef<Animation[]>([])

  const cancelAnimations = useCallback(() => {
    animationsRef.current.forEach((animation) => animation.cancel())
    animationsRef.current = []
  }, [])

  const clearTimers = useCallback(() => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current)
    if (openTimerRef.current !== null) window.clearTimeout(openTimerRef.current)
    closeTimerRef.current = null
    openTimerRef.current = null
  }, [])

  /** Runs after the dialog has actually closed: restore focus and release the content. */
  const finalize = useCallback(() => {
    clearTimers()
    cancelAnimations()
    dialogRef.current?.removeAttribute('data-closing')
    phaseRef.current = 'closed'
    setIsSettled(false)
    setProject(null)
    const origin = originRef.current
    if (origin?.isConnected) origin.focus()
  }, [cancelAnimations, clearTimers])

  const closeNow = useCallback(() => {
    clearTimers()
    cancelAnimations()
    const dialog = dialogRef.current
    dialog?.removeAttribute('data-closing')
    if (dialog?.open) dialog.close() // fires `close`, which finalizes
    else finalize()
  }, [cancelAnimations, clearTimers, finalize])

  const requestClose = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog || !dialog.open || phaseRef.current === 'closing') return
    if (prefersReducedMotion()) {
      closeNow()
      return
    }

    phaseRef.current = 'closing'
    setIsSettled(false)
    cancelAnimations()
    dialog.setAttribute('data-closing', '')

    const frame = frameRef.current
    const panel = panelRef.current
    const origin = originRef.current
    const current = frame?.getBoundingClientRect()
    const target = origin?.isConnected ? origin.getBoundingClientRect() : null
    const viewport = { width: window.innerWidth, height: window.innerHeight }

    let duration = FALLBACK_MS
    if (frame && current && target && isInViewport(target, viewport) && canShareElement(target, current)) {
      duration = EXPAND_MS
      animationsRef.current.push(
        frame.animate(
          [
            { transform: 'none', transformOrigin: 'top left' },
            { transform: flipCss(flipTransform(target, current)), transformOrigin: 'top left' },
          ],
          { duration, easing: EASE, fill: 'forwards' },
        ),
      )
    } else if (frame) {
      animationsRef.current.push(
        frame.animate(
          [
            { opacity: 1, transform: 'none' },
            { opacity: 0, transform: 'scale(0.98)' },
          ],
          { duration, easing: EASE, fill: 'forwards' },
        ),
      )
    }
    if (panel) {
      animationsRef.current.push(panel.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' }))
    }

    closeTimerRef.current = window.setTimeout(closeNow, duration + 40)
  }, [cancelAnimations, closeNow])

  const open = useCallback((next: Project, options: OpenProjectOptions) => {
    originRef.current = options.origin
    setIsSettled(false)
    setProject(next)
    setView(options.view ?? 'desktop')
    setOpenToken((token) => token + 1)
  }, [])

  // Opening: runs every time `open` is called, including while a close is still in progress.
  useEffect(() => {
    if (openToken === 0) return
    const dialog = dialogRef.current
    if (!dialog) return

    clearTimers()
    cancelAnimations()
    dialog.removeAttribute('data-closing')
    if (!dialog.open) dialog.showModal()
    phaseRef.current = 'opening'
    dialog.querySelector('[data-viewer-scroll]')?.scrollTo({ top: 0 })
    dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus({ preventScroll: true })

    if (prefersReducedMotion()) {
      phaseRef.current = 'open'
      // Next task: the dialog is open by then, so the toggle can find the screenshot behind it.
      openTimerRef.current = window.setTimeout(() => setIsSettled(true), 0)
      return
    }

    const frame = frameRef.current
    const panel = panelRef.current
    const target = frame?.getBoundingClientRect()
    const origin = originRef.current
    const from = origin?.isConnected ? origin.getBoundingClientRect() : null

    let duration = FALLBACK_MS
    if (frame && from && target && canShareElement(from, target)) {
      duration = EXPAND_MS
      animationsRef.current.push(
        frame.animate(
          [
            { transform: flipCss(flipTransform(from, target)), transformOrigin: 'top left' },
            { transform: 'none', transformOrigin: 'top left' },
          ],
          { duration, easing: EASE },
        ),
      )
    } else if (frame) {
      animationsRef.current.push(
        frame.animate(
          [
            { opacity: 0, transform: 'scale(0.98)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration, easing: EASE },
        ),
      )
    }
    if (panel) {
      animationsRef.current.push(
        panel.animate(
          [
            { opacity: 0, transform: 'translateY(8px)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: PANEL_MS, delay: 80, easing: EASE, fill: 'backwards' },
        ),
      )
    }
    openTimerRef.current = window.setTimeout(() => {
      if (phaseRef.current !== 'opening') return
      phaseRef.current = 'open'
      setIsSettled(true)
    }, duration)
  }, [openToken, cancelAnimations, clearTimers])

  // Never leave timers or animations behind if the provider unmounts.
  useEffect(
    () => () => {
      clearTimers()
      cancelAnimations()
    },
    [cancelAnimations, clearTimers],
  )

  const api = useMemo<ProjectViewerApi>(() => ({ open }), [open])
  const isPhone = view === 'phone'

  return (
    <ProjectViewerContext.Provider value={api}>
      {children}
      <dialog
        data-lenis-prevent=""
        ref={dialogRef}
        className="viewer"
        aria-labelledby="project-viewer-title"
        onClose={finalize}
        onCancel={(event) => {
          // Escape: keep the native focus handling and scroll lock, but play the exit first.
          event.preventDefault()
          requestClose()
        }}
      >
        {project && (
          <div
            data-viewer-scroll
            className="viewer-scroll"
            onClick={(event) => {
              // A click on the dimmed area (not on the content) closes the viewer.
              if (event.target === event.currentTarget || (event.target as HTMLElement).dataset.viewerGutter !== undefined) {
                requestClose()
              }
            }}
          >
            <div className="viewer-content">
              <div className="mb-3 flex items-start justify-between gap-4 text-white">
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-[0.08em] text-white/75 uppercase">
                    {project.status === 'live' ? t.work.statusLive : t.work.statusConcept} <span aria-hidden="true">·</span>{' '}
                    {t.projects[project.id].type}
                  </p>
                  <h2 id="project-viewer-title" className="mt-1 text-xl font-semibold sm:text-2xl">
                    <bdi>{project.name}</bdi>
                  </h2>
                </div>
                {/* Dark glass, to sit on the dimmed backdrop. */}
                <div data-theme="dark" className="shrink-0">
                  <Button
                    data-autofocus
                    onClick={requestClose}
                    className="glass-icon-button"
                    icon={<X aria-hidden="true" />}
                    aria-label={t.dialogs.closePreview}
                  />
                </div>
              </div>

              <div className="flex justify-center" data-viewer-gutter>
                <div
                  ref={frameRef}
                  className="viewer-frame relative overflow-hidden rounded-lg border border-white/20 bg-paper-2 shadow-device"
                  style={{
                    width: isPhone
                      ? `min(390px, 100%, calc((100dvh - ${CHROME_HEIGHT}) * 0.5132))`
                      : `min(100%, 1200px, calc((100dvh - ${CHROME_HEIGHT}) * 1.5424))`,
                  }}
                >
                  {/*
                    The screenshot is a known backdrop: marked, so the glass toggle over it refracts it in every
                    browser, not only Chromium. The mark sits on a wrapper that stays put when the picture changes.
                  */}
                  <div data-glisse-backdrop="">
                    <img
                      key={view}
                      src={isPhone ? project.mobile.src : project.desktop.src}
                      width={isPhone ? 390 : project.desktop.width}
                      height={isPhone ? 760 : project.desktop.height}
                      alt={t.projects[project.id].alt}
                      decoding="async"
                      className="view-in block h-auto w-full"
                    />
                  </div>
                  {isSettled && (
                    <div className="viewer-toggle fx-in">
                      <SegmentedControl
                        aria-label={t.dialogs.previewSize}
                        className="glass-segmented glass-lift"
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
                        value={view}
                        onValueChange={(next) => setView(next === 'phone' ? 'phone' : 'desktop')}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div ref={panelRef} className="mt-3 rounded-xl bg-card p-4 text-ink sm:p-5">
                <p className="max-w-[46rem] text-[0.9375rem] leading-relaxed text-ink-2">{t.projects[project.id].summary}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses('primary', 'md')}
                  >
                    {project.status === 'live' ? t.work.visitLive : t.work.openLivePreview}
                    <span className="sr-only">{t.common.opensNewTab(project.name)}</span>
                    <ArrowUpRight aria-hidden="true" size={17} className="card-arrow" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </ProjectViewerContext.Provider>
  )
}
