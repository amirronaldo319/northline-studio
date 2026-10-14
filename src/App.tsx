import { ExampleDialogProvider } from './components/ExampleDialogProvider'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Examples } from './components/sections/Examples'
import { Faq } from './components/sections/Faq'
import { Hero } from './components/sections/Hero'
import { Package } from './components/sections/Package'
import { Process } from './components/sections/Process'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()

  return (
    <ExampleDialogProvider>
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
        <Examples />
        <Package />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </ExampleDialogProvider>
  )
}
