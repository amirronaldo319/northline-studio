import type { FanGalleryProps } from '../fan-gallery'

/**
 * The homepage fan's settings, as given with the ReactDrops "Fan Gallery" component: five-card geometry (card 162px
 * wide, 4:5, centres 0.69 of a card apart, the outer cards dropping 0.14 of a card and leaning 14.5 degrees), the stack
 * opening like a swatch book from the left as the fan scrolls into view, and a hovered or focused card lifting 42px,
 * straightening and parting its neighbours by 0.2 of a card. The component fits itself to the width it is given, so
 * twelve cards on a phone close up rather than overflow.
 */
export const FAN_CONFIG = {
  cardWidth: 162,
  aspectRatio: 0.8,
  spacing: 0.69,
  curve: 0.14,
  tilt: 14.5,
  lift: 42,
  spread: 0.2,
  stackFrom: 'left',
  speed: 0.7,
  stagger: 0.09,
  bounce: 0.35,
  hoverSpeed: 0.28,
  radius: 18,
  entrance: 'stack',
  trigger: 'scroll',
  viewportStart: 75,
  once: true,
  showTitle: false,
} satisfies Omit<FanGalleryProps, 'items' | 'ariaLabel'>

/**
 * On a phone the two fans of six use a narrower card. Measured: each card shows a strip of about
 * (screen width - 1.84 x card width) / 5. At the full 162px that is under 30px on most phones; at 104px it is 40px on
 * a 390px phone and still 25px on a 320px one, above the 24px a finger needs (WCAG 2.2 target size).
 */
export const FAN_CONFIG_PHONE = { ...FAN_CONFIG, cardWidth: 104 } satisfies Omit<FanGalleryProps, 'items' | 'ariaLabel'>
