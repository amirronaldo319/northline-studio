import type { Guide } from '@/content/guides'
import { useCopy, useLocalHref } from '@/i18n/context'
import { Contact } from '../sections/Contact'
import { Words } from '../Words'
import { useHomeAnchor } from '../pageContext'
import { PageHero } from './PageHero'

/** A short practical guide. Plain advice, with the contact form at the end. */
export function GuidePage({ guide }: { guide: Guide }) {
  const homeAnchor = useHomeAnchor()
  const localHref = useLocalHref()
  const t = useCopy()
  const next = t.guides.find((candidate) => candidate.slug !== guide.slug)

  return (
    <>
      <PageHero
        crumbs={[
          { label: t.common.home, href: homeAnchor('top') },
          { label: t.common.guides },
          { label: guide.headline.replace(/[.。]$/, '') },
        ]}
        eyebrow={t.guidePage.eyebrow}
        headline={guide.headline}
        intro={guide.intro}
        showWorkLink={false}
      />

      <article className="border-t border-line bg-card py-12 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl space-y-10">
            {guide.sections.map((section, sectionIndex) => (
              <section key={section.heading} className="reveal" aria-labelledby={`g-${sectionIndex}`}>
                <h2 id={`g-${sectionIndex}`} className="text-[1.5rem] font-semibold">
                  <Words text={section.heading} />
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2">
                    {paragraph}
                  </p>
                ))}
                {section.items && (
                  <ul className="mt-4 space-y-2.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[1.0625rem] leading-relaxed text-ink-2">
                        <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-cobalt" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {next && (
            <p className="mt-12 max-w-2xl border-t border-line pt-6 text-[1rem] text-ink-2">
              {t.guidePage.next}{' '}
              <a href={localHref(`guides/${next.slug}/`)} className="font-semibold text-cobalt underline underline-offset-4">
                {next.headline.replace(/[.。]$/, '')}
              </a>
            </p>
          )}
        </div>
      </article>

      <Contact />
    </>
  )
}
