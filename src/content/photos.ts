/**
 * Optional photography for the concept demos.
 *
 * Drop a file named after a slot below into `src/assets/photos/` (jpg, jpeg, webp, or avif) and it replaces the
 * built-in artwork for that slot. Slots without a file keep the artwork, so photos can be added one at a time.
 * Keep `alt` accurate for the photo you choose, and record its source in `src/assets/photos/CREDITS.md`.
 */
export type PhotoId =
  | 'landscaping-hero'
  | 'landscaping-project-1'
  | 'landscaping-project-2'
  | 'landscaping-project-3'
  | 'cleaning-hero'
  | 'detailing-hero'
  | 'detailing-booking'

export const PHOTO_ALT: Record<PhotoId, string> = {
  'landscaping-hero': 'A landscaped backyard with planting beds and a stone path',
  'landscaping-project-1': 'A terraced back garden with stone steps',
  'landscaping-project-2': 'A front yard with fresh planting and a lawn',
  'landscaping-project-3': 'A stone path winding through a planted garden',
  'cleaning-hero': 'A bright, tidy living room',
  'detailing-hero': 'A freshly detailed car in a workshop',
  'detailing-booking': 'The glossy paintwork of a detailed car',
}

const files = import.meta.glob('/src/assets/photos/*.{avif,webp,jpg,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

/** URL of the photo for a slot, or null when no file has been added. */
export function photoUrl(id: PhotoId): string | null {
  const match = Object.keys(files).find((path) => new RegExp(`/${id}\\.(avif|webp|jpe?g)$`).test(path))
  return match ? files[match] : null
}
