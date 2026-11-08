import type { SoapBubbleMaterialProps } from '@/components/soap-bubble'

/**
 * The bubble under the active desktop link: the site's approved light glass (src/lib/lightGlass.ts) shaped as a pill
 * the size of a link, with a lighter bevel and a small, slow wobble when it settles on a new link.
 */
export const NAV_BUBBLE = {
  radius: 18,
  bevel: 9,
  wobble: 0.3,
  maxDpr: 2,
} satisfies SoapBubbleMaterialProps
