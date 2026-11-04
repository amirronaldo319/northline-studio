import type { CSSProperties } from 'react'
import { ArrowUpRight, ChevronRight, Lock } from 'lucide-react'
import { EXAMPLES, type ExampleSite } from '@/content/examples'
import { APP_PROJECTS, WEBSITE_PROJECTS, type Project } from '@/content/projects'
import { useCopy, useLocalHref } from '@/i18n/context'
import { linkLabel, statusLabel } from '@/i18n/projectStatus'
import { DemoPreview } from '../DemoPreview'
import { useExampleDialog } from '../exampleDialogContext'
import { useHomeAnchor } from '../pageContext'
import { ProjectTrigger } from '../ProjectTrigger'
import { ShotChip } from '../ShotChip'
import { Contact } from '../sections/Contact'
import { PageHero } from './PageHero'

function CardText({ project }: { project: Project }) {
  const t = useCopy()
  const localHref = useLocalHref()
  const titleId = `project-${project.id}-title`

  return (
    <div className="mt-5">
      <p className="project-label">{t.projects[project.id].type}</p>
      <h3 id={titleId} className="mt-1.5 text-[1.5rem] leading-tight font-semibold tracking-[-0.018em]">
        <bdi>{project.name}</bdi>
      </h3>
      <p className="caption-sentence mt-1.5 leading-snug text-ink-2">{t.projects[project.id].caption}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
        <a href={localHref(`work/${project.id}/`)} className="text-link">
          {t.work.viewProject}
          <span className="sr-only">: {project.name}</span>
          <ChevronRight aria-hidden="true" size={17} className="rtl:-scale-x-100" />
        </a>
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link">
            {linkLabel(t.work, project.status)}
            <span className="sr-only">{t.common.opensNewTab(project.name)}</span>
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[0.9375rem] text-ink-3">
            <Lock aria-hidden="true" size={14} />
            {t.work.noPublicLink}
          </span>
        )}
      </div>
    </div>
  )
}

function WebsiteCard({ project }: { project: Project }) {
  const t = useCopy()
  return (
    <article aria-labelledby={`project-${project.id}-title`} className="reveal">
      <div className="shot-frame relative">
        <ProjectTrigger project={project} sizes="(min-width: 1216px) 560px, (min-width: 768px) 46vw, 92vw" />
        <ShotChip>{statusLabel(t.work, project.status)}</ShotChip>
      </div>
      <CardText project={project} />
    </article>
  )
}

/** An app: its phone capture standing on a soft stage tinted with the app's own colour. */
function AppCard({ project }: { project: Project }) {
  const t = useCopy()
  return (
    <article aria-labelledby={`project-${project.id}-title`} className="reveal">
      <div className="app-stage" style={{ '--tint': project.tint } as CSSProperties}>
        <ShotChip>{statusLabel(t.work, project.status)}</ShotChip>
        <div className="app-phone phone-device">
          <ProjectTrigger project={project} view="phone" className="phone-trigger" />
        </div>
      </div>
      <CardText project={project} />
    </article>
  )
}

/** A design demo for a fictional business, opened in the preview dialog. */
function DemoCard({ example }: { example: ExampleSite }) {
  const { open } = useExampleDialog()
  const t = useCopy()
  const text = t.examples[example.id]
  const titleId = `example-${example.id}-title`

  return (
    <article aria-labelledby={titleId} className="reveal">
      <div className="shot-frame relative">
        <DemoPreview example={example} />
        <ShotChip>{t.work.conceptDemo}</ShotChip>
        {/* Mouse-only convenience; the labelled button below is the accessible control. */}
        <button type="button" tabIndex={-1} aria-hidden="true" onClick={() => open(example)} className="absolute inset-0 cursor-pointer" />
      </div>
      <div className="mt-5">
        <p className="project-label">{text.businessType}</p>
        <h3 id={titleId} className="mt-1.5 text-[1.5rem] leading-tight font-semibold tracking-[-0.018em]">
          {example.name}
        </h3>
        <p className="mt-1.5 leading-snug text-ink-2">{text.intent}</p>
        <button type="button" onClick={() => open(example)} className="text-link mt-3">
          {t.work.viewExample}
          <span className="sr-only">: {example.name}</span>
          <ChevronRight aria-hidden="true" size={17} className="rtl:-scale-x-100" />
        </button>
      </div>
    </article>
  )
}

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
          <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:gap-x-12">
            {WEBSITE_PROJECTS.map((project) => (
              <WebsiteCard key={project.id} project={project} />
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
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {APP_PROJECTS.map((project) => (
              <AppCard key={project.id} project={project} />
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
          <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:gap-x-12">
            {EXAMPLES.map((example) => (
              <DemoCard key={example.id} example={example} />
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  )
}
