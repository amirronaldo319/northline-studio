import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from 'glisse'
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
      <Button
        onClick={copy}
        className="glass-btn glass-btn-sm glass-flat"
        icon={state === 'copied' ? <Check aria-hidden="true" className="text-success" /> : <Copy aria-hidden="true" />}
      >
        {state === 'copied' ? t.contact.copied : t.contact.copyEmail}
      </Button>
      <span role="status" aria-live="polite" className="text-sm text-ink-3">
        {state === 'copied' ? t.contact.copiedNote(site.contact.email) : null}
        {state === 'failed' ? t.contact.copyFailed : null}
      </span>
    </span>
  )
}
