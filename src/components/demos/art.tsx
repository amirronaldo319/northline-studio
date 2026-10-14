import { useId } from 'react'

/**
 * Original illustrations used as stand-ins for business photos in the
 * sample designs. Decorative only — every use is aria-hidden.
 */

type ArtProps = { className?: string }

export function KitchenArt({ className = '' }: ArtProps) {
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <rect width="400" height="260" fill="#e9e1d3" />
      <rect x="0" y="196" width="400" height="64" fill="#cdbfa8" />
      {/* window */}
      <rect x="150" y="34" width="100" height="78" rx="3" fill="#f8f4ec" />
      <rect x="150" y="34" width="100" height="78" rx="3" fill="none" stroke="#3b3f45" strokeWidth="4" />
      <line x1="200" y1="34" x2="200" y2="112" stroke="#3b3f45" strokeWidth="3" />
      <path d="M160 100 q20 -26 40 -8 q18 -22 40 4 v16 h-80z" fill="#9db08a" opacity="0.7" />
      {/* upper cabinets */}
      <rect x="22" y="30" width="112" height="70" rx="3" fill="#2f3a3f" />
      <rect x="266" y="30" width="112" height="70" rx="3" fill="#2f3a3f" />
      <line x1="78" y1="34" x2="78" y2="96" stroke="#46545a" strokeWidth="2" />
      <line x1="322" y1="34" x2="322" y2="96" stroke="#46545a" strokeWidth="2" />
      {/* backsplash + counter */}
      <rect x="22" y="112" width="356" height="34" fill="#f4efe6" />
      <path d="M22 129 h356" stroke="#e2d9ca" strokeWidth="1" />
      <rect x="16" y="144" width="368" height="8" rx="2" fill="#f7f5f0" />
      <rect x="22" y="152" width="356" height="56" fill="#2f3a3f" />
      <line x1="111" y1="156" x2="111" y2="204" stroke="#46545a" strokeWidth="2" />
      <line x1="200" y1="156" x2="200" y2="204" stroke="#46545a" strokeWidth="2" />
      <line x1="289" y1="156" x2="289" y2="204" stroke="#46545a" strokeWidth="2" />
      <rect x="96" y="172" width="10" height="2.5" rx="1" fill="#c9a86a" />
      <rect x="185" y="172" width="10" height="2.5" rx="1" fill="#c9a86a" />
      <rect x="274" y="172" width="10" height="2.5" rx="1" fill="#c9a86a" />
      {/* pendants */}
      <line x1="120" y1="0" x2="120" y2="22" stroke="#3b3f45" strokeWidth="1.5" />
      <path d="M108 30 a12 10 0 0 1 24 0z" fill="#c9a86a" />
      <line x1="280" y1="0" x2="280" y2="22" stroke="#3b3f45" strokeWidth="1.5" />
      <path d="M268 30 a12 10 0 0 1 24 0z" fill="#c9a86a" />
      {/* faucet + plant */}
      <path d="M196 144 v-14 q0 -6 8 -6 h6" stroke="#3b3f45" strokeWidth="3" fill="none" />
      <rect x="320" y="128" width="16" height="16" rx="3" fill="#b9805a" />
      <path d="M328 128 q-10 -14 -2 -22 q4 10 2 22 q4 -12 12 -14 q-2 10 -12 14" fill="#5d7a4f" />
    </svg>
  )
}

export function GardenArt({ className = '', variant = 0 }: ArtProps & { variant?: 0 | 1 | 2 }) {
  const skies = ['#dfe7da', '#e8e2d2', '#d9e3e3']
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <rect width="400" height="260" fill={skies[variant]} />
      <circle cx={variant === 1 ? 90 : 320} cy="58" r="26" fill="#f3e3b5" opacity="0.9" />
      <path d="M0 150 q90 -50 200 -18 t200 -20 v148 h-400z" fill="#8fa77a" />
      <path d="M0 182 q120 -40 220 -6 t180 -8 v92 h-400z" fill="#5f7d4c" />
      {/* stone path */}
      <path d="M170 260 q20 -50 70 -78" stroke="#d8cdb8" strokeWidth="26" fill="none" strokeLinecap="round" />
      <path d="M170 260 q20 -50 70 -78" stroke="#c4b79e" strokeWidth="26" strokeDasharray="10 9" fill="none" />
      {/* shrubs */}
      <circle cx="60" cy="176" r="26" fill="#3f5d36" />
      <circle cx="92" cy="186" r="20" fill="#4c6c40" />
      <circle cx="330" cy="170" r="30" fill="#3f5d36" />
      <circle cx="300" cy="186" r="18" fill="#4c6c40" />
      {/* tree */}
      <rect x={variant === 2 ? 118 : 262} y="86" width="8" height="70" fill="#6b5640" />
      <circle cx={variant === 2 ? 122 : 266} cy="82" r="34" fill="#4a6b3e" />
      <circle cx={variant === 2 ? 102 : 286} cy="96" r="22" fill="#557a47" />
      {/* planter edge */}
      <rect x="0" y="232" width="400" height="28" fill="#4a3d31" />
      <rect x="0" y="232" width="400" height="5" fill="#6b5a47" />
    </svg>
  )
}

export function CarArt({ className = '', angle = 0 }: ArtProps & { angle?: 0 | 1 }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`car-floor-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1d22" />
          <stop offset="1" stopColor="#0d0e11" />
        </linearGradient>
        <linearGradient id={`car-body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={angle === 0 ? '#5a6370' : '#7a2b2b'} />
          <stop offset="0.55" stopColor={angle === 0 ? '#2b3038' : '#4a1717'} />
          <stop offset="1" stopColor="#121418" />
        </linearGradient>
        <radialGradient id={`car-light-${uid}`} cx="0.5" cy="0" r="0.7">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#car-floor-${uid})`} />
      <rect width="400" height="240" fill={`url(#car-light-${uid})`} />
      <ellipse cx="200" cy="196" rx="170" ry="14" fill="#000" opacity="0.55" />
      {/* body */}
      <path
        d="M52 178 q-6 -26 18 -34 l46 -10 q30 -34 74 -38 q64 -4 104 30 l44 8 q28 6 28 30 v14 z"
        fill={`url(#car-body-${uid})`}
      />
      <path d="M128 132 q28 -28 64 -30 q44 -2 74 26 z" fill="#9fb3c8" opacity="0.35" />
      <path d="M196 104 l-4 28" stroke="#121418" strokeWidth="3" />
      {/* reflections */}
      <path d="M70 150 q120 -14 280 -2" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" fill="none" />
      <path d="M140 118 q40 -16 90 -10" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
      {/* wheels */}
      <circle cx="118" cy="180" r="24" fill="#0b0c0e" />
      <circle cx="118" cy="180" r="13" fill="#3a3f47" stroke="#8a929c" strokeWidth="2" />
      <circle cx="294" cy="180" r="24" fill="#0b0c0e" />
      <circle cx="294" cy="180" r="13" fill="#3a3f47" stroke="#8a929c" strokeWidth="2" />
      {/* lights */}
      <rect x="336" y="150" width="20" height="5" rx="2" fill="#f4f1e6" />
      <rect x="56" y="152" width="14" height="5" rx="2" fill="#d4483b" />
    </svg>
  )
}

export function CleanArt({ className = '', variant = 0 }: ArtProps & { variant?: 0 | 1 }) {
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <rect width="400" height="260" fill={variant === 0 ? '#e7f3f1' : '#f6efe4'} />
      <rect x="0" y="196" width="400" height="64" fill={variant === 0 ? '#d2e6e1' : '#e8dcc8'} />
      {/* window light */}
      <path d="M250 0 h110 l-60 196 h-120z" fill="#ffffff" opacity="0.55" />
      {/* sofa / table */}
      {variant === 0 ? (
        <g>
          <rect x="40" y="134" width="190" height="62" rx="16" fill="#9cc7bf" />
          <rect x="52" y="112" width="166" height="40" rx="14" fill="#b5d7d0" />
          <rect x="58" y="196" width="8" height="14" fill="#6c8d87" />
          <rect x="204" y="196" width="8" height="14" fill="#6c8d87" />
          <rect x="262" y="166" width="90" height="8" rx="3" fill="#ffffff" />
          <rect x="276" y="174" width="6" height="34" fill="#c6d9d5" />
          <rect x="332" y="174" width="6" height="34" fill="#c6d9d5" />
          <rect x="296" y="146" width="16" height="20" rx="4" fill="#f1c56b" />
        </g>
      ) : (
        <g>
          <rect x="60" y="120" width="280" height="12" rx="4" fill="#ffffff" />
          <rect x="70" y="132" width="260" height="64" fill="#efe5d4" />
          <rect x="190" y="70" width="40" height="50" rx="6" fill="#c9e2dc" />
          <rect x="250" y="88" width="30" height="32" rx="6" fill="#f1c56b" />
        </g>
      )}
      {/* sparkles */}
      <path d="M330 52 l4 12 l12 4 l-12 4 l-4 12 l-4 -12 l-12 -4 l12 -4z" fill="#ffffff" />
      <path d="M80 60 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3z" fill="#ffffff" />
      <circle cx="120" cy="40" r="4" fill="#ffffff" />
    </svg>
  )
}
