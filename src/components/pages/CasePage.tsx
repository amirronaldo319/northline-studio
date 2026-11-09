import { ArrowUpRight, ChevronRight, Lock } from 'lucide-react'
import { PROJECTS, type Project } from '@/content/projects'
import { useCopy } from '@/i18n/context'
import { linkLabel, statusLabel } from '@/i18n/projectStatus'
import { Contact } from '../sections/Contact'
import { ProjectTrigger } from '../ProjectTrigger'
import { Words } from '../Words'
import { buttonClasses } from '../ui/button'
import { useHomeAnchor } from '../pageContext'
import { PageHero } from './PageHero'
import { ProjectLinkCard } from '../work/ProjectLinkCard'

/** A closer look at one project: what it is, what I did, and the decisions behind it. */
export function CasePage({ project }: { project: Project }) {
  const homeAnchor = useHomeAnchor()
  const t = useCopy()
  const text = t.projects[project.id]
  // Three more, as Apple ends a page with a few related products: the same kind of work first, then the rest.
  const others = PROJECTS.filter((candidate) => candidate.id !== project.id)
  const related = [
    ...others.filter((candidate) => candidate.kind === project.kind),
    ...others.filter((candidate) => candidate.kind !== project.kind),
  ].slice(0, 3)

  return (
    <>
      <PageHero
        crumbs={[
          { label: t.common.home, href: homeAnchor('top') },
          { label: t.common.work, href: homeAnchor('work') },
          { label: project.name },
        ]}
        eyebrow={`${statusLabel(t.work, project.status)} · ${text.type}`}
        headline={project.name}
        intro={text.summary}
        secondary={
          project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses('secondary', 'lg')}>
              {linkLabel(t.work, project.status)}
              <span className="sr-only">{t.common.opensNewTab(project.name)}</span>
              <ArrowUpRight aria-hidden="true" size={17} className="card-arrow" />
            </a>
          ) : (
            <p className="inline-flex items-center justify-center gap-2 text-body text-ink-3">
              <Lock aria-hidden="true" size={16} />
              {t.work.noPublicLink}
            </p>
          )
        }
      />

      <section aria-label={t.casePage.screenshots(project.name)} className="section-pad bg-paper">
        <div className="container-page grid items-start gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="reveal lg:col-span-9">
            <div className="shot-frame">
              <div className="mask-reveal">
                <ProjectTrigger project={project} isEager />
              </div>
            </div>
          </div>
          <div className="reveal mx-auto w-[min(14rem,60%)] lg:col-span-3 lg:w-full">
            <div className="phone-device">
              <ProjectTrigger project={project} view="phone" className="phone-trigger" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="case-did" className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="reveal lg:col-span-5">
            <p className="eyebrow">{t.casePage.whatIDid}</p>
            <h2 id="case-did" className="h-section mt-3">
              <Words text={t.casePage.myPart} />
            </h2>
            <p className="lede mt-5">{text.contribution}</p>
          </div>
          <div className="reveal lg:col-span-7">
            <h3 className="text-title3">{t.casePage.decisions}</h3>
            <ul className="mt-4 space-y-3">
              {text.decisions.map((decision) => (
                <li key={decision} className="flex gap-3 text-body leading-relaxed text-ink-2">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cobalt" />
                  {decision}
                </li>
              ))}
            </ul>
            {text.note && (
              <p className="tile-paper mt-8 !p-5 text-callout leading-relaxed text-ink-2">
                <strong className="font-semibold text-ink">{t.casePage.worthKnowing}</strong> {text.note}
              </p>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="case-more" className="section-pad bg-paper">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <h2 id="case-more" className="text-title1">
              {t.casePage.more}
            </h2>
            <a href={homeAnchor('work')} className="chevron-link">
              {t.casePage.allWork}
              <ChevronRight aria-hidden="true" size={18} className="rtl:-scale-x-100" />
            </a>
          </div>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((other) => (
              <li key={other.id}>
                <ProjectLinkCard project={other} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact />
    </>
  )
}
