import { createContext, useContext } from 'react'
import type { ExampleSite } from '@/content/examples'

export interface ExampleDialogApi {
  open: (example: ExampleSite) => void
}

export const ExampleDialogContext = createContext<ExampleDialogApi | null>(null)

export function useExampleDialog(): ExampleDialogApi {
  const api = useContext(ExampleDialogContext)
  if (!api) throw new Error('useExampleDialog must be used inside <ExampleDialogProvider>')
  return api
}
