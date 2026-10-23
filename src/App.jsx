import { useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { PdfModalProvider } from './context/PdfModalContext'
import { CaseStudyProvider } from './context/CaseStudyContext'
import { initSmoothScroll, destroySmoothScroll, scrollToTarget } from './lib/smoothScroll'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import Thread from './components/Thread/Thread'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Experience from './components/Experience/Experience'
import Projects from './components/Projects/Projects'
import Research from './components/Research/Research'
import Skills from './components/Skills/Skills'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import PdfModal from './components/PdfModal/PdfModal'

function AppContent() {
  useEffect(() => {
    initSmoothScroll()

    const handleClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a || a.getAttribute('href') === '#') return
      const el = document.getElementById(a.getAttribute('href').slice(1))
      if (el) {
        e.preventDefault()
        scrollToTarget(el)
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      destroySmoothScroll()
    }
  }, [])

  return (
    <>
      <ScrollProgress />
      <Thread />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Research />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <PdfModal />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <PdfModalProvider>
        <CaseStudyProvider>
          <AppContent />
        </CaseStudyProvider>
      </PdfModalProvider>
    </ThemeProvider>
  )
}
