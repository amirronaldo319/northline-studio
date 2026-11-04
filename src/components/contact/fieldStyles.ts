/** Every text control in the inquiry form: a white box with a clear grey edge and a strong focus ring (see `.field`). */
export const fieldControlClasses = 'field'

/** aria-describedby value for a control rendered inside <Field>. */
export function describedBy(id: string, error?: string, hasHint = false): string | undefined {
  if (error) return `${id}-error`
  return hasHint ? `${id}-hint` : undefined
}
