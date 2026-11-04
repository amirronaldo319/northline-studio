/**
 * Which section the glass tab bar shows as selected.
 *
 * The bar follows the section being read (`active`). When a visitor picks a tab, the page glides to that section
 * and passes the ones in between on the way; showing each of them in turn would make the selection bounce back
 * and forth. So the picked tab (`pending`) is shown until the page arrives there, the visitor scrolls on their
 * own, or a short time passes.
 */
export interface NavSelection {
  /** The section in the reading zone of the screen, or null above the first one. */
  active: string | null
  /** The tab the visitor picked and the page is gliding to, or null. */
  pending: string | null
}

/** How long a picked tab is held before the bar goes back to following the page (ms). */
export const PENDING_HOLD_MS = 1600

/** The section to show as selected. */
export function shownSection({ active, pending }: NavSelection): string | null {
  return pending ?? active
}

/** The pending tab after `active` changed: cleared once the page has reached it. */
export function settlePending({ active, pending }: NavSelection): string | null {
  return pending !== null && active === pending ? null : pending
}
