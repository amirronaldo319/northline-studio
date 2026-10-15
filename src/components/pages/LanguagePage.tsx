import { ArrowLeft, Mail } from 'lucide-react'
import { mailtoHref, site } from '@/config/site'
import type { LanguageContent } from '@/content/languages'
import { pageHref } from '@/lib/paths'
import { BrandMark } from '../BrandMark'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { buttonClasses } from '../ui/button'

const CURRENT_YEAR = new Date().getFullYear()

/**
 * A translated page: a short version of the home page (what you get, how it works, how a quote works, and how to
 * get in touch by email), laid out in the language's own direction.
 * Built only when its switch in `site.features.languages` is on (see src/content/languages.ts).
 */
export function LanguagePage({ language }: { language: LanguageContent }) {
  const copy = language
  const mail = `${mailtoHref.split('?')[0]}?subject=${encodeURIComponent(copy.mailSubject)}`

  return (
    <div dir={copy.dir} lang={copy.htmlLang} className="min-h-screen bg-paper text-ink" style={{ fontFamily: copy.fontStack }}>
      <header className="border-b border-line bg-paper">
        <div className="container-page flex h-16 items-center justify-between">
          <a href={pageHref('')} dir="ltr" lang="en" aria-label={site.brand.name}>
            <BrandMark />
          </a>
          <LanguageSwitcher current={copy.code} />
        </div>
      </header>

      <main id="main" tabIndex={-1} className="focus:outline-none">
        <section className="container-page pt-12 pb-14 sm:pt-16 lg:pt-20">
          <p className="text-sm font-semibold text-cobalt">{copy.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-[clamp(2rem,1.5rem+2.5vw,3.25rem)] leading-[1.35] font-bold">
            {copy.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-[1.1rem] leading-[1.9] text-ink-2">{copy.intro}</p>
          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a href={mail} className={buttonClasses('primary', 'lg')}>
              <Mail aria-hidden="true" size={18} />
              {copy.quoteButton}
            </a>
            <p className="text-sm text-ink-3">{copy.quoteNote}</p>
          </div>
        </section>

        <section aria-labelledby="fa-package" className="border-t border-line bg-card py-12 sm:py-16">
          <div className="container-page">
            <h2 id="fa-package" className="max-w-2xl text-[1.75rem] leading-[1.5] font-bold">
              {copy.packageTitle}
            </h2>
            <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {copy.groups.map((group) => (
                <li key={group.title} className="border-t border-ink pt-4">
                  <h3 className="text-[1.15rem] font-bold">{group.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.9] text-ink-2">{group.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="fa-process" className="py-12 sm:py-16">
          <div className="container-page">
            <h2 id="fa-process" className="text-[1.75rem] font-bold">
              {copy.processTitle}
            </h2>
            <ol className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {copy.steps.map((step, index) => (
                <li key={step.title} className="border-t border-line-strong pt-4">
                  <span className="grid size-9 place-items-center rounded-full bg-cobalt text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-3 text-[1.1rem] font-bold">{step.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.9] text-ink-2">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="fa-quote" className="container-page pb-12 sm:pb-16">
          <div className="rounded-xl bg-night p-6 text-white sm:p-8">
            <h2 id="fa-quote" className="text-[1.35rem] font-bold">
              {copy.quoteTitle}
            </h2>
            <p className="mt-3 max-w-3xl leading-[1.9] text-white/85">{copy.quoteText}</p>
          </div>
        </section>

        <section aria-labelledby="fa-contact" className="border-t border-line bg-paper-2 py-12 sm:py-16">
          <div className="container-page">
            <h2 id="fa-contact" className="text-[1.75rem] font-bold">
              {copy.contactTitle}
            </h2>
            <p className="mt-4">
              <a href={mail} dir="ltr" className="inline-flex items-center gap-2 text-lg font-semibold underline underline-offset-4">
                {site.contact.email}
              </a>
            </p>
            <p className="mt-6">
              <a
                href={pageHref('#work')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt underline underline-offset-4"
              >
                {copy.workLink}
                <ArrowLeft aria-hidden="true" size={15} />
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-night py-6 text-sm text-white/70">
        <div className="container-page" dir="ltr">
          © {CURRENT_YEAR} {site.brand.name}
        </div>
      </footer>
    </div>
  )
}
