import type { ReactNode } from 'react'
import { PHOTO_ALT, photoUrl, type PhotoId } from '@/content/photos'

type Props = {
  id: PhotoId
  /** Classes for the photo. Should size and crop it the same way the artwork is sized. */
  className: string
  /** Shown when no photo has been added for this slot. */
  fallback: ReactNode
  /** Load immediately instead of lazily. Use for images that appear above the fold. */
  isEager?: boolean
}

/** A licensed photo when one is provided for the slot, otherwise the built-in artwork. */
export function DemoImage({ id, className, fallback, isEager = false }: Props) {
  const src = photoUrl(id)
  if (!src) return <>{fallback}</>

  return <img src={src} alt={PHOTO_ALT[id]} className={`${className} object-cover`} loading={isEager ? 'eager' : 'lazy'} decoding="async" />
}
