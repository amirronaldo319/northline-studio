/** Where a set of shapes sits. Each arrangement is placed in index.css (`.hero-shapes .shape-1` and so on). */
export type ShapeSet = 'hero' | 'cards' | 'pricing' | 'contact'

type Shape = 'orb' | 'ring' | 'capsule'

const CLASS: Record<Shape, string> = { orb: 'glass-orb', ring: 'glass-ring', capsule: 'glass-capsule-shape' }

const SETS: Record<ShapeSet, readonly Shape[]> = {
  hero: ['orb', 'ring', 'orb', 'capsule', 'orb'],
  cards: ['orb', 'ring', 'capsule'],
  pricing: ['orb', 'ring', 'capsule'],
  contact: ['orb', 'orb', 'ring', 'capsule'],
}

/**
 * Lenses, rings and capsules of glass behind a section's content, for the glass in front to frost. They are painted
 * gradients and purely decorative: hidden from assistive technology, never focusable, and never in the way of a click.
 * Only the hero's set drifts (when motion is welcome); the others sit still behind frosted panels.
 */
export function GlassShapes({ set }: { set: ShapeSet }) {
  return (
    <div className={`glass-shapes ${set}-shapes`} aria-hidden="true">
      {SETS[set].map((shape, index) => (
        <span key={index} className={`${CLASS[shape]} shape-${index + 1}`} />
      ))}
    </div>
  )
}
