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

/**
 * A field in the manner of Apple's own forms: the label sits inside the box and rises, smaller, once the field is
 * focused or filled (`.field-float` in index.css; browsers without :has() keep it above the box). It stays a real
 * <label for>, so it names the control for screen readers and a tap on it focuses the field. A hint or an error
 * follows below, with ids wired for aria-describedby.
 */
export function Field({ id, label, isOptional = false, error, hint, className = '', children }: FieldProps) {
  const t = useCopy()

  return (
    <div className={className} data-invalid={error ? true : undefined}>
      <div className="field-float">
        <label htmlFor={id} className="field-label">
          {label}
          {isOptional && <span className="field-label-optional"> {t.form.optional}</span>}
        </label>
        {children}
      </div>
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
