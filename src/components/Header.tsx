import { useContext, useEffect, useRef, useState, type CSSProperties } from 'react'
import { CONTACT_SECTION_ID, MENU_LINKS } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { useActiveSection } from '@/hooks/useActiveSection'
import { BrandMark } from './BrandMark'
import { LanguageMenu } from './LanguageMenu'
import { LanguageSwitcher } from './LanguageSwitcher'
import { BubbleLinks } from './nav/BubbleLinks'
import { PageContext, useHomeAnchor, useHomeTop } from './pageContext'
import { buttonClasses } from './ui/button'

/** Where the row of links replaces the phone menu. */
const DESKTOP_QUERY = '(min-width: 880px)'
const sectionIds = MENU_LINKS.map((link) => link.id)
/** Everything outside the header that the open phone menu covers, so it is out of reach while the menu is open. */
const BEHIND_MENU = ['main', 'site-footer']

/**
 * The navigation as Apple draws it with Liquid Glass: one capsule of glass floating at the top, which the page scrolls
 * under. It holds the name, three links with a bubble that slides to the section being read, the language menu and a small blue glass button; once the
 * page moves, the capsule draws in a little. On phones the links open in a glass sheet that drops from the capsule
 * (the quote button lives in a glass bar at the bottom of the screen instead): focus moves into the sheet, Escape or a
 * link closes it, focus returns to the button, and the page behind is out of reach.
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const active = useActiveSection(sectionIds)
  const homeAnchor = useHomeAnchor()
  const homeTop = useHomeTop()
  const { isHome } = useContext(PageContext)
  const t = useCopy()
  const current = isHome ? active : null

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    const media = window.matchMedia(DESKTOP_QUERY)
    const behind = BEHIND_MENU.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    behind.forEach((el) => el.setAttribute('inert', ''))
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    sheetRef.current?.querySelector<HTMLElement>('a, button')?.focus()

    const close = (returnFocus: boolean) => {
      setIsMenuOpen(false)
      if (returnFocus) toggleRef.current?.focus()
    }
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close(true)
    const onMedia = () => media.matches && close(false)
    document.addEventListener('keydown', onKey)
    media.addEventListener('change', onMedia)
    return () => {
      behind.forEach((el) => el.removeAttribute('inert'))
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      media.removeEventListener('change', onMedia)
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="site-nav" data-scrolled={isScrolled || undefined} data-open={isMenuOpen || undefined}>
      <div className="container-page">
        <div className="nav-capsule liquid-glass-navigation">
          <div className="site-nav-row">
            <a href={homeTop} className="site-nav-brand" onClick={closeMenu}>
              <BrandMark />
            </a>

            <div className="site-nav-actions">
              {/* Wrappers carry the breakpoints: Glisse's own (unlayered) display rules win over utility classes. */}
              <div className="site-nav-links">
                <BubbleLinks active={current} desktopQuery={DESKTOP_QUERY} />
              </div>
              <div className="site-nav-lang">
                <LanguageMenu />
              </div>
              <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'sm', 'site-nav-cta')}>
                {t.common.requestQuote}
              </a>
              <button
                ref={toggleRef}
                type="button"
                className="nav-toggle glass-control"
                aria-label={isMenuOpen ? t.common.closeMenu : t.common.openMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                <span aria-hidden="true" className="nav-toggle-lines" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The phone menu: a sheet of glass under the capsule, over a soft curtain. A tap on the curtain closes it. */}
      <div id="mobile-menu" className="site-menu" data-open={isMenuOpen || undefined} hidden={!isMenuOpen}>
        <div className="site-menu-scrim" aria-hidden="true" onClick={closeMenu} />
        <div className="container-page site-menu-panel">
          <div ref={sheetRef} className="menu-sheet liquid-glass-navigation">
            <nav aria-label={t.common.mobileNav}>
              <ul className="site-menu-list">
                {MENU_LINKS.map((link, index) => (
                  <li key={link.id} style={{ '--i': index } as CSSProperties}>
                    <a
                      href={homeAnchor(link.id)}
                      onClick={closeMenu}
                      aria-current={current === link.id ? 'location' : undefined}
                      className="site-menu-link"
                    >
                      {t.nav[link.id]}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="menu-sheet-foot mt-6" style={{ '--i': MENU_LINKS.length } as CSSProperties}>
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
