import { ArrowUp } from 'lucide-react'
import { formEndpoint } from '@/config/env'
import { mailtoHref, site } from '@/config/site'
import { CONTACT_SECTION_ID, NAV_LINKS } from '@/content/navigation'
import { BrandMark } from './BrandMark'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="on-dark bg-night text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <BrandMark tone="dark" />
          <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-white/70">
            Modern, mobile-friendly one-page websites for local businesses in {site.serviceArea.label}.
          </p>
          <a href={mailtoHref} className="mt-5 inline-block font-semibold [overflow-wrap:anywhere] underline decoration-white/30 underline-offset-4 hover:decoration-white">
            {site.contact.email}
          </a>
          <p className="mt-2 text-sm text-white/60">Serving {site.serviceArea.label}, BC</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="font-sans text-sm font-semibold tracking-wide text-white/60 uppercase">On this page</h2>
          <ul className="mt-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="inline-flex min-h-10 items-center text-white/85 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`#${CONTACT_SECTION_ID}`} className="inline-flex min-h-10 items-center text-white/85 hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div id="privacy" className="anchor-target md:col-span-4">
          <h2 className="font-sans text-sm font-semibold tracking-wide text-white/60 uppercase">Privacy</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {formEndpoint
              ? 'Details you send through the inquiry form are delivered to me by a form service and used only to reply to your inquiry.'
              : 'The inquiry form opens your own email app; nothing is stored on this website.'}{' '}
            I don’t sell or share your information, and this site doesn’t use tracking or advertising cookies. To ask about
            or delete your details, email {site.contact.email}.
          </p>
        </div>
      </div>
      <div className="border-t border-night-line">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {CURRENT_YEAR} {site.brand.name}. Concept demos on this site show fictional businesses.
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
