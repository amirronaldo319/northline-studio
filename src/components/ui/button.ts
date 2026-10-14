export type ButtonVariant = 'primary' | 'secondary' | 'inverse' | 'quiet'
export type ButtonSize = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none ' +
  'transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out ' +
  'active:scale-[0.98] active:duration-100 disabled:cursor-not-allowed disabled:opacity-70'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-cobalt text-white shadow-[0_1px_0_rgb(255_255_255/0.2)_inset,0_6px_16px_-6px_rgb(35_71_214/0.6)] ' +
    'hover:bg-cobalt-deep hover:shadow-[0_1px_0_rgb(255_255_255/0.2)_inset,0_10px_22px_-8px_rgb(35_71_214/0.7)]',
  secondary: 'border border-line-strong bg-card text-ink hover:border-ink/40 hover:bg-white',
  inverse: 'bg-white text-night hover:bg-cobalt-soft',
  quiet: 'text-ink underline decoration-line-strong underline-offset-4 hover:decoration-cobalt',
}

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-11 px-5 text-[0.9375rem]',
  lg: 'min-h-12 px-6 text-base',
}

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = ''): string {
  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(' ')
}
