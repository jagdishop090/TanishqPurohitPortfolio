import { useState, useEffect, useRef, useMemo, useCallback, lazy, Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import DynamicBackground from './components/DynamicBackground'
import StairTransition from './components/StairTransition'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import './App.css'

// Lazy load pages that aren't immediately visible
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Skills = lazy(() => import('./pages/Skills'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [nextPath, setNextPath] = useState(null)
  const [aboutAnimated, setAboutAnimated] = useState(false)
  const sectionsRef = useRef({})
  const lastTriggeredTime = useRef(0)

  const handleStairComplete = (sectionId) => {
    if (!sectionId) return
    
    // Change the active section to show the new page
    setActiveSection(sectionId)
    
    // Reset about animation state
    if (sectionId === 'about') {
      setAboutAnimated(false)
      setTimeout(() => {
        setAboutAnimated(true)
      }, 200)
    }
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
      setNextPath(null)
    }, 1500)
  }

  const triggerStairAnimation = (sectionId) => {
    const now = Date.now()
    if (isTransitioning || (now - lastTriggeredTime.current < 1500)) return
    
    lastTriggeredTime.current = now
    setIsTransitioning(true)
    setNextPath(sectionId)
  }

  const scrollToSection = useCallback((sectionId) => {
    const element = sectionsRef.current[sectionId]
    if (element) {
      // Trigger stair animation
      triggerStairAnimation(sectionId)
    }
  }, [])

  return (
    <div className="app">
      <CustomCursor />
      <DynamicBackground />
      <Header activeSection={activeSection} onNavigate={scrollToSection} />
      <StairTransition 
        isActive={isTransitioning} 
        nextPath={nextPath} 
        onComplete={handleStairComplete}
      />
      <div className={`content ${isTransitioning ? 'transitioning' : ''}`}>
        <section 
          id="home" 
          ref={(el) => (sectionsRef.current.home = el)}
          style={{ display: activeSection === 'home' ? 'block' : 'none' }}
        >
          <Home onNavigate={scrollToSection} />
        </section>
        {activeSection === 'about' && (
          <section 
            id="about" 
            ref={(el) => (sectionsRef.current.about = el)}
          >
            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
              <About isAnimated={aboutAnimated && activeSection === 'about'} onNavigate={scrollToSection} />
            </Suspense>
          </section>
        )}
        {activeSection === 'projects' && (
          <section 
            id="projects" 
            ref={(el) => (sectionsRef.current.projects = el)}
          >
            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
              <Projects />
            </Suspense>
          </section>
        )}
        {activeSection === 'skills' && (
          <section 
            id="skills" 
            ref={(el) => (sectionsRef.current.skills = el)}
          >
            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
              <Skills />
            </Suspense>
          </section>
        )}
        {activeSection === 'contact' && (
          <section 
            id="contact" 
            ref={(el) => (sectionsRef.current.contact = el)}
          >
            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
              <Contact />
            </Suspense>
          </section>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default App
