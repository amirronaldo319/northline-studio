import { ArrowUp } from 'lucide-react'
import { mailtoHref, site } from '@/config/site'
import { NAV_LINKS } from '@/content/navigation'
import { revealDelay } from '@/lib/reveal'
import { GUIDES } from '@/content/guides'
import { TRADES } from '@/content/trades'
import { pageHref } from '@/lib/paths'
import { BrandMark } from './BrandMark'
import { useHomeAnchor } from './pageContext'

const CURRENT_YEAR = new Date().getFullYear()
const footerLink = 'inline-flex min-h-10 items-center text-white/85 hover:text-white'

export function Footer() {
  const homeAnchor = useHomeAnchor()

  return (
    <footer className="on-dark relative isolate bg-night text-white">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="reveal">
          <BrandMark tone="dark" />
          <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-white/70">
            Custom one-page websites for local service businesses in {site.serviceArea.label}.
          </p>
          <a href={mailtoHref} className="mt-4 inline-block font-semibold [overflow-wrap:anywhere] underline decoration-white/30 underline-offset-4 hover:decoration-white">
            {site.contact.email}
          </a>
        </div>

        <div className="reveal flex flex-wrap gap-x-14 gap-y-8" style={revealDelay(1)}>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-1 md:grid-cols-1">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={homeAnchor(link.id)} className={footerLink}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#privacy" className={footerLink}>
                  Privacy
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Websites by trade">
            <p className="text-sm font-semibold text-white/60">Websites for</p>
            <ul className="mt-1">
              {TRADES.map((trade) => (
                <li key={trade.slug}>
                  <a href={pageHref(`${trade.slug}/`)} className={footerLink}>
                    {trade.name.charAt(0).toUpperCase() + trade.name.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Guides">
            <p className="text-sm font-semibold text-white/60">Guides</p>
            <ul className="mt-1">
              {GUIDES.map((guide) => (
                <li key={guide.slug}>
                  <a href={pageHref(`guides/${guide.slug}/`)} className={`${footerLink} max-w-[16rem]`}>
                    {guide.headline.replace(/\.$/, '')}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-night-line">
        <div className="container-page flex flex-col gap-1 py-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {CURRENT_YEAR} {site.brand.name}. Example sites shown here are concepts for fictional businesses.
          </p>
          <a href="#top" className="inline-flex min-h-10 items-center gap-1.5 font-medium text-white/85 hover:text-white">
            <ArrowUp aria-hidden="true" size={15} />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
