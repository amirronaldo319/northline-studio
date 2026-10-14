/**
 * Invisible anchors for section ids from earlier versions of the page, so links shared before a section was
 * renamed or merged still land on it. Render inside a `position: relative` section.
 */
export function LegacyAnchors({ ids }: { ids: readonly string[] }) {
  return (
    <>
      {ids.map((id) => (
        <span key={id} id={id} className="anchor-target absolute inset-x-0 top-0 h-0" aria-hidden="true" />
      ))}
    </>
  )
}
