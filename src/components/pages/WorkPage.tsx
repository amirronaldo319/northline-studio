import { EXAMPLES } from '@/content/examples'
import { APP_PROJECTS, WEBSITE_PROJECTS } from '@/content/projects'
import { useCopy } from '@/i18n/context'
import { useHomeAnchor } from '../pageContext'
import { Contact } from '../sections/Contact'
import { AppCard, DemoCard, WebsiteCard } from '../work/ProjectCards'
import { PageHero } from './PageHero'

/** Every project in one place: websites, then my own apps and tools, then the design demos. No carousels. */
export function WorkPage() {
  const t = useCopy()
  const homeAnchor = useHomeAnchor()

  return (
    <>
      <PageHero
        crumbs={[{ label: t.common.home, href: homeAnchor('top') }, { label: t.common.work }]}
        eyebrow={t.workPage.eyebrow}
        headline={t.workPage.heading}
        intro={t.workPage.lede}
        showWorkLink={false}
      />

      <section aria-labelledby="sites-title" className="section-pad bg-paper">
        <div className="container-page">
          <h2 id="sites-title" className="h-subsection reveal">
            {t.work.sitesLabel}
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:gap-10">
            {WEBSITE_PROJECTS.map((project) => (
              <div key={project.id} className="reveal">
                <WebsiteCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="apps-title" className="section-pad">
        <div className="container-page">
          <div className="reveal max-w-[44rem]">
            <h2 id="apps-title" className="h-subsection">
              {t.work.appsHeading}
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2">{t.work.appsLede}</p>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {APP_PROJECTS.map((project) => (
              <div key={project.id} className="reveal">
                <AppCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="demos-title" className="section-pad bg-paper">
        <div className="container-page">
          <div className="reveal max-w-[44rem]">
            <h2 id="demos-title" className="h-subsection">
              {t.work.demosHeading}
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2">{t.work.demosLede}</p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:gap-10">
            {EXAMPLES.map((example) => (
              <div key={example.id} className="reveal">
                <DemoCard example={example} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  )
}
