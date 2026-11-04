import { Glass } from 'glisse'

/**
 * A small Liquid Glass label over a screenshot's top corner: what kind of work it is. It ignores the pointer, so a
 * click on it still opens the screenshot underneath.
 */
export function ShotChip({ children }: { children: string }) {
  return (
    <span className="shot-chip">
      <Glass className="chip-glass glass-lift">{children}</Glass>
    </span>
  )
}
