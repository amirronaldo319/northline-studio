import { ChevronRight } from 'lucide-react'
import { Glass } from 'glisse'
import { site } from '@/config/site'
import { HERO_PROJECT } from '@/content/projects'
import { useCopy, useLocalHref } from '@/i18n/context'
import { statusLabel } from '@/i18n/projectStatus'
import { enterStep } from '@/lib/reveal'
import { GlassShapes } from '../glass/GlassShapes'
import { ProjectTrigger } from '../ProjectTrigger'
import { buttonClasses } from '../ui/button'

/**
 * The first screen: the name, a two-line headline, what it is and what it costs, a blue glass action and a clear glass
 * one, then a real website shown large, set in a bezel of glass, with its phone capture beside it. Soft light and a
 * few glass shapes sit behind it all; they are decoration only, hidden from assistive technology.
 */
export function Hero() {
  const t = useCopy()
  const localHref = useLocalHref()
  const project = HERO_PROJECT
  const text = t.projects[project.id]
  const [first, second] = t.hero.headline

  return (
    <section aria-labelledby="hero-title" className="hero ambient ambient-hero">
      <GlassShapes set="hero" />
      <div className="container-page">
        <div className="mx-auto max-w-[60rem] text-center">
          <p className="hero-eyebrow enter" style={enterStep(0)}>
            {site.brand.name}
          </p>
          <h1 id="hero-title" className="hero-title enter mt-3" style={enterStep(0)}>
            <bdi>
              <span className="hero-line">{first}</span> <span className="hero-line">{second}</span>
            </bdi>
          </h1>
          <p className="hero-lede enter mx-auto mt-5" style={enterStep(1)}>
            {t.hero.lede}
          </p>
          <p className="hero-price enter mt-1.5" style={enterStep(1)}>
            {t.hero.priceLine}
          </p>
          <div className="hero-actions enter mt-8" style={enterStep(2)}>
            <a href="#package" className={buttonClasses('primary', 'lg', 'hero-cta')}>
              {t.hero.explore}
            </a>
            <a href="#work" className={buttonClasses('secondary', 'lg')}>
              {t.hero.seeWork}
              <ChevronRight aria-hidden="true" size={18} className="-me-1 rtl:-scale-x-100" />
            </a>
          </div>
        </div>

        <div className="hero-visual enter" style={enterStep(3)}>
          <div className="showcase">
            <div className="glass-frame">
              <div className="showcase-desktop">
                <ProjectTrigger project={project} isEager sizes="(min-width: 1216px) 1040px, 86vw" />
                {/* Liquid Glass over the work itself: it bends the website's own colours beneath it. */}
                <div className="showcase-caption">
                  <Glass className="caption-glass glass-lift">
                    <span className="caption-status">{statusLabel(t.work, project.status)}</span>
                    <span className="caption-name">
                      <bdi>{project.name}</bdi>
                    </span>
                    <a href={localHref(`work/${project.id}/`)} className="caption-link">
                      {t.work.viewProject}
                      <span className="sr-only">: {project.name}</span>
                      <ChevronRight aria-hidden="true" size={16} className="rtl:-scale-x-100" />
                    </a>
                  </Glass>
                </div>
              </div>
            </div>
            <div className="showcase-phone phone-device">
              <ProjectTrigger project={project} view="phone" className="phone-trigger" />
            </div>
          </div>
          <p className="hero-caption">{t.hero.visualCaption(project.name, text.caption)}</p>
        </div>
      </div>
    </section>
  )
}
