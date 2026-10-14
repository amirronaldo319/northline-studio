import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { CONTACT_SECTION_ID, PRIMARY_CTA_LABEL } from '@/content/navigation'
import { shouldShowQuoteBar } from '@/lib/quoteBar'
import { buttonClasses } from './ui/button'

/** Phones hide the header button to save space, so a quote link follows the visitor once they are past the first screen. */
export function StickyQuoteBar() {
  const [scrolledPast, setScrolledPast] = useState(false)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const onScroll = () =>
      setScrolledPast(shouldShowQuoteBar({ scrollY: window.scrollY, viewportHeight: window.innerHeight, atEnd: false }))
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const candidates: Array<Element | null> = [document.getElementById(CONTACT_SECTION_ID), document.querySelector('footer')]
    const targets = candidates.filter((el): el is Element => el !== null)
    const visible = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target)
        else visible.delete(entry.target)
      }
      setAtEnd(visible.size > 0)
    })
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const isVisible = scrolledPast && !atEnd

  return (
    <div
      data-visible={isVisible}
      inert={!isVisible}
      className="quote-bar pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] min-[560px]:hidden print:hidden"
    >
      <a
        href={`#${CONTACT_SECTION_ID}`}
        className={buttonClasses('primary', 'lg', 'pointer-events-auto w-full max-w-sm shadow-lift')}
      >
        {PRIMARY_CTA_LABEL}
        <ArrowRight aria-hidden="true" size={18} />
      </a>
    </div>
  )
}
