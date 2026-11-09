import type { ReactNode } from 'react'
import { useCopy } from '@/i18n/context'

type FieldProps = {
  id: string
  label: string
  isOptional?: boolean
  error?: string
  hint?: string
  className?: string
  children: ReactNode
}

/** A visible label above its control, then a hint or an error below it, with ids wired for aria-describedby. */
export function Field({ id, label, isOptional = false, error, hint, className = '', children }: FieldProps) {
  const t = useCopy()

  return (
    <div className={className} data-invalid={error ? true : undefined}>
      <label htmlFor={id} className="field-label">
        {label}
        {isOptional && <span className="font-normal text-ink-3"> {t.form.optional}</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-footnote text-ink-3">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="fx-in mt-1.5 text-footnote font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
