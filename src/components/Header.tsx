import { useContext, useEffect, useRef, useState } from 'react'
import { Menu as MenuIcon, X } from 'lucide-react'
import { Button, Glass, TabBar } from 'glisse'
import { CONTACT_SECTION_ID, MENU_LINKS, NAV_LINKS } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { LOCALES } from '@/i18n/locales'
import { useActiveSection } from '@/hooks/useActiveSection'
import { BrandMark } from './BrandMark'
import { LanguageMenu } from './LanguageMenu'
import { LanguageSwitcher } from './LanguageSwitcher'
import { PageContext, useHomeAnchor, useHomeTop } from './pageContext'
import { buttonClasses } from './ui/button'

/** Where the full row of links replaces the phone menu. */
const DESKTOP_QUERY = '(min-width: 880px)'
const sectionIds = MENU_LINKS.map((link) => link.id)
/** How long a picked tab is held while the page glides to it, so the lens does not bounce through other sections. */
const PICK_HOLD_MS = 1200

/** Everything outside the header that the open phone menu covers, so it is out of reach while the menu is open. */
const BEHIND_MENU = ['main', 'site-footer']

/**
 * The links as a Liquid Glass tab bar: plain text with one lens of glass that slides to the section being read (and
 * stretches as it moves). They are real links, so they work without JavaScript. Glisse measures the lens from the
 * left only, so right-to-left pages keep plain links.
 */
function GlassLinks({ active }: { active: string | null }) {
  const t = useCopy()
  const homeAnchor = useHomeAnchor()
  const [picked, setPicked] = useState<string | null>(null)

  useEffect(() => {
    if (picked === null) return
    const timer = window.setTimeout(() => setPicked(null), PICK_HOLD_MS)
    return () => window.clearTimeout(timer)
  }, [picked])

  const shown = picked ?? (NAV_LINKS.some((link) => link.id === active) ? active : null)

  return (
    <TabBar
      aria-label={t.common.mainNav}
      className="nav-tabs"
      items={NAV_LINKS.map((link) => ({ value: link.id, label: t.nav[link.id], href: homeAnchor(link.id) }))}
      value={shown ?? ''}
      onValueChange={setPicked}
    />
  )
}

function PlainLinks({ active }: { active: string | null }) {
  const t = useCopy()
  const homeAnchor = useHomeAnchor()
  return (
    <nav aria-label={t.common.mainNav}>
      <ul className="nav-plain">
        {NAV_LINKS.map((link) => (
          <li key={link.id}>
            <a href={homeAnchor(link.id)} aria-current={active === link.id ? 'location' : undefined} className="nav-link">
              {t.nav[link.id]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * One floating bar of Liquid Glass: the wordmark, three links with a sliding lens, the language menu and the quote
 * button, all on a single frosted surface that the page scrolls under. On phones the links open in a glass sheet:
 * focus moves into it, Escape or a link closes it, focus returns to the button, and the page behind is out of reach.
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const active = useActiveSection(sectionIds)
  const homeAnchor = useHomeAnchor()
  const homeTop = useHomeTop()
  const { isHome, page } = useContext(PageContext)
  const t = useCopy()
  const isRtl = LOCALES[page.locale].dir === 'rtl'
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
      <div className="container-page">
        <Glass className="nav-glass glass-frost glass-lift">
          <div className="site-nav-row">
            <a href={homeTop} className="site-nav-brand" onClick={closeMenu}>
              <BrandMark />
            </a>

            {/* Wrappers carry the breakpoints: Glisse's own (unlayered) display rules win over utility classes. */}
            <div className="site-nav-links">{isRtl ? <PlainLinks active={current} /> : <GlassLinks active={current} />}</div>

            <div className="site-nav-actions">
              <div className="site-nav-lang">
                <LanguageMenu />
              </div>
              <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'sm', 'site-nav-cta')}>
                {t.common.requestQuote}
              </a>
              <div className="site-nav-toggle">
                <Button
                  ref={toggleRef}
                  className="glass-icon-button glass-flat nav-toggle-button"
                  icon={isMenuOpen ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
                  aria-label={isMenuOpen ? t.common.closeMenu : t.common.openMenu}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                  onClick={() => setIsMenuOpen((open) => !open)}
                />
              </div>
            </div>
          </div>
        </Glass>
      </div>

      {/* The phone menu: a glass sheet over a soft scrim. A tap on the scrim closes it. */}
      <div id="mobile-menu" className="site-menu" data-open={isMenuOpen || undefined} hidden={!isMenuOpen}>
        <div className="site-menu-scrim" aria-hidden="true" onClick={closeMenu} />
        <div ref={sheetRef} className="container-page site-menu-panel">
          <Glass className="menu-glass glass-frost glass-lift">
            <nav aria-label={t.common.mobileNav}>
              <ul className="site-menu-list">
                {MENU_LINKS.map((link) => (
                  <li key={link.id}>
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
              <div className="mt-6">
                <LanguageSwitcher />
              </div>
              <a href={`#${CONTACT_SECTION_ID}`} onClick={closeMenu} className={buttonClasses('primary', 'lg', 'mt-6 w-full')}>
                {t.common.requestQuote}
              </a>
            </nav>
          </Glass>
        </div>
      </div>
    </header>
  )
}
