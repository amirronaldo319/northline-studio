import type { ReactNode } from 'react'
import { useCopy } from '@/i18n/context'

type FieldProps = {
  id: string
  label: string
  isOptional?: boolean
  error?: string
  hint?: string
  /** The field holds a value (or, like a select, always shows one), so its label stays raised. */
  isFilled?: boolean
  /** A multi-line field: the label rests at the top instead of the middle. */
  isMultiline?: boolean
  className?: string
  children: ReactNode
}

/**
 * A field in Apple's style: the label sits inside the box like a placeholder and slides up, smaller, when the field
 * is focused or filled, so it is always visible. It stays a real <label for>, and hint and error ids are wired for
 * aria-describedby. The label comes after the control so it paints above it; it ignores the pointer, so a click
 * lands on the control.
 */
export function Field({ id, label, isOptional = false, error, hint, isFilled = false, isMultiline = false, className = '', children }: FieldProps) {
  const t = useCopy()

  return (
    <div className={className}>
      <div className="float-field" data-filled={isFilled || undefined} data-multiline={isMultiline || undefined} data-invalid={error ? true : undefined}>
        {children}
        <label htmlFor={id} className="float-label">
          {label}
          {isOptional && <span className="float-optional"> {t.form.optional}</span>}
        </label>
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 px-1 text-sm text-ink-3">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="fx-in mt-1.5 px-1 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
