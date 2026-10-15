import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { site } from '@/config/site'
import { useCopy } from '@/i18n/context'
import { copyText } from '@/lib/clipboard'

const RESTORE_AFTER_MS = 2000

type State = 'idle' | 'copied' | 'failed'

/**
 * Copies the configured contact address. "Copied" is only shown after the clipboard accepted the text,
 * and a failure says so plainly. The label restores itself after two seconds.
 */
export function CopyEmailButton() {
  const t = useCopy()
  const [state, setState] = useState<State>('idle')
  const timer = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    },
    [],
  )

  const copy = async () => {
    const ok = await copyText(site.contact.email, typeof navigator === 'undefined' ? undefined : navigator.clipboard)
    setState(ok ? 'copied' : 'failed')
    if (timer.current !== null) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), RESTORE_AFTER_MS)
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line-strong bg-card px-3.5 text-sm font-semibold text-ink transition-[border-color,transform] duration-150 hover:border-ink/40 active:scale-[0.98] active:duration-100"
      >
        {state === 'copied' ? (
          <Check aria-hidden="true" size={15} className="text-success" />
        ) : (
          <Copy aria-hidden="true" size={15} />
        )}
        {state === 'copied' ? t.contact.copied : t.contact.copyEmail}
      </button>
      <span role="status" aria-live="polite" className="text-sm text-ink-3">
        {state === 'copied' ? t.contact.copiedNote(site.contact.email) : null}
        {state === 'failed' ? t.contact.copyFailed : null}
      </span>
    </span>
  )
}
