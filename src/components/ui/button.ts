export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'sm' | 'md' | 'lg'

/*
 * Liquid Glass buttons (see `.liquid-glass-button` in index.css). The hierarchy is carried by the glass itself:
 *
 * - primary: a lens of blue glass, lit along its top edge, for the one main action in a view (quote, choose a plan,
 *   send the form);
 * - secondary: clear glass with a blue label, beside a primary or where an action matters less.
 *
 * Sizes set the role: `sm` in the navigation bar, `md` in cards and bars, `lg` for a section's main action and the
 * form's send button. Every size is at least a 32px target, and `md` and `lg` are at least 44px.
 */
const variants: Record<ButtonVariant, string> = {
  primary: 'glass-btn-primary',
  secondary: 'glass-btn-secondary',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'glass-btn-sm',
  md: 'glass-btn-md',
  lg: 'glass-btn-lg',
}

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = ''): string {
  return ['liquid-glass-button', variants[variant], sizes[size], extra].filter(Boolean).join(' ')
}
