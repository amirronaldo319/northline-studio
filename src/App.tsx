import { StickyQuoteBar } from './components/StickyQuoteBar'
import { ExampleDialogProvider } from './components/ExampleDialogProvider'
import { ProjectViewerProvider } from './components/ProjectViewerProvider'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PageContext } from './components/pageContext'
import { CasePage } from './components/pages/CasePage'
import { GuidePage } from './components/pages/GuidePage'
import { LanguagePage } from './components/pages/LanguagePage'
import { TradePage } from './components/pages/TradePage'
import { About } from './components/sections/About'
import { Audience } from './components/sections/Audience'
import { Contact } from './components/sections/Contact'
import { Faq } from './components/sections/Faq'
import { Hero } from './components/sections/Hero'
import { Package } from './components/sections/Package'
import { Process } from './components/sections/Process'
import { SiteCheck } from './components/sections/SiteCheck'
import { Work } from './components/sections/Work'
import { findGuide } from './content/guides'
import { findLanguage } from './content/languages'
import type { PageRef } from './content/pages'
import { PROJECTS } from './content/projects'
import { findTrade } from './content/trades'
import { useHashScroll } from './hooks/useHashScroll'
import { useReveal } from './hooks/useReveal'

function HomeSections() {
  return (
    <>
      <Hero />
      <Work />
      <Package />
      <Process />
      <Audience />
      <About />
      <Faq />
      <SiteCheck />
      <Contact />
    </>
  )
}

/** The content of one page. Unknown references fall back to the home page. */
function PageContent({ page }: { page: PageRef }) {
  if (page.kind === 'trade') {
    const trade = findTrade(page.slug)
    if (trade) return <TradePage trade={trade} />
  }
  if (page.kind === 'case') {
    const project = PROJECTS.find((candidate) => candidate.id === page.id)
    if (project) return <CasePage project={project} />
  }
  if (page.kind === 'guide') {
    const guide = findGuide(page.slug)
    if (guide) return <GuidePage guide={guide} />
  }
  return <HomeSections />
}

export default function App({ page = { kind: 'home' } }: { page?: PageRef }) {
  useReveal()
  useHashScroll()

  if (page.kind === 'language') {
    const language = findLanguage(page.code)
    if (language) return <LanguagePage language={language} />
  }

  return (
    <PageContext.Provider value={{ isHome: page.kind === 'home' }}>
      <ExampleDialogProvider>
        <ProjectViewerProvider>
          <a
            href="#main"
            className="sr-only z-50 rounded-full bg-ink px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <div id="top" />
          <Header />
          <main id="main" tabIndex={-1} className="focus:outline-none">
            <PageContent page={page} />
          </main>
          <Footer />
          <StickyQuoteBar />
        </ProjectViewerProvider>
      </ExampleDialogProvider>
    </PageContext.Provider>
  )
}
