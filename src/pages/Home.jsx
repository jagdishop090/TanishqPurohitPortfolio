import { useState, useEffect, useRef, memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import NeonLines from '../components/NeonLines'
import './Home.css'

const Home = memo(({ onNavigate }) => {
  const portraitRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const portrait = portraitRef.current
    if (!portrait) return

    // Disable tilt on mobile/touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return
    }

    let tiltX = 0
    let tiltY = 0
    let targetX = 0
    let targetY = 0
    let isAnimating = false

    const updateTransform = () => {
      // Smooth interpolation for better performance
      const prevTiltX = tiltX
      const prevTiltY = tiltY
      
      tiltX += (targetX - tiltX) * 0.1
      tiltY += (targetY - tiltY) * 0.1
      
      // Check if we're close enough to the target
      const diffX = Math.abs(targetX - tiltX)
      const diffY = Math.abs(targetY - tiltY)
      
      // If very close, snap to target to prevent getting stuck
      if (diffX < 0.01) tiltX = targetX
      if (diffY < 0.01) tiltY = targetY
      
      portrait.style.setProperty('--tilt-x', `${tiltX}deg`)
      portrait.style.setProperty('--tilt-y', `${tiltY}deg`)
      
      // Continue animation if we're not at target or if values changed
      const hasChanged = Math.abs(prevTiltX - tiltX) > 0.001 || Math.abs(prevTiltY - tiltY) > 0.001
      const notAtTarget = diffX > 0.01 || diffY > 0.01
      
      if (notAtTarget || hasChanged) {
        rafRef.current = requestAnimationFrame(updateTransform)
      } else {
        isAnimating = false
        rafRef.current = null
      }
    }

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }
        rafRef.current = requestAnimationFrame(updateTransform)
      }
    }

    const handleMouseMove = (e) => {
      const rect = portrait.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const x = (e.clientX - centerX) / (rect.width / 2)
      const y = (e.clientY - centerY) / (rect.height / 2)
      
      // Limit tilt to reasonable angles (max 15 degrees)
      targetX = x * 15
      targetY = y * -15
      
      startAnimation()
    }

    const handleMouseLeave = () => {
      targetX = 0
      targetY = 0
      startAnimation()
    }

    portrait.addEventListener('mousemove', handleMouseMove, { passive: true })
    portrait.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      portrait.removeEventListener('mousemove', handleMouseMove)
      portrait.removeEventListener('mouseleave', handleMouseLeave)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  // Simplified animations for mobile
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  
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
    hidden: { opacity: 0, y: isMobile ? 0 : 20 },
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
      className="home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <NeonLines />
      <div className="home-container">
        <div className="home-content">
          {/* Left Side - Text */}
          <motion.div className="home-text" variants={itemVariants}>
            <h1 className="home-title">
              Hi, I'm Tanishq
            </h1>
            <p className="home-description">
              I'm Tanishq Purohit, a passionate Designer, Software Developer, and Game Developer. I create digital experiences that combine creativity, functionality, and innovation.
            </p>
            <div className="home-cta-button-wrapper">
              <svg className="home-cta-border-svg" viewBox="0 0 200 50" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="homeButtonGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#00ffff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#00ffff" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="homeButtonGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="homeButtonGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#00ff88" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#00ff88" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="homeButtonGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff0088" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#ff0088" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ff0088" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="homeButtonGlow1" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="homeButtonGlow2" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="homeButtonGlow3" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="homeButtonGlow4" x="-50%" y="-50%" width="200%" height="200%">
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
                  stroke="url(#homeButtonGradient1)"
                  strokeWidth="1.5"
                  filter="url(#homeButtonGlow1)"
                  className="home-button-border-path path-1"
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
                  stroke="url(#homeButtonGradient2)"
                  strokeWidth="1.5"
                  filter="url(#homeButtonGlow2)"
                  className="home-button-border-path path-2"
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
                  stroke="url(#homeButtonGradient3)"
                  strokeWidth="1.5"
                  filter="url(#homeButtonGlow3)"
                  className="home-button-border-path path-3"
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
                  stroke="url(#homeButtonGradient4)"
                  strokeWidth="1.5"
                  filter="url(#homeButtonGlow4)"
                  className="home-button-border-path path-4"
                  strokeLinecap="round"
                />
              </svg>
              <button 
                className="home-cta-button"
                onClick={() => onNavigate && onNavigate('contact')}
              >
                <span>CONTACT ME</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Right Side - Portrait */}
          <motion.div className="home-portrait" variants={itemVariants}>
            <div 
              ref={portraitRef}
              className="portrait-wrapper"
            >
              <svg className="portrait-border-svg" viewBox="0 0 320 400">
                <defs>
                  <filter id="portraitGlow">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <linearGradient id="borderGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#00ffff" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#00ffff" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="borderGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="borderGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#00ff88" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#00ff88" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="borderGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff0088" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#ff0088" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ff0088" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {/* Rounded rectangle border path - following the border continuously */}
                <path
                  d="M 16,0 L 304,0 Q 320,0 320,16 L 320,384 Q 320,400 304,400 L 16,400 Q 0,400 0,384 L 0,16 Q 0,0 16,0 Z"
                  fill="none"
                  stroke="url(#borderGradient1)"
                  strokeWidth="1.5"
                  filter="url(#portraitGlow)"
                  className="border-path path-1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 16,0 L 304,0 Q 320,0 320,16 L 320,384 Q 320,400 304,400 L 16,400 Q 0,400 0,384 L 0,16 Q 0,0 16,0 Z"
                  fill="none"
                  stroke="url(#borderGradient2)"
                  strokeWidth="1.5"
                  filter="url(#portraitGlow)"
                  className="border-path path-2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 16,0 L 304,0 Q 320,0 320,16 L 320,384 Q 320,400 304,400 L 16,400 Q 0,400 0,384 L 0,16 Q 0,0 16,0 Z"
                  fill="none"
                  stroke="url(#borderGradient3)"
                  strokeWidth="1.5"
                  filter="url(#portraitGlow)"
                  className="border-path path-3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 16,0 L 304,0 Q 320,0 320,16 L 320,384 Q 320,400 304,400 L 16,400 Q 0,400 0,384 L 0,16 Q 0,0 16,0 Z"
                  fill="none"
                  stroke="url(#borderGradient4)"
                  strokeWidth="1.5"
                  filter="url(#portraitGlow)"
                  className="border-path path-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="portrait-container">
                <img 
                  src="/portrait.jpg.png" 
                  alt="Tanishq Purohit" 
                  className="portrait-img"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div className="home-skills" variants={itemVariants}>
          <div className="skill-card skill-card-1">
            <div className="skill-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="skill-title">USER-CENTERED DESIGN</h3>
          </div>
          <div className="skill-card skill-card-2">
            <div className="skill-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="skill-title">SOFTWARE DEVELOPMENT</h3>
          </div>
          <div className="skill-card skill-card-3">
            <div className="skill-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M6 10H6.01M10 10H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="skill-title">GAME DEVELOPMENT</h3>
          </div>
          <div className="skill-card skill-card-4">
            <div className="skill-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 2L12 6L8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="skill-title">RESPONSIVE & MODERN</h3>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
})

Home.displayName = 'Home'

export default Home
