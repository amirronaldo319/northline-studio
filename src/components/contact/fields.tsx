import type { ReactNode } from 'react'

type FieldProps = {
  id: string
  label: string
  isOptional?: boolean
  error?: string
  hint?: string
  className?: string
  children: ReactNode
}

/** Visible label + control + hint/error, with ids wired for aria-describedby. */
export function Field({ id, label, isOptional = false, error, hint, className = '', children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-baseline gap-1.5 text-[0.9375rem] font-semibold text-ink">
        {label}
        {isOptional && <span className="text-sm font-normal text-ink-3">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-3">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="fx-in mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
