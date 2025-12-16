import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import DynamicBackground from './components/DynamicBackground'
import StairTransition from './components/StairTransition'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import './App.css'

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

  const scrollToSection = (sectionId) => {
    const element = sectionsRef.current[sectionId]
    if (element) {
      // Trigger stair animation
      triggerStairAnimation(sectionId)
    }
  }

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
        <section 
          id="about" 
          ref={(el) => (sectionsRef.current.about = el)}
          style={{ display: activeSection === 'about' ? 'block' : 'none' }}
        >
          <About isAnimated={aboutAnimated && activeSection === 'about'} onNavigate={scrollToSection} />
        </section>
        <section 
          id="projects" 
          ref={(el) => (sectionsRef.current.projects = el)}
          style={{ display: activeSection === 'projects' ? 'block' : 'none' }}
        >
          <Projects />
        </section>
        <section 
          id="skills" 
          ref={(el) => (sectionsRef.current.skills = el)}
          style={{ display: activeSection === 'skills' ? 'block' : 'none' }}
        >
          <Skills />
        </section>
        <section 
          id="contact" 
          ref={(el) => (sectionsRef.current.contact = el)}
          style={{ display: activeSection === 'contact' ? 'block' : 'none' }}
        >
          <Contact />
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default App
