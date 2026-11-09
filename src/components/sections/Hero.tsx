import { ChevronRight } from 'lucide-react'
import { Glass } from 'glisse'
import { site } from '@/config/site'
import { HERO_PROJECT } from '@/content/projects'
import { useCopy, useLocalHref } from '@/i18n/context'
import { statusLabel } from '@/i18n/projectStatus'
import { enterStep } from '@/lib/reveal'
import { ProjectTrigger } from '../ProjectTrigger'
import { HeroAccent } from '../hero/HeroAccent'
import { HeroTopography } from '../hero/HeroTopography'
import { buttonClasses } from '../ui/button'

/** A headline line, with its accent word (if the language has one) drawn as glass. The words and order are unchanged. */
function HeadlineLine({ text, accent }: { text: string; accent?: string }) {
  const at = accent ? text.indexOf(accent) : -1
  if (!accent || at < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      {/* The word and the punctuation after it never come apart: if the line is too long, they wrap together. */}
      <span className="hero-nowrap">
        <HeroAccent text={accent} />
        {text.slice(at + accent.length)}
      </span>
    </>
  )
}

/**
 * The first screen, as Apple opens a product page: the name, a two-line headline, what it is and what it costs, a blue
 * button and an outline one, then a real website shown large with its phone capture beside it. Nothing else competes.
 */
export function Hero() {
  const t = useCopy()
  const localHref = useLocalHref()
  const project = HERO_PROJECT
  const text = t.projects[project.id]
  const [first, second] = t.hero.headline

  return (
    <section aria-labelledby="hero-title" className="hero">
      <HeroTopography />
      <div className="container-page">
        <div className="mx-auto max-w-[60rem] text-center">
          <p className="hero-eyebrow enter" style={enterStep(0)}>
            {site.brand.name}
          </p>
          <h1 id="hero-title" className="hero-title enter mt-3" style={enterStep(0)}>
            <bdi>
              <span className="hero-line">{first}</span>{' '}
              <span className="hero-line">
                <HeadlineLine text={second} accent={t.hero.headlineAccent} />
              </span>
            </bdi>
          </h1>
          <p className="hero-lede enter mx-auto mt-5" style={enterStep(1)}>
            {t.hero.lede}
          </p>
          <p className="hero-price enter mt-1.5" style={enterStep(1)}>
            {t.hero.priceLine}
          </p>
          <div className="hero-actions enter mt-8" style={enterStep(2)}>
            <a href="#package" className={buttonClasses('primary', 'lg')}>
              {t.hero.explore}
            </a>
            <a href="#work" className={buttonClasses('secondary', 'lg')}>
              {t.hero.seeWork}
            </a>
          </div>
        </div>

        <div className="hero-visual enter" style={enterStep(3)}>
          <div className="showcase">
            <div className="showcase-stage">
              <div className="showcase-desktop">
                <ProjectTrigger project={project} isEager sizes="(min-width: 1216px) 1040px, 86vw" />
              </div>
              {/* Liquid Glass on the picture's lower edge: it bends the website's colours without covering them. */}
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
