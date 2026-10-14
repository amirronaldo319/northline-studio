import { useEffect } from 'react'

/**
 * Scrolls to the section named in the URL hash once the page has rendered.
 * The page is rendered on the client, so the browser's own fragment scroll can run before the target exists.
 */
export function useHashScroll(): void {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
  }, [])
}
