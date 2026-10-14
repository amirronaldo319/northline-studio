/** A check mark that draws itself once when it appears (see `.check-draw` in index.css). */
export function SuccessCheck() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" width={40} height={40} fill="none" className="check-draw text-success">
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" pathLength={1} />
      <path d="M10 16.5l4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
    </svg>
  )
}
