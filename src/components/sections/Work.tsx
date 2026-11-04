import { ChevronRight } from 'lucide-react'
import { FEATURED_PROJECT, SUPPORTING_PROJECTS, type Project } from '@/content/projects'
import { useCopy, useLocalHref } from '@/i18n/context'
import { statusLabel } from '@/i18n/projectStatus'
import { LegacyAnchors } from '../LegacyAnchors'
import { ProjectTrigger } from '../ProjectTrigger'
import { ShotChip } from '../ShotChip'

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
 * and the work itself below at full width, the desktop capture with its phone capture beside it.
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
        <div className="showcase-desktop">
          <ProjectTrigger project={project} sizes="(min-width: 1216px) 1040px, 86vw" />
        </div>
        <div className="showcase-phone phone-device">
          <ProjectTrigger project={project} view="phone" className="phone-trigger" />
        </div>
      </div>
    </article>
  )
}

/** A supporting project: the picture first, then the label, the name, one sentence and the link. */
function SupportingProject({ project }: { project: Project }) {
  const t = useCopy()
  const titleId = `project-${project.id}-title`

  return (
    <article aria-labelledby={titleId} className="reveal">
      <div className="shot-frame relative">
        <ProjectTrigger project={project} sizes="(min-width: 1216px) 560px, (min-width: 768px) 46vw, 92vw" />
        <ShotChip>{statusLabel(t.work, project.status)}</ShotChip>
      </div>
      <div className="mt-6">
        <p className="project-label">{t.projects[project.id].type}</p>
        <h3 id={titleId} className="mt-1.5 text-[1.75rem] leading-tight font-semibold tracking-[-0.02em]">
          <bdi>{project.name}</bdi>
        </h3>
        <p className="caption-sentence mt-2 text-[1.0625rem] leading-snug text-ink-2">{t.projects[project.id].caption}</p>
        <ViewProject project={project} className="mt-3" />
      </div>
    </article>
  )
}

/** Selected work: one live website at full width, two concepts beside each other, and a way to every project. */
export function Work() {
  const t = useCopy()
  const localHref = useLocalHref()

  return (
    <section id="work" aria-labelledby="work-title">
      <LegacyAnchors ids={LEGACY_IDS} />

      <div className="section-pad bg-paper">
        <div className="container-page">
          <h2 id="work-title" className="section-kicker reveal text-center">
            {t.work.eyebrow}
          </h2>
          <div className="mt-6">
            <FeaturedProject project={FEATURED_PROJECT} />
          </div>
        </div>
      </div>

      <div className="section-pad">
        <div className="container-page">
          <div className="grid gap-14 md:grid-cols-2 md:gap-8 lg:gap-12">
            {SUPPORTING_PROJECTS.map((project) => (
              <SupportingProject key={project.id} project={project} />
            ))}
          </div>
          <p className="reveal mt-14 text-center sm:mt-16">
            <a href={localHref('work/')} className="text-link text-[1.0625rem]">
              {t.work.allProjects}
              <ChevronRight aria-hidden="true" size={18} className="rtl:-scale-x-100" />
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
