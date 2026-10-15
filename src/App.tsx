import { StickyQuoteBar } from './components/StickyQuoteBar'
import { ExampleDialogProvider } from './components/ExampleDialogProvider'
import { ProjectViewerProvider } from './components/ProjectViewerProvider'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PageContext } from './components/pageContext'
import { CasePage } from './components/pages/CasePage'
import { GuidePage } from './components/pages/GuidePage'
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
import type { PageRef } from './content/pages'
import { PROJECTS } from './content/projects'
import { CopyContext, useCopy } from './i18n/context'
import type { Copy } from './i18n/types'
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
  const copy = useCopy()

  if (page.kind === 'trade') {
    const trade = copy.trades.find((candidate) => candidate.slug === page.slug)
    if (trade) return <TradePage trade={trade} />
  }
  if (page.kind === 'case') {
    const project = PROJECTS.find((candidate) => candidate.id === page.id)
    if (project) return <CasePage project={project} />
  }
  if (page.kind === 'guide') {
    const guide = copy.guides.find((candidate) => candidate.slug === page.slug)
    if (guide) return <GuidePage guide={guide} />
  }
  return <HomeSections />
}

const ENGLISH_HOME: PageRef = { kind: 'home', locale: 'en' }

export default function App({ page = ENGLISH_HOME, copy }: { page?: PageRef; copy: Copy }) {
  useReveal()
  useHashScroll()

  return (
    <CopyContext.Provider value={copy}>
      <PageContext.Provider value={{ isHome: page.kind === 'home', page }}>
        <ExampleDialogProvider>
          <ProjectViewerProvider>
            <a
              href="#main"
              className="sr-only z-50 rounded-full bg-ink px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:start-3"
            >
              {copy.common.skipToContent}
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
    </CopyContext.Provider>
  )
}
