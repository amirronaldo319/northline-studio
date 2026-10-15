import { ArrowUpRight } from 'lucide-react'
import { EXAMPLES, HERO_EXAMPLE, type ExampleSite } from '@/content/examples'
import { CONCEPT_PROJECT, FEATURED_PROJECT, MEND_PROJECT, SECONDARY_PROJECT, type Project } from '@/content/projects'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { useCopy, useLocalHref } from '@/i18n/context'
import { revealDelay } from '@/lib/reveal'
import { DemoPreview } from '../DemoPreview'
import { useExampleDialog } from '../exampleDialogContext'
import { LegacyAnchors } from '../LegacyAnchors'
import { ProjectTrigger } from '../ProjectTrigger'
import { buttonClasses } from '../ui/button'
import { Words } from '../Words'

const frameClasses = 'card-frame overflow-hidden rounded-lg border border-line-strong/60 bg-white shadow-soft'

/** Section ids from earlier versions of the page. Links shared with these still land on this section. */
const LEGACY_IDS = ['examples'] as const

const labelClasses = 'text-xs font-semibold tracking-[0.08em] text-cobalt uppercase'

/** Text block for a real project: what it is, what I did, and the decisions worth noting. */
function ProjectText({ project, titleId }: { project: Project; titleId: string }) {
  const t = useCopy()
  const localHref = useLocalHref()
  const text = t.projects[project.id]

  return (
    <>
      <p className={labelClasses}>
        {project.status === 'live' ? t.work.statusLive : t.work.statusConcept} <span aria-hidden="true">·</span> {text.type}
      </p>
      <h3 id={titleId} className="mt-2 text-[1.5rem] font-semibold">
        <bdi>{project.name}</bdi>
      </h3>
      <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink">{text.summary}</p>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
        <strong className="font-semibold text-ink">{t.work.contribution}</strong> {text.contribution}
      </p>
      <ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed text-ink-2">
        {text.decisions.map((decision, index) => (
          <li key={decision} className={`gap-3 ${index === 0 ? 'flex' : 'hidden sm:flex'}`}>
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cobalt" />
            {decision}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses('secondary', 'md')}
        >
          {project.status === 'live' ? t.work.visitLive : t.work.openLivePreview}
          <span className="sr-only">{t.common.opensNewTab(project.name)}</span>
          <ArrowUpRight aria-hidden="true" size={17} className="card-arrow" />
        </a>
        <a
          href={localHref(`work/${project.id}/`)}
          className="inline-flex min-h-11 items-center font-semibold text-cobalt underline-offset-4 hover:underline"
        >
          {t.work.readCaseStudy}
          <span className="sr-only">: {project.name}</span>
        </a>
      </div>
    </>
  )
}

/**
 * The featured live project: the real desktop screenshot is the anchor, with the real phone screenshot
 * arriving beside it once. Only the media moves; the text and buttons stay put. On small screens the
 * single phone capture is shown instead of two unreadably small pictures.
 */
function FeaturedProject({ project }: { project: Project }) {
  const titleId = `project-${project.id}-title`
  const { ref, hasEntered } = useInViewOnce<HTMLDivElement>(0.3)

  return (
    <article aria-labelledby={titleId} className="project-card grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-10">
      {/* The phone sits beside the desktop picture with only a hairline of overlap, so it never covers content.
          Its column is reserved up front (the right padding), so nothing shifts when it arrives. */}
      <div ref={ref} className="reveal relative sm:pe-[15%] lg:col-span-8">
        <div className={`mask-reveal ${frameClasses}`}>
          <ProjectTrigger project={project} />
        </div>
        <div className="phone-pop absolute end-0 bottom-0 hidden w-[17%] sm:block" data-in={hasEntered}>
          <div className="phone-device">
            <ProjectTrigger project={project} view="phone" className="phone-trigger" />
          </div>
        </div>
      </div>
      <div className="lg:col-span-4">
        <ProjectText project={project} titleId={titleId} />
      </div>
    </article>
  )
}

/** A real project shown as a stacked card, in the same shape as a concept demo card. */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const titleId = `project-${project.id}-title`

  return (
    <article aria-labelledby={titleId} className="project-card reveal" style={revealDelay(index)}>
      <div className={frameClasses}>
        <ProjectTrigger project={project} />
      </div>
      <div className="mt-5">
        <ProjectText project={project} titleId={titleId} />
      </div>
    </article>
  )
}

/** A concept demo for a fictional business, opened in the preview dialog. */
function ConceptCard({ example, index }: { example: ExampleSite; index: number }) {
  const { open } = useExampleDialog()
  const t = useCopy()
  const text = t.examples[example.id]
  const titleId = `example-${example.id}-title`

  return (
    <article aria-labelledby={titleId} className="project-card reveal" style={revealDelay(index)}>
      <div className="relative">
        <div className={frameClasses}>
          <DemoPreview example={example} />
        </div>
        {/* Mouse-only convenience; the labelled button below is the accessible control. */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => open(example)}
          className="absolute inset-0 cursor-pointer rounded-lg"
        />
      </div>
      <div className="mt-5">
        <p className={labelClasses}>
          {t.work.conceptDemo} <span aria-hidden="true">·</span> {text.businessType}
        </p>
        <h3 id={titleId} className="mt-2 text-[1.375rem] font-semibold">
          {example.name}
        </h3>
        <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink">{text.intent}</p>
        <p className="mt-2 hidden text-[0.9375rem] leading-relaxed text-ink-2 sm:block">{text.approach}</p>
        <button type="button" onClick={() => open(example)} className={buttonClasses('secondary', 'md', 'mt-4')}>
          {t.work.viewExample}
          <span className="sr-only">: {example.name}</span>
          <ArrowUpRight aria-hidden="true" size={17} className="card-arrow" />
        </button>
      </div>
    </article>
  )
}

export function Work() {
  const t = useCopy()

  return (
    <section id="work" aria-labelledby="work-title" className="relative border-t border-line py-12 sm:py-20 lg:py-24">
      <LegacyAnchors ids={LEGACY_IDS} />

      <div className="container-page">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">{t.work.eyebrow}</p>
          <h2 id="work-title" className="h-section word-reveal mt-3">
            <Words text={t.work.heading} />
          </h2>
          <p className="lede mt-4">{t.work.lede}</p>
        </div>

        <div className="mt-8 lg:mt-12">
          <FeaturedProject project={FEATURED_PROJECT} />
        </div>

        <div className="mt-10 grid gap-9 md:mt-12 md:grid-cols-2 md:gap-8 lg:mt-16 lg:gap-12">
          <ProjectCard project={SECONDARY_PROJECT} index={0} />
          <ProjectCard project={CONCEPT_PROJECT} index={1} />
          <ProjectCard project={MEND_PROJECT} index={2} />
          {EXAMPLES.filter((example) => example.id !== HERO_EXAMPLE.id).map((example, index) => (
            <ConceptCard key={example.id} example={example} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  )
}
