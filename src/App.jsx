import { useState, useEffect, useRef, useMemo, useCallback, lazy, Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import DynamicBackground from './components/DynamicBackground'
import StairTransition from './components/StairTransition'
// import CustomCursor from './components/CustomCursor'
import MobilePopup from './components/MobilePopup'
import FloatingWarning from './components/FloatingWarning'
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
  const mobilePopupRef = useRef(null)

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

  const scrollToSection = useCallback((sectionId, event) => {
    // Only prevent navigation if event originated from game canvas or controls
    if (event) {
      const target = event.target || event.touches?.[0]?.target
      if (target) {
        const gameContainer = target.closest('.shooter-game-container')
        const mobileControls = target.closest('.mobile-controls')
        const joystick = target.closest('.joystick-base')
        const jumpButton = target.closest('.jump-button')
        const canvas = target.closest('.shooter-game-canvas')
        
        // Only prevent if it's specifically game elements, not buttons/links
        if ((gameContainer || mobileControls || joystick || canvas) && 
            target.tagName !== 'BUTTON' && 
            target.tagName !== 'A' && 
            !target.closest('button') && 
            !target.closest('a')) {
          return
        }
        // Always allow jump button to work
        if (jumpButton) {
          return
        }
      }
    }
    
    const element = sectionsRef.current[sectionId]
    if (element) {
      // Trigger stair animation
      triggerStairAnimation(sectionId)
    }
  }, [])

  const handleShowPopup = useCallback(() => {
    if (mobilePopupRef.current) {
      mobilePopupRef.current.show()
    }
  }, [])

  return (
    <div className="app">
      <MobilePopup ref={mobilePopupRef} />
      <FloatingWarning onShowPopup={handleShowPopup} />
      {/* <CustomCursor /> */}
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
        <section 
          id="about" 
          ref={(el) => (sectionsRef.current.about = el)}
          style={{ display: activeSection === 'about' ? 'block' : 'none' }}
        >
          {activeSection === 'about' && (
            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
              <About isAnimated={aboutAnimated && activeSection === 'about'} onNavigate={scrollToSection} />
            </Suspense>
          )}
        </section>
        <section 
          id="projects" 
          ref={(el) => (sectionsRef.current.projects = el)}
          style={{ display: activeSection === 'projects' ? 'block' : 'none' }}
        >
          {activeSection === 'projects' && (
            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
              <Projects />
            </Suspense>
          )}
        </section>
        <section 
          id="skills" 
          ref={(el) => (sectionsRef.current.skills = el)}
          style={{ display: activeSection === 'skills' ? 'block' : 'none' }}
        >
          {activeSection === 'skills' && (
            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
              <Skills />
            </Suspense>
          )}
        </section>
        <section 
          id="contact" 
          ref={(el) => (sectionsRef.current.contact = el)}
          style={{ display: activeSection === 'contact' ? 'block' : 'none' }}
        >
          {activeSection === 'contact' && (
            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
              <Contact />
            </Suspense>
          )}
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default App
