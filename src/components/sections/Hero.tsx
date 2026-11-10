import { site } from '@/config/site'
import { useCopy } from '@/i18n/context'
import { enterStep } from '@/lib/reveal'
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
 * The first screen: the name, a two-line headline, what it is and what it costs, a blue button and an outline one,
 * over the contour lines. No website is shown here; the work starts in the next section. Nothing else competes.
 */
export function Hero() {
  const t = useCopy()
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

      </div>
    </section>
  )
}
