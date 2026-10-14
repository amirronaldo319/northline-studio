import { useEffect, useState } from 'react'

/** Tracks which of the given section ids is currently in the reading zone of the viewport. */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join('|')

  useEffect(() => {
    const sections = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0 || !('IntersectionObserver' in window)) return

    const visible = new Map<string, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting)
        const first = sections.find((section) => visible.get(section.id))
        setActive(first ? first.id : null)
      },
      // A band across the upper-middle of the screen decides which section is "current".
      { rootMargin: '-35% 0px -55% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [key])

  return active
}
