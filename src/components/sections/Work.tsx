import { ArrowUpRight } from 'lucide-react'
import { EXAMPLES, type ExampleSite } from '@/content/examples'
import { CONCEPT_PROJECT, FEATURED_PROJECT, HERO_PROJECT, STATUS_LABEL, type Project } from '@/content/projects'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { revealDelay } from '@/lib/reveal'
import { DemoPreview } from '../DemoPreview'
import { useExampleDialog } from '../exampleDialogContext'
import { LegacyAnchors } from '../LegacyAnchors'
import { ProjectTrigger } from '../ProjectTrigger'
import { buttonClasses } from '../ui/button'

const frameClasses = 'card-frame overflow-hidden rounded-lg border border-line-strong/60 bg-white shadow-soft'

/** Section ids from earlier versions of the page. Links shared with these still land on this section. */
const LEGACY_IDS = ['examples'] as const

const labelClasses = 'text-xs font-semibold tracking-[0.08em] text-cobalt uppercase'

/** Text block for a real project: what it is, what I did, and the decisions worth noting. */
function ProjectText({ project, titleId }: { project: Project; titleId: string }) {
  return (
    <>
      <p className={labelClasses}>
        {STATUS_LABEL[project.status]} <span aria-hidden="true">·</span> {project.type}
      </p>
      <h3 id={titleId} className="mt-2 text-[1.5rem] font-semibold">
        {project.name}
      </h3>
      <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink">{project.summary}</p>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
        <strong className="font-semibold text-ink">My contribution:</strong> {project.contribution}
      </p>
      <ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed text-ink-2">
        {project.decisions.map((decision, index) => (
          <li key={decision} className={`gap-3 ${index === 0 ? 'flex' : 'hidden sm:flex'}`}>
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cobalt" />
            {decision}
          </li>
        ))}
      </ul>
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses('secondary', 'md', 'mt-5')}
      >
        {project.status === 'live' ? 'Visit live site' : 'Open live preview'}
        <span className="sr-only">: {project.name} (opens in a new tab)</span>
        <ArrowUpRight aria-hidden="true" size={17} className="card-arrow" />
      </a>
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
      <div ref={ref} className="reveal relative sm:pr-[15%] lg:col-span-8">
        <div className={`mask-reveal ${frameClasses}`}>
          <ProjectTrigger project={project} />
        </div>
        <div className="phone-pop absolute right-0 bottom-0 hidden w-[17%] sm:block" data-in={hasEntered}>
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

/** A compact row for the live project already shown large in the hero. */
function HeroProjectRow({ project }: { project: Project }) {
  const titleId = `project-${project.id}-title`

  return (
    <article aria-labelledby={titleId} className="project-card reveal grid items-center gap-6 border-t border-line pt-10 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-7">
        <p className="mb-3 hidden text-sm text-ink-3 md:block">Also shown at the top of the page.</p>
        <ProjectText project={project} titleId={titleId} />
      </div>
      <div className="hidden md:col-span-5 md:block">
        <div className={frameClasses}>
          <ProjectTrigger project={project} />
        </div>
      </div>
    </article>
  )
}

/** A concept demo for a fictional business, opened in the preview dialog. */
function ConceptCard({ example, index }: { example: ExampleSite; index: number }) {
  const { open } = useExampleDialog()
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
          Concept demo <span aria-hidden="true">·</span> {example.businessType}
        </p>
        <h3 id={titleId} className="mt-2 text-[1.375rem] font-semibold">
          {example.name}
        </h3>
        <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink">{example.intent}</p>
        <p className="mt-2 hidden text-[0.9375rem] leading-relaxed text-ink-2 sm:block">{example.approach}</p>
        <button type="button" onClick={() => open(example)} className={buttonClasses('secondary', 'md', 'mt-4')}>
          View example
          <span className="sr-only">: {example.name}</span>
          <ArrowUpRight aria-hidden="true" size={17} className="card-arrow" />
        </button>
      </div>
    </article>
  )
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative border-t border-line py-12 sm:py-20 lg:py-24">
      <LegacyAnchors ids={LEGACY_IDS} />

      <div className="container-page">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title" className="h-section mt-3">
            What I’ve built, and how I design.
          </h2>
          <p className="lede mt-4">
            Two live websites, a concept project, and a design concept for a fictional business, each labelled for what it
            is.
          </p>
        </div>

        <div className="mt-8 lg:mt-12">
          <FeaturedProject project={FEATURED_PROJECT} />
        </div>

        <div className="mt-10 grid gap-9 md:mt-12 md:grid-cols-2 md:gap-8 lg:mt-16 lg:gap-12">
          <ProjectCard project={CONCEPT_PROJECT} index={0} />
          {EXAMPLES.map((example, index) => (
            <ConceptCard key={example.id} example={example} index={index + 1} />
          ))}
        </div>

        <div className="mt-10 md:mt-12 lg:mt-16">
          <HeroProjectRow project={HERO_PROJECT} />
        </div>
      </div>
    </section>
  )
}
