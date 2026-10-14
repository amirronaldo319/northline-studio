import logoReversed from '@/assets/brand/northline-logo-reversed.svg'
import logoInk from '@/assets/brand/northline-logo.svg'
import { site } from '@/config/site'

type Props = {
  /** `light` for the cream page, `dark` for navy sections (white wordmark, lifted blue for contrast). */
  tone?: 'light' | 'dark'
}

/** The Northline Studio logo. Intrinsic size is 1714 x 434; the attributes reserve its space before it loads. */
export function BrandMark({ tone = 'light' }: Props) {
  return (
    <img
      src={tone === 'light' ? logoInk : logoReversed}
      alt={site.brand.name}
      width={142}
      height={36}
      decoding="async"
      className="block h-9 w-auto sm:h-10"
    />
  )
}
