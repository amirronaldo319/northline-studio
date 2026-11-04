/**
 * Every text control in the inquiry form: a well inset into the glass, with a clear grey edge (3:1) and a strong focus
 * ring (see `.field` and `.liquid-glass-input`).
 */
export const fieldControlClasses = 'field liquid-glass-input'

/** aria-describedby value for a control rendered inside <Field>. */
export function describedBy(id: string, error?: string, hasHint = false): string | undefined {
  if (error) return `${id}-error`
  return hasHint ? `${id}-hint` : undefined
}
