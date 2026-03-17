import InteractiveShaderDemo from "./components/Demos/InteractiveShaderDemo"

import { useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { PdfModalProvider } from './context/PdfModalContext'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import Particles from './components/Particles/Particles'
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
    const handleClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a || a.getAttribute('href') === '#') return
      const id = a.getAttribute('href').slice(1)
      const el = document.getElementById(id)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      <ScrollProgress />
      <Particles />
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
        <AppContent />
      </PdfModalProvider>
    </ThemeProvider>
  )
}
