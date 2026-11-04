export type ButtonVariant = 'primary' | 'secondary' | 'outlineLight' | 'inverse' | 'quiet'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none ' +
  'transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out ' +
  'active:scale-[0.98] active:duration-100 disabled:cursor-not-allowed disabled:opacity-70'

/*
 * Apple-style buttons: a flat blue pill for the main action, a blue outline pill beside it, no drop shadows or
 * light sweeps. The label carries the weight, not effects.
 */
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-cobalt text-white hover:bg-[#0077ed] active:bg-cobalt-deep',
  secondary: 'border border-cobalt text-cobalt hover:bg-cobalt hover:text-white',
  /** The outline pill on dark surfaces. */
  outlineLight: 'border border-white/45 text-white hover:border-white hover:bg-white hover:text-night',
  inverse: 'bg-white text-night hover:bg-cobalt-soft',
  quiet: 'text-ink underline decoration-line-strong underline-offset-4 hover:decoration-cobalt',
}

const sizes: Record<ButtonSize, string> = {
  /** The header's button: small, as Apple's navigation buttons are, and still a 32px target. */
  sm: 'min-h-8 px-3.5 text-[0.8125rem]',
  md: 'min-h-11 px-5 text-[0.9375rem]',
  lg: 'min-h-12 px-7 text-[1.0625rem]',
}

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = ''): string {
  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(' ')
}
