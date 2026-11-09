import { useContext, useEffect, useState } from 'react'
import { Glass } from 'glisse'
import { CONTACT_SECTION_ID } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { PageContext } from './pageContext'
import { buttonClasses } from './ui/button'

/**
 * On phones, a floating capsule of Liquid Glass at the bottom of the screen with the quote button, as iOS floats its
 * tab bars. It appears once the first screen has scrolled away and steps aside while the contact form or the footer
 * is on screen, so it never covers the form it points to. It is hidden on wider screens, where the bar has the button.
 * It is a named <aside>, so screen-reader users find it among the page's landmarks instead of as loose content.
 */
export function QuoteBar() {
  const t = useCopy()
  const { isHome } = useContext(PageContext)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const first = document.querySelector('main > section')
    const contact = document.getElementById(CONTACT_SECTION_ID)
    const footer = document.getElementById('site-footer')
    if (!first) return
    let pastFirst = false
    const near = new Set<Element>()
    const update = () => setIsVisible(pastFirst && near.size === 0)
    const firstWatch = new IntersectionObserver(([entry]) => {
      pastFirst = !entry.isIntersecting
      update()
    })
    const endWatch = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) near.add(entry.target)
        else near.delete(entry.target)
      }
      update()
    })
    firstWatch.observe(first)
    for (const el of [contact, footer]) if (el) endWatch.observe(el)
    return () => {
      firstWatch.disconnect()
      endWatch.disconnect()
    }
  }, [isHome])

  return (
    <aside className="quote-bar" data-visible={isVisible} inert={!isVisible} aria-label={t.common.requestQuote}>
      <Glass className="quote-glass glass-frost glass-lift">
        <span className="quote-bar-text">{t.common.fromPrice}</span>
        <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'md', 'shrink-0')}>
          {t.common.requestQuote}
        </a>
      </Glass>
    </aside>
  )
}
