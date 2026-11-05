export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'sm' | 'md' | 'lg'

/*
 * Apple's buttons (see `.button` in index.css): a flat blue pill for the main action and a blue outline pill beside it,
 * no gloss and no movement, only a slightly lighter blue under the pointer.
 *
 * - primary: the one main action in a view (quote, choose a plan, send the form);
 * - secondary: the action beside it ("See the work"), or one that matters less.
 *
 * Sizes set the role: `sm` in the navigation bar (Apple's "Buy" button), `md` in cards and the pricing chart, `lg` for
 * a section's main action and the form's send button. `sm` is a 28px target; `md` and `lg` are at least 44px.
 */
const variants: Record<ButtonVariant, string> = {
  primary: 'button-primary',
  secondary: 'button-secondary',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'button-sm',
  md: 'button-md',
  lg: 'button-lg',
}

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = ''): string {
  return ['button', variants[variant], sizes[size], extra].filter(Boolean).join(' ')
}
