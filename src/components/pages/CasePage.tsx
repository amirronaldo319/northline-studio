import { ArrowUpRight } from 'lucide-react'
import { PROJECTS, type Project } from '@/content/projects'
import { useCopy, useLocalHref } from '@/i18n/context'
import { Contact } from '../sections/Contact'
import { SiteCheck } from '../sections/SiteCheck'
import { ProjectTrigger } from '../ProjectTrigger'
import { Words } from '../Words'
import { buttonClasses } from '../ui/button'
import { useHomeAnchor } from '../pageContext'
import { PageHero } from './PageHero'

/** A closer look at one project: what it is, what I did, and the decisions behind it. */
export function CasePage({ project }: { project: Project }) {
  const homeAnchor = useHomeAnchor()
  const localHref = useLocalHref()
  const t = useCopy()
  const text = t.projects[project.id]
  const others = PROJECTS.filter((candidate) => candidate.id !== project.id)
  const live = project.status === 'live'

  return (
    <>
      <PageHero
        crumbs={[
          { label: t.common.home, href: homeAnchor('top') },
          { label: t.common.work, href: homeAnchor('work') },
          { label: project.name },
        ]}
        eyebrow={`${live ? t.work.statusLive : t.work.statusConcept} · ${text.type}`}
        headline={project.name}
        intro={text.summary}
        secondary={
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses('secondary', 'lg')}>
            {live ? t.work.visitLive : t.work.openLivePreview}
            <span className="sr-only">{t.common.opensNewTab(project.name)}</span>
            <ArrowUpRight aria-hidden="true" size={17} className="card-arrow" />
          </a>
        }
      />

      <section aria-label={t.casePage.screenshots(project.name)} className="border-t border-line bg-card py-10 sm:py-16">
        <div className="container-page grid items-start gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="reveal overflow-hidden rounded-lg border border-line-strong/60 bg-white shadow-device lg:col-span-9">
            <ProjectTrigger project={project} isEager />
          </div>
          <div className="reveal mx-auto w-[min(14rem,60%)] lg:col-span-3 lg:w-full">
            <div className="phone-device">
              <ProjectTrigger project={project} view="phone" className="phone-trigger" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="case-did" className="py-12 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="reveal lg:col-span-5">
            <p className="eyebrow">{t.casePage.whatIDid}</p>
            <h2 id="case-did" className="h-section word-reveal mt-3">
              <Words text={t.casePage.myPart} />
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-2">{text.contribution}</p>
          </div>
          <div className="reveal lg:col-span-7">
            <h3 className="text-[1.1875rem] font-semibold">{t.casePage.decisions}</h3>
            <ul className="mt-4 space-y-3">
              {text.decisions.map((decision) => (
                <li key={decision} className="flex gap-3 text-[1rem] leading-relaxed text-ink-2">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cobalt" />
                  {decision}
                </li>
              ))}
            </ul>
            {text.note && (
              <p className="mt-6 rounded-xl border border-line-strong/60 bg-paper-2 px-4 py-3 text-sm leading-relaxed text-ink-2">
                <strong className="font-semibold text-ink">{t.casePage.worthKnowing}</strong> {text.note}
              </p>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="case-more" className="border-t border-line bg-paper-2 py-12 sm:py-16">
        <div className="container-page">
          <h2 id="case-more" className="text-[1.375rem] font-semibold">
            {t.casePage.more}
          </h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {others.map((other) => (
              <li key={other.id}>
                <a
                  href={localHref(`work/${other.id}/`)}
                  className="group block rounded-xl border border-line-strong/60 bg-card p-5 transition-colors hover:border-cobalt"
                >
                  <p className="text-xs font-semibold tracking-[0.08em] text-cobalt uppercase">{other.status === 'live' ? t.work.statusLive : t.work.statusConcept}</p>
                  <p className="mt-2 text-[1.125rem] font-semibold">
                    <bdi>{other.name}</bdi>
                  </p>
                  <p className="mt-1 text-sm text-ink-2">{t.projects[other.id].type}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteCheck />
      <Contact />
    </>
  )
}
