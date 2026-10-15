import { LOGO_ASPECT, LOGO_MARK_PATH, LOGO_VIEWBOX, LOGO_WORDMARK_X, LOGO_WORD_PATH } from '@/assets/brand/logoPaths'
import { site } from '@/config/site'

type Props = {
  /** `light` for the cream page, `dark` for navy sections (white wordmark, lifted blue for contrast). */
  tone?: 'light' | 'dark'
  /** Play the one-time entrance (mark rises, wordmark follows). Meant for the header only. */
  intro?: boolean
}

const TONES = {
  light: 'text-ink [--logo-mark:#173fd0]',
  dark: 'text-white [--logo-mark:#4a6cf2]',
} as const

/**
 * The SitePilot logo as inline SVG, so one set of outlines serves both backgrounds and the
 * mark and wordmark can move independently. The wordmark follows the text colour.
 */
export function BrandMark({ tone = 'light', intro = false }: Props) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      width={Math.round(36 * LOGO_ASPECT)}
      height={36}
      role="img"
      aria-label={site.brand.name}
      className={`brand-logo block h-9 w-auto sm:h-10 ${TONES[tone]}`}
      data-intro={intro || undefined}
    >
      <g className="logo-mark">
        <path fill="var(--logo-mark)" fillRule="evenodd" transform="scale(.33333)" d={LOGO_MARK_PATH} />
      </g>
      <g className="logo-word">
        <path
          fill="currentColor"
          fillRule="evenodd"
          transform={`translate(${LOGO_WORDMARK_X} 0) scale(.33333)`}
          d={LOGO_WORD_PATH}
        />
      </g>
    </svg>
  )
}
