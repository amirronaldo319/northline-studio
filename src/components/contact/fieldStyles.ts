/**
 * A textarea or select inside a glass field (`<Glass className="field-glass">`): transparent, so the glass is the
 * field's surface, matching the Glisse `Input`s beside it. Focus and error rings are drawn by `.field-glass`.
 */
export const fieldControlClasses =
  'block min-h-12 w-full rounded-[inherit] bg-transparent px-4 py-3 text-base text-ink placeholder:text-ink-3/70 ' +
  'focus:outline-none disabled:opacity-60'

/** aria-describedby value for a control rendered inside <Field>. */
export function describedBy(id: string, error?: string, hasHint = false): string | undefined {
  if (error) return `${id}-error`
  return hasHint ? `${id}-hint` : undefined
}
