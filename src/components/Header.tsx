import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Menu as MenuIcon, X } from 'lucide-react'
import { Button, Glass, TabBar } from 'glisse'
import { CONTACT_SECTION_ID, NAV_LINKS } from '@/content/navigation'
import { useCopy } from '@/i18n/context'
import { LOCALES } from '@/i18n/locales'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useOverDarkSurface } from '@/hooks/useOverDarkSurface'
import { PENDING_HOLD_MS, settlePending, shownSection } from '@/lib/navSelection'
import { underlineFor, underlineTarget, type Underline } from '@/lib/navUnderline'
import { BrandMark } from './BrandMark'
import { LanguageMenu } from './LanguageMenu'
import { LanguageSwitcher } from './LanguageSwitcher'
import { PageContext, useHomeAnchor, useHomeTop } from './pageContext'
import { buttonClasses } from './ui/button'

/**
 * Where the glass tab bar replaces the phone menu. The bar's tabs share one width, so it needs more room than plain
 * links did; from 1024px it fits beside the brand and actions in every language.
 */
const DESKTOP_QUERY = '(min-width: 1024px)'
const sectionIds = NAV_LINKS.map((link) => link.id)
/** Horizontal padding of each desktop link (px-2.5); the underline spans the text inside it. */
const LINK_PADDING_PX = 10

/**
 * Desktop navigation as a floating glass tab bar (Glisse `TabBar` with links, so it is real navigation and works
 * without JavaScript). The selection follows the section being read; a tab the visitor picks is held while the
 * page glides there, so the selection does not bounce through the sections in between.
 */
function GlassTabNav({ active }: { active: string | null }) {
  const homeAnchor = useHomeAnchor()
  const t = useCopy()
  const [pending, setPending] = useState<string | null>(null)
  const [seenActive, setSeenActive] = useState(active)

  // Let go of the picked tab once the page arrives (adjusted during render, as React recommends for derived state),
  // after a short hold, or as soon as the visitor scrolls themselves.
  if (active !== seenActive) {
    setSeenActive(active)
    setPending(settlePending({ active, pending }))
  }

  useEffect(() => {
    if (pending === null) return
    const release = () => setPending(null)
    const timer = window.setTimeout(release, PENDING_HOLD_MS)
    window.addEventListener('wheel', release, { passive: true })
    window.addEventListener('touchmove', release, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('wheel', release)
      window.removeEventListener('touchmove', release)
    }
  }, [pending])

  return (
    <TabBar
      aria-label={t.common.mainNav}
      className="glass-tabs"
      items={NAV_LINKS.map((link) => ({ value: link.id, label: t.nav[link.id], href: homeAnchor(link.id) }))}
      value={shownSection({ active, pending })}
      onValueChange={setPending}
    />
  )
}

/**
 * Desktop navigation for right-to-left pages, on a glass capsule. Glisse's tab bar measures its selection from the
 * left edge only, so Persian keeps this nav: one underline slides between links, follows the active section, is
 * borrowed by hover and keyboard focus, and returns to the active section afterwards.
 */
function UnderlineNav({ active }: { active: string | null }) {
  const listRef = useRef<HTMLUListElement>(null)
  const homeAnchor = useHomeAnchor()
  const t = useCopy()
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

  // Enable the slide only after the first position is placed, so the line never flies in from the side.
  useEffect(() => {
    if (!underline || isReady) return
    const frame = requestAnimationFrame(() => setIsReady(true))
    return () => cancelAnimationFrame(frame)
  }, [underline, isReady])

  return (
    <Glass className="glass-capsule glass-lift glass-nav-capsule">
      <nav aria-label={t.common.mainNav}>
        <ul ref={listRef} className="relative flex items-center gap-1 px-2" onPointerLeave={() => setHovered(null)}>
          {NAV_LINKS.map((link, index) => {
            const isActive = active === link.id
            return (
              <li key={link.id} className="nav-enter" style={{ '--i': index } as React.CSSProperties}>
                <a
                  ref={(el) => {
                    linkRefs.current[index] = el
                  }}
                  href={homeAnchor(link.id)}
                  aria-current={isActive ? 'location' : undefined}
                  onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(index)}
                  onFocus={() => setFocused(index)}
                  onBlur={() => setFocused(null)}
                  className={`block whitespace-nowrap rounded-full px-2.5 py-2 text-[0.9375rem] font-medium transition-colors duration-150 ${
                    isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'
                  }`}
                >
                  {t.nav[link.id]}
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
    </Glass>
  )
}

/**
 * The site header: separate glass pieces floating over the page (brand, navigation, actions), as Liquid Glass
 * toolbars do, rather than one opaque bar. On phones the menu opens as a glass sheet under the bar.
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  // Over a dark section the glass turns dark, as Liquid Glass adapts to what is under it (32px = the row's middle).
  const isOverDark = useOverDarkSurface('top', 32)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const active = useActiveSection(sectionIds)
  const homeAnchor = useHomeAnchor()
  const homeTop = useHomeTop()
  const { page } = useContext(PageContext)
  const t = useCopy()
  const isRtl = LOCALES[page.locale].dir === 'rtl'

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the phone menu on Escape, on a tap outside it, or when the viewport grows to desktop.
  useEffect(() => {
    if (!isMenuOpen) return
    const media = window.matchMedia(DESKTOP_QUERY)
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsMenuOpen(false)
      toggleRef.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (sheetRef.current?.contains(target) || toggleRef.current?.contains(target)) return
      setIsMenuOpen(false)
    }
    const onMedia = () => media.matches && setIsMenuOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    media.addEventListener('change', onMedia)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
      media.removeEventListener('change', onMedia)
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="site-header" data-scrolled={isScrolled || isMenuOpen} data-theme={isOverDark && !isMenuOpen ? 'dark' : 'light'}>
      <div className="scroll-progress" aria-hidden="true" />

      <div className="container-page relative">
        <div className="site-header-row">
          <Glass className="glass-capsule glass-lift glass-brand">
            <a href={homeTop} className="glass-brand-link">
              <BrandMark intro />
            </a>
          </Glass>

          <div className="nav-enter hidden justify-self-center lg:block">
            {isRtl ? <UnderlineNav active={active} /> : <GlassTabNav active={active} />}
          </div>

          <div className="flex items-center justify-self-end gap-2">
            {/* Wrappers carry the breakpoints: Glisse's own (unlayered) display rules win over utility classes. */}
            <div className="hidden lg:block">
              <LanguageMenu />
            </div>
            <div className="hidden min-[560px]:block">
              <a href={`#${CONTACT_SECTION_ID}`} className={buttonClasses('primary', 'md')}>
                {t.common.requestQuote}
              </a>
            </div>
            <div className="lg:hidden">
              <Button
                ref={toggleRef}
                className="glass-icon-button glass-lift"
                icon={isMenuOpen ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
                aria-label={isMenuOpen ? t.common.closeMenu : t.common.openMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMenuOpen((open) => !open)}
              />
            </div>
          </div>
        </div>

        {/* Always mounted so it can animate and its glass is fitted once; `inert` keeps it out of reach when closed. */}
        <div ref={sheetRef} id="mobile-menu" className="mobile-menu glass-sheet-wrap" data-theme="light" data-open={isMenuOpen} inert={!isMenuOpen}>
          <Glass className="glass-lift glass-sheet">
            <nav aria-label={t.common.mobileNav}>
              <ul className="flex flex-col px-5 py-3">
                {NAV_LINKS.map((link, index) => (
                  <li key={link.id} className="menu-item" style={{ '--i': index } as React.CSSProperties}>
                    <a
                      href={homeAnchor(link.id)}
                      onClick={closeMenu}
                      aria-current={active === link.id ? 'location' : undefined}
                      className="flex min-h-12 items-center border-b border-ink/10 text-lg font-medium text-ink aria-[current=location]:text-cobalt"
                    >
                      {t.nav[link.id]}
                    </a>
                  </li>
                ))}
                <li className="menu-item pt-4" style={{ '--i': NAV_LINKS.length } as React.CSSProperties}>
                  <LanguageSwitcher />
                </li>
                <li className="menu-item pt-4 pb-2" style={{ '--i': NAV_LINKS.length + 1 } as React.CSSProperties}>
                  <a href={`#${CONTACT_SECTION_ID}`} onClick={closeMenu} className={buttonClasses('primary', 'lg', 'w-full')}>
                    {t.common.requestQuote}
                  </a>
                </li>
              </ul>
            </nav>
          </Glass>
        </div>
      </div>
    </header>
  )
}
