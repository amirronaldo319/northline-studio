export interface LinkBox {
  /** Position of the link relative to the nav list. */
  left: number
  width: number
}

export interface Underline {
  x: number
  width: number
}

/**
 * Geometry of the sliding underline for a link: it spans the link's text, not its padding.
 * `inset` is the link's horizontal padding.
 */
export function underlineFor(link: LinkBox, inset: number): Underline {
  const width = Math.max(0, link.width - inset * 2)
  return { x: link.left + inset, width }
}

/**
 * Which link the underline sits under. Hover and keyboard focus take over temporarily;
 * the active section is restored afterwards. Returns null when there is nothing to show.
 */
export function underlineTarget(options: {
  hovered: number | null
  focused: number | null
  active: number | null
}): number | null {
  const { hovered, focused, active } = options
  return hovered ?? focused ?? active
}
