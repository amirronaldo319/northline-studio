import { ChevronRight } from 'lucide-react'
import { EXAMPLES } from '@/content/examples'
import { APP_PROJECTS, FEATURED_PROJECT, GALLERY_WEBSITES, type Project } from '@/content/projects'
import { useCopy, useLocalHref } from '@/i18n/context'
import { statusLabel } from '@/i18n/projectStatus'
import { GlassShapes } from '../glass/GlassShapes'
import { LegacyAnchors } from '../LegacyAnchors'
import { ProjectTrigger } from '../ProjectTrigger'
import { buttonClasses } from '../ui/button'
import { Gallery } from '../ui/Gallery'
import { AppCard, DemoCard, WebsiteCard } from '../work/ProjectCards'
import { Words } from '../Words'

/** Section ids from earlier versions of the page. Links shared with these still land on this section. */
const LEGACY_IDS = ['examples'] as const

/** A small factual label: what kind of work it is (live, concept or personal) and what it is for. */
function ProjectLabel({ project }: { project: Project }) {
  const t = useCopy()
  return (
    <p className="project-label">
      {statusLabel(t.work, project.status)}
      <span aria-hidden="true"> · </span>
      {t.projects[project.id].type}
    </p>
  )
}

function ViewProject({ project, className = '' }: { project: Project; className?: string }) {
  const t = useCopy()
  const localHref = useLocalHref()
  return (
    <a href={localHref(`work/${project.id}/`)} className={`text-link ${className}`}>
      {t.work.viewProject}
      <span className="sr-only">: {project.name}</span>
      <ChevronRight aria-hidden="true" size={18} className="rtl:-scale-x-100" />
    </a>
  )
}

/**
 * The best project, presented as Apple presents a product: a label, the name set large, one sentence, one link,
 * and the work itself below at full width, set in a bezel of glass, with its phone capture beside it.
 */
function FeaturedProject({ project }: { project: Project }) {
  const t = useCopy()
  const titleId = `project-${project.id}-title`

  return (
    <article aria-labelledby={titleId} className="feature">
      <div className="reveal mx-auto max-w-[46rem] text-center">
        <ProjectLabel project={project} />
        <h3 id={titleId} className="feature-name mt-2">
          <bdi>{project.name}</bdi>
        </h3>
        <p className="feature-line caption-sentence mx-auto mt-4">{t.projects[project.id].caption}</p>
        <ViewProject project={project} className="mt-5 text-[1.0625rem]" />
      </div>
      <div className="reveal showcase mt-12 sm:mt-16">
        <div className="glass-frame">
          <div className="showcase-desktop">
            <ProjectTrigger project={project} sizes="(min-width: 1216px) 1040px, 86vw" />
          </div>
        </div>
        <div className="showcase-phone phone-device">
          <ProjectTrigger project={project} view="phone" className="phone-trigger" />
        </div>
      </div>
    </article>
  )
}

/**
 * Selected work: one live website at full width, then the rest of the websites and the design demos as a sideways
 * gallery of glass cards that the visitor swipes, drags or steps through, then my own apps and tools in their own
 * gallery, and a way to every project. Soft light behind each part gives the glass something to hold.
 */
export function Work() {
  const t = useCopy()
  const localHref = useLocalHref()

  return (
    <section id="work" aria-labelledby="work-title">
      <LegacyAnchors ids={LEGACY_IDS} />

      <div className="section-pad ambient ambient-work">
        <div className="container-page">
          <h2 id="work-title" className="section-kicker reveal text-center">
            {t.work.eyebrow}
          </h2>
          <div className="mt-6">
            <FeaturedProject project={FEATURED_PROJECT} />
          </div>
        </div>
      </div>

      <div className="work-galleries section-pad ambient ambient-cards">
        <GlassShapes set="cards" />

        {/* The rest of the websites as a sideways gallery, as Apple shows its highlights; the next card peeks in. */}
        <div className="reveal">
          <Gallery label={t.work.sitesLabel}>
            {GALLERY_WEBSITES.map((project) => (
              <WebsiteCard key={project.id} project={project} />
            ))}
            {EXAMPLES.map((example) => (
              <DemoCard key={example.id} example={example} />
            ))}
          </Gallery>
        </div>

        {/* My own apps and tools get their own row, so they are never mistaken for work for a business. */}
        <div className="container-page mt-20 lg:mt-28">
          <div className="section-intro reveal">
            <h3 id="apps-title" className="h-subsection">
              <Words text={t.work.appsHeading} />
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

        <p className="reveal container-page mt-14 text-center sm:mt-16">
          <a href={localHref('work/')} className={buttonClasses('secondary', 'md')}>
            {t.work.allProjects}
            <ChevronRight aria-hidden="true" size={17} className="-me-1 rtl:-scale-x-100" />
          </a>
        </p>
      </div>
    </section>
  )
}
