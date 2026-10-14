import { ExampleDialogProvider } from './components/ExampleDialogProvider'
import { ProjectViewerProvider } from './components/ProjectViewerProvider'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Faq } from './components/sections/Faq'
import { Hero } from './components/sections/Hero'
import { Package } from './components/sections/Package'
import { Process } from './components/sections/Process'
import { SiteCheck } from './components/sections/SiteCheck'
import { Work } from './components/sections/Work'
import { useHashScroll } from './hooks/useHashScroll'
import { useReveal } from './hooks/useReveal'
import { StickyQuoteBar } from './components/StickyQuoteBar'

export default function App() {
  useReveal()
  useHashScroll()

  return (
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
        <Hero />
        <Work />
        <Package />
        <Process />
        <About />
        <Faq />
        <SiteCheck />
        <Contact />
      </main>
      <Footer />
      <StickyQuoteBar />
      </ProjectViewerProvider>
    </ExampleDialogProvider>
  )
}
