import { motion } from 'framer-motion'
import { useEffect } from 'react'
import ShooterGame from '../components/ShooterGame'
import './About.css'

const About = ({ isAnimated, onNavigate }) => {
  // Simplified animations for mobile
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  
  // Only prevent navigation for game elements, not all clicks
  useEffect(() => {
    const handleClick = (e) => {
      // Only prevent navigation if click is specifically on game elements
      const gameContainer = e.target.closest('.shooter-game-container')
      const mobileControls = e.target.closest('.mobile-controls')
      const joystick = e.target.closest('.joystick-base')
      const jumpButton = e.target.closest('.jump-button')
      const canvas = e.target.closest('.shooter-game-canvas')
      
      // Only stop navigation for game-related elements
      if (gameContainer || mobileControls || joystick || jumpButton || canvas) {
        // Don't prevent default for buttons/links inside game
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
          return
        }
        // Only prevent hash navigation, not all clicks
        if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
          const href = e.target.getAttribute('href')
          // Allow navigation to contact page from Contact Me button
          if (href === '#contact') {
            return
          }
        }
      }
    }
    
    // Use capture phase but don't block everything
    document.addEventListener('click', handleClick, true)
    
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1,
        delayChildren: isMobile ? 0 : 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div
      className="about"
      variants={containerVariants}
      initial="hidden"
      animate={isAnimated !== false ? "visible" : "hidden"}
    >
      <div className="about-container">
        <div className="about-content">
          {/* Left Side */}
          <motion.div className="about-left" variants={itemVariants}>
            <h1 className="about-title">
              Designed by Curiosity
            </h1>
            <p className="about-description">
              I focus on how things feel, flow, and function — not just how they look.
            </p>
            <div className="about-cta-button-wrapper">
              <svg className="about-cta-border-svg" viewBox="0 0 200 50" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="buttonGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#00ffff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#00ffff" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="buttonGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="buttonGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#00ff88" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#00ff88" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="buttonGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff0088" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#ff0088" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ff0088" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="buttonGlow1" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="buttonGlow2" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="buttonGlow3" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="buttonGlow4" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <rect
                  x="2"
                  y="2"
                  width="196"
                  height="46"
                  rx="25"
                  ry="25"
                  fill="none"
                  stroke="url(#buttonGradient1)"
                  strokeWidth="1.5"
                  filter="url(#buttonGlow1)"
                  className="button-border-path path-1"
                  strokeLinecap="round"
                />
                <rect
                  x="2"
                  y="2"
                  width="196"
                  height="46"
                  rx="25"
                  ry="25"
                  fill="none"
                  stroke="url(#buttonGradient2)"
                  strokeWidth="1.5"
                  filter="url(#buttonGlow2)"
                  className="button-border-path path-2"
                  strokeLinecap="round"
                />
                <rect
                  x="2"
                  y="2"
                  width="196"
                  height="46"
                  rx="25"
                  ry="25"
                  fill="none"
                  stroke="url(#buttonGradient3)"
                  strokeWidth="1.5"
                  filter="url(#buttonGlow3)"
                  className="button-border-path path-3"
                  strokeLinecap="round"
                />
                <rect
                  x="2"
                  y="2"
                  width="196"
                  height="46"
                  rx="25"
                  ry="25"
                  fill="none"
                  stroke="url(#buttonGradient4)"
                  strokeWidth="1.5"
                  filter="url(#buttonGlow4)"
                  className="button-border-path path-4"
                  strokeLinecap="round"
                />
              </svg>
              <button 
                className="about-cta-button"
                onClick={() => onNavigate && onNavigate('contact')}
              >
                <span>CONTACT ME</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Right Side - Skills Grid */}
          <motion.div className="about-right" variants={itemVariants}>
            <div className="skills-grid">
              <div className="skill-stat skill-stat-1">
                <span className="stat-number">92%</span>
                <span className="stat-label">Design</span>
              </div>
              <div className="skill-stat skill-stat-2">
                <span className="stat-number">88%</span>
                <span className="stat-label">Development</span>
              </div>
              <div className="skill-stat skill-stat-3">
                <span className="stat-number">90%</span>
                <span className="stat-label">UX Research</span>
              </div>
              <div className="skill-stat skill-stat-4">
                <span className="stat-number">95%</span>
                <span className="stat-label">Game Design</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Process Section */}
        <motion.div className="about-process" variants={itemVariants}>
          <div className="process-content">
            <div className="process-text">
              <h2 className="process-title">Simple Game Mechanics</h2>
              <p className="process-subtitle">A basic game demo showcasing simple mechanics — nothing fancy, just fundamental gameplay elements.</p>
              
              <div className="process-steps">
                <div className="process-step">
                  <h3 className="step-title">BASIC CONTROLS</h3>
                  <p className="step-desc">Simple movement and interaction mechanics — move, jump, and shoot. Straightforward and functional.</p>
                </div>
                <div className="process-step">
                  <h3 className="step-title">MINIMAL GRAPHICS</h3>
                  <p className="step-desc">Using emojis and basic shapes — no complex graphics or animations, just simple visual elements.</p>
                </div>
                <div className="process-step">
                  <h3 className="step-title">CORE FUNCTIONALITY</h3>
                  <p className="step-desc">Focusing on making things work — collision detection, enemy spawning, and basic game logic.</p>
                </div>
              </div>
            </div>
            <div 
              className="process-image"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <ShooterGame />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default About
