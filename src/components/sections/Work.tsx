import { ArrowUpRight } from 'lucide-react'
import { EXAMPLES, type ExampleSite } from '@/content/examples'
import { CONCEPT_PROJECT, FEATURED_PROJECT, HERO_PROJECT, STATUS_LABEL, type Project } from '@/content/projects'
import { revealDelay } from '@/lib/reveal'
import { DemoPreview } from '../DemoPreview'
import { useExampleDialog } from '../exampleDialogContext'
import { LegacyAnchors } from '../LegacyAnchors'
import { ProjectShot } from '../ProjectShot'
import { buttonClasses } from '../ui/button'
import { TiltFrame } from '../ui/TiltFrame'

const frameClasses = 'overflow-hidden rounded-lg border border-line-strong/60 bg-white shadow-soft'
const hoverFrameClasses = `${frameClasses} transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:shadow-lift motion-reduce:transition-none`

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
        className={buttonClasses('secondary', 'md', 'nudge mt-5')}
      >
        {project.status === 'live' ? 'Visit live site' : 'Open live preview'}
        <span className="sr-only">: {project.name} (opens in a new tab)</span>
        <ArrowUpRight aria-hidden="true" size={17} />
      </a>
    </>
  )
}

/** The featured live project: a large screenshot with its description beside it. */
function FeaturedProject({ project }: { project: Project }) {
  const titleId = `project-${project.id}-title`

  return (
    <article aria-labelledby={titleId} className="reveal grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-10">
      <div className="lg:col-span-8">
        <TiltFrame>
          <div className={`tilt-surface ${frameClasses}`}>
            <ProjectShot project={project} />
          </div>
        </TiltFrame>
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
    <article aria-labelledby={titleId} className="reveal" style={revealDelay(index)}>
      <TiltFrame>
        <div className={`tilt-surface ${frameClasses}`}>
          <ProjectShot project={project} />
        </div>
      </TiltFrame>
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
    <article aria-labelledby={titleId} className="reveal grid items-center gap-6 border-t border-line pt-10 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-7">
        <p className="mb-3 hidden text-sm text-ink-3 md:block">Also shown at the top of the page.</p>
        <ProjectText project={project} titleId={titleId} />
      </div>
      <div className="hidden md:col-span-5 md:block">
        <TiltFrame>
          <div className={`tilt-surface ${frameClasses}`}>
            <ProjectShot project={project} />
          </div>
        </TiltFrame>
      </div>
    </article>
  )
}

/** A concept demo for a fictional business, opened in the preview dialog. */
function ConceptCard({ example, index }: { example: ExampleSite; index: number }) {
  const { open } = useExampleDialog()
  const titleId = `example-${example.id}-title`

  return (
    <article aria-labelledby={titleId} className="reveal" style={revealDelay(index)}>
      <div className="relative">
        <TiltFrame>
          <div className={`tilt-surface ${hoverFrameClasses}`}>
            <DemoPreview example={example} />
          </div>
        </TiltFrame>
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
        <button type="button" onClick={() => open(example)} className={buttonClasses('secondary', 'md', 'nudge mt-4')}>
          View example
          <span className="sr-only">: {example.name}</span>
          <ArrowUpRight aria-hidden="true" size={17} />
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
