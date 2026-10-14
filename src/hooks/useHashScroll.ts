import { useEffect } from 'react'

/**
 * Scrolls to the section named in the URL hash once the page has rendered, and reveals the destination
 * straight away so an anchor never lands on content that is still waiting to fade in.
 * The page is rendered on the client, so the browser's own fragment scroll can run before the target exists.
 */
export function useHashScroll(): void {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return

    const target = document.getElementById(id)
    if (!target) return

    const section = target.closest('section') ?? target
    section.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
    if (section.classList.contains('reveal')) section.classList.add('is-visible')

    target.scrollIntoView({ behavior: 'instant' })
  }, [])
}
