import type { CSSProperties } from 'react'
import { ArrowUpRight, ChevronRight, Lock } from 'lucide-react'
import type { ExampleSite } from '@/content/examples'
import type { Project } from '@/content/projects'
import { useCopy, useLocalHref } from '@/i18n/context'
import { linkLabel, statusLabel } from '@/i18n/projectStatus'
import { DemoPreview } from '../DemoPreview'
import { useExampleDialog } from '../exampleDialogContext'
import { ProjectTrigger } from '../ProjectTrigger'
import { ShotChip } from '../ShotChip'

/*
 * Project cards of glass, shared by the home page's swipeable galleries and the work page's grid. Each card fills the
 * height it is given, so a row or a gallery of cards lines up, with the links resting on the card's foot.
 */

/** The words under a project's picture: what it is, its name, one line, and the ways in (case study and live site). */
function CardText({ project }: { project: Project }) {
  const t = useCopy()
  const localHref = useLocalHref()
  const titleId = `project-${project.id}-title`

  return (
    <div className="project-card-body flex flex-1 flex-col">
      <p className="project-label">{t.projects[project.id].type}</p>
      <h3 id={titleId} className="mt-1.5 text-[1.5rem] leading-tight font-semibold tracking-[-0.018em]">
        <bdi>{project.name}</bdi>
      </h3>
      <p className="caption-sentence mt-1.5 leading-snug text-ink-2">{t.projects[project.id].caption}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-3">
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

/** A website: its screenshot set in a card of glass, with its status, name, one line and its links. */
export function WebsiteCard({ project }: { project: Project }) {
  const t = useCopy()
  return (
    <article aria-labelledby={`project-${project.id}-title`} className="project-card liquid-glass-card flex h-full flex-col">
      <div className="shot-frame card-shot relative">
        <ProjectTrigger project={project} sizes="(min-width: 1216px) 540px, (min-width: 768px) 44vw, 90vw" />
        <ShotChip>{statusLabel(t.work, project.status)}</ShotChip>
      </div>
      <CardText project={project} />
    </article>
  )
}

/** An app: its phone capture standing on a soft stage tinted with the app's own colour. */
export function AppCard({ project }: { project: Project }) {
  const t = useCopy()
  return (
    <article aria-labelledby={`project-${project.id}-title`} className="project-card liquid-glass-card flex h-full flex-col">
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
export function DemoCard({ example }: { example: ExampleSite }) {
  const { open } = useExampleDialog()
  const t = useCopy()
  const text = t.examples[example.id]
  const titleId = `example-${example.id}-title`

  return (
    <article aria-labelledby={titleId} className="project-card liquid-glass-card flex h-full flex-col">
      <div className="shot-frame card-shot relative">
        <DemoPreview example={example} />
        <ShotChip>{t.work.conceptDemo}</ShotChip>
        {/* Mouse-only convenience; the labelled button below is the accessible control. */}
        <button type="button" tabIndex={-1} aria-hidden="true" onClick={() => open(example)} className="absolute inset-0 cursor-pointer" />
      </div>
      <div className="project-card-body flex flex-1 flex-col">
        <p className="project-label">{text.businessType}</p>
        <h3 id={titleId} className="mt-1.5 text-[1.5rem] leading-tight font-semibold tracking-[-0.018em]">
          {example.name}
        </h3>
        <p className="mt-1.5 leading-snug text-ink-2">{text.intent}</p>
        <button type="button" onClick={() => open(example)} className="text-link mt-auto self-start pt-3">
          {t.work.viewExample}
          <span className="sr-only">: {example.name}</span>
          <ChevronRight aria-hidden="true" size={17} className="rtl:-scale-x-100" />
        </button>
      </div>
    </article>
  )
}
