import { ArrowUp } from 'lucide-react'
import { mailtoHref, site } from '@/config/site'
import { MENU_LINKS } from '@/content/navigation'
import { useCopy, useLocalHref } from '@/i18n/context'
import { BrandMark } from './BrandMark'
import { LanguageSwitcher } from './LanguageSwitcher'
import { FooterCrumbs } from './FooterCrumbs'
import { useHomeAnchor } from './pageContext'

const CURRENT_YEAR = new Date().getFullYear()
const footerLink = 'inline-flex min-h-8 items-center text-ink-2 hover:text-ink hover:underline'
const columnTitle = 'text-caption font-semibold text-ink'

/**
 * A compact footer in Apple's manner: on inner pages the trail back up first, then small type, short columns of plain
 * links (every section, all projects, the industry pages and the guides), and a hairline above the fine print.
 */
export function Footer() {
  const homeAnchor = useHomeAnchor()
  const localHref = useLocalHref()
  const t = useCopy()

  return (
    <footer id="site-footer" className="site-footer bg-paper text-caption text-ink-3">
      <div className="container-page">
        <FooterCrumbs />
        <div className="flex flex-col gap-8 border-t border-line pt-10 pb-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <BrandMark />
            <p className="mt-4 leading-relaxed">{t.footer.tagline(site.serviceArea.label)}</p>
            <a href={mailtoHref} dir="ltr" className="mt-3 inline-block font-medium [overflow-wrap:anywhere] text-accent hover:underline">
              {site.contact.email}
            </a>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-8">
            <nav aria-label={t.common.footerNav}>
              <p className={columnTitle}>{site.brand.name}</p>
              <ul className="mt-2 grid grid-cols-2 gap-x-10 md:grid-cols-1">
                {MENU_LINKS.map((link) => (
                  <li key={link.id}>
                    <a href={homeAnchor(link.id)} className={footerLink}>
                      {t.nav[link.id]}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={localHref('work/')} className={footerLink}>
                    {t.work.allProjects}
                  </a>
                </li>
                <li>
                  <a href="#privacy" className={footerLink}>
                    {t.common.privacy}
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-label={t.footer.websitesFor}>
              <p className={columnTitle}>{t.footer.websitesFor}</p>
              <ul className="mt-2">
                {t.trades.map((trade) => (
                  <li key={trade.slug}>
                    <a href={localHref(`${trade.slug}/`)} className={footerLink}>
                      {trade.name.charAt(0).toUpperCase() + trade.name.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={t.footer.guides}>
              <p className={columnTitle}>{t.footer.guides}</p>
              <ul className="mt-2">
                {t.guides.map((guide) => (
                  <li key={guide.slug}>
                    <a href={localHref(`guides/${guide.slug}/`)} className={`${footerLink} max-w-[16rem]`}>
                      {guide.headline.replace(/[.。]$/, '')}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="container-page">
        <div className="flex flex-col gap-4 border-t border-line py-5 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.copyright(CURRENT_YEAR, site.brand.name)}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <LanguageSwitcher />
            <a href="#top" className="inline-flex min-h-9 items-center gap-1.5 font-medium text-ink-2 hover:text-ink">
              <ArrowUp aria-hidden="true" size={14} />
              {t.common.backToTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
