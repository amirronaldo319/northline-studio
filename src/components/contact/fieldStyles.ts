export const inputClasses =
  'block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink shadow-[0_1px_0_rgb(19_26_43/0.03)] ' +
  'placeholder:text-ink-3/70 transition-[border-color,box-shadow] duration-150 ' +
  'focus:border-cobalt focus:shadow-[0_0_0_4px_rgb(23_63_208/0.14)] focus:outline-none ' +
  'aria-[invalid=true]:border-danger aria-[invalid=true]:focus:shadow-[0_0_0_4px_rgb(180_35_24/0.12)] ' +
  'border-line-strong disabled:opacity-60'

/** aria-describedby value for a control rendered inside <Field>. */
export function describedBy(id: string, error?: string, hasHint = false): string | undefined {
  if (error) return `${id}-error`
  return hasHint ? `${id}-hint` : undefined
}
