import type { CSSProperties } from 'react'
import { ArrowUpRight, ChevronRight, Lock } from 'lucide-react'
import { Button } from 'glisse'
import { EXAMPLES, HERO_EXAMPLE, type ExampleSite } from '@/content/examples'
import { APP_PROJECTS, FEATURED_PROJECT, GALLERY_WEBSITES, type Project } from '@/content/projects'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { useCopy, useLocalHref } from '@/i18n/context'
import { linkLabel, statusLabel } from '@/i18n/projectStatus'
import { DemoPreview } from '../DemoPreview'
import { useExampleDialog } from '../exampleDialogContext'
import { LegacyAnchors } from '../LegacyAnchors'
import { ProjectTrigger } from '../ProjectTrigger'
import { buttonClasses } from '../ui/button'
import { Gallery } from '../ui/Gallery'
import { Words } from '../Words'

const frameClasses = 'card-frame overflow-hidden rounded-[1rem] bg-white shadow-soft'

/** Section ids from earlier versions of the page. Links shared with these still land on this section. */
const LEGACY_IDS = ['examples'] as const

const labelClasses = 'text-[0.875rem] font-semibold text-sky'

/**
 * Text block for a real project. The featured project tells the whole story: what it is, what I did, and the
 * decisions worth noting. A gallery tile is a highlight, as on Apple's cards: the label, the name, one line, and
 * the way in; the rest waits on the case study.
 */
function ProjectText({ project, titleId, brief = false }: { project: Project; titleId: string; brief?: boolean }) {
  const t = useCopy()
  const localHref = useLocalHref()
  const text = t.projects[project.id]

  return (
    <>
      <p className={labelClasses}>
        {statusLabel(t.work, project.status)}
        {!brief && (
          <>
            {' '}
            <span aria-hidden="true">·</span> {text.type}
          </>
        )}
      </p>
      <h3 id={titleId} className="mt-2 text-[1.75rem] font-bold tracking-[-0.03em]">
        <bdi>{project.name}</bdi>
      </h3>
      {brief ? (
        <p className="caption-sentence mt-2 text-[1.0625rem] leading-snug text-white/75">{text.caption}</p>
      ) : (
        <>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-white/90">{text.summary}</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/65">
            <strong className="font-semibold text-white/90">{t.work.contribution}</strong> {text.contribution}
          </p>
          <ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed text-white/65">
            {text.decisions.map((decision, index) => (
              <li key={decision} className={`gap-3 ${index === 0 ? 'flex' : 'hidden sm:flex'}`}>
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-sky" />
                {decision}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className={`${brief ? 'mt-auto pt-5' : 'mt-6'} flex flex-wrap items-center gap-x-6 gap-y-2`}>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses('outlineLight', 'md')}
          >
            {linkLabel(t.work, project.status)}
            <span className="sr-only">{t.common.opensNewTab(project.name)}</span>
            <ArrowUpRight aria-hidden="true" size={17} className="card-arrow" />
          </a>
        ) : (
          <p className="inline-flex items-center gap-2 text-[0.9375rem] text-white/60">
            <Lock aria-hidden="true" size={15} />
            {t.work.noPublicLink}
          </p>
        )}
        <a href={localHref(`work/${project.id}/`)} className="chevron-link">
          {t.work.readCaseStudy}
          <span className="sr-only">: {project.name}</span>
          <ChevronRight aria-hidden="true" size={18} />
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
    <article aria-labelledby={titleId} className="project-card tile-paper grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
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

/** A real website as a gallery tile, in the same shape as a concept demo tile. */
function ProjectCard({ project }: { project: Project }) {
  const titleId = `project-${project.id}-title`

  return (
    <article aria-labelledby={titleId} className="project-card tile-paper flex h-full flex-col">
      <div className={frameClasses}>
        <ProjectTrigger project={project} />
      </div>
      <div className="mt-7 flex flex-1 flex-col">
        <ProjectText project={project} titleId={titleId} brief />
      </div>
    </article>
  )
}

/**
 * An app as a portrait tile: its real phone capture in a device, lit from behind in the app's own colour, as
 * Apple stages an iPhone. The phone is the button that opens the larger preview.
 */
function AppCard({ project }: { project: Project }) {
  const titleId = `project-${project.id}-title`

  return (
    <article aria-labelledby={titleId} className="project-card tile-paper flex h-full flex-col">
      <div className="app-stage" style={{ '--tint': project.tint } as CSSProperties}>
        <div className="app-phone phone-device">
          <ProjectTrigger project={project} view="phone" className="phone-trigger" />
        </div>
      </div>
      <div className="mt-7 flex flex-1 flex-col">
        <ProjectText project={project} titleId={titleId} brief />
      </div>
    </article>
  )
}

/** A concept demo for a fictional business, opened in the preview dialog. */
function ConceptCard({ example }: { example: ExampleSite }) {
  const { open } = useExampleDialog()
  const t = useCopy()
  const text = t.examples[example.id]
  const titleId = `example-${example.id}-title`

  return (
    <article aria-labelledby={titleId} className="project-card tile-paper flex h-full flex-col">
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
          className="absolute inset-0 cursor-pointer rounded-[1rem]"
        />
      </div>
      <div className="mt-7 flex flex-1 flex-col">
        <p className={labelClasses}>
          {t.work.conceptDemo} <span aria-hidden="true">·</span> {text.businessType}
        </p>
        <h3 id={titleId} className="mt-2 text-[1.75rem] font-bold tracking-[-0.03em]">
          {example.name}
        </h3>
        <p className="mt-2 text-[1.0625rem] leading-snug text-white/75">{text.intent}</p>
        <div className="mt-auto pt-5">
          <Button onClick={() => open(example)} className="glass-btn glass-flat">
            {t.work.viewExample}
            <span className="sr-only">: {example.name}</span>
            <ArrowUpRight aria-hidden="true" className="card-arrow" />
          </Button>
        </div>
      </div>
    </article>
  )
}

export function Work() {
  const t = useCopy()

  return (
    // Apple stages its pro products on black; the work gets the same stage. The header turns dark over it.
    <section id="work" aria-labelledby="work-title" data-theme="dark" data-surface="dark" className="on-dark section-pad relative bg-night text-white">
      <LegacyAnchors ids={LEGACY_IDS} />

      <div className="container-page">
        <div className="section-intro reveal">
          <p className="eyebrow">{t.work.eyebrow}</p>
          <h2 id="work-title" className="h-section word-reveal mt-3">
            <Words text={t.work.heading} twoTone />
          </h2>
          <p className="lede mt-5">{t.work.lede}</p>
        </div>

        <div className="mt-14 lg:mt-20">
          <FeaturedProject project={FEATURED_PROJECT} />
        </div>

      </div>

      {/* The rest of the websites as a sideways gallery, as Apple shows its highlights; the next tile peeks in. */}
      <div className="reveal mt-5">
        <Gallery label={t.work.sitesLabel}>
          {GALLERY_WEBSITES.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {EXAMPLES.filter((example) => example.id !== HERO_EXAMPLE.id).map((example) => (
            <ConceptCard key={example.id} example={example} />
          ))}
        </Gallery>
      </div>

      {/* My own apps and tools get their own row, so they are never mistaken for work for a business. */}
      <div className="container-page mt-20 lg:mt-28">
        <div className="section-intro reveal">
          <h3 id="apps-title" className="h-subsection word-reveal">
            <Words text={t.work.appsHeading} twoTone />
          </h3>
          <p className="lede mt-4">{t.work.appsLede}</p>
        </div>
      </div>
      <div className="reveal mt-10 lg:mt-12">
        <Gallery label={t.work.appsHeading.replace(/[.。]$/u, '')} size="compact">
          {APP_PROJECTS.map((project) => (
            <AppCard key={project.id} project={project} />
          ))}
        </Gallery>
      </div>
    </section>
  )
}
