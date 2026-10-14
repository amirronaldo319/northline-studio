import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { ExampleSite } from '@/content/examples'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { ExampleDialog } from './ExampleDialog'
import { ExampleDialogContext } from './exampleDialogContext'

/** Hosts the single example dialog so the hero and the portfolio can both open it. */
export function ExampleDialogProvider({ children }: { children: ReactNode }) {
  const [example, setExample] = useState<ExampleSite | null>(null)

  const open = useCallback((next: ExampleSite) => setExample(next), [])
  const close = useCallback(() => setExample(null), [])

  // Leaves the preview and moves to the real inquiry form, with focus on its first field.
  const requestQuote = useCallback(() => {
    setExample(null)
    requestAnimationFrame(() => {
      document.getElementById(CONTACT_SECTION_ID)?.scrollIntoView()
      document.getElementById('inquiry-name')?.focus({ preventScroll: true })
    })
  }, [])

  const api = useMemo(() => ({ open }), [open])

  return (
    <ExampleDialogContext.Provider value={api}>
      {children}
      <ExampleDialog example={example} onClose={close} onRequestQuote={requestQuote} />
    </ExampleDialogContext.Provider>
  )
}
