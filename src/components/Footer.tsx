import { ArrowUp } from 'lucide-react'
import { mailtoHref, site } from '@/config/site'
import { NAV_LINKS } from '@/content/navigation'
import { BrandMark } from './BrandMark'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="on-dark bg-night text-white">
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <BrandMark tone="dark" />
          <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-white/70">
            Custom one-page websites for local service businesses in {site.serviceArea.label}.
          </p>
          <a href={mailtoHref} className="mt-4 inline-block font-semibold [overflow-wrap:anywhere] underline decoration-white/30 underline-offset-4 hover:decoration-white">
            {site.contact.email}
          </a>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-1 md:grid-cols-1">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="inline-flex min-h-10 items-center text-white/85 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#privacy" className="inline-flex min-h-10 items-center text-white/85 hover:text-white">
                Privacy
              </a>
            </li>
          </ul>
        </nav>
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
