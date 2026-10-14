import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { CONTACT_SECTION_ID, NAV_LINKS, PRIMARY_CTA_LABEL } from '@/content/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'
import { underlineFor, underlineTarget, type Underline } from '@/lib/navUnderline'
import { BrandMark } from './BrandMark'
import { buttonClasses } from './ui/button'

const DESKTOP_QUERY = '(min-width: 900px)'
const sectionIds = NAV_LINKS.map((link) => link.id)
/** Horizontal padding of each desktop link (px-3.5); the underline spans the text inside it. */
const LINK_PADDING_PX = 14

/**
 * Desktop navigation with one underline that slides between links. It follows the active section,
 * is borrowed by hover and keyboard focus, and returns to the active section afterwards.
 * The underline is a separate element, so link hit areas never move.
 */
function DesktopNav({ active }: { active: string | null }) {
  const listRef = useRef<HTMLUListElement>(null)
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const [hovered, setHovered] = useState<number | null>(null)
  const [focused, setFocused] = useState<number | null>(null)
  const [underline, setUnderline] = useState<Underline | null>(null)
  const [isReady, setIsReady] = useState(false)

  const activeIndex = NAV_LINKS.findIndex((link) => link.id === active)
  const target = underlineTarget({ hovered, focused, active: activeIndex >= 0 ? activeIndex : null })

  const measure = useCallback(() => {
    const link = target === null ? null : linkRefs.current[target]
    if (!link) {
      setUnderline(null)
      return
    }
    setUnderline(underlineFor({ left: link.offsetLeft, width: link.offsetWidth }, LINK_PADDING_PX))
  }, [target])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  // Re-measure when the list changes size (window resize) and when web fonts finish loading.
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    void document.fonts?.ready.then(measure)
    return () => observer.disconnect()
  }, [measure])

  // Enable the slide only after the first position is placed, so the line never flies in from the left.
  useEffect(() => {
    if (!underline || isReady) return
    const frame = requestAnimationFrame(() => setIsReady(true))
    return () => cancelAnimationFrame(frame)
  }, [underline, isReady])

  return (
    <nav aria-label="Main" className="hidden min-[900px]:block">
      <ul ref={listRef} className="relative flex items-center gap-1" onPointerLeave={() => setHovered(null)}>
        {NAV_LINKS.map((link, index) => {
          const isActive = active === link.id
          return (
            <li key={link.id}>
              <a
                ref={(el) => {
                  linkRefs.current[index] = el
                }}
                href={`#${link.id}`}
                aria-current={isActive ? 'location' : undefined}
                onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(index)}
                onFocus={() => setFocused(index)}
                onBlur={() => setFocused(null)}
                className={`block rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-150 ${
                  isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            </li>
          )
        })}
        <span
          aria-hidden="true"
          className="nav-underline"
          data-ready={isReady}
          style={{
            opacity: underline ? 1 : 0,
            transform: underline ? `translateX(${underline.x}px) scaleX(${underline.width})` : 'translateX(0) scaleX(0)',
          }}
        />
      </ul>
    </nav>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape or when the viewport grows to desktop.
  useEffect(() => {
    if (!isMenuOpen) return
    const media = window.matchMedia(DESKTOP_QUERY)
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsMenuOpen(false)
      toggleRef.current?.focus()
    }
    const onMedia = () => media.matches && setIsMenuOpen(false)
    document.addEventListener('keydown', onKey)
    media.addEventListener('change', onMedia)
    return () => {
      document.removeEventListener('keydown', onKey)
      media.removeEventListener('change', onMedia)
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        isScrolled || isMenuOpen
          ? 'border-line bg-paper/90 shadow-[0_6px_24px_-18px_rgb(19_26_43/0.35)] backdrop-blur-md'
          : 'border-transparent bg-paper'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <a href="#top" className="-m-1 rounded-lg p-1">
          <BrandMark intro />
        </a>

        <DesktopNav active={active} />

        <div className="flex items-center gap-2">
          <div className="hidden min-[560px]:block">
            <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'md')}>
              {PRIMARY_CTA_LABEL}
            </a>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line-strong bg-card text-ink transition-[border-color,transform] duration-200 hover:border-ink/40 active:scale-[0.96] active:duration-100 min-[900px]:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {isMenuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>
      </div>

      <div className="scroll-progress" aria-hidden="true" />

      {/* Always mounted so it can animate; `inert` removes it from tab order and the accessibility tree when closed. */}
      <div id="mobile-menu" className="disclosure mobile-menu" data-open={isMenuOpen} inert={!isMenuOpen}>
        <nav aria-label="Mobile" className="disclosure-inner bg-paper shadow-[inset_0_1px_0_var(--color-line)]">
          <ul className="container-page flex flex-col py-3">
            {NAV_LINKS.map((link, index) => (
              <li key={link.id} className="menu-item" style={{ '--i': index } as React.CSSProperties}>
                <a
                  href={`#${link.id}`}
                  onClick={closeMenu}
                  aria-current={active === link.id ? 'location' : undefined}
                  className="flex min-h-12 items-center border-b border-line/70 text-lg font-medium text-ink aria-[current=location]:text-cobalt"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="menu-item pt-4 pb-2" style={{ '--i': NAV_LINKS.length } as React.CSSProperties}>
              <a href={`#${CONTACT_SECTION_ID}`} onClick={closeMenu} className={buttonClasses('primary', 'lg', 'w-full')}>
                {PRIMARY_CTA_LABEL}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
