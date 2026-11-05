import { useContext, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
import { CONTACT_SECTION_ID, MENU_LINKS, NAV_LINKS } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { useActiveSection } from '@/hooks/useActiveSection'
import { BrandMark } from './BrandMark'
import { LanguageMenu } from './LanguageMenu'
import { LanguageSwitcher } from './LanguageSwitcher'
import { PageContext, useHomeAnchor, useHomeTop } from './pageContext'
import { buttonClasses } from './ui/button'

/** Where the row of links replaces the phone menu. */
const DESKTOP_QUERY = '(min-width: 880px)'
const sectionIds = MENU_LINKS.map((link) => link.id)

/** Everything outside the header that the open phone menu covers, so it is out of reach while the menu is open. */
const BEHIND_MENU = ['main', 'site-footer']

/**
 * The bar Apple puts at the top of a product page: the name on the left; on the right a few small links, the language
 * menu and a small blue button. It is one strip of frosted material the page scrolls under, and a hairline appears
 * beneath it once the page has moved. On phones the links fold into a sheet that drops from the bar (the chevron opens
 * it); the button stays in the bar. Focus moves into the open sheet, Escape or a link closes it, focus returns to the
 * chevron, and the page behind is out of reach.
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
    const onScroll = () => setIsScrolled(window.scrollY > 4)
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
    <header className="site-nav" data-scrolled={isScrolled || isMenuOpen || undefined} data-open={isMenuOpen || undefined}>
      <div className="nav-bar liquid-glass-navigation">
        <div className="container-page site-nav-row">
          <a href={homeTop} className="site-nav-brand" onClick={closeMenu}>
            <BrandMark />
          </a>

          <div className="site-nav-actions">
            <nav aria-label={t.common.mainNav} className="site-nav-links">
              <ul className="nav-plain">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a href={homeAnchor(link.id)} aria-current={current === link.id ? 'location' : undefined} className="nav-link">
                      {t.nav[link.id]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="site-nav-lang">
              <LanguageMenu />
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="nav-toggle"
              aria-label={isMenuOpen ? t.common.closeMenu : t.common.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <ChevronDown aria-hidden="true" size={18} strokeWidth={1.75} className="nav-toggle-chevron" />
            </button>
            <a href={`#${CONTACT_SECTION_ID}`} onClick={closeMenu} className={buttonClasses('primary', 'sm', 'site-nav-cta')}>
              {t.common.requestQuote}
            </a>
          </div>
        </div>
      </div>

      {/* The phone menu: a sheet that drops from the bar, over a soft scrim. A tap on the scrim closes it. */}
      <div id="mobile-menu" className="site-menu" data-open={isMenuOpen || undefined} hidden={!isMenuOpen}>
        <div className="site-menu-scrim" aria-hidden="true" onClick={closeMenu} />
        <div ref={sheetRef} className="site-menu-panel liquid-glass-navigation">
          <nav aria-label={t.common.mobileNav} className="container-page">
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
    </header>
  )
}
