/**
 * Optional photography for the concept demos.
 *
 * Drop a file named after a slot below into `src/assets/photos/` (jpg, jpeg, webp, or avif) and it replaces the
 * built-in artwork for that slot. Slots without a file keep the artwork, so photos can be added one at a time.
 * Keep `alt` accurate for the photo you choose, and record its source in `src/assets/photos/CREDITS.md`.
 */
export type PhotoId =
  | 'cleaning-hero'

export const PHOTO_ALT: Record<PhotoId, string> = {
  'cleaning-hero': 'A bright, tidy living room',
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
